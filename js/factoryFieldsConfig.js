import {PaymentInit} from './payment.js';
import {getBaseInput} from './utils.js';
import {PaymentLabels} from './payment-labels.js';

export const factoryFieldsConfig = () => {

    let html = '';

    Object.keys(PaymentInit).forEach((node1) => {
        let list = '';
        html += `<h4>${node1.toString()}:</h4>`;
        if (PaymentInit[node1]) {
            html += `<div class="payment-parent">`;
            Object.keys(PaymentInit[node1]).forEach((nodo2) => {
                list = '';
                if (!Array.isArray(PaymentInit[node1][nodo2])) {
                    if (PaymentInit[node1][nodo2] && typeof PaymentInit[node1][nodo2] === 'object') {
                        html += `<div class="grupo">
								<div class="item__decoration"></div>
								<h5>${nodo2.toString()}:<span class='data-type'> objeto </span></h5>
					`;
                        html += `<div class="payment-childrenx" style='margin-left:10px'><details class="payment-children details"><summary>atributos +</summary>`;
                        if (typeof PaymentInit[node1][nodo2] === 'object') {
                            Object.keys(PaymentInit[node1][nodo2]).forEach((nodo3) => {
                                list = '';

                                if (!Array.isArray(PaymentInit[node1][nodo2][nodo3])) {
                                    if (typeof PaymentInit[node1][nodo2][nodo3] === 'object') {

                                        if (['customtheme'].includes(nodo3.toString().toLowerCase())) {
                                            html += `<br><h6>${nodo3.toString()}:</h6>`;
                                            html += `<div class="payment-children">`;

                                            html += '<br/><div style="width: 100%;display: flex;flex-direction: column;align-items: flex-start;justify-content: center;"><span style="width: 100%;font-size: .9rem;">Este checkbox solo funciona para esta demo.</span><input type="checkbox" style="height: 1rem;width: 1rem;margin-top: 1rem;" id="activeCustomTheme" value=false /> </div>';

                                            Object.keys(PaymentInit[node1][nodo2][nodo3]).forEach((nodo4) => {
                                                html += getBaseInput('background', 'color', '', '');
                                                html += getBaseInput('color', 'color', '', '');
                                            });

                                            html += `</div>`;

                                        } else if (PaymentInit[node1][nodo2][nodo3]?.elementsx) {
                                            console.log('entraaaa', PaymentInit[node1][nodo2][nodo3]);
                                            html += `<br><h6>${nodo3.toString()}:</h6>`;
                                            html += `<div class="payment-children">`;

                                            Object.keys(PaymentInit[node1][nodo2][nodo3]).forEach((nodo4) => {

                                                if (Array.isArray(PaymentInit[node1][nodo2][nodo3][nodo4])) {
                                                    let list2 = '';
                                                    PaymentInit[node1][nodo2][nodo3][nodo4].forEach((item) => {

                                                        list2 += `<option value=${item}>${item}</option>`;
                                                    });
                                                    html += getBaseInput(nodo4, 'select', list2, PaymentLabels[node1][nodo2][nodo3][nodo4]);
                                                } else {

                                                    html += `<br><h6>${nodo4.toString()}:</h6>`;
                                                    html += `<div class="payment-children">`;

                                                    Object.keys(PaymentInit[node1][nodo2][nodo3][nodo4]).forEach((nodo5) => {

                                                        html += getBaseInput(nodo5, 'text', '', '');
                                                    });
                                                    html += `</div>`;

                                                }

                                            });

                                            html += `</div>`;
                                        } else {
                                            Object.keys(PaymentInit[node1][nodo2][nodo3]).forEach((nodo4) => {
                                                //lista de metodos de pago
                                                if (Array.isArray(PaymentInit[node1][nodo2][nodo3][nodo4])) {

                                                    PaymentInit[node1][nodo2][nodo3][nodo4].forEach(({
                                                                                                         method,
                                                                                                         type
                                                                                                     }) => {

                                                        let isPayRadio = type === 'radio';

                                                        html += !isPayRadio && '<h6>methodos de pago</h6>' || '';

                                                        html += !isPayRadio && `<div class="payment-children">` || '';

                                                        method.forEach(item => {
                                                            html += getBaseInput(isPayRadio ? nodo3 : nodo4,
                                                                type,
                                                                item,
                                                                item,
                                                                `${nodo4}_${item}`,
                                                                'flexbox',
                                                                false,
                                                                `checked="true" `
                                                            );
                                                        });
                                                        html += !isPayRadio && `</div>` || '';
                                                    });


                                                    if(PaymentInit[node1][nodo2][nodo3]?.elements){

                                                        html += `<br><h6>${nodo4.toString()}:</h6>`;
                                                        html += `<div class="payment-children">`;

                                                        html +=`<span>${PaymentLabels[node1][nodo2][nodo3][nodo4]}</span><pre contenteditable="true" class="json-payment content-scroll" id='${nodo4}' style="padding: 5px !important; min-height: 350px; border: 1px solid #00A09D"></pre>`;

                                                        html += `</div>`;
                                                    }

                                                } else {

                                                    html += `<br><h6>${nodo3.toString()}:</h6>`;
                                                    html += `<div class="payment-children">`;

                                                    html += `<br><h6>${nodo4.toString()}:</h6>`;
                                                    html += `<div class="payment-children">`;

                                                    Object.keys(PaymentInit[node1][nodo2][nodo3][nodo4]).forEach((nodo5) => {
                                                        let list2 = '';
                                                        PaymentInit[node1][nodo2][nodo3][nodo4][nodo5].forEach((item) => {

                                                            list2 += `<option value=${item}>${item}</option>`;
                                                        });
                                                        html += getBaseInput(nodo5, 'select', list2, PaymentLabels[node1][nodo2][nodo3][nodo4][nodo5]);

                                                    });

                                                    html += `</div>`;
                                                    html += `</div>`;
                                                }
                                                //console.log('nodo4-->',nodo4);
                                            });

                                        }
                                    } else {
                                        html += getBaseInput(nodo3, 'text', PaymentInit[node1][nodo2][nodo3], PaymentLabels[node1][nodo2][nodo3]);
                                    }
                                } else {

                                    PaymentInit[node1][nodo2][nodo3].forEach((item) => {
                                        list += `<option value=${item}>${item}</option>`;
                                    });
                                    html += getBaseInput(nodo3, 'select', list, PaymentLabels[node1][nodo2][nodo3]);
                                }
                            });
                        } else {
                            html += getBaseInput(nodo2, 'text', PaymentInit[node1][nodo2], PaymentLabels[node1][nodo2]);
                        }
                        html += `</details></div></div>`;
                    } else {
                        html += getBaseInput(nodo2, 'text', PaymentInit[node1][nodo2], PaymentLabels[node1][nodo2]);
                    }

                } else {
                    PaymentInit[node1][nodo2].forEach((item) => {
                        list += `<option value=${item}>${item}</option>`;
                    });
                    html += getBaseInput(nodo2, 'select', list, PaymentLabels[node1][nodo2]);
                }

            });
            html += `</div>`;
        } else {
            html += getBaseInput(node1, 'text', PaymentInit[node1], PaymentLabels[node1]);
        }

    });

    return html;

};
