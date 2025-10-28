// Aguarda o DOM (a página) carregar completamente
document.addEventListener("DOMContentLoaded", function() {

    // Seleciona o botão hamburger e a navegação principal
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    // Seleciona todos os links da navegação
    const navLinks = document.querySelectorAll('.main-nav a');

    // Função para fechar o menu
    function closeMenu() {
        mainNav.classList.remove('nav-active');
        mobileNavToggle.setAttribute('aria-expanded', 'false');
    }

    // Adiciona um evento de "clique" ao botão
    mobileNavToggle.addEventListener('click', function() {
        // Verifica se o menu está ativo
        const isNavActive = mainNav.classList.contains('nav-active');
        
        if (isNavActive) {
            // Se estiver ativo, fecha o menu
            closeMenu();
        } else {
            // Se estiver inativo, abre o menu
            mainNav.classList.add('nav-active');
            mobileNavToggle.setAttribute('aria-expanded', 'true');
        }
    });
    
    // Adiciona um evento de "clique" para CADA link do menu
    // Isso faz o menu fechar automaticamente quando você clica em "Sobre", "Serviços", etc.
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Fecha o menu apenas se ele estiver aberto (em modo mobile)
            if (mainNav.classList.contains('nav-active')) {
                closeMenu();
            }
        });
    });

});
