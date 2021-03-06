# online_shopping_app
This is version 1 of my full stack online shopping web app. The app is hosted on Heroku on the following website: https://ashwin-online-shopping-store.herokuapp.com/.

Project Purpose:

This web app incorporates the full stack, not just the front end or the back end. By implementing the full stack on my own, I have been able to make the front-end logic compatible with the back-end logic seamlessly and not have to figure out someone else's API to complete the app. Hence, the development process of this app was more efficient than the development processes of apps made by many companies, which is what I intended to prove by carrying it out. Thus, this project will hopefully convince many development teams and startups to embrace and invest in full stack developer positions so that they can speed up their app development processes and reduce development costs.

Tech Stack and Frameworks:

The backend is implemented using Node and Express to create the server and the REST API, Bcrypt to encrypt passwords, and Mongoose to connect to and utilize MongoDB as a database to store shopper information in JSON format. The frontend is implemented using React for the UI and client-side state management, vanilla CSS for ordinary CSS styling, Bootstrap for easy link and button CSS styling, Flexbox for CSS layouts, React Router for navigating between components on webpages, localStorage to store and later access the shopper's login token, and Axios for sending HTTP requests to the server (specifically, by making XMLHttpRequests). Hence this app is also a MERN (Mongoose, Express, React, Node) stack app.

React Components:

* **App**: Contains all the routes to the other components and navigates to the home page using the useNavigate hook from React Router. App is itself wrapped inside a BrowserRouter component that is rendered in index.js.
* **Home**: The home page. Shows the username if logged in, contains a signout button, and has a link to the login/start shopping page, depending on the current login status, and one to the page to create an account.
* **CreateAccount**: The page to create an account. If the username and password combination already exists in the database, displays an error message. Otherwise, upon successful account creation, signs the shopper out of their current account if it exists, displays a success message for 2 seconds before navigating to the login page where the shopper can sign in with their new account.
* **Login**: The login/start shopping page. Immediately navigates to the shopping page if already logged in. Otherwise, login is invalid, displays an error message. If login is successful, displays a success message for 2 seconds before navigating to the shopping page.
* **Shopping**: The shopping page. Currently contains 12 items to shop for. Each item display shows an image of the item, its cost, and a button to add that item to the cart. The shopping page also includes a signout button that navigates to the home page upon being clicked as well as one link to the home page, one to the cart display page, one to the purchase history page, and one to the page to make a purchase.
* **Cart**: The cart display page. Displays the shopper's current cart including the description of each item and its cost as well as the total cost of all the items in the cart. For each item there is also a button that allows the user to remove the item from the cart.
* **PurchaseHistory**: The purchase history page. Displays the shopper's purchase history including the total amount of money spent by the shopper on all purchases.
* **Purchase**: The page to make a purchase. Includes basic credit card and billing address information fields to fill out in order for the purchase to go through. If the shopper attempts to make a purchase with an empty cart, displays an error message. Otherwise, upon successful purchase, displays a success message for 2 seconds before navigating back to the shopping page.

In all the React component pages except for App, Home, CreateAccount, and Login, the app upon page access immediately navigates the shopper back to the home page if the shopper is not signed into an account.

The server creation and MongoDB connection are both done in index.js. The MongoDB collection that actually stores shopper data in the database is created in shopping.controller.js. All Axios HTTP requests are handled by the REST API created in shopping.route.js. The creation of the endpoint for the REST API as well as the connection from the client to the server are both done in server.js, which is used in index.js.
