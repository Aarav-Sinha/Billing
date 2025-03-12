// Sample inventory data
const inventory = [
    { name: "Product A", price: 100, stock: 20 },
    { name: "Product B", price: 200, stock: 15 },
    { name: "Product C", price: 300, stock: 10 },
];

// Display inventory
function loadInventory() {
    const inventoryList = document.getElementById('inventory-list');
    inventoryList.innerHTML = '';

    inventory.forEach((item, index) => {
        const row = `
            <tr>
                <td>${item.name}</td>
                <td>$${item.price}</td>
                <td>${item.stock}</td>
                <td>
                    <button onclick="addItemFromInventory(${index})">Add to Bill</button>
                </td>
            </tr>
        `;
        inventoryList.innerHTML += row;
    });
}

// Billing functionality
let invoice = [];

function addItem() {
    const name = document.getElementById('item-name').value;
    const price = parseFloat(document.getElementById('item-price').value);
    const qty = parseInt(document.getElementById('item-qty').value);

    if (!name || isNaN(price) || isNaN(qty) || qty <= 0) {
        alert("Please fill in valid item details.");
        return;
    }

    invoice.push({ name, price, qty });
    updateInvoice();
}

function addItemFromInventory(index) {
    const item = inventory[index];
    invoice.push({ name: item.name, price: item.price, qty: 1 });
    updateInvoice();
}

function updateInvoice() {
    const invoiceList = document.getElementById('invoice-list');
    const totalAmount = document.getElementById('total-amount');

    invoiceList.innerHTML = '';
    let total = 0;

    invoice.forEach((item, index) => {
        const itemTotal = item.price * item.qty;
        total += itemTotal;

        invoiceList.innerHTML += `<li>${item.name} - ${item.qty} x $${item.price} = $${itemTotal}</li>`;
    });

    totalAmount.textContent = total.toFixed(2);
}

// Print functionality
function printInvoice() {
    const invoiceDetails = invoice.map(item =>
        `${item.name} - ${item.qty} x $${item.price} = $${item.qty * item.price}`
    ).join("\n");

    const totalAmount = invoice.reduce((sum, item) => sum + item.price * item.qty, 0);

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
        <head>
            <title>Invoice</title>
        </head>
        <body>
            <h1>Invoice</h1>
            <pre>${invoiceDetails}</pre>
            <h3>Total: $${totalAmount.toFixed(2)}</h3>
        </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}

// Initialize inventory on page load
window.onload = loadInventory;
