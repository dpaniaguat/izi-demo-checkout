/*
 - Integración del nuevo botón de pagos izipay
*/

import { commerceDataJs } from './commerce-data.js';
import { getTokenSession } from './fetchApi.js';
import { factoryRequest } from './factoryRequest.js';
import {
    convertTextToJson, copyText,
    generateUniqueString,
    getCheckPaymentMethods,
    getDateHour,
    getValueFromParamURL, injectScript,
    obtenerFechaHoraLima,
    openTab, scrollElement, selectedCommerce, updateSteps
} from './utils.js';
import { factoryFieldsConfig } from './factoryFieldsConfig.js';

factoryFieldsConfig();

let commerceData = null;
let objPayment = {};

let isConfigManual = false;

if (!localStorage.getItem('commerceData')) {
    localStorage.setItem('commerceData', JSON.stringify(commerceDataJs));
}

commerceData = JSON.parse(localStorage.getItem('commerceData'));

const URL_CHECKOUT_DEV = 'https://qa-checkout.izipay.pe/payments/v1/js/index.js'; //version deploy dev

//const URL_CHECKOUT_PROD = './js/prod.js'; //version deploy prod
//const URL_CHECKOUT_DEV = './js/test.js?mode=pop-up&container=iframe-payment'; //version deploy dev

//const PROD_URL_GEN_TOKEN = 'https://testcheckout.izipay.pe/apidemoPrd/v1/Token/Generate';
const PROD_URL_GEN_TOKEN = 'https://security.somee.com/v1/Token/Generate';
const TEST_URL_GEN_TOKEN = 'https://qa-checkout.izipay.pe/apidemo/v1/Token/Generate';

let _authorization = undefined;
let _publicKey = undefined;
let _amount = undefined;
let _orderNumber = undefined;
let _userOrg = undefined;
let _userScoring = undefined;
let _currency = undefined;
let _isEmbedded = undefined;
let _transactionId = undefined;
let _merchantCode = undefined;

const progress = document.getElementById('progress');
const next = document.getElementById('next');
const prev = document.getElementById('prev');
const circles = document.querySelectorAll('.circle');

let currentActive = 1;

document.querySelector('#pagar-desde-demo').disabled = true;

let selectPayMethods = 'all';

const buttonForm = '<button type="submit" id="btn-payment" class="btn-enviar hide">CONTINUAR CON EL PAGO</button>';
let customThemeTest = {};

let formPayment = document.querySelector('#formulario-tarjeta');
let initFormPayment = document.querySelector('#init-formulario-payment');
let jsonPayment = document.querySelector('#json-payment');
let jsonPaymentResponse = document.querySelector('#json-payment-response');
let jsonPaymentResponseEvents = document.querySelector('#json-payment-response-events');
let jsonPaymentErrors = document.querySelector('#json-payment-errors');
let jsonPaymentToken = document.querySelector('#json-payment-token');


let $ = localStorage.getItem('payloadCustom') && JSON.parse(localStorage.getItem('payloadCustom')) || null;
let comboCommerceOptions = commerceData.map(({ name, merchantCode, useCase }) => (
    `<option data-merchant='${merchantCode}' ${$?.initMerchantCode === merchantCode && 'selected'} value='${merchantCode}'>${name} - ${useCase}</option>`
));


// Obtener el dominio actual
const currentDomain = window.location.hostname;

// Obtener los primeros cuatro caracteres del dominio
const firstFourDigitDomain = currentDomain?.toString()?.replace('.', '')?.slice(0, 4)?.toString()?.toUpperCase();

// console.log(JSON.parse($));
const { currentTimeUnix } = getDateHour();

let amountStorageInit = $ && $.initAmount || '1.00';
let orderNumberStorageInit = $ && `ON${firstFourDigitDomain}${currentTimeUnix.toString().slice(0, 9)}` || '';
let currencyStorageInit = $ && $.currencyInput || '';
let merchantCodeStorageInit = $ && $.initMerchantCode || '';
let publicKeyStorageInit = $ && $.initPublicKey || '';
let requestSourceStorageInit = $ && $.requestSource || 'ECOMMERCE';

const generatedTransactionId = `${currentTimeUnix.toString().slice(0, 15)}`;

if ($ && $.initMerchantCode) next.disabled = false;

const allowedDomains = ['testcheckout.izipay.pe', 'localhost', '127.0.0.1'];
const origin = allowedDomains.includes(window.location.hostname.toString());

let initCommerceHTML = `
<span class='title-step'>1. Crear token</span>
<div class="">
    <div class='form-element'>
         <label for='commerce-select' class='label-form'>Comercio:</label>
         <select name='commerce-select' id='commerce-select' style='margin-bottom:5px;'>${comboCommerceOptions}</select>
    </div>
     
</div>
<div class='form-element'>
	<label for='init-orderNumber' class='label-form'>Id Transacción:</label>
	<input name='init-orderNumber' id='init-transaction-id'  value='${generatedTransactionId}' required/>
</div>
<div class='form-element'>
	<label for='init-amount' class='label-form'>Monto:</label>
	<input name='init-amount' id='init-amount' value='${amountStorageInit}' required/>
</div>
<div class='form-element'>
	<label for='init-orderNumber' class='label-form'>Número de orden:</label>
	<input name='init-orderNumber' id='init-orderNumber'  value='${orderNumberStorageInit}' required/>
</div>
<div class='form-element'>
	<label for='init-currency' class='label-form'>Moneda:</label>
	<input name='init-currency' id='init-currency'  value='${currencyStorageInit}' required/>
</div>
<div class='form-element'>
	<label for='init-merchantCode' class='label-form'>Código de comercio:</label>
	<input name='init-merchantCode' id='init-merchantCode' value='${merchantCodeStorageInit}' required/>
</div>	
<div class='form-element'>
	<label for='init-publicKey' class='label-form'>Llave pública:</label>
	<input name='init-publicKey' id='init-publicKey' value='${publicKeyStorageInit}' required/>
</div>	

<button class="btn-token" id='button-generateToken' style='display:none;'>CREAR TOKEN</button>

`;

initFormPayment.innerHTML = initCommerceHTML //+ html + buttonForm;

let btnGenerateToken = document.querySelector('#button-generateToken');
let btnPayFromDemo = document.querySelector('#pagar-desde-demo');
let commerce = document.querySelector('#commerce-select');
let initAmount = document.querySelector('#init-amount');
let initMerchantCode = document.querySelector('#init-merchantCode');
let initPublicKey = document.querySelector('#init-publicKey');
let orderNumber = document.querySelector('#init-orderNumber');
let initTransactionId = document.querySelector('#init-transaction-id');

_transactionId = initTransactionId.value;


let isCheckedEnvironmentProd = false

let urlApiSession = TEST_URL_GEN_TOKEN

commerce.addEventListener('change', async (event) => {

    event.preventDefault();

    formPayment.innerHTML = '';
    jsonPaymentResponse.textContent = '{}';
    jsonPaymentResponseEvents.textContent = '{}';
    jsonPaymentErrors.textContent = '{}';
    jsonPayment.textContent = '{}';

    const { currentTimeUnix } = getDateHour();

    btnGenerateToken.innerText = 'CREAR TOKEN';

    orderNumber.value = currentTimeUnix.toString().slice(0, 10);
    // document.querySelector('#dataCommerce').removeAttribute('style');

    selectedCommerce(commerceData, commerce);

    next.disabled = false

});

let loader = document.querySelector('#izi-loader');

const getFactoryRequest = () => {

    const formData = new FormData(formPayment);

    objPayment = factoryRequest(formData, selectPayMethods, isCheckedEnvironmentProd);

    jsonPaymentErrors.textContent = '';
    jsonPayment.textContent = JSON.stringify(objPayment, undefined, 2);

};

btnGenerateToken.addEventListener('click', async (event) => {

    event.preventDefault();

    loader.classList.remove('hide');
    loader.classList.add('show');

    let merchantCode = document.querySelector('#init-merchantCode');
    let publicKey = document.querySelector('#init-publicKey');
    let amount = document.querySelector('#init-amount');
    let orderNumber = document.querySelector('#init-orderNumber');
    let currencyInput = document.querySelector('#init-currency');

    if (!amount?.value || !orderNumber?.value || !merchantCode?.value || !publicKey?.value || !currencyInput?.value) {
        if (!localStorage.getItem('payloadCustom')) {
            if (!commerce?.value) {
                loader.classList.remove('show');
                loader.classList.add('hide');
                return false
            }
        } else {
            loader.classList.remove('show');
            loader.classList.add('hide');
            return false
        }
    }

    btnGenerateToken.innerText = 'Generando token...';

    const { requestSource, urlStage } = commerceData && commerceData.find(comm => comm.merchantCode === commerce.value);

    const { currentTimeUnix } = getDateHour();
    let lcStorage = localStorage.getItem('payloadCustom');
    const requestSourceValue = lcStorage && requestSourceStorageInit || commerceData && requestSource || 'ECOMMERCE';

    const payload = {
        requestSource: requestSourceValue,
        merchantCode: merchantCode.value,
        publicKey: publicKey.value,
        amount: parseFloat(amount.value).toFixed(2),
        orderNumber: orderNumber.value
    };

    try {
        const {
            code, message,
            response:
            {
                token, userOrg, userScoring
            }
            = {
                token: undefined, userOrg: undefined, userScoring: undefined
            }
        } = await getTokenSession(payload, initTransactionId.value, urlApiSession);

        if (token) {

            /*const timer = setInterval(() => {*/

            const iframePay = document.querySelector('#paymentIframe');
            /*const buttonLoadForm = document.querySelector('#btn-payment');*/
            const buttonStepsPrev = document.querySelector('#prev');
            const buttonStepsNext = document.querySelector('#next');

            /*iframePay && iframePay.addEventListener('load', () => {*/

            /* buttonLoadForm.disabled = false;
             buttonStepsPrev.disabled = false;*/
            if (currentActive === 2) buttonStepsNext.disabled = false;
            loader.classList.remove('show');
            loader.classList.add('hide');
            /*buttonLoadForm.innerText = 'CONTINUAR CON EL PAGO';*/
            /*clearInterval(timer);*/

            /*});*/

            /*}, 1);*/

            let customPayload = {
                initAmount: initAmount.value,
                orderNumber: orderNumber.value,
                initMerchantCode: initMerchantCode.value,
                initPublicKey: initPublicKey.value,
                requestSource: requestSourceValue,
                currencyInput: currencyInput.value,
                urlStage: urlStage
            }

            localStorage.setItem('payloadCustom', JSON.stringify(customPayload));

            let objCommerceFind = commerceData.findIndex((obj) => obj.merchantCode === merchantCode.value);

            let Obj = {
                name: objCommerceFind === -1 && `commerce-${merchantCode.value}` || commerceData[objCommerceFind].name,
                merchantCode: merchantCode.value,
                publicKey: publicKey.value,
                requestSource: 'ECOMMERCE',
                useCase: objCommerceFind === -1 && `custom` || commerceData[objCommerceFind].useCase,
                currency: currencyInput.value,
            }
            if (objCommerceFind === -1) {
                commerceData.push(Obj);
            } else {
                let url = commerceData[objCommerceFind].urlStage && commerceData[objCommerceFind].urlStage;
                commerceData[objCommerceFind] = { ...Obj, urlStage: url && url };
            }

            localStorage.setItem('commerceData', JSON.stringify(commerceData));

            // } else {
            // 	localStorage.removeItem('payloadCustom');
            // }
            jsonPaymentToken.textContent = token;

            _authorization = token;
            /*btnGenerateToken.delete;*/

            let alertManualConfig = ` <div class="alert">
                <div class="icon"><svg height="15px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22ZM12 17.75C12.4142 17.75 12.75 17.4142 12.75 17V11C12.75 10.5858 12.4142 10.25 12 10.25C11.5858 10.25 11.25 10.5858 11.25 11V17C11.25 17.4142 11.5858 17.75 12 17.75ZM12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7Z" fill="#1C274C"></path> </g></svg></div>
                <p>
                    Si ya tienes un JSON u Objeto <strong>config</strong>, pégalo aquí. ↓
                </p>
              </div>`

            formPayment.innerHTML += `
                <span class="title-step">2. Configurar datos de entrada</span>
                <div class="tabs">
                    <span class="tab-button" id="tab1Button">Configuración manual →</span>
                    <span class="tab-button" id="tab2Button">Pegar configuración →</span>
                </div>
                <div id="tab1" class="tab-content">
                    ${factoryFieldsConfig()}
                    ${buttonForm}
                </div>
                <div id="tab2" class="tab-content">
                    ${alertManualConfig}
                    <pre contenteditable="true" class="json-payment content-scroll" id="config-data-manual"></pre>
                </div>
            `;

            // Obtener referencias a los elementos de botones de pestañas
            const tab1Button = document.getElementById("tab1Button");
            const tab2Button = document.getElementById("tab2Button");

            // Agregar eventos onclick a los botones de pestañas
            tab1Button.addEventListener("click", function (event) {

                openTab(event, 'tab1');

                isConfigManual = false;
                const formData = new FormData(formPayment);
                objPayment = factoryRequest(formData, selectPayMethods, isCheckedEnvironmentProd);
                jsonPayment.textContent = JSON.stringify(objPayment, undefined, 2);

                formPayment.addEventListener('input', getFactoryRequest);

            });

            tab2Button.addEventListener("click", function (event) {

                formPayment.removeEventListener('input', getFactoryRequest);

                openTab(event, 'tab2');
                isConfigManual = true;

                jsonPayment.textContent = JSON.stringify({}, undefined, 2);

                document.querySelector('#config-data-manual').focus()

            });

            tab1Button.click();

            _publicKey = publicKey.value;
            _currency = currencyInput.value;
            _amount = parseFloat(amount.value).toFixed(2);
            //console.log(_amount, typeof _amount);
            _orderNumber = orderNumber.value || '123456';

            _merchantCode = merchantCode.value;

            _userOrg = userOrg;
            _userScoring = userScoring;
            _transactionId = initTransactionId.value

            document.querySelector('#transactionId').value = _transactionId;
            document.querySelector('#amount').value = _amount;
            document.querySelector('#orderNumber').value = _orderNumber;
            document.querySelector('#currency').value = _currency;
            document.querySelector('#merchantCode').value = _merchantCode;
            document.querySelector('#dateTimeTransaction').value = currentTimeUnix;
            document.querySelector('#merchantBuyerId').value = generateUniqueString();

            injectScript(URL_CHECKOUT_DEV, 'checkout-demo', false);

            let checkboxes = document.querySelectorAll("input[name=methods]");

            checkboxes.forEach(function (checkbox) {
                checkbox.addEventListener('change', () => {
                    selectPayMethods = getCheckPaymentMethods();
                    const formData = new FormData(formPayment);
                    objPayment = factoryRequest(formData, selectPayMethods, isCheckedEnvironmentProd);
                    jsonPayment.textContent = JSON.stringify(objPayment, undefined, 2);
                });
            });

            btnPayment = document.querySelector('#btn-payment');

            const formData = new FormData(formPayment);
            objPayment = factoryRequest(formData, selectPayMethods, isCheckedEnvironmentProd);
            jsonPayment.textContent = JSON.stringify(objPayment, undefined, 2);

        } else {

            loader.classList.remove('show');
            loader.classList.add('hide');

            jsonPaymentErrors.textContent = JSON.stringify({
                process: 'Token de Sesion',
                origin: urlApiSession,
                response: {
                    code, message,
                }
            }, null, 2);

            document.querySelector('#containerPaymentErrors').classList.add('gradient-error');

            scrollElement('#json-payment-errors');

            prev.click();
        }

    } catch (error) {
        console.log('error generate token', error);
    }

});

let btnPayment = document.querySelector('#btn-payment');

const CallbackResponse = (response) => {

    prev.click();

    scrollElement('#json-payment-response');

    if (response && response?.code === '00') {
        document.querySelector('#json-payment-response').style.background = '#00A09D';
        document.querySelector('#json-payment-response-container').style.background = '#00A09D';
    } else {
        document.querySelector('#json-payment-response-container').classList.add('gradient-error');
        //document.querySelector('#json-payment-response').style.background = '#eb2f2f';
        //document.querySelector('#json-payment-response-container').style.background = '#eb2f2f';

    }
    jsonPaymentResponse.textContent = JSON.stringify(response, undefined, 2);
};

formPayment.addEventListener('submit', async function (event) {

    event.preventDefault();

    loader.classList.remove('hide');
    loader.classList.add('show');

    /*const checkActiveCustomThemeBasic = document.querySelector('#activeCustomTheme')?.checked;*/

    if (isConfigManual) {

        try {

            const dataPaymentManual = document.querySelector('#config-data-manual')
                .textContent
                .trim()
                .replace(/'/g, '"')
                .replaceAll('};', '');

            let parse = convertTextToJson(dataPaymentManual);

            if (parse) {
                parse.config.transactionId = _transactionId;
                parse.config.order.orderNumber = _orderNumber;
                parse.config.merchantCode = _merchantCode;
                parse.config.order.amount = _amount;
                //parse.config.order.dateTimeTransaction = currentTimeUnix;

                objPayment = parse;
            } else {
                objPayment = parse;

                jsonPaymentErrors.textContent = '';
                jsonPayment.textContent = JSON.stringify(objPayment, undefined, 2);
            }

        } catch (e) {
            console.log('e-->', e);
        }

    } else {
        const formData = new FormData(event.target);
        //console.log('formData-->', Object.fromEntries(formData));

        objPayment = factoryRequest(formData, selectPayMethods, isCheckedEnvironmentProd);
    }

    jsonPaymentErrors.textContent = '';
    jsonPayment.textContent = JSON.stringify(objPayment, undefined, 2);

    try {

        const iziCheckout = new Izipay({ config: objPayment?.config });
        const props = Object.getPrototypeOf(iziCheckout);

        jsonPayment.textContent = JSON.stringify({ config: iziCheckout.config }, undefined, 2);

        if (iziCheckout) {
            iziCheckout.LoadForm({
                authorization: _authorization,
                keyRSA: 'RSA',
                callbackResponse: CallbackResponse
            });

            const { fecha, hora } = obtenerFechaHoraLima();

            const newTransaction = {
                environment: isCheckedEnvironmentProd ? 'PROD' : 'TEST',
                merchantCode: _merchantCode,
                transactionId: _transactionId,
                orderNumber: _orderNumber,
                date: fecha,
                time: hora,
                httpCode: '',
                request: iziCheckout.config,
                response: null,
                paymentMethod: '',
            };


            const handleUpdateTrx = (data) => editTransaction(_transactionId, _merchantCode, _orderNumber, data?.code, data);

            if (['embedded', 'pop-up'].includes(objPayment.config.render.typeForm)) {

                console.group('<----Lista Eventos---->');

                iziCheckout.onReady((event) => {
                    console.log('Evento: onReady-->', event);
                });

                iziCheckout.onClick((event) => {
                    console.log('Evento: onClick-->', event);
                });

                iziCheckout.onFormValid((event) => {
                    console.log('Evento: onFormValid-->', event);
                });

                iziCheckout.onSubmit((event) => {
                    console.log('Evento: onSubmit-->', event);
                });

                iziCheckout.onError((event) => {
                    console.log('Evento: onError-->', event);
                    handleUpdateTrx(event);
                });

                iziCheckout.onCancel((event) => {
                    console.log('Evento: onCancel-->', event);
                    handleUpdateTrx(event);
                });

                iziCheckout.onSessionTimeout((event) => {
                    console.log('Evento: onSessionTimeout-->', event);
                    handleUpdateTrx(event);
                });

                iziCheckout.onAuthorizationSuccess((event) => {
                    console.log('Evento: onAuthorizationSuccess-->', event);
                    handleUpdateTrx(event);
                });

                iziCheckout.onAuthorizationFailure((event) => {
                    console.log('Evento: onAuthorizationFailure-->', event);
                    handleUpdateTrx(event);
                });

                iziCheckout.on3DSecureVerification((event) => {
                    console.log('Evento: on3DSecureVerification-->', event);
                    handleUpdateTrx(event);
                });

                iziCheckout.onPaymentMethodSelected((event) => {
                    console.log('Evento: onPaymentMethodSelected-->', event);
                    handleUpdateTrx(event);
                });

                console.groupEnd();

            }


        }

        window.scrollTo({ top: 0, behavior: 'smooth' });

        if (objPayment.config.render.typeForm === 'embedded') {
            _isEmbedded = iziCheckout;
            const buttonPayFromDemo = document.querySelector('#pagar-desde-demo');
            const formDemoPayEmbedded = document.querySelector('#formulario-pago-demo');
            buttonPayFromDemo.disabled = false;
            formDemoPayEmbedded.classList.remove('hide');

            if (!JSON.parse(objPayment?.config.render.showButtonProcessForm)) buttonPayFromDemo.style.display = 'block';

            let btnPaymentToken = document.querySelector('#button-generateToken');
            btnPayment.disabled = true
            btnPayment.hidden = true
            btnPaymentToken.hidden = true
        }

        jsonPaymentResponseEvents.textContent = JSON.stringify(Object.getOwnPropertyNames((props)), undefined, 2);

        loader.classList.remove('show');
        loader.classList.add('hide');

    } catch (error) {

        document.querySelector('#containerPaymentErrors').classList.add('gradient-error');

        console.log(error);
        const errors = {
            message: error.message,
            error: error.Errors,
            date: error.date,
        };

        jsonPaymentErrors.textContent = JSON.stringify(errors, null, 2);

        loader.classList.remove('show');
        loader.classList.add('hide');

        jsonPaymentResponse.textContent = '{}';
        jsonPaymentResponseEvents.textContent = '{}';

        scrollElement('#json-payment-errors');

        prev.click();

    }

});

btnPayFromDemo.addEventListener('click', async (event) => {

    event.preventDefault();

    _isEmbedded.form.events.submit();

});

next.addEventListener('click', async () => {
    currentActive++;

    if (currentActive > circles.length) {
        currentActive = circles.length;
    }
    if (currentActive === 2) await btnGenerateToken.click();
    if (currentActive === 3) await btnPayment.click();

    initFormPayment.style.display = 'none';
    formPayment.style.display = 'block';

    updateSteps(circles, currentActive, progress, prev, next);
})

prev.addEventListener('click', () => {
    currentActive--;

    if (currentActive < 1) {
        currentActive = 1;
    }
    if (currentActive === 1) {
        initFormPayment.style.display = 'flex';
        formPayment.style.display = 'none';
        formPayment.innerHTML = '';
    }

    updateSteps(circles, currentActive, progress, prev, next);
})

let copyPreErrors = document.querySelector('#copyPre');

copyPreErrors.addEventListener('click', async (event) => {
    copyText('json-payment-errors');
});

let copyAuth = document.querySelector('#copyAuth');

copyAuth.addEventListener('click', async (event) => {
    copyText('json-payment-token');
});

let copyRequest = document.querySelector('#copyRequest');

copyRequest.addEventListener('click', async (event) => {
    copyText('json-payment');
});

let copyResponse = document.querySelector('#copyResponse');

copyResponse.addEventListener('click', async (event) => {
    copyText('json-payment-response');
});

let copyEvents = document.querySelector('#copyEvents');

copyEvents.addEventListener('click', async (event) => {
    copyText('json-payment-response-events');
});

function addChangeEventListener() {

    // Use setInterval to keep checking if the select element is available

    const interval = setInterval(() => {

        const selectElement = document.getElementById('typeForm');



        if (selectElement) {

            // Clear the interval once the select element is found

            clearInterval(interval);




            // Add the onchange event listener

            selectElement.onchange = function () {

                let divToToggle = document.getElementById('formulario-pago-demo');

                if (selectElement.value === 'embedded') {

                    divToToggle.classList.remove('hide');  // Remove the "hide" class to show the div

                    injectScript(URL_CHECKOUT_DEV, 'checkout-demo', false, '&mode=embedded&container=iframe-payment');

                } else {

                    divToToggle.classList.add('hide');    // Add the "hide" class to hide the div

                }

            };

        }

    }, 100); // Check every 100ms

}




// Call the function to start checking for the select element

addChangeEventListener();
