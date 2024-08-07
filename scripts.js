let mode = 'area'; // 'area' ou 'boxes'
let lossPercentage = 0.1;
let lossApplied = false;

function calculate() {
    const area = parseFloat(document.getElementById('area').value) || 0;
    const areaPerBox = parseFloat(document.getElementById('areaPerBox').value) || 0;
    const pricePerBox = parseFloat(document.getElementById('pricePerBox').value) || 0;
    const numBoxes = parseFloat(document.getElementById('numBoxes').value) || 0;

    if (mode === 'area' && (isNaN(area) || isNaN(areaPerBox) || isNaN(pricePerBox))) {
        alert('Por favor, insira valores válidos.');
        return;
    } else if (mode === 'boxes' && (isNaN(numBoxes) || isNaN(areaPerBox) || isNaN(pricePerBox))) {
        alert('Por favor, insira valores válidos.');
        return;
    }

    let totalBoxes, totalArea, totalPrice;

    if (mode === 'area') {
        totalBoxes = Math.ceil(area / areaPerBox);
        totalArea = totalBoxes * areaPerBox;
        totalPrice = totalArea * pricePerBox;
    } else {
        totalBoxes = numBoxes;
        totalArea = totalBoxes * areaPerBox;
        totalPrice = totalArea * pricePerBox;
    }

    if (lossApplied) {
        const adjustedArea = totalArea * (1 + lossPercentage);
        const adjustedBoxes = Math.ceil(adjustedArea / areaPerBox);
        totalArea = adjustedBoxes * areaPerBox;
        totalPrice = totalArea * pricePerBox;
    }

    const creditPrice = totalPrice * 1.11;

    document.getElementById('totalBoxes').innerText = `${totalBoxes} cx`;
    document.getElementById('totalArea').innerText = `${totalArea.toFixed(2)} m²`;
    document.getElementById('totalPrice').innerText = `R$ ${totalPrice.toFixed(2)}`;
    document.getElementById('creditPrice').innerText = `R$ ${creditPrice.toFixed(2)}`;
}

function toggleCalculationMode() {
    const areaInput = document.getElementById('areaInput');
    const boxOnlyInputs = document.getElementById('boxOnlyInputs');
    const toggleButton = document.getElementById('toggleButton');

    if (mode === 'area') {
        mode = 'boxes';
        areaInput.style.display = 'none';
        boxOnlyInputs.style.display = 'block';
        toggleButton.classList.add('active');
    } else {
        mode = 'area';
        areaInput.style.display = 'block';
        boxOnlyInputs.style.display = 'none';
        toggleButton.classList.remove('active');
    }

    // Zerar valores
    document.getElementById('area').value = '';
    document.getElementById('numBoxes').value = '';
    document.getElementById('totalBoxes').innerText = '';
    document.getElementById('totalArea').innerText = '';
    document.getElementById('totalPrice').innerText = '';
    document.getElementById('creditPrice').innerText = '';
}

function toggleLossPercentage() {
    lossApplied = !lossApplied;
    const lossButton = document.getElementById('lossButton');
    lossButton.classList.toggle('active');
    calculate();
}
document.addEventListener('DOMContentLoaded', (event) => {
    const deleteButton = document.getElementById('deleteButton');
    const tooltip = document.getElementById('tooltip');
    
    deleteButton.addEventListener('click', function() {
        deleteFields();
    });
});
function deleteFields() {
   
    document.getElementById('area').value = '';
    document.getElementById('numBoxes').value = '';
    document.getElementById('areaPerBox').value = '';
    document.getElementById('pricePerBox').value = '';
 
    document.getElementById('totalBoxes').innerText = '';
    document.getElementById('totalArea').innerText = '';
    document.getElementById('totalPrice').innerText = '';
    document.getElementById('creditPrice').innerText = '';

}
