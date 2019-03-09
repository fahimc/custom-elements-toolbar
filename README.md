# custom-elements-toolbar

This is an example of how custom elements and a redux store can work together.

Custom elements will act as presentational components and the application is responsible for updating the state.

This example has a `highlight` widget which will highlight the text based on the search term. 

The first icon on the toolbar will open a menu with a series of predefined searh terms which upon clicking will highlight the text.


Setup
```
npm i 
npm run dev
//http://localhost:8080/example/
```