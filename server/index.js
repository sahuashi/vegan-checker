import express from 'express';
import dotenv from 'dotenv';
import got from 'got';

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

const id = process.env.APP_ID;
const key = process.env.APP_KEY;

app.get("/", (req, res) => {
    got.get(`https://api.edamam.com/api/food-database/v2/parser?upc=012000001291&app_id=${id}&app_key=${key}`, {
            responseType: 'json'
        })
        .then(res => {
            console.log(JSON.stringify(res.body));
            getNutrition(res.body.hints[0].food.foodId);
        })
        .catch(err => {
            console.log('Error: ', err.message);
        });
})

const getNutrition = (food) => {
    got.post(`https://api.edamam.com/api/food-database/v2/nutrients?app_id=${id}&app_key=${key}`, {
            json: {
                "ingredients": [{
                    "quantity": 1,
                    "measureURI": "http://www.edamam.com/ontologies/edamam.owl#Measure_serving",
                    "foodId": food
                }]
            },
            responseType: 'json'
        })
        .then(res => {
            console.log(res.body);
        })
        .catch(err => {
            console.log('Error: ', err.message);
        });
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}!`)
})