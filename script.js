document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Saudação Dinâmica ---
    const headerH1 = document.getElementById('main-title');

    if (headerH1) {
        const hora = new Date().getHours();
        let saudacao;

        if (hora >= 5 && hora < 12)       saudacao = '☀️ Bom dia no Subterfúgio';
        else if (hora >= 12 && hora < 18)  saudacao = '☕ Cafézinho no Subterfúgio';
        else                               saudacao = '🌙 Boa noite no Subterfúgio';

        headerH1.textContent = saudacao;
    }

    // --- 2. Lightbox (Galeria) ---
    const galeria = document.getElementById('galeria-artes');
    const lightbox = document.getElementById('lightbox');

    if (galeria && lightbox) {
        const lightboxImg = lightbox.querySelector('img');
        const lightboxCap = document.getElementById('lightbox-caption');

        galeria.addEventListener('click', (e) => {
            const moldura = e.target.closest('.obra-moldura');
            if (!moldura) return;

            const imgOriginal = moldura.querySelector('img');
            const legendaOriginal = moldura.querySelector('p');

            lightboxImg.src = imgOriginal.src;
            lightboxImg.alt = imgOriginal.alt;
            lightboxCap.textContent = legendaOriginal.textContent;

            // Força reflow para a transição funcionar
            lightbox.style.display = 'flex';
            lightbox.offsetHeight; // reflow
            lightbox.classList.add('is-visible');
        });

        lightbox.addEventListener('click', () => {
            lightbox.classList.remove('is-visible');
            // Aguarda a transição de opacidade antes de esconder
            lightbox.addEventListener('transitionend', function handler() {
                lightbox.style.display = 'none';
                lightbox.removeEventListener('transitionend', handler);
            });
        });

        // Fechar com Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('is-visible')) {
                lightbox.click();
            }
        });
    }

    // --- 3. Log ---
    console.log('Sistema "O Subterfúgio" carregado com sucesso.');
});