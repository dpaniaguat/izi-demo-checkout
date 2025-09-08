export const PaymentInit =
{
    //publicKey: undefined,
    config: {
        transactionId: undefined,
        action: ['pay', 'register', 'pay_register', 'pay_token', 'pay_token_external'],
        merchantCode: undefined,
        facilitatorCode: undefined,
        order: {
            orderNumber: '12312',
            showAmount: [true, false],
            currency: ['PEN', 'USD'],
            amount: 0,
            installments: undefined,
            deferred: undefined,
            payMethod: {
                methods: [
                    { method: ['all'], type: 'radio' },
                    { method: ['CARD', 'QR', 'PAGO_EFECTIVO', 'MILLAS', 'APPLE_PAY', 'YAPE_CODE', 'PAGO_PUSH','CLICK_TO_PAY'], type: 'checkbox' }
                ],
            },
            channel: '',
            processType: ['AT', 'PA'],
            merchantBuyerId: 'mc1768',
            dateTimeTransaction: undefined,
        },
        card: {
            brand: undefined,
            pan: undefined,
            expirationMonth: undefined,
            expirationYear: undefined,
            cvc: undefined,
            //cvcPresent: undefined,
        },
        token: {
            cardToken: undefined,
            //buyerToken: undefined,
            /*cryptogram: undefined,
            expirationMonthToken: undefined,
            expirationYearToken: undefined,
            */
        },
        billing:
        {
            b_firstName: 'Juan',
            b_lastName: 'Wick quispe',
            b_email: 'jwick@izi.com',
            b_street: 'calle el demo',
            b_city: 'lima',
            b_state: 'lima',
            b_country: 'PE',
            b_postalCode: '00001',
            b_phoneNumber: '989339999',
            b_documentType: ['DNI', 'CE', 'PASAPORTE', 'RUC', 'OTROS'],
            b_document: '10252022',
            b_companyName: '',
        },
        shipping:
        {
            s_firstName: undefined,
            s_lastName: undefined,
            s_email: undefined,
            s_phoneNumber: undefined,
            s_street: undefined,
            s_city: undefined,
            s_state: undefined,
            s_country: undefined,
            s_postalCode: undefined,
            s_documentType: undefined,
            s_document: undefined,

        },
        /*antiFraud: {
            clientIp: undefined,
            userOrg: undefined,
            userScoring: undefined
        },*/
        language: {
            init: ['ESP', 'ENG'],
            showControlMultiLang: [false, true],
        },
        render: {
            typeForm: ['pop-up', 'embedded', 'redirect'],
            container: '#iframe-payment',
            showButtonProcessForm: [true, false],
        },
        urlIPN: 'https://testapi-pw.izipay.pe/ipnclient/NotificationPublic/requests',
        urlRedirect: 'https://server.punto-web.com/comercio/creceivedemo.asp?p=h1',
        appearance: {
            styleInput: ['normal', 'compact'],
            logo: 'https://logowik.com/content/uploads/images/shopping-cart5929.jpg',
            theme: ['green', 'red', 'lightred', 'purple', 'black', 'blue', 'lightgreen'],
            customize: {
                visibility: {
                    hideOrderNumber: [false, true],
                    hideLogo: [false, true],
                    hideResultScreen: [false, true],
                    hideGlobalErrors: [false, true],
                    hideShakeValidation: [false, true],
                    hideMessageActivateOnlinePurchases: [false, true],
                    hideTestCards: [false, true],
                },
                elements: [],
            },
            customTheme: {
                colors: {},
            },
        },
        customFields: {
            field1: undefined,
            field2: undefined,
            field3: undefined,
            field4: undefined,
            field5: undefined,
            field6: undefined,
            field7: undefined,
            field8: undefined,
            field9: undefined,
            field10: undefined
        },
    }
};
