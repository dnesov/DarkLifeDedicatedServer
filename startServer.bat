@echo off
title DARKLIFE Dedicated Server
if exist "./node_modules/express" goto startapp
:dependenciesalert
@echo DarkLife's dedicated server needs to have important dependencies to be installed.
@echo do you want to install them? (Y/N)
set /p answer=
if %answer% == Y (
echo Answer is yes.
goto installdependencies
) ELSE (
goto exitapp
)

if %answer% == y (
echo Answer is yes.
goto installdependencies
) ELSE (
goto exitapp
)

:installdependencies
@echo Installing dependencies...
npm i express@4.15.2
npm i socket.io
npm i colors
move ./node_modules ./src
pause

:startapp
node ./src/index.js
move ./node_modules ./src
pause
