document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const feedback = document.getElementById('feedback');

    const showFeedback = (message, type) => {
        feedback.textContent = message;
        feedback.className = `feedback-message ${type}`;
        feedback.style.display = 'block';

        setTimeout(() => {
            feedback.style.display = 'none';
        }, 3000);
    };

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            try {
                const formData = new FormData(loginForm);
                const response = await fetch('login-process.php', {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();
                
                if (data.success) {
                    showFeedback('Login realizado com sucesso!', 'success');
                    setTimeout(() => {
                        window.location.href = '../dashboard.php';
                    }, 1000);
                } else {
                    showFeedback(data.message || 'Erro ao fazer login', 'error');
                }
            } catch (error) {
                showFeedback('Erro de conexão', 'error');
            }
        });
    }

    // Adicionar funcionalidade de mostrar/ocultar senha
    document.querySelectorAll('.toggle-password').forEach(icon => {
        icon.addEventListener('click', () => {
            const input = icon.previousElementSibling;
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        });
    });

    // Validação do formulário de registro
    if (document.getElementById('registerForm')) {
        const registerForm = document.getElementById('registerForm');
        
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(registerForm);
            
            if (formData.get('senha') !== formData.get('confirma_senha')) {
                showFeedback('As senhas não coincidem', 'error');
                return;
            }

            try {
                const response = await fetch('register-process.php', {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();
                
                if (data.success) {
                    showFeedback('Cadastro realizado com sucesso!', 'success');
                    setTimeout(() => {
                        window.location.href = 'login.php';
                    }, 1500);
                } else {
                    showFeedback(data.message || 'Erro ao realizar cadastro', 'error');
                }
            } catch (error) {
                showFeedback('Erro de conexão', 'error');
            }
        });
    }
});
