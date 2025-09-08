export const selectedCommerce = (commerceData, commerce) => {

    const searchCommerce = commerceData.find(comm => comm.merchantCode === commerce.value);
    //urlApiSession = searchCommerce?.urlStage && searchCommerce?.urlStage;

    document.querySelector('#init-merchantCode').value = searchCommerce.merchantCode;
    document.querySelector('#init-publicKey').value = searchCommerce.publicKey;
    document.querySelector('#init-currency').value = searchCommerce.currency;

};

export const convertTextToJson = (text) => {
    try {
        const cleanedText = text.replace(/,\s*([\]}])/g, '$1');
        const replacedText = cleanedText.replace(/([{,]\s*)('?)([a-zA-Z0-9_]+)('?)(\s*:)(?!})/g, '$1"$3"$5');
        return JSON.parse(replacedText);
    } catch (error) {
        console.error('Error converting text to JSON:', error);
        return null;
    }
};


export const getValueFromParamURL = (url, param) => {

    const urlParams = new URLSearchParams(url);
    return urlParams.get(param) ?? '';

};

export const getDateHour = () => {

    const currentDateAndHour = new Date().toJSON();
    const currentDate = currentDateAndHour.split('T')[0].replaceAll('-', '');
    const currentHour = currentDateAndHour.split('T')[1].replaceAll('.', '').replaceAll(':', '');
    const currentTimeUnix = Math.floor(Date.now()) * 1000;

    return {
        currentDateAndHour,
        currentDate,
        currentHour,
        currentTimeUnix
    };

};

export const obtenerFechaHoraLima = () => {
    const fechaActual = new Date();
    const formatoFecha = new Intl.DateTimeFormat('es-PE', {
      timeZone: 'America/Lima',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  
    const formatoHora = new Intl.DateTimeFormat('es-PE', {
      timeZone: 'America/Lima',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  
    const fechaFormateada = formatoFecha.format(fechaActual).replace(/\//g, '-');
    const horaFormateada = formatoHora.format(fechaActual);
  
    return { fecha: fechaFormateada, hora: horaFormateada };
  }

export const openTab = (evt, tabName) => {

    evt.preventDefault();

    let i, tabContent, tabButtons;

    tabContent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }

    tabButtons = document.getElementsByClassName("tab-button");
    for (i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove("active-tab");
    }

    if (tabName) {
        const x = document.getElementById(tabName);
        if (x) {
            x.style.display = "block";
        }
    }

    evt.currentTarget && evt.currentTarget.classList.add("active-tab");

    return true;
};

export const getBaseInput = (name, type, value = '', span = '', id = undefined, className = '', showSpan = true, ...rest) => {

    return `
            <div class="grupo ${className}">
	            <div class="item__decoration"></div>
	            <div style='margin-top: 0;margin-left: 12px; width:100%'>
                    <div class='form-element'>
                        <div style="display:flex; align-items: center" class='label-form'>
                            ${showSpan && `<label for="${name}" class='label-form-second'>${name}</label>` || ''}
                        </div>
                        ${['text', 'color', 'checkbox', 'radio'].includes(type) &&
    `<input type="${type}" id='${!id ? name : id}' autocomplete="off" name='${name}' value='${value}' ${rest} />` ||
    `<select id="${name}" autocomplete="off" name='${name}' id='${!id ? name : id}' ${rest}>${value}</select>`
    }
                    </div>
                    ${span.length > 0 &&
    `<p style="font-style: italic;font-size: 10px;font-weight: bolder;color: #747272;padding-bottom: 8px;margin-top: -10px;"> 
                            ${span}
                        </p>` || ''
    }
				</div>
            </div>
            `;
};

export const getCheckPaymentMethods = () => {

    const methods = Array.prototype.slice.call(document.querySelectorAll("[name='methods']"), 0).map(function (v, i, a) {
        return v.value;
    });

    const methodsCheck = Array.prototype.slice.call(document.querySelectorAll("[name='methods']:checked"), 0).map(function (v, i, a) {
        return v.value;
    });

    document.querySelector('#methods_all').checked = methods.length === methodsCheck.length;

    return (methods.length === methodsCheck.length || methodsCheck.length === 0) && 'all' || methodsCheck.join();

};


export const injectScript = (urlInject, idElement = 'iframePaymentInit', isModule = false, params ='') => {

    const head = document.querySelector('head');
    const script = document.createElement('script');
    const scriptExist = document.querySelector(`#${idElement}`);

    scriptExist && scriptExist.remove();

    script.type = isModule && 'module' || 'text/javascript';
    script.id = idElement
    script.setAttribute('src', `${urlInject}?v=${new Date().getTime()}${params}`);
    //script.defer = true;
    //script.async = false //IMPORTANT
    head.insertBefore(script, head.firstChild);

};

export const scrollElement = (elementSelector) => {
    let element = document.querySelector(elementSelector);
    element && element.scrollIntoView();
    element && element.focus();
};

export const updateSteps = (circles, currentActive, progress, prev, next) => {
    circles.forEach((circle, idx) => {
        if (idx < currentActive) {
            circle.classList.add('active');
        } else {
            circle.classList.remove('active');
        }

    });

    const actives = document.querySelectorAll('.active');

    progress.style.width = (((actives.length - 1) / (circles.length - 1)) * 100) + '%';

    if (currentActive === 1) {
        prev.disabled = true;
    } else if (currentActive === circles.length) {
        next.disabled = true;
    } else {
        prev.disabled = false;
        next.disabled = false;
    }

};

// Función para copiar el texto del elemento <pre>
export const copyText = (element) => {
    const preElement = document.getElementById(element);

    const text = preElement.textContent;

    const textArea = document.createElement('textarea');
    textArea.value = text;

    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
};

export const generateUniqueString = () => {
  // Incrementar el contador

  let counter = parseInt(localStorage.getItem('uniqueCounter')) || 0;

  counter++;

  // Obtener detalles de la fecha
  const now = new Date();
  const year = now.getFullYear() % 100;
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hour = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  // Generar parte aleatoria del string (5 caracteres)
  const randomPart = Math.random().toString(23).substr(2, 6).toUpperCase();

  // Construir el string único y correlativo
  const uniqueString = `MC${year}${month}${day}${hour}${minutes}${seconds}${randomPart}`;

  // Almacenar el contador actualizado en localStorage
  localStorage.setItem('uniqueCounter', counter.toString());

  return uniqueString;
}
