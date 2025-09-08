const appearance = {
    customize: {
        visibility: {
            hideOrderNumber: false,
            hideSuccessPage: false,
            hideErrorPage: true,
            hideIconCloseCheckout: true,
            hideLogo: false,
            hideMessageActivateOnlinePurchases: false,
        },
        elements: [
            {
                paymentMethod: 'CARD',
                order: 3,
                fields: [
                    {
                        name: 'cardNumber',
                        width: '100%',
                        order: 1,
                        visible: true,
                        customText: '',
                        label: '',
                    },
                    {
                        name: 'expirationDate',
                        width: '50%',
                        order: 2,
                        visible: true,
                        customText: '',
                        label: '',
                    },
                    {
                        name: 'securityCode',
                        width: '50%',
                        order: 3,
                        visible: true,
                        customText: '',
                        label: '',
                    },
                    {
                        name: 'firstName',
                        width: '100%',
                        order: 4,
                        visible: true,
                        customText: '',
                        label: '',
                    },
                    {
                        name: 'lastName',
                        width: '100%',
                        order: 5,
                        visible: true,
                        customText: '',
                        label: '',
                    },
                    {
                        name: 'email',
                        width: '100%',
                        order: 6,
                        visible: true,
                        customText: 'Se enviará a tu correo el comprobante de pago.',
                        label: '',
                    },
                    {
                        name: 'typeDocument',
                        width: '50%',
                        order: 7,
                        visible: false,
                        customText: '',
                        label: '',
                    },
                    {
                        name: 'numberDocument',
                        width: '50%',
                        order: 8,
                        visible: false,
                        customText: '',
                        label: '',
                    }
                ],
                changeButtonText: {
                    actionPay: 'Donar',
                    actionRegister: 'Registrate',
                },
            },
            {
                paymentMethod: 'QR',
                order: 2,
            },
            {
                paymentMethod: 'YAPE_CODE',
                order: 1,
            }
        ],
    }
};

/* SORT PAYMENT METHODS 

appearance.customize.elements.sort((a, b) => a.order - b.order);

*/

/* SORT INPUTS FORM

function sortFieldsByOrder(fields) {
  return fields.sort((a, b) => a.order - b.order);
}

const sortedArray = appearance.customize.elements.map(obj => ({
  ...obj,
  fields: sortFieldsByOrder(obj.fields || []),
}));
*/

export const Bines = {
    bines: [444441, 5343434, 343434, 545454, 13123123],
    discount: 1.20,
    amountWithDiscount: 99.00,
    amountWithOutDiscount: 88.80
};