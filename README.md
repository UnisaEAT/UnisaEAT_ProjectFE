[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

# UnisaEAT Project
Il sistema che si vuole realizzare ha come scopo la semplificazione e la velocizzazione delle funzionalità del servizio mensa UNISA, rendendole più agevoli sia per chi ci lavora sia per chi ne usufruisce. Il nostro obiettivo è stato la realizzazione di un sistema che permetta di avere una massima automazione per quanto riguarda l’intera gestione del tesserino mensa e dei pasti. Si vuole velocizzare la comunicazione tra Cliente e personale ADISU, ottimizzare la metodologia d’acquisto dei pasti, facilitare le mansioni dell’operatore Mensa nella distribuzione dei pasti e agevolare le funzioni gestionali dell’intero servizio. Il progetto UnisaEAT e suddiviso in due parti, la parte front-end e la parte back-end. La parte front-end è stata implementata utilizzando React, invece il back-end è stato implementato utilizzando Node.js e Express.js.

## Getting started

Queste istruzioni consentono di ottenere una copia del progetto in esecuzione nel proprio computer
locale a scopo di sviluppo e test. Vedere la sezione “sviluppo” per sapere come eseguire il progetto.


### Prerequisites
Prima di tutto è necessario disporre di un computer con connessione a internet, per una corretta installazione del software.
*	Scaricare e installare il software di database “MongoDB”: https://bit.ly/2sOVMn8
*	Facoltativo - Scaricare e installare l'interfaccia grafica per Mongo “MongoDB Compass”:
https://bit.ly/2PM0fzG
*	Scaricare e installare “Node.js”: https://nodejs.org/it/download
*	Si consiglia di scaricare l'IDE “Visual Studio Code”: https://bit.ly/34MfLQ 
*	Si consiglia di scaricare “Github Desktop”: https://desktop.github.com

### Installing

Di seguito, forniremo una serie di istruzioni, da eseguire in modo sequenziale, che consentiranno di
eseguire correttamente il sistema.

#### Clone UnisaEAT project ####
1. Aprire il terminale
2. Se necessario, eseguire il comando sudo apt install git
3. Eseguire il comando: git clone https://github.com/UnisaEAT/UnisaEAT_ProjectBE
4. Eseguire il comando: git clone https://github.com/UnisaEAT/UnisaEAT_ProjectFE


#### MongoDB database creation: ####

1. Aprire il terminale
2. Spostarsi nella directory 'UnisaEAT_ProjectBE'.
3. Eseguire il comando: source installdb.sh

#### System package installation: ####
1. Eseguire il comando: npm install nella directory 'UnisaEAT_ProjectBE'
2. Eseguire il commando: npm install nella directory 'UnisaEAT_ProjectFE'

#### Node.js server running: ####

1. Eseguire il comando: npm start nella directory 'UnisaEAT_ProjectBE'
2. Eseguire il commando: npm start nella directory 'UnisaEAT_ProjectFE'


#### Web addresses to launch the software and to control system: ####

1. L’interfaccia di amministrazione di MongoDB è raggiungibile tramite l’indirizzo localhost:27017
2. La pagina iniziale di UnisaEAT è raggiungibile da browser tramite l’indirizzo localhost:3000

## Deployment
1. Seguire le istruzioni di installazione
2. Vai a localhost:3000

## Code Style: ##
1. Spostarsi nella directory clonata del progetto 'UnisaEAT_ProjectBE'
2. Eseguire i comandi: npm install standard –save-dev
3. npm install -g npx
4. npx standard pathFile
5. Se si desidera formattare automaticamente il codice eseguire npx standard pathFile -fix. È possibile eseguire espressioni di percorso complesse, per maggiori informazioni consultare: https://github.com/standard/standard
6. Ripetere le stesse operazioni spostandosi nella directory 'UnisaEAT_ProjectFE'

## Selenium Extension Install: ##
1. Vai a: https://bit.ly/2FJa4ZK

2. Seleziona il tipo di browser per installare l'estensione Selenium:
* Installa Selenium su Chrome: https://bit.ly/2R9YVWZ (lo consigliamo)
* Installa Selenium su Mozilla FireFox: https://mzl.la/2tWfhdG

## Unit and Integration Testing: ##

1. Aprire il terminale
2. Spostarsi nella directory 'UnisaEAT_ProjectBE'
3. Eseguire il commando npm test 

## System Testing: ##

1. Avviare il Server prima di eseguire il test di sistema con il seguente comando da terminale: npm start
2. Aprire il browser
3. Aprire l’IDE Selenium, generalmente presente in alto a destra
4. Selezionare l’opzione “Open an existing project”
5. Impostare il file co estensione .side
6. Eseguire tutti i test del file importato con il comando “Run all tests” (comando: Ctrl-Shift-R) o un singolo test selezionandolo con “Run current test” (comando: Ctrl-R)


## Authors

Project manager: 
* **Salvatore Amideo** - *UnisaEAT* - [Salvo1108](https://github.com/Salvo1108)
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

This project is totally open source and free to use.
