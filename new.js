function validateNumberInput(input) {
    const regex = /^[0-9]+$/;
    return regex.test(input);
}

// Ejemplo de uso
document.getElementById("phone").addEventListener("keypress", function(event) {
    if (!validateNumberInput(event.key)) {
        event.preventDefault();
    }
});