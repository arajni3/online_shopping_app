# online_shopping_app
This is version 1 of my full stack online shopping web app. The app is hosted on Heroku on the following website: https://ashwin-online-shopping-store.herokuapp.com/. This web app incorporates the full stack, not just the front end or the back end. By implementing the full stack on my own, I have been able to make the front-end logic compatible with the back-end logic seamlessly. This makes the development process of this app different from apps made by many companies. 

Tech Stack and Frameworks:

The backend is implemented using Node and Express to implement the server and its route handlers, Bcrypt for password encryption, Mongoose
to connect to and utilize MongoDB as a database for storing shopper information in JSON format, and localStorage for storing the shopper's login token. The frontend is implemented using React for the UI and client-side state management, vanilla CSS for ordinary CSS styling, Bootstrap for easy button and webpage link CSS styling, Flexbox for CSS layouts, React Router for navigating between components on webpages, and Axios for sending HTTP requests to the server (specifically, by making XMLHttpRequests). Hence this app is also a MERN (Mongoose, Express, React, Node) stack app.

React Components:

* **App**: Contains all the routes to the other components and navigates to the home page using the useNavigate hook from React Router. App is itself wrapped inside a BrowserRouter component that is rendered in index.js.
* **Home**: The home page. Shows the username if logged in, contains a signout button, and has a link to the login/start shopping page, depending on the current login status, and one to the page to create an account.
* **CreateAccount**: The page to create an account. Upon successful account creation, signs the shopper out of their current account if it exists, displays a success message for 2 seconds, and then navigates to the login page where the shopper can sign in with their new account.
* **Login**: The login/start shopping page. Immediately navigates to the shopping page if already logged in, otherwise displays a success message for 2 seconds before navigating to the shopping page once logged in.
* **Shopping**: The shopping page. Currently contains 12 items to shop for. Each item display shows an image of the item, its cost, and a button to add that item to the cart. The shopping page also includes a signout button that navigates to the home page upon being clicked as well as one link to the home page, one to the cart display page, one to the purchase history page, and one to the page to make a purchase.
* **Cart**: The cart display page. Displays the shopper's current cart including the description of each item and its cost as well as the total cost of all the items in the cart. For each item there is also a button that allows the user to remove the item from the cart.
* **PurchaseHistory**: The purchase history page. Displays the shopper's purchase history including the total amount of money spent by the shopper on all purchases.
* **Purchase**: The page to make a purchase. Includes basic credit card and billing address information fields to fill out in order for the purchase to go through. Empty purchases cannot be made. Upon successful purchase, the app displays a success message and then navigates back to the shopping page.

In all the React component pages except for App, Home, CreateAccount, and Login, the app immediately upon page access navigates the shopper back to the home page if the user tries to access those component pages without being signed into an account.

The server creation and MongoDB connection are both done in index.js. All Axios HTTP requests are handled by the router created in shopping.route.js, which is used in server.js. The creation of the endpoint for the router as well as the connection from the client to the server are both done in server.js, which is used in index.js.
