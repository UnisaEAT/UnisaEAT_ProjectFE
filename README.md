
# UnisaEAT Project
UnisaEAT è un sistema che ha come scopo la semplificazione e la velocizzazione delle funzionalità del servizio mensa UNISA, agevolando la gestione del tesserino, l’ordine dei pasti e la comunicazione tra personale ADISU e fruitori del servizio.

## Getting started

Queste istruzioni ti forniranno una copia del progetto attiva e funzionante sul tuo computer locale per scopi di sviluppo e test. Vedere
distribuzione per le note su come distribuire il progetto su un sistema live.


### Prerequisites
Prima di tutto, avrai bisogno di una macchina Windows o Mac.

Per eseguire una corretta installazione del software è necessario:

* Scarica e installa il software di database "MongoDB" da qui: https://bit.ly/2sOVMn8

* Opzionale - Scarica e installa l'interfaccia grafica Mongo "MongoDB Compass" da qui: https://bit.ly/2PM0fzG

* Scarica e installa "Node.js" da qui: https://nodejs.org/en/download/

* Installare Express-React da terminale posizionandosi nella cartella del progetto utilizzando il seguente comando: npm install express-react-views react react-dom

* Suggeriamo il download dell'IDE 'Visual Studio Code' da qui: https://bit.ly/34MfLQm


### Installing

Una serie passo passo che ti spiega come far funzionare un ambiente di sviluppo.

#### Clone UnisaEAT project ####

1. Apri il tuo terminale

2. Se necessario, esegui il seguente comando: `npm install git`

3. Eseguire il seguente comando: `git clone https://github.com/UnisaEAT/UnisaEAT-Project.git`


#### MongoDB database creation: ####

1. Apri il tuo terminale.

2. Vai nella directory "UnisaEAT".

3. Eseguire il seguente comando: `source installdb.sh`


#### Node.js server running: ####

1. Vai alla directory clonata del tuo progetto 'UnisaEAT'.

2. Eseguire il seguente comando: `node server.js`


#### Web addresses to launch the software and to control system: ####

* Interfaccia di amministrazione Mongo Compass raggiungibile tramite localhost: indirizzo 27017

* Pagina iniziale di UnisaEAT raggiungibile tramite browser Web tramite localhost: indirizzo 8080


## Deployment
1. Seguire le istruzioni di installazione
2. Vai a localhost:8080

## Code Style: ##



## Selenium Extension Install: ##
1. Vai a: https://bit.ly/2FJa4ZK

2. Seleziona il tipo di browser per installare l'estensione Selenium:
* Installa Selenium su Chrome: https://bit.ly/2R9YVWZ (lo consigliamo)
* Installa Selenium su Mozilla FireFox: https://mzl.la/2tWfhdG

## Unit and Integration Testing: ##

1. Aprire il terminale.

2. Spostarsi nella directory "UnisaEAT".

3. Eseguire il comando `npm test`.

## System Testing: ##

1. Avviare il server prima di avviare il test del sistema con il comando `node server.js` nel terminale.

2. Vai nel tuo browser.

3. Aprire l'IDE Selenium per eseguire tutti i test di sistema.

4. Selezionare l'opzione "Apri un progetto esistente".

5. Importa il file con l'estensione .side.

6. Eseguire tutti i test del file importato con "Esegui tutti i test" (comando: `Ctrl+Shift+R`) o un singolo test selezionato con "Esegui test corrente" (comando: `Ctrl+R`).


## Authors

Project manager: 
* **Salvatore Amideo** - *UnisaEAT* - [DomenicoM92](https://github.com/Salvo1108)
* **Alice Vidoni** - *UnisaEAT* - [AliceVidoni](https://github.com/AliceVidoni)

Team Members:
* **Alessandro Cavaliere** - *UnisaEAT* - [Alessandro-Cavaliere](https://github.com/Alessandro-Cavaliere)
* **Alessio Salzano** - *UnisaEAT* - [AlessioSalzano](https://github.com/AlessioSalzano)
* **Maria Rosaria Giudice** - *UnisaEAT* - [MaryJud](https://github.com/MaryJud)
* **Gerardo Sessa** - *UnisaEAT* - [Ilnova](https://github.com/Ilnova)
* **Carmine Citro** - *UnisaEAT* - [citro00](https://github.com/citro00)
* **Nicola Cappello** - *UnisaEAT* - [niky-hat](https://github.com/niky-hat)
* **Claudio Buono** - *UnisaEAT* - [ClaudioBuono](https://github.com/ClaudioBuono)


## License

