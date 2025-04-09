@echo off
set TIMESTAMP=%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%
set TIMESTAMP=%TIMESTAMP: =0%
set BACKUP_NAME=cotaki_backup_%TIMESTAMP%

:: Criar pasta de backup se não existir
if not exist "backups" mkdir backups

:: Criar arquivo RAR com todos os arquivos do projeto
"C:\Program Files\WinRAR\WinRAR.exe" a -r "backups\%BACKUP_NAME%.rar" ^
    "*.html" "*.css" "*.js" "*.php" "*.bat" "*.py" ^
    "img\*" "auth\*" 

echo Backup criado com sucesso em backups\%BACKUP_NAME%.rar
pause
