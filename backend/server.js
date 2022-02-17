const { urlencoded } = require('express')
const colors = require('colors')
const {errorHandler} = require('./middleware/errorHandler')
const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const connectDB = require('./config/db')

//Connect to mongoDB database  
connectDB()

const app = express()

//The below lines are express middleware that allow us to process and view 
//requests made from the client in json and in the urlencoded formats. 
//This allows us to see the contents of the req and res objects in the below app.get() function
app.use(express.json())
app.use(express.urlencoded({extended: false}))  

/* app.get() takes in a desired endpoint as the first parameter and a function that
handles http requests to the endpoint as the second paramter.The app.get() when called, 
creates an endpoint (extended from the server specified in the app.listen() function)
then calls the function to handle the request in the second parameter. 

        app.get('/api/goals', (req, res) => {
            res.json({'Message':'Get Goals'})   
        })

The handler function takes in a request (req) and response (res) object, the properties
of which contain many built in features. Note that these two objects are pre-defined
by express. Below we are using a built in method included with the res object called  
.json() that takes in an object, converts it to JSON if it is not in that format  
already, and sends it back to the client as a response to their get request 

Optionally, we can use the app.use() function, and instead of explicity defining the 
handler function, we can type require('<file path>') to point app.use() to another 
file with an exported handler function as we have elected to do below.*/ 

app.use('/api/goals', require('./routes/goalRoutes')) 
app.use('/api/users', require('./routes/userRoutes')) 

app.use(errorHandler) 

//In the app.get() function, we can use res.send() to send text, although in the
//above we have configured the response to get requests to be sent as JSON.  

app.listen(port, () => {   
    console.log(`Server running on port ${port}`)  
})