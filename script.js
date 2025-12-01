// URL DO WEBHOOK DO DISCORD
// Já configurado para o canal de recrutamento T ☯ M A N
const DISCORD_WEBHOOK_URL =
    "https://discord.com/api/webhooks/1423342852976672809/UWdtBPcdbmKKcsd3wRJ3NbjNfZ_lqYjrXq-IfdKzDVbtZWvj-x9BgZjREKo3yLybNpsf";

// ----------------------
// Funções de rolagem suave
// ----------------------
function scrollToForm() {
    const section = document.getElementById("requisitos");
    if (section) section.scrollIntoView({ behavior: "smooth" });
}

function scrollToDiscord() {
    const section = document.getElementById("discord");
    if (section) section.scrollIntoView({ behavior: "smooth" });
}

// ----------------------
// Lógica principal
// ----------------------
document.addEventListener("DOMContentLoaded", () => {
    // Botão "Entrar no Servidor" (Discord da guilda)
    const btnDiscord = document.getElementById("btnDiscord");
    if (btnDiscord) {
        btnDiscord.addEventListener("click", function () {
            const discordInvite = "https://discord.gg/yd4DZaSKR8";
            window.open(discordInvite, "_blank");
        });
    }

    // Menu mobile (hambúrguer)
    const navToggle = document.getElementById("navToggle");
    const navRight = document.getElementById("navRight");
    if (navToggle && navRight) {
        navToggle.addEventListener("click", () => {
            navRight.classList.toggle("nav-open");
        });

        // Fecha o menu ao clicar em qualquer link
        navRight.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navRight.classList.remove("nav-open");
            });
        });
    }

    // Formulário de recrutamento
    const form = document.getElementById("recruitForm");
    const errorBox = document.getElementById("formError");
    const successBox = document.getElementById("formSuccess");

    if (!form) return;

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        // Limpar mensagens
        errorBox.classList.remove("error-visible");
        successBox.classList.remove("success-visible");
        errorBox.textContent = "";

        // ----------------------
        // Validações básicas
        // ----------------------
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

        // Campos obrigatórios
        const requiredFields = [
            "nickname",
            "sexo",
            "idFreeFire",
            "funcao",
            "rank",
            "disponibilidade",
            "sobre"
        ];

        for (const id of requiredFields) {
            const field = document.getElementById(id);
            if (!field || !field.value.trim()) {
                errorBox.textContent = "Preencha todos os campos obrigatórios antes de enviar.";
                errorBox.classList.add("error-visible");
                return;
            }
        }

        // ----------------------
        // Coletar dados do formulário
        // ----------------------
        const nickname = document.getElementById("nickname").value.trim();
        const sexo = document.getElementById("sexo").value.trim();
        const idFreeFire = document.getElementById("idFreeFire").value.trim();
        const funcao = document.getElementById("funcao").value.trim();
        const rank = document.getElementById("rank").value.trim();
        const disponibilidade = document.getElementById("disponibilidade").value.trim();
        const sobre = document.getElementById("sobre").value.trim();

        // ----------------------
        // Montar mensagem para o Discord
        // ----------------------
        const content = [
            "📥 **NOVA APLICAÇÃO DE RECRUTAMENTO - T ☯ M A N**",
            "",
            `**Nick:** ${nickname}`,
            `**Sexo:** ${sexo === "homem" ? "Homem" : "Mulher"}`,
            `**Idade:** ${idade} anos`,
            `**ID Free Fire:** ${idFreeFire}`,
            `**Função:** ${funcao}`,
            `**Rank:** ${rank}`,
            "",
            `**Disponibilidade:**`,
            disponibilidade,
            "",
            `**Sobre o jogador:**`,
            sobre,
            "",
            "✅ Aceitou requisitos e regras da guilda."
        ].join("\n");

        // ----------------------
        // Enviar para o webhook do Discord
        // ----------------------
        try {
            const res = await fetch(DISCORD_WEBHOOK_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    content: content,
                    username: "Recrutamento T ☯ M A N",
                    avatar_url: "" // opcional: URL pública de uma imagem para o avatar do webhook
                })
            });

            if (!res.ok) {
                throw new Error(`Erro ao enviar para o Discord: ${res.status}`);
            }

            // Sucesso
            successBox.classList.add("success-visible");
            form.reset();
        } catch (err) {
            console.error(err);
            errorBox.textContent =
                "Ocorreu um erro ao enviar sua aplicação. Tente novamente mais tarde.";
            errorBox.classList.add("error-visible");
        }
    });
});
