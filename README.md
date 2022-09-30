# online_shopping_app
This is version 2.0.0 of my full stack online shopping web app. The app is currently hosted on AWS ECS at https://ashwinsclothingstore.com.

Main Differences from Version 1.0.0: Utilizes multiple AWS technologies; removes the array of constants storing URLs to online images and instead utilizes AWS S3, CloudFront, and DynamoDB to store image files and retrieve secure links to them. Also formats all dollar numbers, including integral ones, as two-decimal floats. As of version 2.0.0, the app is hosted on AWS ECS instead of Heroku.

Project Purpose:

This web app incorporates the full stack, not just the front end or the back end. By implementing the full stack on my own, I have been able to make the front-end logic compatible with the back-end logic seamlessly and not have to figure out someone else's API to complete the app. Hence, the development process of this app was more efficient than the development processes of apps made by many companies, which is what I intended to prove by carrying it out. Thus, this project will hopefully convince many development teams and startups to embrace and invest in full stack developer positions so that they can speed up their app development processes and reduce development costs. As of version 2.0.0, this project has expanded to include full cloud computing through AWS including deployment, so the project purpose now includes the desire to show that web app developers can develop an effective expertise in cloud computing and app deployment in addition to web coding.

Tech Stack and Frameworks:

The backend is implemented using Node and Express to create the server and the REST API, Bcrypt to encrypt passwords, and Mongoose to connect to and utilize MongoDB as a database to store shopper information in JSON format. The frontend is implemented using React for the UI and client-side state management, vanilla CSS for ordinary CSS styling, Bootstrap for easy link and button CSS styling, Flexbox for CSS layouts, React Router for navigating between components on webpages, localStorage to store and later access the shopper's login token, and Axios for sending HTTP requests to the server (specifically, by making XMLHttpRequests). Hence this app is also a MERN (Mongoose, Express, React, Node) stack app. 

The images for the shopping app are stored on an AWS S3 bucket which can be accessed only through a domain name created by an AWS CloudFront distribution, which is a Content Delivery Network (CDN) that has read-only access and Origin Access Control (OAC) security. The S3 keys of the images are collected from a AWS DynamoDB database via a scan command and appended to the CloudFront domain name to provide the respective URLs to the images. In a professional scenario, one would use actual queries on the DynamoDB database for select result sets rather than a simple scan command for all items. The app is built into a Docker image (made into a cloud-compatible executable) through Docker using a Dockerfile and makes sure to ignore unnecessary installation files during the build process using a .dockerignore file. Amazon ECS is used for the deployment of the Docker image and hence the app.

React Components:

* **App**: Contains all the routes to the other components and navigates to the home page using the useNavigate hook from React Router. App is itself wrapped inside a BrowserRouter component that is rendered in index.js.
* **Home**: The home page. Shows the username if logged in, contains a signout button, and has a link to the login/start shopping page, depending on the current login status, and one to the page to create an account.
* **CreateAccount**: The page to create an account. If the username and password combination already exists in the database, displays an error message. Otherwise, upon successful account creation, signs the shopper out of their current account if it exists, displays a success message for 2 seconds before navigating to the login page where the shopper can sign in with their new account.
* **Login**: The login/start shopping page. Immediately navigates to the shopping page if already logged in. Otherwise, login is invalid, displays an error message. If login is successful, displays a success message for 2 seconds before navigating to the shopping page.
* **Shopping**: The shopping page. Currently contains 12 items to shop for. Each item display shows an image of the item, its cost, and a button to add that item to the cart. The shopping page also includes a signout button that navigates to the home page upon being clicked as well as one link to the home page, one to the cart display page, one to the purchase history page, and one to the page to make a purchase. The images are securely and efficiently pulled from the S3 bucket using DynamoDB for S3 key and shopping item information storage and Cloudfront for indirect read-only access to the S3 bucket through a CDN.
* **Cart**: The cart display page. Displays the shopper's current cart including the description of each item and its cost as well as the total cost of all the items in the cart. For each item there is also a button that allows the user to remove the item from the cart.
* **PurchaseHistory**: The purchase history page. Displays the shopper's purchase history including the total amount of money spent by the shopper on all purchases.
* **Purchase**: The page to make a purchase. Includes basic credit card and billing address information fields to fill out in order for the purchase to go through. If the shopper attempts to make a purchase with an empty cart, displays an error message. Otherwise, upon successful purchase, displays a success message for 2 seconds before navigating back to the shopping page.

In all the React component pages except for App, Home, CreateAccount, and Login, the app upon page access immediately navigates the shopper back to the home page if the shopper is not signed into an account.

The server creation and MongoDB connection are both done in index.js. The MongoDB collection that actually stores shopper data in the database is created in shopping.controller.js. All account or shopping-related HTTP requests are handled by the REST API created in shopping.route.js. All AWS HTTP requests (there is currently only one request to handle) are handled in aws.route.js. The creation of the endpoint for the REST API as well as the connection from the client to the server are both done in server.js, which is used in index.js.
