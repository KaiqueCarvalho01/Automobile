const form = document.getElementById("form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageTextarea = document.getElementById("message");
const telefoneInput = document.getElementById("telefone");

// Adiciona o evento de submit ao formulário
form.addEventListener("submit", (event) => {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Verifica se o campo Nome está vazio
    if (nameInput.value.trim() === "") {
        alert("Por favor, preencha o seu nome.");
        return;
    }

    //Verifica se o email está preenchido e se é valido
    if(emailInput.value === "" || !validateEmail(emailInput.value)) {
        alert("Por favor, preencha o seu email corretamente");
        return;
    }

    if(telefoneInput.value.trim() === ""){
        alert("Por favor, preencha o seu telefone.");
        return;
    }
    // Valida o telefone
    if (!validateTelefone(telefoneInput.value)) {
        alert("Telefone inválido! Por favor, insira um telefone válido.");
        return;
    }

    // Verifica se o campo Mensagem está vazio
    if (messageTextarea.value.trim() === "") {
        alert("Por favor, preencha a mensagem.");
        return;
    }

    // Se todos os campos estiverem preenchidos e válidos, exibe mensagem de sucesso
    alert("Formulário enviada com sucesso!");
    form.submit(); // Envia o formulário
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
    // Remove caracteres não numéricos
    telefone = telefone.replace(/[^\d]/g, "");

    // Verifica se o telefone tem 10 ou 11 dígitos (considerando DDD)
    return telefone.length === 10 || telefone.length === 11;
}