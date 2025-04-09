<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastro - Cotaki</title>
    <link rel="stylesheet" href="styles-auth.css">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
</head>
<body>
    <div class="auth-container">
        <div class="auth-card">
            <a href="../index.html" class="auth-back-button">
                <i class="fas fa-arrow-left"></i> Voltar
            </a>
            
            <div class="auth-header">
                <img src="../img/logo.png" alt="Cotaki Logo" class="auth-logo">
                <h1>Criar Conta</h1>
                <p>Comece a economizar com o Cotaki</p>
            </div>

            <div id="feedback" class="feedback-message"></div>

            <form class="auth-form" id="registerForm">
                <div class="form-group">
                    <input type="text" name="nome" placeholder="Nome completo" required>
                </div>
                <div class="form-group">
                    <input type="email" name="email" placeholder="Seu melhor e-mail" required>
                </div>
                <div class="form-group password-group">
                    <input type="password" name="senha" placeholder="Senha" required>
                    <i class="toggle-password fas fa-eye"></i>
                </div>
                <div class="form-group password-group">
                    <input type="password" name="confirma_senha" placeholder="Confirme sua senha" required>
                    <i class="toggle-password fas fa-eye"></i>
                </div>
                <button type="submit" class="auth-button">Criar Conta</button>
            </form>

            <div class="auth-links">
                <p>Já tem uma conta? <a href="login.php">Entrar</a></p>
            </div>
        </div>
    </div>
    <script src="https://kit.fontawesome.com/yourkit.js"></script>
    <script src="auth.js"></script>
</body>
</html>
