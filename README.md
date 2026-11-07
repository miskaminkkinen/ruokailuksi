Ruokailuksi

Ruokailuksi on ravinnosta kiinnostuneille ja arjen helpottamiseen tehty React-sovellus, joka laskee käyttäjän päivittäisen energiantarpeen ja makrotavoitteet. Käyttäjä voi koota reseptejä hakemalla tuotteita viivakoodilla, ja sovellus laskee reseptin ravintoarvot.

Julkaistu sovellus: https://miskaminkkinen.github.io/ruokailuksi/

Ominaisuudet
Omat tiedot: perusaineenvaihdunta, kokonaiskulutus sekä kalori-, proteiini-, hiilihydraatti- ja rasvatavoitteet painon, pituuden, iän, sukupuolen, aktiivisuuden ja tavoitteen perusteella.
Reseptit: tuotteiden haku viivakoodilla, määrän valinta grammoina, ainesten lisäys ja poisto sekä reseptin ravintoarvojen laskenta ja tallennus.
Omat reseptit: tallennetut reseptit aineksineen ja ravintoarvoineen.

Tiedot tallentuvat selaimen localStorageen, joten ne säilyvät sivun sulkemisen jälkeen samalla selaimella.

Esimerkkiresepti: Proteiinipuuro

Kokeile sovellusta tekemällä tämä resepti Reseptit-sivulla. Hae jokainen tuote viivakoodilla, anna määrä grammoina ja tallenna resepti nimellä "Proteiinipuuro".

Aines	Viivakoodi	Määrä
Elovena Täysjyväkaurahiutale	6416597113919	60 g
Valio Luomu kevytmaito	6408430000142	200 g
Valio Pehmeä rasvaton maitorahka	6408430042081	125 g

Sovelluksen pitäisi laskea reseptille noin 387 kcal, 28 g proteiinia, 47 g hiilihydraatteja ja 8 g rasvaa. Luvut voivat poiketa hieman, jos tuotteiden tiedot muuttuvat Open Food Factsissa.

Muita testattuja viivakoodeja:

Tuote	Viivakoodi
Nutella	3017620422003
Elovena Luomu kaura -annospikapuuro	6411200108108
Teknologiat
React + Vite
React Router (HashRouter)
React Bootstrap ja Bootstrap (oma Sass-teema)
Open Food Facts API ravintotietoihin
localStorage tietojen tallennukseen
Käynnistys omalla koneella
npm install
npm run dev
Julkaisu GitHub Pagesiin
npm run deploy
Lähteet
Ravintotiedot: Open Food Facts (ODbL)
Kuvake: SVG Repo (CC0)
Fontti: Work Sans, Google Fonts (OFL)

Laskennan luvut ovat suuntaa-antavia arvioita (Mifflin–St Jeor -kaava ja aktiivisuuskerroin), eivät ravitsemussuosituksia.