// Rolagem suave para seções (funções chamadas no HTML)
function scrollToForm() {
    document.getElementById("requisitos").scrollIntoView({ behavior: "smooth" });
}

function scrollToDiscord() {
    document.getElementById("discord").scrollIntoView({ behavior: "smooth" });
}

document.addEventListener("DOMContentLoaded", () => {
    // Botão "Entrar no Servidor"
    const btnDiscord = document.getElementById("btnDiscord");
    if (btnDiscord) {
        btnDiscord.addEventListener("click", function () {
            // LINK REAL DO SEU SERVIDOR DISCORD
            const discordLink = "https://discord.gg/yd4DZaSKR8";
            window.open(discordLink, "_blank");
        });
    }

    // Menu mobile
    const navToggle = document.getElementById("navToggle");
    const navRight = document.getElementById("navRight");
    if (navToggle && navRight) {
        navToggle.addEventListener("click", () => {
            navRight.classList.toggle("nav-open");
        });

        // Fecha o menu ao clicar em um link
        navRight.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navRight.classList.remove("nav-open");
            });
        });
    }

    // Validação simples do formulário
    const form = document.getElementById("recruitForm");
    const errorBox = document.getElementById("formError");
    const successBox = document.getElementById("formSuccess");

    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        errorBox.classList.remove("error-visible");
        successBox.classList.remove("success-visible");
        errorBox.textContent = "";

        const idade = parseInt(document.getElementById("idade").value, 10);
        const aceitoRequisitos = document.getElementById("aceitoRequisitos").checked;
        const aceitoRegras = document.getElementById("aceitoRegras").checked;

        if (isNaN(idade) || idade < 15) {
            errorBox.textContent = "Você precisa ter pelo menos 15 anos para entrar na guilda.";
            errorBox.classList.add("error-visible");
            return;
        }

        if (!aceitoRequisitos || !aceitoRegras) {
            errorBox.textContent = "Você precisa aceitar todos os requisitos e regras para continuar.";
            errorBox.classList.add("error-visible");
            return;
        }

        // Validação básica de campos obrigatórios (inclui SEXO agora)
        const requiredFields = ["nickname", "sexo", "idFreeFire", "funcao", "rank", "disponibilidade", "sobre"];
        for (const id of requiredFields) {
            const field = document.getElementById(id);
            if (!field || !field.value.trim()) {
                errorBox.textContent = "Preencha todos os campos obrigatórios antes de enviar.";
                errorBox.classList.add("error-visible");
                return;
            }
        }

        // Simulação de envio
        successBox.classList.add("success-visible");
        form.reset();
    });
});
