let mode = 'area'; // 'area' ou 'boxes'
let lossPercentage = 0.1;
let lossApplied = false;
const resultados = document.getElementById('resultados')
const trocarTextoBt = document.querySelector('.botao-texto')
const calcButton = document.getElementById('calcButton');

calcButton.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        calculate();
    }
        }
function calculate() {
    const area = parseFloat(document.getElementById('area').value);
    const areaPerBox = parseFloat(document.getElementById('areaPerBox').value);
    const pricePerBox = parseFloat(document.getElementById('pricePerBox').value);
    const numBoxes = parseFloat(document.getElementById('numBoxes').value);

    if (mode === 'area' && (isNaN(area) || isNaN(areaPerBox) || isNaN(pricePerBox))) {
        showAlert('Por favor, insira valores válidos.');
        return;
    } else if (mode === 'boxes' && (isNaN(numBoxes) || isNaN(areaPerBox) || isNaN(pricePerBox))) {
        showAlert('Por favor, insira valores válidos.');
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
        totalArea = totalArea * (1 + lossPercentage);
        totalBoxes = Math.ceil(totalArea / areaPerBox);
        totalArea = totalBoxes * areaPerBox;  
        totalPrice = totalArea * pricePerBox;  
    }

    const creditPrice = totalPrice * 1.11;
    let Real = Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
    resultados.style.display = 'flex'
    document.getElementById('totalBoxes').innerText = `${totalBoxes} cx`;
    document.getElementById('totalArea').innerText = `${totalArea.toFixed(2)} m²`;
    document.getElementById('totalPrice').innerText = `${Real.format(totalPrice.toFixed(2))}`;
    document.getElementById('creditPrice').innerText = `${Real.format(creditPrice.toFixed(2))}`;
}

function toggleCalculationMode() {
    const areaInput = document.getElementById('areaInput');
    const boxOnlyInputs = document.getElementById('boxOnlyInputs');
    const toggleButton = document.getElementById('toggleButton');

    if (mode === 'area') {
        mode = 'boxes';
        trocarTextoBt.innerText = 'Caixas'
        areaInput.style.display = 'none';
        boxOnlyInputs.style.display = 'block';
        toggleButton.classList.add('active');
    } else {
        mode = 'area';
        trocarTextoBt.innerHTML =  '<p class="botao-texto">Metro²</p>'
        areaInput.style.display = 'block';
        boxOnlyInputs.style.display = 'none';
        toggleButton.classList.remove('active');
    }

    // Zerar valores
    resultados.style.display = 'none'
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
    
    
    deleteButton.addEventListener('click', function() {
        
        deleteFields();
    });
});
function deleteFields() {
    resultados.style.display = 'none'
    document.getElementById('area').value = '';
    document.getElementById('numBoxes').value = '';
    document.getElementById('areaPerBox').value = '';
    document.getElementById('pricePerBox').value = '';
    
    document.getElementById('totalBoxes').innerText = '';
    document.getElementById('totalArea').innerText = '';
    document.getElementById('totalPrice').innerText = '';
    document.getElementById('creditPrice').innerText = '';

}
function showAlert(message) {
    const alertBox = document.getElementById('customAlert');
    const alertMessage = document.querySelector('.alert-message');
    const content = document.getElementById('content')

    alertMessage.textContent = message;
    alertBox.style.display = 'flex';
    content.classList.add('blur-background')
}

function closeAlert() {
    const alertBox = document.getElementById('customAlert');
    const content = document.getElementById("content")

    alertBox.style.display = 'none';
    content.classList.remove('blur-background');
}
