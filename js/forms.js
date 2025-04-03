const form = document.getElementById("form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageTextarea = document.getElementById("message");
const telefoneInput = document.getElementById("telefone");

form.addEventListener("submit", (event) => {
    event.preventDefault(); 

    if (nameInput.value.trim() === "") {
        alert("Por favor, preencha o seu nome.");
        return;
    }

    if(emailInput.value === "" || !validateEmail(emailInput.value)) {
        alert("Por favor, preencha o seu email corretamente");
        return;
    }

    if(telefoneInput.value.trim() === ""){
        alert("Por favor, preencha o seu telefone.");
        return;
    }

    if (!validateTelefone(telefoneInput.value)) {
        alert("Telefone inválido! Por favor, insira um telefone válido.");
        return;
    }

    if (messageTextarea.value.trim() === "") {
        alert("Por favor, preencha a mensagem.");
        return;
    }

    
    alert("Formulário enviada com sucesso!");
    form.submit(); 
});

function validateEmail(email) {
    const emailRegex = new RegExp(
        /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    );
    if (emailRegex.test(email)) {
        return true;
    }
    return false;
}

function validateTelefone(telefone) {
    telefone = telefone.replace(/[^\d]/g, "");
    return telefone.length === 10 || telefone.length === 11;
}