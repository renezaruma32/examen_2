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