@echo off
cls

where nvim > nul 2>&1
if %errorlevel% equ 0 (

  set nvim_installed=1

) else (

  set nvim_installed=0

)

echo.
echo.
:menu
echo ------------------[ WELCOME TO MAGIA CALCULATOR ]------------------
echo Select running parameters:
echo.
echo 1. Run Magia Calculator
echo 2. Open the source code 
echo 3. Run Magia Calculator and open the source code
echo 4. Close launcher
echo ------------------------------------------------------------------- 
echo.

set /p id="Enter your choice: "

if %id% == 1 (

  goto run

) else if %id% == 2 (

  if %nvim_installed% == 0 (

    cls
    echo To use this option you need to have NVIM installed
    echo.
    goto menu

  ) else (

    goto dev

  )

) else if %id% == 3 (

  if %nvim_installed% == 0 (

    cls
    echo To use this option you need to have NVIM installed
    echo.
    goto menu

  ) else (

    goto run_dev

  )

) else if %id% == 4 (

  goto end

) else (

  cls
  echo Invalid option. Please try again.
  echo.
  goto menu

)

:run
start cmd /k "cd magia-calculator-web && live-server"
start cmd /k "cd magia-calculator-api && node app.js"
goto end

:dev
nvim .
goto end

:run_dev
start cmd /k "cd magia-calculator-web && live-server"
start cmd /k "cd magia-calculator-api && node app.js"
nvim .
goto end

:end
