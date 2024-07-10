
const FORM_ID = "ContactForm"
const NAME_ID = "nombre"
const EMAIL_ID = "correo"
const MESSAGE_ID = "mensaje"

function getFormData() {
    //Obtiene los elementos del formulario por su ID
    const nameInput = document.getElementById(NAME_ID);
    const emailInput = document.getElementById(EMAIL_ID);
    const mensajeInput = document.getElementById(MESSAGE_ID);

    //Crea un objeto que contiene los valores y elimina los espacios en blanco
    const form = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        message: mensajeInput.value.trim(),
    };

    return form;
}

//Función para agregar o cambiar las clases CSS is-valid y is-invalid
function toggleValidClass(isValid, ID) {
    const inputElement = document.getElementById(ID);
    const validClass = "is-valid";
    const invalidClass = "is-invalid";

    inputElement.classList.remove(validClass, invalidClass);
    inputElement.classList.add(isValid ? validClass : invalidClass);
}

// Valida que el nombre de usuario sea mayor a 3 caracteres
function validateUsername(username) {
    if (username.length <= 3) {
        return false;
    }
    const regex = /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]+$/;
    return regex.test(username);
}


function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email)
}

function validateMessage(message) {
    //validar longitud del mensaje
    if (message.length < 20) {
        return false;
    } else if (message.length > 500) {
        return false;
    }
    return true;
}

function validateForm(form) {
    // valida cambios
    const nameValid = validateUsername(form.name);
    const emailValid = validateEmail(form.email);
    const messageValid = validateMessage(form.message);

    // asigna clases en inputs según su estado de validación
    toggleValidClass(nameValid, NAME_ID)
    toggleValidClass(emailValid, EMAIL_ID)
    toggleValidClass(messageValid, MESSAGE_ID)

    // retorna si todos los campos son válidos
    return nameValid && emailValid && messageValid
}

function handleToast(isTrue) {
    const toastElement = document.getElementById("SuccessToast");
    toastElement.style.display = isTrue ? "block" : "none";
}

function submitForm(event) {
    event.preventDefault();
    handleToast(false);

    const form = getFormData();
    const isValid = validateForm(form);

    handleToast(isValid);
}
