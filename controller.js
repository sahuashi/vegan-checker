import dotenv from 'dotenv';
import got from 'got';

dotenv.config();

// retrieve Edamam API credentials
const id = process.env.APP_ID;
const key = process.env.APP_KEY;

// check if UPC sent from clientside is vegan
const lookup = (req, res) => {
  const { upc } = req.query;
  let name = null;
  let image = null;
  // retrieve initial product details from Edamam's Parser
  got.get(`https://api.edamam.com/api/food-database/v2/parser?upc=${upc}&app_id=${id}&app_key=${key}`, {
    responseType: 'json',
  })
    .then((response) => ({
      name: response.body.hints[0].food.label,
      id: response.body.hints[0].food.foodId,
      image: response.body.hints[0].food.image,
    }))
  // using retrieved product id, retrieve nutritional information from Edamam
    .then((food) => {
      name = food.name;
      image = food.image;
      return got.post(`https://api.edamam.com/api/food-database/v2/nutrients?app_id=${id}&app_key=${key}`, {
        json: {
          ingredients: [{
            quantity: 1,
            measureURI: 'http://www.edamam.com/ontologies/edamam.owl#Measure_serving',
            foodId: food.id,
          }],
        },
        responseType: 'json',
      });
    })
  // check if product is vegan and send relevant product information back
    .then((response) => {
      /*
        two-step vegan checking process, evaluates from left to right
        check if product explicitly has "vegan" label; else, check if all other vegan labels are present
        as long as one condition is satisfied, product is vegan
        todo: add third vegan check as last safety check which reviews the product ingredients
      */
      const isVegan = response.body.healthLabels.includes('VEGAN') || checkHealthLabels(response.body.healthLabels);
      const food = {
        name,
        isVegan,
        image,
      };
      res.send(food);
    })
  // if API returns with 404 error, product was not in database
    .catch((err) => {
      console.log(err);
      res.send('Product not found.');
    });
};

const checkHealthLabels = (labels) => {
  const veganLabels = [
    'VEGETARIAN',
    'SHELLFISH_FREE',
    'RED_MEAT_FREE',
    'PORK_FREE',
    'FISH_FREE',
    'EGG_FREE',
    'DAIRY_FREE',
    'CRUSTACEAN_FREE',
    'MOLLUSK_FREE',
  ];

  return veganLabels.every((label) => labels.includes(label));
};

export default lookup;
