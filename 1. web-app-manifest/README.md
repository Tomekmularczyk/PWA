W tym przykladzie tworzymy zwykly web app manifest (https://developer.mozilla.org/en-US/docs/Web/Manifest), 
który mozna podejrzec w Devtools -> Application:Manifest

1. yarn start - wystartuje serwer

"Add to homescreen" nie zadziała, jezeli:
a) strona nie jest po HTTPS
b) nie ma odpowiedniej ikonki ("Site cannot be installed: a 144px square PNG icon is required, but no supplied icon meets this requirement")
c) strona nie ma service workera

2. ./ngrok http 8000 - wytuneluje localhost i udostepni linki by dostac sie do niego po HTTPS

Dziwne, na iOS mozna dodac apke do homescreena... dziwne jest ze kolory z manifestu sie nie zgadzają.