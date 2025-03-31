const form = document.querySelector('form')
const nameInput = document.querySelector('#name')
const emailInput = document.querySelector('#email')
const cpfInput = document.querySelector('#cpf')
const messageTextarea = document.querySelector('#message')


//console.log(form, nameInput, emailInput, messageTextarea, cpfInput)

form.addEventListener("submit", (event) => {
    event.preventDefault()

    //Verifica se o nome está vazio
    if(nameInput.value === "") {
        alert("Por favor, preencha o seu nome");
        return;
    }

    //Verifica se o email está preenchido e se é valido
    if(emailInput.value === "" || !validateEmail(emailInput.value)) {
        alert("Por favor, preencha o seu email corretamente");
        return;
    }
    if(cpfInput.value === "") {
        alert("Por favor, preencha o seu CPF");
        return;
    }
    if(messageTextarea.value === "") {
        alert("Por favor, preencha a mensagem");
        return;
    }

    
    //Se todos os campos estiverem corretamente preenchidos, envie o form
    form.submit();
});

//Função que valida o e-mail
function validateEmail(email) {
    const emailRegex = new RegExp(
        /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    );
    if (emailRegex.test(email)) {
        return true;
    }
    return false;
}

//Função que valida o CPF
function validateCPF(cpf) {
    // Remove caracteres não numéricos
    cpf = cpf.replace(/[^\d]/g, "");

    // Verifica se o CPF tem 11 dígitos ou é uma sequência repetida (ex: 111.111.111-11)
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
        return false;
    }
    
    const cpfRegex = new RegExp(
        /^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$/
    );
    if (cpfRegex.test(cpf)) {
        return true;
    }
    return false;
}