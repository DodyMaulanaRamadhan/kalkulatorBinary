function updatePlaceholder() {
    const fromBase = parseInt(document.getElementById('fromBase').value);
    const inputNumber = document.getElementById('inputNumber');

    switch (fromBase) {
        case 2:
            inputNumber.placeholder = "Contoh: 1110001111";
            break;
        case 8:
            inputNumber.placeholder = "Contoh: 1617";
            break;
        case 16:
            inputNumber.placeholder = "Contoh: 1A3F";
            break;
        default:
            inputNumber.placeholder = "Contoh: 911";
            break;
    }
}

function validateInput(input, base) {
    const regex = {
        2: /^[0-1]+$/, // Biner hanya boleh 0 dan 1
        8: /^[0-7]+$/, // Oktal hanya boleh 0-7
        10: /^[0-9]+$/, // Desimal hanya boleh 0-9
        16: /^[0-9A-Fa-f]+$/ // Heksadesimal boleh 0-9 dan A-F
    };

    if (!regex[base].test(input)) {
        return false;
    }

    return true;
}

function getInvalidCharacters(input, base) {
    const validChars = {
        2: ['0', '1'],
        8: ['0', '1', '2', '3', '4', '5', '6', '7'],
        10: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
        16: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']
    };

    const invalidChars = input.split('').filter(char => !validChars[base].includes(char));
    return invalidChars;
}

function convert() {
    const inputNumber = document.getElementById('inputNumber').value.trim();
    const fromBase = parseInt(document.getElementById('fromBase').value);
    const toBase = parseInt(document.getElementById('toBase').value);
    const warningElement = document.getElementById('warning');
    const resultElement = document.getElementById('result');
    const explanationElement = document.getElementById('explanation');

    warningElement.innerHTML = ''; // Reset peringatan
    resultElement.innerHTML = ''; // Reset hasil
    explanationElement.innerHTML = ''; // Reset penjelasan

    // Validasi input
    if (!validateInput(inputNumber, fromBase)) {
        const invalidChars = getInvalidCharacters(inputNumber, fromBase);
        const invalidCharsMessage = invalidChars.length > 0 ? , angkanya tidak boleh ${invalidChars.join(', ')}. : '.';
        warningElement.innerHTML = Input tidak valid untuk basis ${fromBase}. Silakan masukkan angka yang sesuai${invalidCharsMessage} Hapus atau perbaikilah angka yang anda masukkan, berikanlah nilai yang benar.;
        return;
    }

    let decimalValue;
    let result;
    let explanation = '';

    // Konversi dari basis asal ke desimal
    if (fromBase === 2) {
        decimalValue = parseInt(inputNumber, 2);
        explanation = `Mengonversi dari Biner ke Desimal: <br>
        1. Setiap digit biner memiliki bobot berdasarkan pangkat 2.<br>
        2. Contoh: ${inputNumber}₂ = ${inputNumber.split('').reverse().map((digit, index) => ${digit} × 2^${index}).join(' + ')}<br>
        3. Hitung: ${inputNumber.split('').reverse().map((digit, index) => ${digit} × 2^${index} = ${digit * Math.pow(2, index)}).join(' + ')} = ${decimalValue}₁₀`;
    } else if (fromBase === 8) {
        decimalValue = parseInt(inputNumber, 8);
        explanation = `Mengonversi dari Oktal ke Desimal: <br>
        1. Setiap digit oktal memiliki bobot berdasarkan pangkat 8.<br>
        2. Contoh: ${inputNumber}₈ = ${inputNumber.split('').reverse().map((digit, index) => ${digit} × 8^${index}).join(' + ')}<br>
        3. Hitung: ${inputNumber.split('').reverse().map((digit, index) => ${digit} × 8^${index} = ${digit * Math.pow(8, index)}).join(' + ')} = ${decimalValue}₁₀`;
    } else if (fromBase === 16) {
        decimalValue = parseInt(inputNumber, 16);
        explanation = `Mengonversi dari Heksadesimal ke Desimal: <br>
        1. Setiap digit heksadesimal memiliki bobot berdasarkan pangkat 16.<br>
        2. Contoh: ${inputNumber}₁₆ = ${inputNumber.split('').reverse().map((digit, index) => ${digit} × 16^${index}).join(' + ')}<br>
        3. Hitung: ${inputNumber.split('').reverse().map((digit, index) => ${digit} × 16^${index} = ${digit * Math.pow(16, index)}).join(' + ')} = ${decimalValue}₁₀`;
    } else {
        decimalValue = parseInt(inputNumber);
    }

    // Konversi dari desimal ke basis tujuan
    if (toBase === 2) {
        result = decimalValue.toString(2);
        explanation += `<hr><br>Mengonversi dari Desimal ke Biner: <br>
        1. Bagi angka desimal dengan 2 dan catat sisa.<br>
        2. Ulangi hingga hasil bagi menjadi 0.<br>
        3. Tabel langkah-langkah:<br>
        <table border="1">
            <tr>
                <th>Langkah</th>
                <th>Operasi Bagi</th>
                <th>Hasil Bagi</th>
                <th>Sisa</th>
            </tr>`;
        
        let tempValue = decimalValue;
        let step = 1;
        while (tempValue > 0) {
            const remainder = tempValue % 2;
            explanation += `<tr>
                <td>${step}</td>
                <td>${tempValue} ÷ 2</td>
                <td>${Math.floor(tempValue / 2)}</td>
                <td>${remainder}</td>
            </tr>`;
            tempValue = Math.floor(tempValue / 2);
            step++;
        }
        
        explanation += `</table>
        4. Baca sisa dari bawah ke atas untuk mendapatkan hasil akhir: ${result}₂`;
    } else if (toBase === 8) {
        result = decimalValue.toString(8);
        explanation += `<hr><br>Mengonversi dari Desimal ke Oktal: <br>
        1. Bagi angka desimal dengan 8 dan catat sisa.<br>
        2. Ulangi hingga hasil bagi menjadi 0.<br>
        3. Tabel langkah-langkah:<br>
        <table border="1">
            <tr>
                <th>Langkah</th>
                <th>Operasi Bagi</th>
                <th>Hasil Bagi</th>
                <th>Sisa</th>
            </tr>`;
        
        let tempValue = decimalValue;
        let step = 1;
        while (tempValue > 0) {
            const remainder = tempValue % 8;
            explanation += `<tr>
                <td>${step}</td>
                <td>${tempValue} ÷ 8</td>
                <td>${Math.floor(tempValue / 8)}</td>
                <td>${remainder}</td>
            </tr>`;
            tempValue = Math.floor(tempValue / 8);
            step++;
        }
        
        explanation += `</table>
        4. Baca sisa dari bawah ke atas untuk mendapatkan hasil akhir: ${result}₈`;
    } else if (toBase === 16) {
        result = decimalValue.toString(16).toUpperCase();
        explanation += `<hr><br>Mengonversi dari Desimal ke Heksadesimal: <br>
        1. Bagi angka desimal dengan 16 dan catat sisa.<br>
        2. Ulangi hingga hasil bagi menjadi 0.<br>
        3. Tabel langkah-langkah:<br>
        <table border="1">
            <tr>
                <th>Langkah</th>
                <th>Operasi Bagi</th>
                <th>Hasil Bagi</th>
                <th>Sisa</th>
            </tr>`;
        
        let tempValue = decimalValue;
        let step = 1;
        while (tempValue > 0) {
            const remainder = tempValue % 16;
            explanation += `<tr>
                <td>${step}</td>
                <td>${tempValue} ÷ 16</td>
                <td>${Math.floor(tempValue / 16)}</td>
                <td>${remainder < 10 ? remainder : String.fromCharCode(55 + remainder)}</td>
            </tr>`;
            tempValue = Math.floor(tempValue / 16);
            step++;
        }
        
        explanation += `</table>
        4. Baca sisa dari bawah ke atas untuk mendapatkan hasil akhir: ${result}₁₆`;
    } else {
        result = decimalValue; // Jika dari dan ke basis yang sama
    }

    displayResult(result, explanation);
}

function displayResult(result, explanation) {
    const resultElement = document.getElementById('result');
    const explanationElement = document.getElementById('explanation');
    resultElement.innerHTML = Hasil: ${result};
    explanationElement.innerHTML = explanation;
}
