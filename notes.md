### PWA 
PWA ma na celu przybliyć działanie aplikacji mobilnych z działaniem aplikacji natywnych.
Uytkownik nie musi instalować apki z appstoru (która wazy sporo MB) tylko odrazu moze uyzwać.

Aplikacje PWA muszą być FIRE:
* Szybkie, - FAST
* Dobrze integrujące się z urządzeniem (homescreen, offline, płatności, blootooth, notyfikacje) - INTEGRATE
* Niezawodne - działać w przypadku braku internetu, albo łagodnie fallbackować, ale nie pokazywać dinozaura - RELIABLE
* Angazujące - OS moze obudzic service workera nawet gdy apka jest zamknieta, a wtedy apka moze wysyłac powiadomienia jak natywna aplikacja ENGAGING

### web app manifest
- kontroluje jak apka powinna byc zainstalowana i wygladac na systemie

### payment request api
Zapewnia ujednolicony standard do pobierania informacji dotyczących płatności.
Zamiast tworzyć strony dotyczące płatności (checkouty) gdzie za kadym razem uytkownik musi wypełniać pola, a autocomplete nie działa najlepiej
Przeglądarka pośredniczy w procesie płatności przez uruchomienie natywnego widzeta który zbiera informacje dotyczace platnosci od uzytkownika a na końcy podaje je aplikacji.
Dla uzytkownikow daje to jednolity, łatwy i szybki sposob platnosci na roznych stronach a dla deweloperów pewien standard i... mniej roboty.

### service worker
Service worker jest instalowany i przechodzi w tryb oczekiwania. Gdy uytkownik wykonuje jakieś akcje service worker się budzi i przykładowo cachuje zasoby.
Gdy uytkownik odświerza stronę przeglądarka odpytuje serwer by sprawdzić czy jest nowa wersja service workera.
Jezeli istnieje nowa wersja (porównywanie bajt-po-bajcie), instaluje ją ale nie uzywa jej dopoki stary serwice worker nie zostanie ubity - to jest przestanie byc uzywany przez uzytkownika. 
To moze doprowadzic do sytuacji ze jest kilka service workerow oczekujacych na uzycie.

1. Rejestracja
2. Instalacja
  - prefetchowanie resourców (stron, zdjęć, itp) i cachowanie
3. Aktywacja
  - usuwanie resourców z cachu, których juz nie potrzebujemy 
  - self.clients.claim() - nie czekaj az praca reszty service workerów zostanie zakonczona, ale ka przeglądarce uyzywac obecnego SW
  - ustaw caching strategies

Caching strategies (kazdy ma jakies wady):
- cache first -  fetch event listener - gdy przegladarka robi request, sprawdz czy resource jest cachu i w razie czego zwroc zamiast robic request (fast response, dla resourcow co sie zadko zmieniaja)
- network first - gdy zawsze chcemy swiezy kontent. Po udanym requescie update cachu
- cache then network - zwroc cache najpierw, a gdy request sie skonczy zwroc zupdateowany kontent
- general fallback and others...