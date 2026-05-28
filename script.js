// URL DO WEBHOOK DO DISCORD
// Já configurado para o canal de recrutamento T ☯️ M A N
const DISCORD_WEBHOOK_URL =
    "https://discord.com/api/webhooks/1423342852976672809/UWdtBPcdbmKKcsd3wRJ3NbjNfZ_lqYjrXq-IfdKzDVbtZWvj-x9BgZjREKo3yLybNpsf";

// URL do servidor Discord da guilda
const DISCORD_INVITE_URL = "https://discord.gg/cg3TAQVVAX";

// Chave para armazenamento local
const STORAGE_KEY = "toman_form_submitted";

// ----------------------
// FUNÇÃO PRINCIPAL: Verifica se o formulário já foi enviado
// ----------------------

function verificarSeJaEnviou() {
    const enviado = localStorage.getItem(STORAGE_KEY);
    return enviado === "true";
}

// Marca o formulário como enviado no localStorage
function marcarComoEnviado() {
    localStorage.setItem(STORAGE_KEY, "true");
}

// ----------------------
// FUNÇÃO PARA HABILITAR BOTÕES DO DISCORD PERMANENTEMENTE
// ----------------------

function habilitarBotoesDiscordPermanentemente() {
    // Habilita o botão do Discord na seção inferior
    const btnDiscordGuilda = document.getElementById("btnDiscord");
    if (btnDiscordGuilda) {
        btnDiscordGuilda.disabled = false;
        btnDiscordGuilda.innerHTML = "Entrar no servidor";
        btnDiscordGuilda.classList.remove("btn-disabled");
        
        // Remove qualquer listener anterior e adiciona o novo
        btnDiscordGuilda.replaceWith(btnDiscordGuilda.cloneNode(true));
        const newBtn = document.getElementById("btnDiscord");
        newBtn.addEventListener("click", function() {
            window.open(DISCORD_INVITE_URL, "_blank");
        });
    }
    
    // Habilita o botão do Discord no hero
    const btnDiscordHero = document.getElementById("btnDiscordHero");
    if (btnDiscordHero) {
        btnDiscordHero.disabled = false;
        btnDiscordHero.innerHTML = "Entrar no Servidor";
        btnDiscordHero.classList.remove("btn-disabled");
        
        // Remove qualquer listener anterior e adiciona o novo
        btnDiscordHero.replaceWith(btnDiscordHero.cloneNode(true));
        const newBtnHero = document.getElementById("btnDiscordHero");
        newBtnHero.addEventListener("click", function() {
            window.open(DISCORD_INVITE_URL, "_blank");
        });
    }
}

// ----------------------
// FUNÇÃO PARA DESABILITAR BOTÕES DO DISCORD (apenas se não enviou)
// ----------------------

function desabilitarBotoesDiscord() {
    const btnDiscordGuilda = document.getElementById("btnDiscord");
    const btnDiscordHero = document.getElementById("btnDiscordHero");
    
    if (btnDiscordGuilda) {
        btnDiscordGuilda.disabled = true;
        btnDiscordGuilda.innerHTML = "⏳ Envie sua aplicação primeiro";
        btnDiscordGuilda.classList.add("btn-disabled");
    }
    
    if (btnDiscordHero) {
        btnDiscordHero.disabled = true;
        btnDiscordHero.innerHTML = "⏳ Envie aplicação primeiro";
        btnDiscordHero.classList.add("btn-disabled");
    }
}

// ----------------------
// FUNÇÃO PARA BLOQUEAR O FORMULÁRIO APÓS ENVIO
// ----------------------

function bloquearFormularioAposEnvio() {
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

// ----------------------
// FUNÇÃO PARA VERIFICAR E RESTAURAR ESTADO AO CARREGAR A PÁGINA
// ----------------------

function verificarEstadoAoCarregar() {
    const jaEnviou = verificarSeJaEnviou();
    
    if (jaEnviou) {
        // Se já enviou, bloqueia o formulário
        bloquearFormularioAposEnvio();
        
        // Habilita os botões do Discord PERMANENTEMENTE
        habilitarBotoesDiscordPermanentemente();
        
        // Mostra mensagem de sucesso permanente
        const successBox = document.getElementById("formSuccess");
        if (successBox) {
            successBox.classList.add("success-visible");
            successBox.innerHTML = `
                ✅ <strong>Aplicação já enviada!</strong><br>
                Sua aplicação foi recebida. Entre no servidor Discord e aguarde o contato da liderança.
            `;
        }
    } else {
        // Se NÃO enviou, desabilita os botões do Discord
        desabilitarBotoesDiscord();
    }
}

// ----------------------
// FUNÇÕES DE ROLAGEM SUAVE
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

// ----------------------
// LÓGICA PRINCIPAL QUANDO A PÁGINA CARREGA
// ----------------------

document.addEventListener("DOMContentLoaded", () => {
    // Verifica o estado atual ao carregar a página
    verificarEstadoAoCarregar();
    
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

    // ----------------------
    // FORMULÁRIO DE RECRUTAMENTO
    // ----------------------
    const form = document.getElementById("recruitForm");
    const errorBox = document.getElementById("formError");
    const successBox = document.getElementById("formSuccess");

    if (!form) return;

    // Adiciona validação em tempo real para a idade
    const idadeInput = document.getElementById("idade");
    if (idadeInput) {
        idadeInput.addEventListener("change", function() {
            const idade = parseInt(this.value);
            if (idade < 15) {
                this.setCustomValidity("A idade mínima é 15 anos.");
            } else {
                this.setCustomValidity("");
            }
        });
    }

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
        // VALIDAÇÕES BÁSICAS
        // ----------------------
        
        // VALIDAÇÃO DA IDADE - CORRIGIDA
        const idadeInput = document.getElementById("idade");
        const idadeValor = idadeInput.value.trim();
        const idade = parseInt(idadeValor, 10);
        
        // Verifica se a idade é um número válido
        if (idadeValor === "" || isNaN(idade)) {
            errorBox.textContent = "Por favor, insira uma idade válida.";
            errorBox.classList.add("error-visible");
            idadeInput.focus();
            return;
        }
        
        // Verifica se a idade é pelo menos 15
        if (idade < 15) {
            errorBox.textContent = "Você precisa ter pelo menos 15 anos para entrar na guilda.";
            errorBox.classList.add("error-visible");
            idadeInput.focus();
            return;
        }
        
        // Verifica se a idade é realista (máximo 80)
        if (idade > 80) {
            errorBox.textContent = "Por favor, insira uma idade realista.";
            errorBox.classList.add("error-visible");
            idadeInput.focus();
            return;
        }

        // Validação dos checkboxes
        const aceitoRequisitos = document.getElementById("aceitoRequisitos").checked;
        const aceitoRegras = document.getElementById("aceitoRegras").checked;

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
                field.focus();
                return;
            }
        }

        // ----------------------
        // COLETAR DADOS DO FORMULÁRIO - IDADE CORRIGIDA
        // ----------------------
        const nickname = document.getElementById("nickname").value.trim();
        const sexo = document.getElementById("sexo").value.trim();
        const idFreeFire = document.getElementById("idFreeFire").value.trim();
        const funcao = document.getElementById("funcao").value.trim();
        const rank = document.getElementById("rank").value.trim();
        const disponibilidade = document.getElementById("disponibilidade").value.trim();
        const sobre = document.getElementById("sobre").value.trim();
        
        // IDADE CORRETA - usa o valor já validado
        const idadeFinal = idade; // Já validado acima

        // Mostrar loading no botão
        const submitBtn = document.getElementById("submitBtn");
        const originalText = submitBtn.textContent;
        submitBtn.textContent = "Enviando...";
        submitBtn.disabled = true;

        // ----------------------
        // MONTAR MENSAGEM PARA O DISCORD - IDADE CORRIGIDA
        // ----------------------
        const content = [
            "📥 **NOVA APLICAÇÃO DE RECRUTAMENTO - T ☯ M A N**",
            "",
            `**Nick:** ${nickname}`,
            `**Sexo:** ${sexo === "homem" ? "Homem" : "Mulher"}`,
            `**Idade:** ${idadeFinal} anos`, // ← IDADE CORRIGIDA AQUI
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
            `🖥️ **Navegador:** ${navigator.userAgent}`,
            "*Esta aplicação foi enviada através do site oficial de recrutamento.*"
        ].join("\n");

        // ----------------------
        // ENVIAR PARA O WEBHOOK DO DISCORD
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

            // ----------------------
            // SUCESSO TOTAL!
            // ----------------------
            
            // 1. Marca como enviado no localStorage (PERMANENTE)
            marcarComoEnviado();
            
            // 2. Bloqueia o formulário para evitar novo envio
            bloquearFormularioAposEnvio();
            
            // 3. HABILITA OS BOTÕES DO DISCORD PERMANENTEMENTE
            habilitarBotoesDiscordPermanentemente();
            
            // 4. Mostra mensagem de sucesso
            successBox.classList.add("success-visible");
            successBox.innerHTML = `
                ✅ <strong>Aplicação enviada com sucesso!</strong><br>
                Agora você pode entrar no servidor Discord. Aguarde o contato da liderança.
            `;
            
            // 5. Rolagem automática para a seção do Discord
            setTimeout(() => {
                const discordSection = document.getElementById("discord");
                if (discordSection) {
                    discordSection.scrollIntoView({ behavior: "smooth" });
                    
                    // Mostra alerta de instruções
                    setTimeout(() => {
                        alert("✅ APLICAÇÃO ENVIADA COM SUCESSO!\n\nAgora clique em 'ENTRAR NO SERVIDOR' para acessar o Discord da guilda.\n\n⚠️ IMPORTANTE: Você só precisa enviar UMA VEZ!\n\nNo Discord:\n1. Leia as regras no canal #regras\n2. Se apresente no canal #apresentação\n3. Aguarde o contato da liderança");
                    }, 800);
                }
            }, 1500);
            
            // 6. Salva também os dados no sessionStorage para segurança
            sessionStorage.setItem("toman_last_submission", new Date().toISOString());
            sessionStorage.setItem("toman_user_age", idadeFinal); // Salva a idade correta
            
        } catch (err) {
            console.error(err);
            
            // Restaura o botão em caso de erro
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            errorBox.textContent =
                "Ocorreu um erro ao enviar sua aplicação. Tente novamente mais tarde.";
            errorBox.classList.add("error-visible");
            
            // Mostra detalhes do erro no console
            console.error("Erro detalhado:", err.message);
        }
    });
});

// ----------------------
// FUNÇÃO PARA DESENVOLVEDOR: LIMPAR CACHE (APENAS PARA TESTES)
// ----------------------

function limparCacheFormulario() {
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem("toman_last_submission");
    sessionStorage.removeItem("toman_user_age");
    alert("✅ Cache do formulário limpo!\nAgora você pode testar o envio novamente.");
    location.reload();
}

// Para uso do desenvolvedor: adicione este comando no console do navegador:
// limparCacheFormulario()
