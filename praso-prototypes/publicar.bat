@echo off
REM Envia esta pasta para https://github.com/cleciomuniz/Praso_CLECIO-
REM Requer Git instalado (https://git-scm.com/download/win). Na 1a vez o Git abre o login do GitHub.
cd /d "%~dp0"
if not exist .git (
  git init -b main
  git remote add origin https://github.com/cleciomuniz/Praso_CLECIO-.git
)
git add -A
git commit -m "Atualiza prototipos" 
git push -u origin main
echo.
echo Pronto! Se for a primeira vez, ative o GitHub Pages: Settings ^> Pages ^> Branch: main / (root).
pause
