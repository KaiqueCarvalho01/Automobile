const form = document.getElementById("proposta-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const cpfInput = document.getElementById("cpf");
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

    // Verifica se o campo CPF está vazio
    if (cpfInput.value.trim() === "") {
        alert("Por favor, preencha o seu CPF.");
        return;
    }

    // Valida o CPF
    if (!validateCPF(cpfInput.value)) {
        alert("CPF inválido! Por favor, insira um CPF válido.");
        return;
    }

    // Verifica se o campo Mensagem está vazio
    if (messageTextarea.value.trim() === "") {
        alert("Por favor, preencha a mensagem.");
        return;
    }

    // Se todos os campos estiverem preenchidos e válidos, exibe mensagem de sucesso
    alert("Proposta enviado com sucesso!");
    form.submit(); // Envia o formulário
    window.location.href = "/index.ejs";
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


// Função que valida o CPF
function validateCPF(cpf) {
    // Remove caracteres não numéricos
    cpf = cpf.replace(/[^\d]/g, "");

    // Verifica se o CPF tem 11 dígitos ou é uma sequência repetida (ex: 111.111.111-11)
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
        return false;
    }

    // Calcula o primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf[i]) * (10 - i);
    }
    let firstVerifier = (sum * 10) % 11;
    if (firstVerifier === 10 || firstVerifier === 11) {
        firstVerifier = 0;
    }
    if (firstVerifier !== parseInt(cpf[9])) {
        return false;
    }

    // Calcula o segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf[i]) * (11 - i);
    }
    let secondVerifier = (sum * 10) % 11;
    if (secondVerifier === 10 || secondVerifier === 11) {
        secondVerifier = 0;
    }
    if (secondVerifier !== parseInt(cpf[10])) {
        return false;
    }

    return true;
}

function validateTelefone(telefone) {
    // Remove caracteres não numéricos
    telefone = telefone.replace(/[^\d]/g, "");

    // Verifica se o telefone tem 10 ou 11 dígitos (considerando DDD)
    return telefone.length === 10 || telefone.length === 11;
}

