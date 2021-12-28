var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const bodyParser = require('body-parser');
const cors = require("cors");
// import axios module to make API get request
const axios = require("axios");

const app = express()
// setup cors options
const corsOptions = {
    origin:'*', 
    credentials:true,            
    optionSuccessStatus:200,
 }
 
 // specify the static folder to start the app from
app.use(express.static('dist'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(corsOptions)) 

// require dotenv to access the environment variables
const dotenv = require('dotenv');
const { response } = require('express');
dotenv.config();

console.log(__dirname)

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

// create the post route /call-api
app.post('/call-api', async(req,res)=>{
    try{
        // Define variable for baseURL of the webAPI
        const baseURL = 'https://api.meaningcloud.com/sentiment-2.1?key=';
        // Define variable for API key
        const personalAPIKey = process.env.API_KEY;
        // console.log(req.body)
        // Define variable to get the element that will have the value of article url
        const url = req.body.url
        // form the full api url from baseURL, personalAPIKey and given url form the user
        const APIFullURL = baseURL+personalAPIKey+'&url='+url+'&lang=en'

        // make get request using axios
        axios.get(APIFullURL)
        // get the response from the request and form the needed data be send back to the app
        .then(response =>{
            // form the object of the needed data
            console.log(response)
            const returnedData = {
                text: response.data.sentence_list[0].text,
                score_tag: response.data.sentence_list[0].score_tag,
                agreement: response.data.sentence_list[0].agreement,
                subjectivity: response.data.subjectivity,
                confidence: response.data.sentence_list[0].confidence,
                irony: response.data.irony
            }
            // send the response back to the server with the created object
            res.send(returnedData)
        })
        // catch if there is any errors
        .catch(error => {
            console.log('Error: '+error)
        })
    }
    catch(error){
        console.log('Error: '+error)
    }
})