// Adiciona um evento de clique a todos os links de navegação que começam com '#'
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Previne o comportamento padrão do link (salto instantâneo)

        // Rola suavemente para a seção correspondente ao href do link
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth' // Habilita a rolagem suave
        });
    });
});

// Funcionalidade para gerar reflexão com a Gemini API
document.addEventListener('DOMContentLoaded', () => {
    const generateReflectionBtn = document.getElementById('generateReflectionBtn');
    const reflectionOutput = document.getElementById('reflectionOutput');

    if (generateReflectionBtn && reflectionOutput) {
        generateReflectionBtn.addEventListener('click', async () => {
            reflectionOutput.innerHTML = '<p class="loading-indicator">Gerando reflexão...</p>'; // Indicador de carregamento

            try {
                let chatHistory = [];
                const prompt = "Gere uma breve e inspiradora reflexão sobre saúde mental, bem-estar ou cuidado cognitivo, com no máximo 50 palavras.";
                chatHistory.push({ role: "user", parts: [{ text: prompt }] });

                const payload = { contents: chatHistory };
                // ATENÇÃO: Insira sua chave de API do Google Gemini aqui.
                // Obtenha uma em https://aistudio.google.com/app/apikey
                const apiKey = "AIzaSyApfN8RuLxAf8NYP_ZW5RdYC9c-H_sL58A"; // <-- COLOQUE SUA CHAVE AQUI DENTRO DAS ASPAS
                const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                // Verifica se a resposta HTTP da API foi bem-sucedida
                if (!response.ok) {
                    const errorData = await response.json(); // Tenta ler o corpo da resposta de erro
                    console.error('Erro HTTP na Gemini API:', response.status, response.statusText, errorData);
                    reflectionOutput.innerHTML = `<p class="error-message">Erro na comunicação com a API: ${response.status} ${response.statusText}. Detalhes no console.</p>`;
                    return; // Interrompe a execução se houver um erro HTTP
                }

                const result = await response.json();
                console.log('Resposta completa da Gemini API:', result); // Registra a resposta completa no console para depuração

                // Verifica se a resposta da API contém os dados esperados
                if (result.candidates && result.candidates.length > 0 &&
                    result.candidates[0].content && result.candidates[0].content.parts &&
                    result.candidates[0].content.parts.length > 0) {
                    const text = result.candidates[0].content.parts[0].text;
                    reflectionOutput.innerHTML = `<p>${text}</p>`; // Exibe a reflexão gerada
                } else {
                    // Mensagens de erro mais específicas com base na estrutura da resposta
                    if (result.candidates && result.candidates.length === 0) {
                        reflectionOutput.innerHTML = '<p class="error-message">A API não gerou uma reflexão. Tente novamente ou ajuste o prompt.</p>';
                    } else if (result.promptFeedback && result.promptFeedback.blockReason) {
                        // Se a reflexão foi bloqueada por razões de segurança
                        reflectionOutput.innerHTML = `<p class="error-message">A reflexão foi bloqueada por razões de segurança: ${result.promptFeedback.blockReason}.</p>`;
                    } else {
                        // Caso a estrutura da resposta seja inesperada
                        reflectionOutput.innerHTML = '<p class="error-message">Estrutura de resposta inesperada da API. Verifique o console.</p>';
                    }
                }
            } catch (error) {
                // Captura erros de rede ou outros erros durante a chamada da API
                console.error('Erro ao chamar a Gemini API:', error);
                reflectionOutput.innerHTML = '<p class="error-message">Erro de conexão. Verifique sua rede ou o console para mais detalhes.</p>';
            }
        });
    }
});
