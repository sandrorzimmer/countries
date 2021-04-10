# Countries
## Select a country and get information about it.
### Simple application that fetches data from an RESTful API.<br><br>

### Table of contents
1. [API](#API)
2. [How does the application work?](#How-does-the-application-work?)
3. [Frameworks and resources](#Frameworks-and-resources)
4. [Learning and issues](#Learning-and-issues)

### API
* https://restcountries.eu/
* License: Mozilla Public License MPL 2.0
* Version at application development: 2.0.5
* Used endpoints:
  * ALL - - Get all information available.
    * https://restcountries.eu/rest/v2/all
  * NAME - Search by country name. It can be the native name or partial name.
    * https://restcountries.eu/rest/v2/name/{name}    
  * CODE - Search by ISO 3166-1 2-letter or 3-letter country code.
    * https://restcountries.eu/rest/v2/alpha/{code}

### How does the application work?
There is only a select field. User selects a country from the list and<br>
a card with country information is shown.
Behind the curtains, this is what happens:
* A function gets all the countries' names to build the select field.
* User selects a country. Then a function searches the info to be shown, including:
  * An image of the country's flag
  * Region
  * Native name
  * Capital
  * Demonym
  * Languages
  * Currencies
  * Borders

![Image](/Images/card_sample.png)

### Frameworks and resources
  * Bootstrap - basic resources to make front-end more edible.

### Learning and issues
  * The main goal at this application was learning about using an API RESTful.
  * To reach the API, I used the XMLHttpRequest object.
  * Another interesting subject was creating HTML elements, or nodes, in the DOM using JavaScript.
