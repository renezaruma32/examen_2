
// Función para validar cédula ecuatoriana
function validarCedula(cedula) {
    if (cedula.length !== 10) {
        return false;
    }

    const digitoRegion = parseInt(cedula.substring(0, 2));
    if (digitoRegion < 1 || digitoRegion > 24) {
        return false;
    }

    const ultimoDigito = parseInt(cedula.charAt(9));
    const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    let suma = 0;

    for (let i = 0; i < 9; i++) {
        let digito = parseInt(cedula.charAt(i)) * coeficientes[i];
        suma += digito > 9 ? digito - 9 : digito;
    }

    const digitoVerificador = (10 - (suma % 10)) % 10;
    return digitoVerificador === ultimoDigito;
}

// Obtener el input de cédula y agregar evento de validación
document.getElementById('cedula').addEventListener('input', function() {
    const cedula = this.value;
    const mensaje = document.getElementById('mensaje-validacion');

    if (validarCedula(cedula)) {
        mensaje.textContent = 'Cédula correcta';
        mensaje.style.color = 'green';
    } else {
        mensaje.textContent = 'Cédula incorrecta';
        mensaje.style.color = 'red';
    }
});

document.querySelector('form').addEventListener('submit', function(event) {
    const cedula = document.getElementById('cedula').value;
    if (!validarCedula(cedula)) {
        event.preventDefault();
        alert('Por favor, ingrese una cédula válida.');
    }
});