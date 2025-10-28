/* --- FUNÇÃO 1: ROLAGEM SUAVE (Smooth Scroll) --- */
document.querySelectorAll('nav a[href^="#"], a[href^="#"].btn-primary').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); 

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        // Calcula a posição do elemento de destino
        const targetPosition = targetElement.offsetTop;
        
        // Pega a altura do cabeçalho (que é "sticky")
        // Se a classe "scrolled" estiver presente, o header é menor
        const header = document.getElementById('main-header');
        const headerHeight = header.classList.contains('scrolled') ? header.offsetHeight : 110; // 110 é a altura original
        
        // Rola para a posição do elemento MENOS a altura do header
        window.scrollTo({
            top: targetPosition - headerHeight, // Desconta a altura do header
            behavior: 'smooth'
        });
    });
});


/* --- FUNÇÃO 2: CABEÇALHO "STICKY" (Muda ao rolar) --- */
document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('main-header');

    if (header) {
        window.addEventListener('scroll', () => {
            // Adiciona a classe "scrolled" se o scroll for maior que 50px
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // A funcionalidade da Gemini API foi removida.
});
