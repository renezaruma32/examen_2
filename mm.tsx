import React, { useState } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

function validarCedula(cedula: string): boolean {
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

function App() {
  const [cedula, setCedula] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validarCedula(cedula)) {
      alert('Por favor, ingrese una cédula ecuatoriana válida.');
      return;
    }
    // Here you would typically handle the form submission
    console.log('Form submitted with valid cédula:', cedula);
  };

  const handleCedulaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCedula(value);
    if (value.length === 10) {
      setIsValid(validarCedula(value));
    } else {
      setIsValid(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Validación de Cédula Ecuatoriana
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label 
              htmlFor="cedula" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Número de Cédula
            </label>
            <div className="relative">
              <input
                type="text"
                id="cedula"
                name="cedula"
                value={cedula}
                onChange={handleCedulaChange}
                maxLength={10}
                pattern="\d{10}"
                className={`
                  block w-full px-4 py-3 rounded-lg border
                  focus:ring-2 focus:outline-none
                  ${isValid === true ? 'border-green-500 focus:ring-green-200' :
                    isValid === false ? 'border-red-500 focus:ring-red-200' :
                    'border-gray-300 focus:ring-blue-200 focus:border-blue-500'}
                `}
                placeholder="Ingrese su número de cédula"
                required
              />
              {isValid !== null && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {isValid ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  )}
                </div>
              )}
            </div>
            {isValid !== null && (
              <p className={`mt-2 text-sm ${isValid ? 'text-green-600' : 'text-red-600'}`}>
                {isValid ? 'Cédula válida' : 'Cédula inválida'}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Enviar Formulario
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;