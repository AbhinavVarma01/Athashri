document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Enhanced Gallery image modal
    function showImage(element) {
        const img = element.querySelector('img');
        const caption = element.querySelector('.overlay span').textContent;
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.innerHTML = `
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-body">
                        <img src="${img.src.replace('w=500', 'w=1200')}" class="img-fluid" alt="${img.alt}">
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
        modal.addEventListener('hidden.bs.modal', function () {
            modal.remove();
        });
    }

    // Animate elements on scroll
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

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('bg-dark');
            document.body.classList.toggle('text-white');
        });
    }

    // Back to Top Button
    const backToTop = document.createElement('button');
    backToTop.id = 'backToTop';
    backToTop.innerHTML = '<i class="bi bi-arrow-up"></i>';
    backToTop.style.display = 'none';
    backToTop.style.position = 'fixed';
    backToTop.style.bottom = '20px';
    backToTop.style.right = '20px';
    backToTop.style.zIndex = '1000';
    backToTop.style.backgroundColor = '#007bff';
    backToTop.style.color = '#fff';
    backToTop.style.border = 'none';
    backToTop.style.borderRadius = '50%';
    backToTop.style.padding = '10px';
    document.body.appendChild(backToTop);
    window.onscroll = () => {
        backToTop.style.display = window.scrollY > 200 ? 'block' : 'none';
    };
    backToTop.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    // Counter Animation
    const counters = document.querySelectorAll('.counter');
    function animateCounter() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            let count = 0;
            const increment = target / 50;
            const interval = setInterval(() => {
                count += increment;
                if (count >= target) {
                    counter.innerText = target;
                    clearInterval(interval);
                } else {
                    counter.innerText = Math.ceil(count);
                }
            }, 20);
        });
    }
    window.addEventListener('scroll', () => {
        counters.forEach(counter => {
            const rect = counter.getBoundingClientRect();
            if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                animateCounter();
            }
        });
    });

    // Text Resizing
    let currentFontSize = 18;
    const body = document.body;
    const increaseTextSize = document.getElementById('increaseTextSize');
    const decreaseTextSize = document.getElementById('decreaseTextSize');
    if (increaseTextSize && decreaseTextSize) {
        increaseTextSize.addEventListener('click', () => {
            currentFontSize += 2;
            body.style.fontSize = currentFontSize + 'px';
        });
        decreaseTextSize.addEventListener('click', () => {
            currentFontSize = Math.max(12, currentFontSize - 2);
            body.style.fontSize = currentFontSize + 'px';
        });
    }

    // Text-to-Speech
    const textToSpeechButton = document.getElementById('textToSpeech');
    const stopSpeechButton = document.getElementById('stopSpeech');
    if (textToSpeechButton && stopSpeechButton) {
        textToSpeechButton.addEventListener('click', () => {
            const utterance = new SpeechSynthesisUtterance(document.body.innerText);
            utterance.lang = 'en-US';
            speechSynthesis.speak(utterance);
        });
        stopSpeechButton.addEventListener('click', () => {
            if (speechSynthesis.speaking) {
                speechSynthesis.cancel();
            }
        });
    }

    // Emergency Button
    const emergencyButton = document.getElementById('emergencyButton');
    if (emergencyButton) {
        emergencyButton.addEventListener('click', function () {
            const emergencyNumber = "+917989841960";
            window.location.href = `tel:${emergencyNumber}`;
        });
    }
});
