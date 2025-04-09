<?php
session_start();
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];
    
    $sql = "SELECT id, password FROM users WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($user = $result->fetch_assoc()) {
        if (password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            echo json_encode(['success' => true]);
            exit;
        }
    }
    
    echo json_encode(['success' => false, 'message' => 'Invalid credentials']);
}
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Cotaki</title>
    <link rel="stylesheet" href="styles-auth.css">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
</head>
<body>
    <div class="auth-container">
        <div class="auth-card">
            <a href="../index.html" class="auth-back-button">
                <i class="fas fa-arrow-left"></i> Voltar
            </a>
            
            <div class="auth-header">
                <h1>Bem-vindo ao Cotaki</h1>
                <p>Entre para começar a economizar</p>
            </div>

            <div id="feedback" class="feedback-message"></div>

            <form class="auth-form" id="loginForm">
                <div class="form-group">
                    <input type="email" name="email" placeholder="Seu e-mail" required>
                </div>
                <div class="form-group password-group">
                    <input type="password" name="senha" placeholder="Sua senha" required>
                    <i class="toggle-password fas fa-eye"></i>
                </div>
                <button type="submit" class="auth-button">Entrar</button>
                
                <div class="auth-links">
                    <a href="recuperar-senha.php">Esqueceu a senha?</a>
                    <a href="cadastro.php">Criar uma conta</a>
                </div>
            </form>
        </div>
    </div>
    <script src="auth.js"></script>
</body>
</html>
