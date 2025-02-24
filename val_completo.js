// Validación de cédula ecuatoriana
function validarCedula(cedula) {
    if (!/^\d{10}$/.test(cedula)) return false;
  
    const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    const verificador = parseInt(cedula.charAt(9));
    let suma = 0;
  
    for (let i = 0; i < 9; i++) {
      let valor = parseInt(cedula.charAt(i)) * coeficientes[i];
      if (valor > 9) valor -= 9;
      suma += valor;
    }
  
    const digitoVerificador = (10 - (suma % 10)) % 10;
    return digitoVerificador === verificador;
  }
  
  // Validación de correo electrónico
  function validarCorreo(correo) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
  }
  
  // Validación de teléfono (formato ecuatoriano)
  function validarTelefono(telefono) {
    const regex = /^(?:\+593|0)(?:9\d{8}|[2-7]\d{7})$/;
    return regex.test(telefono);
  }
  
  // Calcular edad
  function calcularEdad(fechaNacimiento) {
    const hoy = new Date();
    const fechaNac = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mes = hoy.getMonth() - fechaNac.getMonth();
    
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
      edad--;
    }
    
    return edad;
  }
  
  // Validar fecha de nacimiento
  function validarFechaNacimiento(fecha) {
    const hoy = new Date();
    const fechaNac = new Date(fecha);
    const edad = calcularEdad(fecha);
    
    return fechaNac <= hoy && edad >= 18;
  }
  
  // Mostrar error en el campo
  function mostrarError(input, mensaje) {
    const formGroup = input.parentElement;
    const errorSpan = formGroup.querySelector('.error');
    formGroup.classList.add('error');
    formGroup.classList.remove('success');
    errorSpan.textContent = mensaje;
  }
  
  // Mostrar éxito en el campo
  function mostrarExito(input) {
    const formGroup = input.parentElement;
    const errorSpan = formGroup.querySelector('.error');
    formGroup.classList.remove('error');
    formGroup.classList.add('success');
    errorSpan.textContent = '';
  }
  
  // Validar campo requerido
  function validarCampoRequerido(input) {
    if (input.value.trim() === '') {
      mostrarError(input, 'Este campo es requerido');
      return false;
    }
    mostrarExito(input);
    return true;
  }
  
  // Obtener referencias a los elementos del formulario
  const form = document.getElementById('formulario');
  const nombre = document.getElementById('name');
  const cedula = document.getElementById('cedula');
  const correo = document.getElementById('email');
  const telefono = document.getElementById('phone');
  const fechaNacimiento = document.getElementById('fnac');
  const edadInfo = document.getElementById('mensaje-edad');
  const password = document.getElementById('contrasena');
  const confirmPassword = document.getElementById('confirmContrasena');
  
  // Validar entrada de solo números para cédula
  cedula.addEventListener('keypress', (e) => {
    if (!/\d/.test(e.key)) {
      e.preventDefault();
    }
  });
  
  // Validar entrada para teléfono (solo números y +)
  telefono.addEventListener('keypress', (e) => {
    if (!/[\d+]/.test(e.key)) {
      e.preventDefault();
    }
    // Prevenir más de un signo +
    if (e.key === '+' && telefono.value.includes('+')) {
      e.preventDefault();
    }
    // Asegurar que el + solo pueda ir al inicio
    if (e.key === '+' && telefono.value.length > 0) {
      e.preventDefault();
    }
  });
  
  // Limpiar caracteres no permitidos en pegado de texto
  telefono.addEventListener('paste', (e) => {
    e.preventDefault();
    const texto = (e.clipboardData || window.clipboardData).getData('text');
    const textoLimpio = texto.replace(/[^\d+]/g, '').substring(0, 13);
    const posicion = telefono.selectionStart;
    const valorActual = telefono.value;
    telefono.value = valorActual.slice(0, posicion) + textoLimpio + valorActual.slice(posicion);
  });
  
  cedula.addEventListener('paste', (e) => {
    e.preventDefault();
    const texto = (e.clipboardData || window.clipboardData).getData('text');
    const textoLimpio = texto.replace(/\D/g, '').substring(0, 10);
    const posicion = cedula.selectionStart;
    const valorActual = cedula.value;
    cedula.value = valorActual.slice(0, posicion) + textoLimpio + valorActual.slice(posicion);
  });
  
  // Actualizar edad cuando cambie la fecha de nacimiento
  fechaNacimiento.addEventListener('change', () => {
    if (fechaNacimiento.value) {
      const edad = calcularEdad(fechaNacimiento.value);
      edadInfo.textContent = `Edad: ${edad} años`;
    } else {
      edadInfo.textContent = '';
    }
  });
  
  // Manejar el envío del formulario
  form.addEventListener('submit', (e) => {
    e.preventDefault();
  
    // Validar todos los campos
    let isValid = true;
  
    // Validar nombre
    if (!validarCampoRequerido(nombre)) isValid = false;
  
    // Validar cédula
    if (!validarCampoRequerido(cedula)) {
      isValid = false;
    } else if (!validarCedula(cedula.value)) {
      mostrarError(cedula, 'Cédula ecuatoriana inválida');
      isValid = false;
    } else {
      mostrarExito(cedula);
    }
  
    // Validar correo
    if (!validarCampoRequerido(correo)) {
      isValid = false;
    } else if (!validarCorreo(correo.value)) {
      mostrarError(correo, 'Correo electrónico inválido');
      isValid = false;
    } else {
      mostrarExito(correo);
    }
  
    // Validar teléfono
    if (!validarCampoRequerido(telefono)) {
      isValid = false;
    } else if (!validarTelefono(telefono.value)) {
      mostrarError(telefono, 'Teléfono inválido (formato: +593XXXXXXXXX o 0XXXXXXXXX)');
      isValid = false;
    } else {
      mostrarExito(telefono);
    }
  
    // Validar fecha de nacimiento
    if (!validarCampoRequerido(fechaNacimiento)) {
      isValid = false;
    } else if (!validarFechaNacimiento(fechaNacimiento.value)) {
      mostrarError(fechaNacimiento, 'Debe ser mayor de 18 años');
      isValid = false;
    } else {
      mostrarExito(fechaNacimiento);
    }
  
    // Validar contraseña
    if (!validarCampoRequerido(password)) {
      isValid = false;
    } else if (password.value.length < 6) {
      mostrarError(password, 'La contraseña debe tener al menos 6 caracteres');
      isValid = false;
    } else {
      mostrarExito(password);
    }
  
    // Validar confirmación de contraseña
    if (!validarCampoRequerido(confirmPassword)) {
      isValid = false;
    } else if (password.value !== confirmPassword.value) {
      mostrarError(confirmPassword, 'Las contraseñas no coinciden');
      isValid = false;
    } else {
      mostrarExito(confirmPassword);
    }
  
    // Si todo es válido, procesar el formulario
    if (isValid) {
      alert('Formulario enviado correctamente');
      form.reset();
      edadInfo.textContent = '';
      // Remover todas las clases de éxito
      document.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('success');
      });
    }
    window.location.href = 'enviado.html';
  });