document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    initializeGallery();
    initializeAccessibility();
    initializeScrollEffects();
    initializeEmergencyButton();
});

function initializeNavigation() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function initializeGallery() {
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const caption = this.querySelector('.overlay span').textContent;
            
            const modal = document.createElement('div');
            modal.className = 'modal fade';
            modal.innerHTML = `
                <div class="modal-dialog modal-lg modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-body">
                            <img src="${img.src}" class="img-fluid" alt="${img.alt}">
                            <div class="overlay" style="opacity: 1">
                                <span>${caption}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            const modalInstance = new bootstrap.Modal(modal);
            modalInstance.show();
            
            modal.addEventListener('hidden.bs.modal', () => {
                modal.remove();
            });
        });
    });
}

function initializeAccessibility() {
    let currentFontSize = 18;
    const body = document.body;
    
    document.getElementById('increaseTextSize')?.addEventListener('click', () => {
        currentFontSize = Math.min(24, currentFontSize + 2);
        body.style.fontSize = `${currentFontSize}px`;
    });
    
    document.getElementById('decreaseTextSize')?.addEventListener('click', () => {
        currentFontSize = Math.max(14, currentFontSize - 2);
        body.style.fontSize = `${currentFontSize}px`;
    });
    
    let speechUtterance = null;
    
    document.getElementById('textToSpeech')?.addEventListener('click', () => {
        if (!speechUtterance) {
            speechUtterance = new SpeechSynthesisUtterance(document.querySelector('main').textContent);
            speechUtterance.lang = 'en-US';
            speechUtterance.rate = 0.9;
            speechSynthesis.speak(speechUtterance);
        }
    });
    
    document.getElementById('stopSpeech')?.addEventListener('click', () => {
        if (speechSynthesis.speaking) {
            speechSynthesis.cancel();
            speechUtterance = null;
        }
    });
}

function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.feature-card, .gallery-item, .contact-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
    
    const backToTop = document.createElement('button');
    backToTop.id = 'backToTop';
    backToTop.innerHTML = '<i class="bi bi-arrow-up"></i>';
    backToTop.style.cssText = `
        display: none;
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 999;
        background-color: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        cursor: pointer;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
    `;
    
    document.body.appendChild(backToTop);
    
    window.onscroll = () => {
        backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
    };
    
    backToTop.onclick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
}

function initializeEmergencyButton() {
    document.getElementById('emergencyButton')?.addEventListener('click', function() {
        const emergencyNumber = '+917989841960';
        window.location.href = `tel:${emergencyNumber}`;
    });
}