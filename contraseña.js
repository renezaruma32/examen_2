document.getElementById('contrasena').addEventListener('input', validarContrasenas);
document.getElementById('contrasena2').addEventListener('input', validarContrasenas);
document.getElementById('fnac').addEventListener('input', calcularEdad);


function validarContrasenas() {
    const contrasena = document.getElementById('contrasena').value;
    const contrasena2 = document.getElementById('contrasena2').value;
    const mensaje = document.getElementById('mensaje-validacion_2'); 
    const submitBtn = document.getElementById('send');

    const tieneMayuscula = /[A-Z]/.test(contrasena);
    const tienePunto = /\./.test(contrasena);

    if (!tieneMayuscula || !tienePunto) {
        submitBtn.disabled = true;
        mensaje.textContent = 'La contraseña debe tener al menos una mayúscula y un punto.';
        
        return;
    }

    if (contrasena !== contrasena2) {
        submitBtn.disabled = true;
        mensaje.textContent = 'Las contraseñas no coinciden.';
        
        return;
    }

    mensaje.textContent = 'Las contraseñas son válidas y coinciden.';
    submitBtn.disabled = false;
}

// Función para actualizar la interfaz
