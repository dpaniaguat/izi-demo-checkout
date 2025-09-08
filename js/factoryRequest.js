import {convertTextToJson} from "./utils.js";

export const factoryRequest = (form, selectPayMethods, isProd = false) => {
	
    if (!form) return {};

    const {
        transactionId,
        action,
        merchantCode,
        facilitatorCode,
        orderNumber,
        showAmount,
        currency,
        amount,
        installments,
        deferred,
        payMethod,
        showMethods,
        channel,
        processType,
        merchantBuyerId,
        dateTimeTransaction,
        brand,
        pan,
        expirationMonth,
        expirationYear,
        cvc,
        // cvcPresent,
        cardToken,
        //buyerToken,
        // cryptogram,
        // expirationMonthToken,
        // expirationYearToken,
        b_firstName,
        b_lastName,
        b_email,
        b_phoneNumber,
        b_street,
        b_city,
        b_state,
        b_country,
        b_postalCode,
        b_documentType,
        b_document,
        b_companyName,
        s_firstName,
        s_lastName,
        s_email,
        s_phoneNumber,
        s_street,
        s_city,
        s_state,
        s_country,
        s_postalCode,
        s_documentType,
        s_document,

        clientIp,
        userOrg,
        userScoring,
        init,
        showControlMultiLang,
        typeForm,
        container,
        urlIPN,
        urlRedirect,
        styleInput,
        logo,
        theme,

        hideOrderNumber,
        hideResultScreen,
        hideLogo,
        hideMessageActivateOnlinePurchases,
        hideTestCards,
        hideShakeValidation,
        hideGlobalErrors,

        showButtonProcessForm,

        field1,
        field2,
        field3,
        field4,
        field5,
        field6,
        field7,
        field8,
        field9,
        field10

    } = Object.fromEntries(form);

    const customizeElements = document.querySelector('#elements')
        .textContent
        .trim()
        .replace(/'/g, '"')
        .replaceAll('};', '');

    let jsonCustomizeElements = customizeElements.length > 0 && convertTextToJson(customizeElements) || [];

    return {
        config: {
            transactionId,
            action,
            merchantCode,
            facilitatorCode,
            order: {
                orderNumber,
                showAmount: JSON.parse(showAmount),
                currency,
                amount,
                installments,
                deferred,
                payMethod: selectPayMethods,
                channel,
                processType,
                merchantBuyerId,
                dateTimeTransaction,
            },
            card: {
                brand,
                pan,
                expirationMonth,
                expirationYear,
                cvc,
            },
            token: {
                cardToken,
            },
            billing:
                {
                    firstName: b_firstName,
                    lastName: b_lastName,
                    email: b_email,
                    phoneNumber: b_phoneNumber,
                    street: b_street,
                    city: b_city,
                    state: b_state,
                    country: b_country,
                    postalCode: b_postalCode,
                    documentType: b_documentType,
                    document: b_document,
                    companyName: b_companyName,
                },
            shipping:
                {
                    firstName: s_firstName,
                    lastName: s_lastName,
                    email: s_email,
                    phoneNumber: s_phoneNumber,
                    street: s_street,
                    city: s_city,
                    state: s_state,
                    country: s_country,
                    postalCode: s_postalCode,
                    documentType: s_documentType,
                    document: s_document,
                },
            language: {
                init,
                showControlMultiLang: JSON.parse(showControlMultiLang),
            },
            render: {
                typeForm,
                container,
                showButtonProcessForm: JSON.parse(showButtonProcessForm),
                redirectUrls: {
                    onSuccess: urlRedirect,
                    onError: urlRedirect,
                    onCancel: urlRedirect
                },
            },
            urlIPN,
            urlRedirect,
            appearance: {
                styleInput,
                logo,
                theme,
                customize: {
                    visibility: {
                        hideOrderNumber: JSON.parse(hideOrderNumber),
                        hideResultScreen: JSON.parse(hideResultScreen),
                        hideLogo: JSON.parse(hideLogo),
                        hideMessageActivateOnlinePurchases: JSON.parse(hideMessageActivateOnlinePurchases),
                        hideTestCards: JSON.parse(hideTestCards),
                        hideShakeValidation: JSON.parse(hideShakeValidation),
                        hideGlobalErrors: JSON.parse(hideGlobalErrors),
                    },
                    elements: jsonCustomizeElements,
                },
                ...(!!document.querySelector('#activeCustomTheme')?.checked && {
                    customTheme: {
                        colors: {
                            primary: {
                                background: document.querySelector('#background')?.value,
                                color: document.querySelector('#color')?.value,
                            },
                        }
                    },
                })
            },
            originEntry: {},
            customFields: [
                {
                    name: 'field1',
                    value: field1,
                },
                {
                    name: 'field2',
                    value: field2,
                },
                {
                    name: 'field3',
                    value: field3,
                },
                {
                    name: 'field4',
                    value: field4,
                },
                {
                    name: 'field5',
                    value: field5,
                },
                {
                    name: 'field6',
                    value: field6,
                },
                {
                    name: 'field7',
                    value: field7,
                },
                {
                    name: 'field8',
                    value: field8,
                },
                {
                    name: 'field9',
                    value: field9,
                },
                {
                    name: 'field10',
                    value: field10,
                },
            ]
        }
    };

};

