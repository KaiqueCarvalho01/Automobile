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
    if(emailInput.value === "") {
        alert("Por favor, preencha o seu email");
        return;
    }

    
    //Se todos os campos estiverem corretamente preenchidos, envie o form
    form.submit();
});