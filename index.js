const express = require('express');
const request = require('request-promise');

const app = express();
const PORT = process.env.PORT || 8000;


const generateScraperUrl = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json()); //allows app to parse json input

app.get('/', (req, res) => {
    res.send('Welcome to Amazon Scraper API');
}); //returns message to know that server is running

// GET PRODUCT DETAILS
app.get('/products/:productId', async (req, res) => {
    const {productId} = req.params;
    const{api_key} = req.query;
    
    try {
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/dp/${productId}`);

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);

    }

});

// GET PRODUCT REVIEWS
app.get('/products/:productId/reviews', async (req, res) => {
    const {productId} = req.params;
    const{api_key} = req.query;

    try {
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/product-reviews/${productId}`);

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);

    }

});

// GET PRODUCT OFFERS
app.get('/products/:productId/offers', async (req, res) => {
    const {productId} = req.params;
    const{api_key} = req.query;

    try {
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/gp/offer-listing/${productId}`);

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);

    }
});

// GET SEARCH RESULTS
app.get('/search/:searchQuery', async (req, res) => {
    const {searchQuery} = req.params;
    const{api_key} = req.query;
    
    try {
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/s?k=${searchQuery}`);

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);

    }
});



app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); //to start server, server needs to listen on specific port 