const express = require('express')
const app = express();
const fetch = require('node-fetch');


app.set('view engine', 'ejs')

app.get('/', async(req, res) => {
    // this works yet return ugly data
    const request = require('request');
    // request('https://www.washington.edu/', function(error, response, body) {
    //     console.error('error:', error); // Print the error if one occurred
    //     console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    //     console.log('body:', body); // Print the HTML for the Google homepage.

    // });

    const { getMetadata } = require('page-metadata-parser');
    const domino = require('domino');

    const url = 'https://www.youtube.com/watch?v=jI4K7L-LI58';
    const response = await fetch(url);
    const html = await response.text();
    const doc = domino.createWindow(html).document;
    const metadata = getMetadata(doc, url);
    res.render("index", {
            des: metadata.description,
            keywords: metadata.keywords,
            title: metadata.title,
            url: metadata.url,
            image: metadata.image
        })
        // res.json({ message: "there is an error for testing" })
})

const userRouter = require('./routes/user')
app.use('/users', userRouter);
app.listen(3001)