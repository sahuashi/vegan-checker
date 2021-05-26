import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import got from 'got';

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());

const id = process.env.APP_ID;
const key = process.env.APP_KEY;

app.post("/", (req, res) => {
    const upc = '028400038546';
    var result = null;
    var food = null;
    //const upc = req.body;
    got.get(`https://api.edamam.com/api/food-database/v2/parser?upc=${upc}&app_id=${id}&app_key=${key}`, {
            responseType: 'json'
        })
        .then(response => {
            food = {
                name: response.body.hints[0].food.label,
                id: response.body.hints[0].food.foodId
            }
            result = getNutrition(food);
            res.send(result);
        })
        .catch(err => {
            res.send(err);
        });
})

const getNutrition = (food) => {
    got.post(`https://api.edamam.com/api/food-database/v2/nutrients?app_id=${id}&app_key=${key}`, {
            json: {
                "ingredients": [{
                    "quantity": 1,
                    "measureURI": "http://www.edamam.com/ontologies/edamam.owl#Measure_serving",
                    "foodId": food.id
                }]
            },
            responseType: 'json'
        })
        .then(res => {
            console.log(res.body);
            return determineVegan(food.name, res.body.healthLabels);
        })
        .catch(err => {
            console.log('Error: ', err.message);
        });
}

const determineVegan = (name, labels) => {
    const isVegan = labels.includes("VEGAN");
    return isVegan ? (name + ": VEGAN") : (name + ": NOT VEGAN");
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}!`)
})