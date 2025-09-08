document.addEventListener('DOMContentLoaded', function () {
    // Obtener el historial del localStorage o inicializarlo a un array vacío
    const transactionHistory = JSON.parse(localStorage.getItem('transactionHistory')) || [];

    // Función para agregar una transacción al historial
    window.addTransactionToHistory = function (transaction) {
        transactionHistory.unshift(transaction); // Agregar al principio del array (más reciente primero)
        localStorage.setItem('transactionHistory', JSON.stringify(transactionHistory));
        renderTransactionTable();
    }

    function renderTransactionTable(transactions) {
        const tableBody = document.querySelector('#transactionTable tbody');
        if (tableBody) {
            tableBody.innerHTML = '';
            transactions && transactions.forEach(transaction => {
                const row = document.createElement('tr');
                row.innerHTML = `
                <td><b class='row-environment'><kbd>${transaction?.environment}</kbd></b></td>
            <td>${transaction.merchantCode}</td>
            <td>${transaction.transactionId}</td>
            <td>${transaction.orderNumber}</td>
            <td>${transaction.paymentMethod}</td>
            <td>${transaction.date}</td>
            <td>${transaction.time}</td>
            <td><span class="icon" onclick="openModal('${transaction.transactionId}', '${transaction.merchantCode}', '${transaction.orderNumber}', 'request')">&#128269;</span></td>
            <td><div class='row-response'><span class='${transaction.httpCode === '' ? 'trx-any' : transaction.httpCode === '00' ? 'trx-success' : 'trx-error'}'>${transaction.httpCode}</span><span class="icon" onclick="openModal('${transaction.transactionId}', '${transaction.merchantCode}', '${transaction.orderNumber}', 'response')">&#128269;</span></div></td>
          `;
                tableBody.appendChild(row);
            });
        }

    }

    // Función para buscar transacciones por transactionId
    window.searchTransactions = function () {
        const searchInput = document.getElementById('searchInput');
        const searchTerm = searchInput.value.toLowerCase();

        const filteredTransactions = transactionHistory.filter(transaction =>
            Object.values(transaction).some(value =>
                value?.toString().toLowerCase().includes(searchTerm)
            )
        );

        renderTransactionTable(filteredTransactions);
    };

    // Renderizar la tabla al cargar la página
    renderTransactionTable(transactionHistory);

    window.openModal = function (transactionId, merchantCode, orderNumber, type) {
        const modalTitle = document.getElementById('modalTitle');
        const titleMerchant = document.getElementById('title_merchant');
        const titleOrderNumber = document.getElementById('title_ordernumber');
        const modalContent = document.getElementById('modalContent');

        const transaction = transactionHistory.find(
            t => t.transactionId === transactionId && t.merchantCode === merchantCode && t.orderNumber === orderNumber
        );

        if (transaction) {
            modalTitle.textContent = `TransactionID: ${transaction.transactionId}`;
            titleMerchant.textContent = `MerchantCode: ${transaction.merchantCode}`;
            titleOrderNumber.textContent = `OrderNumber: ${transaction.orderNumber}`;
            modalContent.innerHTML = `<pre>${JSON.stringify(transaction[type], null, 2)}</pre>`;

            const modal = document.getElementById('myModal');
            modal.style.display = 'flex';
        }
    };

    // Función para cerrar el modal
    window.closeModal = function () {
        const modal = document.getElementById('myModal');
        modal.style.display = 'none';
    };

    window.editTransaction = function (transactionId, merchantCode, orderNumber, nuevoHttpCode = undefined, nuevaResponse = undefined) {
        // Obtener el historial del localStorage
        const transactionHistory = JSON.parse(localStorage.getItem('transactionHistory')) || [];

        // Buscar la transacción que coincida con los parámetros proporcionados
        const transaccionEditar = transactionHistory.find(
            t => t.transactionId === transactionId && t.merchantCode === merchantCode && t.orderNumber === orderNumber
        );

        // Si se encuentra la transacción, editarla
        if (transaccionEditar) {

            if (nuevoHttpCode) transaccionEditar.httpCode = nuevoHttpCode;
            if (!nuevaResponse?.paymentMethod) transaccionEditar.response = nuevaResponse;
            if (nuevaResponse?.paymentMethod) transaccionEditar.paymentMethod = nuevaResponse?.paymentMethod;

            // Actualizar el historial en el localStorage
            localStorage.setItem('transactionHistory', JSON.stringify(transactionHistory));

            
        } else {
            console.log('Transacción no encontrada en el historial');
        }
    }

});
