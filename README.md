fcc project manage a book trading club [demo](https://knik-fcc-books.herokuapp.com/)

# User Stories
1. I can view all books posted by every user.
2. I can add a new book.
3. I can update my settings to store my full name, city, and state.
4. I can propose a trade and wait for the other user to accept the trade.

boilerplate [repo](https://github.com/nikrb/auth-react-base)
create a base for react authentication.

* node.js
* react.js
* react-router-dom (react-router v4)
* mongodb & mongoose
* passport.js (passport-local)

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Following vlad's authentication [blog](https://vladimirponomarev.com/blog/authentication-in-react-apps-jwt)

# setup

### install mongo
unixy:
```sudo apt-get install mongodb-org```

## development
1. clone repo
2. create .env file, e.g.
```
dbUri=mongodb://localhost:27017/testdb
jwtSecret=somesecretphrase
```
2. npm install (top level and client dirs)
3. startup mongo
4. npm start

## production (cloud9)
1. clone repo
2. create .env file, e.g.
```
dbUri=mongodb://localhost:27017/testdb
jwtSecret=somesecretphrase
NODE_ENV=production
```
3. npm install (top level and client dirs)
4. cd client && npm run build
5. cd ..
6. start mongo
7. node server
