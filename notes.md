### PWA 
PWA to zestaw technologii mających na celu przyblizyć działanie applikacji webowych z działaniem aplikacji mobilnych.
Uytkownik nie musi instalować apki z appstoru (która wazy sporo MB) tylko odrazu moze uzywać.

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

Defaultowy scope service-workera to sciezka do niego na serwerze.

Caching strategies (kazdy ma jakies wady):
- cache first -  fetch event listener - gdy przegladarka robi request, sprawdz czy resource jest cachu i w razie czego zwroc zamiast robic request (fast response, dla resourcow co sie zadko zmieniaja)
- network first - gdy zawsze chcemy swiezy kontent. Po udanym requescie update cachu
- cache then network - zwroc cache najpierw, a gdy request sie skonczy zwroc zupdateowany kontent
- general fallback and others...

### notifications
Gdy user jest w apce uzyj UI by go powiadamiac, a notyfikacje tylko kiedy apka jest zamknieta. 
Notyfikacja powinna być pokazana
- w odpowienim momencie
- być istotna dla uzytkownika
- byc krótka i wystarczająco szczegolowa

Client-side
1. zdobądz pozwolenie uytkownika
2. zasubskrybuj
3. wyślij na serwer PushSubscription object (z linkiem do Push Service)
Server-side
1. uzyj Web Push protokołu by wysłać wiadomosc
2. Push Service dostarcza wiadomosc
Kazda przeglądarka implementuje własny Push Service ale kazdy powinien mieć ten sam API - Web Push Protocol standard
Gdy backend wyśle notyfikacje do Push Serwera on wtedy wysyła ją do urządzenia, gdy urządzenie jest online notyfikacja jest podawana do Service Workera.

Application Server Keys (VAPID keys):
Frontend ma publiczny klucz, który jest porównynany z prywatnym kluczem wyslalem przez backend do PushServicu. Push service sprawdza czy klucz z backendu zgadza sie z kluczem na froncie.

Zwróć uwagę kiedy pokazać popup zezwalający apce na notyfikacje. Jezeli uzytkownik kliknie BLOCK, nie ma latwego sposobu by pokazac to ponownie. 
Dlatego dobra strategia jest pokazanie spersonalizowanego popupa, ktory informuje uzytkownika o kontekscie dla jakiego chcielibysmy wysylac mu notyfikacje,
dopiero gdy sie zgodzi, pokazac mu natywny popup do wlaczenia notyfikacji.
https://github.com/web-push-libs/web-push