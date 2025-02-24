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
const submitBtn = document.getElementById('send');

// Función para actualizar la interfaz
function actualizarUI(esValido) {
    if (input.value.length === 10) {
        // Actualizar clases del input
        input.className = esValido ? 'valid' : 'invalid';
        
        // Actualizar mensaje
        mensaje.className = `mensaje ${esValido ? 'valido' : 'invalido'}`;
        mensaje.textContent = esValido ? 'Cédula válida' : 'Cédula inválida';
        
        // Actualizar icono
        icon.className = `icon ${esValido ? 'valid' : 'invalid'}`;
        
        // Actualizar estado del botón
        submitBtn.disabled = !esValido;
    } else {
        // Resetear todo si no hay 10 dígitos
        input.className = '';
        mensaje.className = 'mensaje';
        mensaje.textContent = '';
        icon.className = 'icon';
        submitBtn.disabled = true;
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
        // Redirigir a la página de éxito
        window.location.href = 'enviado.html';
});
