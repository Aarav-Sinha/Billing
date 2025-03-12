// Sample inventory data
const inventory = [
    { name: "Product A", price: 100, stock: 20 },
    { name: "Product B", price: 200, stock: 15 },
    { name: "Product C", price: 300, stock: 10 },
];

let invoice = [];
let invoiceNumber = 1001; // Starting invoice number

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

// Invoice Calculation with Tax and Discount
function updateInvoice() {
    const invoiceList = document.getElementById('invoice-list');
    const totalAmount = document.getElementById('total-amount');
    const taxRate = parseFloat(document.getElementById('tax-rate').value) || 0;
    const discount = parseFloat(document.getElementById('discount').value) || 0;

    invoiceList.innerHTML = '';
    let subtotal = 0;

    invoice.forEach((item, index) => {
        const itemTotal = item.price * item.qty;
        subtotal += itemTotal;

        invoiceList.innerHTML += `<li>${item.name} - ${item.qty} x $${item.price} = $${itemTotal}</li>`;
    });

    const taxAmount = (subtotal * taxRate) / 100;
    const total = subtotal + taxAmount - discount;

    totalAmount.textContent = total.toFixed(2);
}

// Invoice Printing with Logo, Date, and Details
function printInvoice() {
    const invoiceDetails = invoice.map(item =>
        `${item.name} - ${item.qty} x $${item.price} = $${item.qty * item.price}`
    ).join("\n");

    const totalAmount = invoice.reduce((sum, item) => sum + item.price * item.qty, 0);

    const currentDate = new Date().toLocaleDateString();

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
        <head>
            <title>Invoice #${invoiceNumber}</title>
        </head>
        <body>
            <div style="text-align: center;">
                <img src="logo.png" alt="Company Logo" style="max-width: 100px;">
                <h1>Your Company Name</h1>
                <p>Invoice No: #${invoiceNumber}</p>
                <p>Date: ${currentDate}</p>
            </div>
            <hr>
            <pre>${invoiceDetails}</pre>
            <hr>
            <h3>Total: $${totalAmount.toFixed(2)}</h3>
        </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();

    invoiceNumber++; // Increment invoice number for the next bill
}

// Initialize inventory on page load
window.onload = loadInventory;
