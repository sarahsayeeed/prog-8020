alert("test");
function Checkout() {
    // Reset error messages
    document.getElementById('errorMessages').innerHTML = '';

    // Validate mandatory fields
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    if (name === '' || email === '') {
        displayError('Name and email are mandatory fields.');
        return;
    }

    // Validate credit card format
    const creditCard = document.getElementById('creditCard').value.trim();
    if (!creditCard.match(/^\d{4}-\d{4}-\d{4}-\d{4}$/)) {
        displayError('Invalid credit card format. Use xxxx-xxxx-xxxx-xxxx.');
        return;
    }

    // Validate credit card expiry month format
    const creditCardExpiryMonth = document.getElementById('creditCardExpiryMonth').value.trim();
    if (!creditCardExpiryMonth.match(/^[A-Za-z]{3}$/)) {
        displayError('Invalid credit card expiry month format. Use MMM.');
        return;
    }

    // Validate credit card expiry year format
    const creditCardExpiryYear = document.getElementById('creditCardExpiryYear').value.trim();
    if (!creditCardExpiryYear.match(/^\d{4}$/)) {
        displayError('Invalid credit card expiry year format. Use yyyy.');
        return;
    }

    // Validate quantity inputs
    const quantityInputs = document.querySelectorAll('input[type="text"][id^="Numberof"]');
    let totalQuantity = 0;
    let receiptDetails = '';
    quantityInputs.forEach(input => {
        const itemName = input.name.replace('Numberof', '');
        const quantity = parseInt(input.value);
        if (isNaN(quantity) || quantity <= 0) {
            displayError('Quantity must be a positive number.');
            return;
        }
        const unitPrice = (itemName === 'WaterBottles') ? 5 : 20;
        const totalPrice = unitPrice * quantity;
        receiptDetails += ${quantity} ${itemName}: $${totalPrice.toFixed(2)}<br>;
        totalQuantity += quantity;
    });

    if (totalQuantity === 0) {
        displayError('Please buy at least one item.');
        return;
    }

    // Calculate total cost
    const totalCost = (5 * parseInt(document.getElementById('NumberofWaterBottles').value)) +
                      (20 * parseInt(document.getElementById('NumberofCaps').value)) +
                      (20 * parseInt(document.getElementById('NumberofPens').value)) +
                      (20 * parseInt(document.getElementById('NumberofCandyBags').value)) +
                      (20 * parseInt(document.getElementById('Cupcakes').value));

    // Calculate donation amount
    const donationAmount = Math.max(10, totalCost * 0.1);

    // Display receipt
    document.getElementById('receiptName').textContent = name;
    document.getElementById('receiptEmail').textContent = email;
    document.getElementById('receiptCreditCard').textContent = 'xxxx-xxxx-xxxx-' + creditCard.slice(-4);
    document.getElementById('receiptDetails').innerHTML = receiptDetails;
    document.getElementById('receiptTotal').textContent = totalCost.toFixed(2);
    document.getElementById('receiptDonation').textContent = donationAmount.toFixed(2);
    document.getElementById('receipt').style.display = 'block';
}

function displayError(message) {
    const errorDiv = document.getElementById('errorMessages');
    errorDiv.innerHTML += <p style="color: red;">${message}</p>;
}