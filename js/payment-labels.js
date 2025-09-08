export const PaymentLabels =
    {
        publicKey: 'llave publica que fue entregada al comercio',
        config: {
            transactionId: 'Id único de la transacción',
            action: 'pay, registrar card, pay token',
            merchantCode: 'Codigo del comercio ó submerchant(codigo hijo del merchantFacilitator), generado por Izipay durante la afiliación.',
            facilitatorCode: 'Código de Facilitador',
            order: {
                orderNumber: 'Número de orden',
                showAmount: 'visualizar el monto en el boton',
                currency: 'moneda del cargo',
                amount: 'Monto total del cargo',
                installments: 'número de cuotas',
                deferred: 'número de diferidos',
                payMethod: {
                    showMethods: 'metodos de pago',
                },
                channel: 'mobile, web, canal de venta, texto libre, intranet, fuerza de venta, etc',
                processType: 'Tipo de Proceso (AT o PA)',
                merchantBuyerId: 'identificador unico del comprador en el sistema del comercio (numerico o correo)',
                dateTimeTransaction: 'Fecha y Hora de la transacción enviado por el comercio ó terminal'
            },
            card: {
                brand: `"Tipo de Marca de la tarjeta
            MC: MasterCard
            VS: Visa
            AE: Amex
            DN: Diners"`,
                pan: 'Número de tarjeta del tarjetahabiente ENCRIPTACIÓN RSA',
                expirationMonth: 'Mes de Expiración de la tarjeta',
                expirationYear: 'Año de Expiración de la tarjeta',
                cvc: 'Código de seguridad de la tarjeta indicado en al reverso',
                // cvcPresent: 'Indicador de envío del valor del CVC',
            },
            token: {
                cardToken: 'valor de la tokenización de una tarjeta',
                //buyerToken: 'valor de la tokenización de un cliente',
                // cryptogram: 'criptograma de valor token tarjeta generado por la marca',
                // expirationMonthToken: 'Mes de vencimiento del token tarjeta generada por la marca',
                // expirationYearToken: 'Año de vencimiento del token tarjeta generada por la marca',
            },
            billing:
                {
                    b_firstName: 'nombre del comprador',
                    b_lastName: 'apellido del comprador (concatenar apellido paterno y materno)',
                    b_address: 'dirección de facturación',
                    b_postalCode: 'código postal de la dirección de facturación (solo si country=U.S. o Canada)',
                    b_city: 'ciudad de facturación',
                    b_country: 'país del comprador',
                    b_state: 'región de facturación (solo si country=U.S. o Canada)',
                    b_phoneNumber: 'teléfono del comprador',
                    b_documentType: 'Tipo de documento',
                    b_document: 'Nro de documento',
                    b_email: 'email del comprador',
                },
            shipping:
                {
                    s_firstName: 'nombre del destinatario',
                    s_lastName: 'apellido del destinatario  (concatenar apellido paterno y materno)',
                    s_address: 'dirección de entrega',
                    s_postalCode: 'código postal de la dirección de entrega',
                    s_city: 'ciudad de entrega',
                    s_country: 'país de entrega',
                    s_state: 'región de entrega (solo si country=U.S. o Canada)',
                    s_phoneNumber: 'teléfono del destinatario',
                    s_email: 'email del destinatario',

                },

            // antiFraud: {
            //     clientIp: 'Dirección IP desde donde se originó la petición de la operación',
            //     userOrg: 'Usuario de Organización que retorna del api security (Token Session)',
            //     userScoring: 'Usuario scoring que retorna del api security (Token Session)'
            // },
            language: {
                init: 'idioma por defecto del formulario',
                showControlMultiLang: 'mostrar o no los idiomas disponibles | ESP, ENG',
            },

            render: {
                typeForm: 'modos de visualización del formulario de pagos => pop-up, embedded, redirect',
                container: 'div, section, etc. Lugar donde se renderizará el formulario - solo aplica para embedded',
                showButtonProcessForm: 'Mostrar el botón que procesará el formulario(por ahora solo está disponible para tarjeta)'
            },
            urlIPN: 'url o API de notificación (IPN)',
            urlRedirect: 'url de respuesta o redireccionamiento despues de recibir una respuesta',

            authorization: 'token de sesión generado por el comercio mediante api izipay',
            appearance: {
                styleInput: 'estilos de los inputs del formulario: normal, compacto',
                logo: 'url del logo del comercio',
                theme: 'nombre del tema con el que se mostrará el formulario',
                customize: {
                    visibility: {
                        hideOrderNumber: 'ocultar el nro de orden',
                        hideLogo: 'ocultar logo',
                        hideResultScreen: 'ocultar la página de resultado de la transacción',
                        hideGlobalErrors: 'Ocultar errores globales y mostrarlos debajo de cada input',
                        hideShakeValidation: 'Quitar vibración del formulario al validar datos',
                        hideMessageActivateOnlinePurchases: 'ocultar mensaje de activar compras por internet',
                        hideTestCards: 'Ocultar tarjetas de prueba(ambiente dev)',
                    },
                    elements: '(objeto) Personalización para form desacoplado'
                }
            },
            customFields: {}

        }
    };
