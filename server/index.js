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

app.get("/", (req, res) => {
    const upc = req.query.upc;
    console.log(upc);
    var name = null;
    var image = null;
    got.get(`https://api.edamam.com/api/food-database/v2/parser?upc=${upc}&app_id=${id}&app_key=${key}`, {
            responseType: 'json'
        })
        .then(response => {
            return {
                name: response.body.hints[0].food.label,
                id: response.body.hints[0].food.foodId,
                image: response.body.hints[0].food.image
            }
        })
        .then(food => {
            name = food.name;
            image = food.image;
            return got.post(`https://api.edamam.com/api/food-database/v2/nutrients?app_id=${id}&app_key=${key}`, {
                json: {
                    "ingredients": [{
                        "quantity": 1,
                        "measureURI": "http://www.edamam.com/ontologies/edamam.owl#Measure_serving",
                        "foodId": food.id
                    }]
                },
                responseType: 'json'
            })
        })
        .then(response => {
            var ingredientsAreVegan = checkIngredients(response.body.ingredients[0].parsed[0].foodContentsLabel);
            //const isVegan = response.body.healthLabels.includes("VEGAN") || checkHealthLabels(response.body.healthLabels) || checkIngredients();
            const isVegan = response.body.healthLabels.includes("VEGAN") || checkHealthLabels(response.body.healthLabels);
            const food = {
                name: name,
                isVegan: isVegan,
                image: image
            }
            console.log(food);
            res.send(food);
        })
        .catch(err => {
            res.send("Product not found.")
        });
})

const checkHealthLabels = (labels) => {
    const veganLabels = [
      "VEGETARIAN",
      "SHELLFISH_FREE",
      "RED_MEAT_FREE",
      "PORK_FREE",
      "FISH_FREE",
      "EGG_FREE",
      "DAIRY_FREE",
      "CRUSTACEAN_FREE",
    ];

    return veganLabels.every(label => labels.includes(label));
}

const checkIngredients = (ingredients) => {
    // array of 15 (more?) most common non-vegan ingredients
    // make sure none of them are present in ingredients
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}!`)
})