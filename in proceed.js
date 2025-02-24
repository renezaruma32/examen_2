//////// VALIDAR CEDULA
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
        // Redirigir a la página de éxito
        window.location.href = 'enviado.html';
});
//////////////////////VALIDAR EDAD///////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', function() {
    const inputFecha = document.getElementById('fnac');
    const mensajeEdad = document.getElementById('mensaje-edad');
    let ultimoValor = '';

    function formatearFecha(valor) {
        // Eliminar cualquier caracter que no sea número
        valor = valor.replace(/\D/g, '');
        
        // Agregar las barras automáticamente
        if (valor.length > 4) {
            valor = valor.slice(0, 2) + '/' + valor.slice(2, 4) + '/' + valor.slice(4);
        } else if (valor.length > 2) {
            valor = valor.slice(0, 2) + '/' + valor.slice(2);
        }
        
        return valor;
    }

    function validarFecha(fecha) {
        // Verificar el formato dd/mm/aaaa
        const partes = fecha.split('/');
        if (partes.length !== 3) return false;
        
        const dia = parseInt(partes[0]);
        const mes = parseInt(partes[1]) - 1; // Los meses en JS van de 0 a 11
        const anio = parseInt(partes[2]);
        
        const fechaObj = new Date(anio, mes, dia);
        
        return fechaObj.getDate() === dia &&
               fechaObj.getMonth() === mes &&
               fechaObj.getFullYear() === anio;
    }

    function calcularEdad(fecha) {
        if (!validarFecha(fecha)) {
            mensajeEdad.textContent = 'Fecha inválida';
            mensajeEdad.className = '';
            return;
        }

        const partes = fecha.split('/');
        const fechaNacimiento = new Date(
            parseInt(partes[2]), // año
            parseInt(partes[1]) - 1, // mes (0-11)
            parseInt(partes[0]) // día
        );
        
        const hoy = new Date();
        let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
        const mes = hoy.getMonth() - fechaNacimiento.getMonth();

        if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
            edad--;
        }

        if (edad >= 18) {
            mensajeEdad.textContent = 'Usuario mayor de edad (' + edad + ' años)';
            mensajeEdad.className = 'mayor-edad';
        } else {
            mensajeEdad.textContent = 'Usuario menor de edad (' + edad + ' años)';
            mensajeEdad.className = 'menor-edad';
        }
    }

    inputFecha.addEventListener('input', function(e) {
        let valor = e.target.value;
        
        // Formatear la fecha mientras se escribe
        valor = formatearFecha(valor);
        
        // Actualizar el valor del input
        if (valor !== e.target.value) {
            e.target.value = valor;
        }
        
        // Solo calcular la edad cuando la fecha está completa
        if (valor.length === 10 && valor !== ultimoValor) {
            ultimoValor = valor;
            calcularEdad(valor);
        } else if (valor.length < 10) {
            mensajeEdad.textContent = '';
            mensajeEdad.className = '';
        }
    });
});
//////////// VALIDAR CONTRASEÑA //////////////////////////////////////////////

//////////////// VALIDAR TELEFONO //////////////////////////////////////////
function validateNumberInput(input) {
    const regex = /^[0-9]+$/;
    return regex.test(input);
}

// Uso
document.getElementById("phone").addEventListener("keypress", function(event) {
    if (!validateNumberInput(event.key)) {
        event.preventDefault();
    }
});


