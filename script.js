// URL DO WEBHOOK DO DISCORD
// Já configurado para o canal de recrutamento T ☯ M A N
const DISCORD_WEBHOOK_URL =
    "https://discord.com/api/webhooks/1423342852976672809/UWdtBPcdbmKKcsd3wRJ3NbjNfZ_lqYjrXq-IfdKzDVbtZWvj-x9BgZjREKo3yLybNpsf";

// URL do servidor Discord da guilda
const DISCORD_INVITE_URL = "https://discord.gg/yd4DZaSKR8";

// Chave para armazenamento local
const STORAGE_KEY = "toman_form_submitted";

// ----------------------
// Funções de controle de envio único
// ----------------------

// Verifica se o formulário já foi enviado
function verificarSeJaEnviou() {
    const enviado = localStorage.getItem(STORAGE_KEY);
    return enviado === "true";
}

// Marca o formulário como enviado no localStorage
function marcarComoEnviado() {
    localStorage.setItem(STORAGE_KEY, "true");
}

// Bloqueia o formulário (torna campos somente leitura)
function bloquearFormulario() {
    const form = document.getElementById("recruitForm");
    if (!form) return;
    
    // Desabilita todos os campos de entrada
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.disabled = true;
    });
    
    // Desabilita o botão de submit
    const submitBtn = document.getElementById("submitBtn");
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "✓ Formulário já enviado";
        submitBtn.style.background = "linear-gradient(135deg, #666, #888)";
    }
    
    // Mostra mensagem de já enviado
    const warningMsg = document.getElementById("alreadySubmittedWarning");
    if (warningMsg) {
        warningMsg.classList.add("visible");
    }
}

// Restaura o estado do formulário quando a página carrega
function restaurarEstadoFormulario() {
    const jaEnviou = verificarSeJaEnviou();
    
    if (jaEnviou) {
        // Se já enviou, bloqueia o formulário
        bloquearFormulario();
        
        // E habilita os botões do Discord
        habilitarBotoesDiscord();
        
        // Mostra mensagem de sucesso permanente
        const successBox = document.getElementById("formSuccess");
        if (successBox) {
            successBox.classList.add("success-visible");
            successBox.innerHTML = `
                ✅ <strong>Aplicação já enviada!</strong><br>
                Sua aplicação foi recebida. Entre no servidor Discord e aguarde o contato da liderança.
            `;
        }
    }
}

// ----------------------
// Funções de controle dos botões Discord
// ----------------------

// Função para desabilitar botões do Discord
function desabilitarBotoesDiscord() {
    const btnDiscordGuilda = document.getElementById("btnDiscord");
    const btnDiscordHero = document.getElementById("btnDiscordHero");
    
    if (btnDiscordGuilda) {
        btnDiscordGuilda.disabled = true;
        btnDiscordGuilda.innerHTML = "⏳ Envie sua aplicação primeiro";
    }
    
    if (btnDiscordHero) {
        btnDiscordHero.disabled = true;
        btnDiscordHero.innerHTML = "⏳ Envie aplicação primeiro";
    }
}

// Função para habilitar botões do Discord
function habilitarBotoesDiscord() {
    const btnDiscordGuilda = document.getElementById("btnDiscord");
    const btnDiscordHero = document.getElementById("btnDiscordHero");
    
    if (btnDiscordGuilda) {
        btnDiscordGuilda.disabled = false;
        btnDiscordGuilda.innerHTML = "Entrar no servidor";
    }
    
    if (btnDiscordHero) {
        btnDiscordHero.disabled = false;
        btnDiscordHero.innerHTML = "Entrar no Servidor";
    }
}

// ----------------------
// Funções de rolagem suave
// ----------------------

function scrollToForm() {
    const section = document.getElementById("requisitos");
    if (section) section.scrollIntoView({ behavior: "smooth" });
}

function scrollToDiscord() {
    const jaEnviou = verificarSeJaEnviou();
    
    if (!jaEnviou) {
        alert("⚠️ Você precisa enviar sua aplicação primeiro antes de entrar no servidor!");
        scrollToForm();
        return;
    }
    
    const section = document.getElementById("discord");
    if (section) section.scrollIntoView({ behavior: "smooth" });
}

// Função para abrir o Discord
function abrirDiscord() {
    const jaEnviou = verificarSeJaEnviou();
    
    if (!jaEnviou) {
        alert("⚠️ Você precisa enviar sua aplicação primeiro antes de entrar no servidor!");
        scrollToForm();
        return;
    }
    
    window.open(DISCORD_INVITE_URL, "_blank");
}

// ----------------------
// Lógica principal
// ----------------------

document.addEventListener("DOMContentLoaded", () => {
    // Verifica se já enviou o formulário anteriormente
    restaurarEstadoFormulario();
    
    // Se não enviou ainda, desabilita os botões do Discord
    if (!verificarSeJaEnviou()) {
        desabilitarBotoesDiscord();
    }
    
    // Botão "Entrar no Servidor" (seção inferior)
    const btnDiscordGuilda = document.getElementById("btnDiscord");
    if (btnDiscordGuilda) {
        btnDiscordGuilda.addEventListener("click", abrirDiscord);
    }
    
    // Botão "Entrar no Servidor" no hero
    const btnDiscordHero = document.getElementById("btnDiscordHero");
    if (btnDiscordHero) {
        btnDiscordHero.addEventListener("click", function(e) {
            e.preventDefault();
            abrirDiscord();
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

        // Verifica se já enviou anteriormente
        if (verificarSeJaEnviou()) {
            errorBox.textContent = "⚠️ Você já enviou sua aplicação. Não é possível enviar novamente.";
            errorBox.classList.add("error-visible");
            return;
        }

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

        // Mostrar loading no botão
        const submitBtn = document.getElementById("submitBtn");
        const originalText = submitBtn.textContent;
        submitBtn.textContent = "Enviando...";
        submitBtn.disabled = true;

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
            "✅ Aceitou requisitos e regras da guilda.",
            `🕒 **Enviado em:** ${new Date().toLocaleString('pt-BR')}`,
            `🌐 **IP do Usuário:** Coletado pelo sistema`,
            `🖥️ **Navegador:** ${navigator.userAgent}`
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
                    avatar_url: ""
                })
            });

            if (!res.ok) {
                throw new Error(`Erro ao enviar para o Discord: ${res.status}`);
            }

            // SUCESSO - Marca como enviado no localStorage
            marcarComoEnviado();
            
            // Bloqueia o formulário para evitar novo envio
            bloquearFormulario();
            
            // Habilita os botões do Discord
            habilitarBotoesDiscord();
            
            // Mostra mensagem de sucesso
            successBox.classList.add("success-visible");
            
            // Restaura o botão
            submitBtn.textContent = originalText;
            submitBtn.disabled = true;
            
            // Rolagem automática para a seção do Discord após 1.5 segundos
            setTimeout(() => {
                const discordSection = document.getElementById("discord");
                if (discordSection) {
                    discordSection.scrollIntoView({ behavior: "smooth" });
                    
                    // Mostra alerta de instruções
                    setTimeout(() => {
                        alert("✅ Aplicação enviada com sucesso!\n\nAgora clique em 'Entrar no servidor' para acessar o Discord da guilda.\n\nNo Discord:\n1. Leia as regras no canal #regras\n2. Se apresente no canal #apresentação\n3. Aguarde o contato da liderança");
                    }, 800);
                }
            }, 1500);
            
        } catch (err) {
            console.error(err);
            
            // Restaura o botão
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            errorBox.textContent =
                "Ocorreu um erro ao enviar sua aplicação. Tente novamente mais tarde.";
            errorBox.classList.add("error-visible");
        }
    });
});

// ----------------------
// Função para limpar o cache (apenas para desenvolvimento)
// ----------------------
function limparCacheFormulario() {
    localStorage.removeItem(STORAGE_KEY);
    alert("Cache do formulário limpo! Você pode enviar novamente.");
    location.reload();
}

// Para uso do desenvolvedor: adicione este comando no console do navegador:
// limparCacheFormulario()
