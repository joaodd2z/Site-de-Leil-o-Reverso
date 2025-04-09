// Script para interatividade das abas e animações
document.addEventListener('DOMContentLoaded', () => {
    // Seleciona os links da navbar e as seções correspondentes
    const navLinks = document.querySelectorAll('.navbar a');
    const tabContents = document.querySelectorAll('.tab-content');
  
    // Adiciona evento de clique a cada link da navbar
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
  
        // Remove a classe ativa de todos os links
        navLinks.forEach(nav => nav.classList.remove('active'));
        link.classList.add('active'); // Adiciona a classe ativa ao link clicado
  
        // Exibe apenas a aba correspondente com animação suave
        tabContents.forEach(section => {
          section.classList.remove('active');
          section.style.opacity = '0'; // Inicia com opacidade 0 para animação
        });
  
        const targetSection = document.querySelector(link.getAttribute('href'));
        targetSection.classList.add('active');
        setTimeout(() => {
          targetSection.style.opacity = '1'; // Transição suave para opacidade 1
        }, 100);
      });
    });
  
    // Efeito de hover nos links da navbar (animação ao passar o mouse)
    navLinks.forEach(link => {
      link.addEventListener('mouseover', () => {
        link.style.transform = 'scale(1.1)'; // Aumenta ligeiramente o tamanho
        link.style.transition = 'transform 0.2s ease-in-out';
      });
  
      link.addEventListener('mouseout', () => {
        link.style.transform = 'scale(1)'; // Volta ao tamanho original
      });
    });
  
    // Formulário de contato - Mensagem de sucesso após envio simulado
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Evita o comportamento padrão do formulário
  
      alert('Obrigado por entrar em contato! Responderemos em breve.');
      contactForm.reset(); // Limpa os campos do formulário após o envio
    });

    // Initialize authentication listeners
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Sistema de Comentários
    const commentForm = document.getElementById('comment-form');
    const feedbackMessage = document.getElementById('feedback-message');

    if (commentForm) {
        commentForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Verificar se o usuário está logado
            const isLoggedIn = await checkLoginStatus(); // Função que verifica o status do login
            
            if (!isLoggedIn) {
                showLoginPrompt();
                return;
            }
            
            // Se estiver logado, processa o comentário
            const commentText = commentForm.querySelector('.comment-input').value;
            submitComment(commentText);
        });
    }

    function showLoginPrompt() {
        const prompt = document.createElement('div');
        prompt.className = 'login-prompt';
        prompt.innerHTML = `
            <h3>Faça login para comentar</h3>
            <p>Você precisa estar logado para deixar seu comentário</p>
            <div class="login-prompt-buttons">
                <a href="auth/login.php" class="login">Entrar</a>
                <a href="auth/cadastro.php" class="register">Criar conta</a>
            </div>
        `;
        
        document.body.appendChild(prompt);
        
        // Animar entrada
        setTimeout(() => prompt.style.display = 'block', 100);
        
        // Fechar ao clicar fora
        document.addEventListener('click', function closePrompt(e) {
            if (!prompt.contains(e.target)) {
                prompt.style.display = 'none';
                setTimeout(() => prompt.remove(), 300);
                document.removeEventListener('click', closePrompt);
            }
        });
    }

    async function checkLoginStatus() {
        try {
            const response = await fetch('/auth/check-login.php');
            const data = await response.json();
            return data.isLoggedIn;
        } catch (error) {
            return false;
        }
    }

    async function submitComment(text) {
        try {
            const response = await fetch('/api/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text })
            });
            
            if (response.ok) {
                showToast('Comentário enviado com sucesso!', 'success');
                commentForm.reset();
            }
        } catch (error) {
            showToast('Erro ao enviar comentário', 'error');
        }
    }

    // Handle authentication navigation
    const authLinks = document.querySelectorAll('.login-btn, .register-btn');
    authLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            window.location.href = href;
        });
    });

    // Footer Comment System
    const commentArea = document.getElementById('commentArea');
    
    // Simular verificação de login (substitua por sua lógica real)
    const isLoggedIn = false; // Mude para true para testar usuário logado
    
    if (isLoggedIn) {
        commentArea.innerHTML = `
            <form class="footer-comment-form" id="footerCommentForm">
                <input type="text" 
                       class="footer-comment-input" 
                       placeholder="Deixe seu comentário..."
                       required>
                <button type="submit" class="footer-comment-button">Enviar</button>
            </form>
            <div class="footer-comment-message" id="footerCommentMessage">
                Seu comentário será sempre bem vindo!
            </div>
        `;

        const footerCommentForm = document.getElementById('footerCommentForm');
        const footerCommentMessage = document.getElementById('footerCommentMessage');

        footerCommentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            footerCommentMessage.style.display = 'block';
            footerCommentForm.reset();
            
            setTimeout(() => {
                footerCommentMessage.style.display = 'none';
            }, 3000);
        });
    } else {
        commentArea.innerHTML = `
            <div class="footer-login-prompt">
                <p>Cadastre-se e interaja! 
                   <a href="auth/cadastro.php">Criar conta</a> ou 
                   <a href="auth/login.php">Entrar</a>
                </p>
            </div>
        `;
    }

    // Enhanced Interactions
    // Progress Indicator
    const progressIndicator = document.createElement('div');
    progressIndicator.className = 'progress-indicator';
    document.body.appendChild(progressIndicator);

    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY) / (document.documentElement.scrollHeight - window.innerHeight);
        progressIndicator.style.transform = `scaleX(${scrollPercent})`;
    });

    // Floating CTA
    const floatingCta = document.createElement('a');
    floatingCta.className = 'floating-cta';
    floatingCta.href = '#';
    floatingCta.textContent = 'Começar Agora';
    document.body.appendChild(floatingCta);

    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop && scrollTop > 300) {
            floatingCta.classList.add('visible');
        } else {
            floatingCta.classList.remove('visible');
        }
        lastScrollTop = scrollTop;
    });

    // CTA Click Handler
    const handleCtaClick = (e) => {
        e.preventDefault();
        
        // Animated Modal
        const modal = document.createElement('div');
        modal.className = 'cta-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h2>Comece sua Jornada de Economia</h2>
                <form id="quotationForm">
                    <input type="text" placeholder="O que você precisa?" required>
                    <input type="number" placeholder="Quantidade desejada" required>
                    <textarea placeholder="Detalhes adicionais"></textarea>
                    <button type="submit">Solicitar Cotações</button>
                </form>
            </div>
        `;
        document.body.appendChild(modal);

        setTimeout(() => modal.classList.add('active'), 100);

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                setTimeout(() => modal.remove(), 300);
            }
        });
    };

    document.querySelectorAll('.hero-cta, .floating-cta').forEach(cta => {
        cta.addEventListener('click', handleCtaClick);
    });

    // Testimonials Carousel com transição suave
    const testimonials = document.querySelectorAll('.testimonial-card');
    const totalTestimonials = testimonials.length;
    let currentIndex = 0;

    function showTestimonials(index) {
        const testimonialsContainer = document.querySelector('.testimonials-grid');
        testimonialsContainer.style.opacity = '0';
        
        setTimeout(() => {
            testimonials.forEach(card => {
                card.classList.remove('active');
                card.style.display = 'none';
            });

            // Mostrar par atual de depoimentos
            for (let i = 0; i < 2; i++) {
                const currentCard = testimonials[(index + i) % testimonials.length];
                if (currentCard) {
                    currentCard.style.display = 'block';
                    setTimeout(() => currentCard.classList.add('active'), 50);
                }
            }
            
            testimonialsContainer.style.opacity = '1';
            
            // Atualizar os dots de navegação
            document.querySelectorAll('.progress-dot').forEach((dot, i) => {
                dot.classList.toggle('active', Math.floor(index/2) === i);
            });
        }, 400);
    }

    function rotateTestimonials() {
        currentIndex = (currentIndex + 2) % totalTestimonials;
        showTestimonials(currentIndex);
    }

    // Inicialização e intervalo ajustado para 12 segundos
    showTestimonials(0);
    setInterval(rotateTestimonials, 12000);

    function initializeTestimonials() {
        const testimonials = document.querySelectorAll('.testimonial-card');
        const totalPairs = Math.ceil(testimonials.length / 2);
        const progressContainer = document.querySelector('.testimonials-progress');
        let currentPair = 0;

        // Create progress dots
        for (let i = 0; i < totalPairs; i++) {
            const dot = document.createElement('div');
            dot.className = `progress-dot${i === 0 ? ' active' : ''}`;
            dot.dataset.index = i;
            progressContainer.appendChild(dot);
        }

        // Show initial testimonials
        showTestimonials(0);

        // Setup navigation
        document.querySelector('.nav-button.prev').addEventListener('click', () => navigate(-1));
        document.querySelector('.nav-button.next').addEventListener('click', () => navigate(1));

        function showTestimonials(index) {
            testimonials.forEach(card => {
                card.style.display = 'none';
                card.classList.remove('active');
            });

            const start = index * 2;
            for (let i = 0; i < 2; i++) {
                const card = testimonials[start + i];
                if (card) {
                    card.style.display = 'block';
                    setTimeout(() => card.classList.add('active'), 50);
                }
            }

            // Update progress dots
            document.querySelectorAll('.progress-dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }

        function navigate(direction) {
            currentPair = (currentPair + direction + totalPairs) % totalPairs;
            showTestimonials(currentPair);
        }

        // Auto-rotate ajustado para 12 segundos
        setInterval(() => navigate(1), 12000);
    }

    initializeTestimonials();

    // Enhanced Testimonials System
    let interval = setInterval(() => navigate(1), 12000);

    // Pause auto-rotate on hover
    const testimonialsWrapper = document.querySelector('.testimonials-container');
    testimonialsWrapper.addEventListener('mouseenter', () => clearInterval(interval));
    testimonialsWrapper.addEventListener('mouseleave', () => {
        clearInterval(interval);
        interval = setInterval(() => navigate(1), 12000);
    });
});

// Enhanced Testimonials System
function initTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    const dotsContainer = document.querySelector('.testimonials-dots');
    const totalTestimonials = testimonials.length;
    let currentIndex = 0;

    // Criar dots de navegação
    for (let i = 0; i < Math.ceil(totalTestimonials / 2); i++) {
        const dot = document.createElement('div');
        dot.className = `dot${i === 0 ? ' active' : ''}`;
        dot.addEventListener('click', () => goToSlide(i * 2));
        dotsContainer.appendChild(dot);
    }

    function updateDots() {
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === Math.floor(currentIndex / 2));
        });
    }

    function goToSlide(index) {
        currentIndex = index;
        showTestimonials(index);
        updateDots();
    }

    function showTestimonials(index) {
        testimonials.forEach(card => {
            card.style.display = 'none';
            card.classList.remove('active');
        });

        const start = index;
        for (let i = 0; i < 2; i++) {
            const card = testimonials[start + i];
            if (card) {
                card.style.display = 'block';
                setTimeout(() => card.classList.add('active'), 50);
            }
        }
    }

    // Resto do código existente do carrossel...
}

// Initialize testimonials system when DOM is loaded
document.addEventListener('DOMContentLoaded', initTestimonials);

// Authentication handlers
const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    try {
        const response = await fetch('/auth/login.php', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        
        if (data.success) {
            showToast('Login realizado com sucesso!', 'success');
            window.location.href = '/dashboard.php';
        } else {
            showToast(data.message || 'Falha no login. Verifique suas credenciais.', 'error');
        }
    } catch (error) {
        showToast('Erro de conexão. Tente novamente.', 'error');
    }
};

// Toast notification system
const showToast = (message, type = 'info') => {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
};
