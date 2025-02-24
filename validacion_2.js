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

// Elementos del DOM
const input = document.getElementById('cedula');
const mensaje = document.getElementById('mensaje-validacion');
const icon = document.getElementById('icon');
const form = document.getElementById('formulario');

// Función para actualizar la interfaz
function actualizarUI(esValido) {
    if (input.value.length === 10) {
        input.className = esValido ? 'valid' : 'invalid';
        mensaje.className = `mensaje ${esValido ? 'valido' : 'invalido'}`;
        mensaje.textContent = esValido ? 'Cédula válida' : 'Cédula inválida';
        
        // Actualizar el ícono
        icon.innerHTML = esValido 
            ? '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#10b981"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>'
            : '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#ef4444"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>';
    } else {
        input.className = '';
        mensaje.className = 'mensaje';
        mensaje.textContent = '';
        icon.innerHTML = '';
    }
}

// Evento input para validación en tiempo real
input.addEventListener('input', function(e) {
    // Permitir solo números
    this.value = this.value.replace(/[^0-9]/g, '');
    
    if (this.value.length === 10) {
        const esValido = validarCedula(this.value);
        actualizarUI(esValido);
    } else {
        actualizarUI(null);
    }
});

// Evento submit del formulario
form.addEventListener('submit', function(e) {
    e.preventDefault();
    const cedula = input.value;
    
    if (!validarCedula(cedula)) {
        alert('Por favor, ingrese una cédula válida.');
        return;
    }
    
    // Aquí puedes agregar la lógica para enviar el formulario
    console.log('Formulario enviado con cédula válida:', cedula);
});