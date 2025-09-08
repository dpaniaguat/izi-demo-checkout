const URL_API = 'https://testcheckout.izipay.pe/apidemo/v1/Token/Generate';
//const URL_API = 'https://sandbox-checkout.izipay.pe/apidemo/v1/Token/Generate';

export const getTokenSession = async (payload, transactionId, urlEndpoint = URL_API) => {

    let response = undefined;

    try {
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('transactionId', transactionId);

        let raw = JSON.stringify(payload);

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        response = await fetch(urlEndpoint, requestOptions);

        if (response?.status !== 200) console.clear();

        return await response.json();

    } catch (e) {
        return {code: response?.status, message: response?.statusText};
    }
};
