# online_shopping_app
A full stack online shopping web app. The app is hosted on Heroku on the following website: https://ashwin-online-shopping-store.herokuapp.com/.
The backend is implemented using Node and Express to implement the server and its route handlers, Bcrypt for password encryption, and Mongoose
to connect to and utilize MongoDB as a database for storing shopper information in JSON format. The frontend is implemented using React for the UI and client-side state management, vanilla CSS for ordinary CSS styling, Bootstrap for easy link and button CSS styling, Flexbox for CSS layouts, React Router for navigating between components on webpages,
and Axios for sending HTTP requests to the server (specifically, by making XMLHttpRequests). 

React Components:

* **App.js**: Contains all the routes to the other components and navigates to the home page using the useNavigate hook from React Router.
* **home.js**: The home page. Shows the username if logged in, contains a signout button, and has a link to the login/start shopping page, depending on the current login status, and one to the create account page.
* **login.js**: The login/start shopping page. Immediately navigates to the shopping page if already logged in, otherwise displays a success message for 2 seconds before navigating to the shopping page once logged in.
* **shopping.js**: The shopping page. Currently contains 12 items to shop for. Each item display shows an image of the item, its cost, and a button to add that item to the cart. The shopping page also includes a signout button that navigates to the home page upon being clicked as well as one link to the home page, one to the cart display page, one to the purchase history page, and one to the page to make a purchase.
* **cart.js**: The cart display page. Displays the shopper's current cart including the description of each item and its cost as well as the total cost of all the items in the cart. For each item there is also a button that allows the user to remove the item from the cart.
* **purchaseHistory.js**: The purchase history page. Displays the shopper's purchase history including the total amount of money spent by the shopper on all purchases.
* **purchase.js**: The page to make a purchase. Includes basic credit card and billing address information fields to fill out in order for the purchase to go through. Empty purchases cannot be made. Upon successful purchase, the app displays a success message and then navigates back to the shopping page.

All Axios HTTP requests are handled by the router in shopping.route.js. T
