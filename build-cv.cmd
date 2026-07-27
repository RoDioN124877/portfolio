@echo off
REM Пересборка PDF-резюме из resume.html (RU + EN).
REM Запускать после ЛЮБОЙ правки текста в resume.html.
REM
REM Важно: --allow-file-access-from-files обязателен — без него Chrome
REM не подгрузит локальный Inter из fonts/ и PDF соберётся системным шрифтом.

setlocal
set "DIR=%~dp0"

set "CHROME=C:\Program Files\Google\Chrome\Application\chrome.exe"
if not exist "%CHROME%" set "CHROME=C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
if not exist "%CHROME%" set "CHROME=C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if not exist "%CHROME%" (
  echo [!] Не найден Chrome/Edge. Укажи путь в переменной CHROME.
  exit /b 1
)

echo Собираю resume-ru.pdf ...
"%CHROME%" --headless=new --disable-gpu --allow-file-access-from-files ^
  --no-pdf-header-footer --run-all-compositor-stages-before-draw ^
  --virtual-time-budget=8000 ^
  --print-to-pdf="%DIR%resume-ru.pdf" "file:///%DIR:\=/%resume.html?lang=ru" >nul 2>&1

echo Собираю resume-en.pdf ...
"%CHROME%" --headless=new --disable-gpu --allow-file-access-from-files ^
  --no-pdf-header-footer --run-all-compositor-stages-before-draw ^
  --virtual-time-budget=8000 ^
  --print-to-pdf="%DIR%resume-en.pdf" "file:///%DIR:\=/%resume.html?lang=en" >nul 2>&1

echo.
echo Готово:
dir /b "%DIR%resume-ru.pdf" "%DIR%resume-en.pdf"
endlocal
