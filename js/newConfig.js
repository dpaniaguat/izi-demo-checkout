const iziConfig = {
    config: {
        transactionId: '1991151212312321',
        action: 'pay',
        merchantCode: '4001834',
        order: {
            orderNumber: '7676767',
            currency: 'PEN',
            amount: '0.20',
            processType: 'AT',
            merchantBuyerId: '234234432',
            dateTimeTransaction: '1670258741603000',
        },
        billing: {
            firstName: 'Juan',
            lastName: 'Wick Quispe',
            email: 'jwickq@izi.com',
            phoneNumber: '958745896',
            street: 'Av. Jorge Chávez 275',
            city: 'Lima',
            state: 'Lima',
            country: 'PE',
            postalCode: '15038',
            documentType: 'DNI',
            document: '21458796',
        },
        render: {
            typeForm: 'pop-up',
            container: 'div-faqs'
        },
        urlRedirect: 'https://izipay.pe',
        /*appearance: {
            customize: {
                visibility: {
                    hideOrderNumber: true,
                    hideSuccessPage: false,
                    hideErrorPage: false,
                    hideIconCloseCheckout: false,
                    hideLogo: true,
                    hideMessageActivateOnlinePurchases: true,
                },
                elements: [
                    {
                        paymentMethod: 'CARD',
                        order: 2,
                        fields: [
                            {
                                name: 'cardNumber',
                                order: 1,
                                //visible: true,
                                //customText: '',
                                //groupName: 'rowCredit',
                                //label: '',
                            },
                            {
                                name: 'expirationDate',
                                order: 3,
                                visible: false,
                                customText: '',
                                label: '',
                                groupName: 'rowExpiry',
                            },
                            {
                                name: 'securityCode',
                                order: 4,
                                visible: true,
                                customText: '',
                                groupName: 'rowExpiry',
                                label: '',
                            },
                            {
                                name: 'firstName',
                                order: 5,
                                visible: true,
                                customText: '',
                                groupName: 'rowBuyer',
                                label: '',
                            },
                            {
                                name: 'lastName',
                                order: 6,
                                visible: true,
                                customText: '',
                                groupName: 'rowBuyer',
                                label: '',
                            },
                            {
                                name: 'email',
                                order: 1,
                                visible: true,
                                customText: 'Se enviará a tu correo el comprobante de pago.',
                                groupName: '',
                                label: '',
                            },
                            {
                                name: 'typeDocument',
                                order: 8,
                                visible: false,
                                customText: '',
                                label: '',
                            },
                            {
                                name: 'documentNumber',
                                order: 9,
                                visible: false,
                                customText: '',
                                label: '',
                            },
                            {
                                name: 'installments',
                                order: 10,
                                visible: false,
                                customText: '',
                                groupName: 'rowInstallments',
                                label: '',
                            },
                            {
                                name: 'deferred',
                                order: 11,
                                visible: false,
                                customText: '',
                                groupName: 'rowInstallments',
                                label: '',

                            }
                        ],
                        changeButtonText: {
                            actionPay: 'Donar',
                            actionRegister: 'Registrate',
                        },
                    },
                    {
                        paymentMethod: 'MILLAS',
                        order: 1,
                    },
                    {
                        paymentMethod: 'QR',
                        order: 3,
                    },
                    {
                        paymentMethod: 'YAPE_CODE',
                        order: 2,
                    }
                ],
            }
        }*/
    },
};
