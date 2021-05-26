import express from 'express';
import dotenv from 'dotenv';
import got from 'got';

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

const id = process.env.APP_ID;
const key = process.env.APP_KEY;

const lookup = async() => {
	try {
		const response = await got(`https://api.edamam.com/api/food-database/v2/parser?upc=012000001291&app_id=${id}&app_key=${key}`);
		console.log(response.body);
	} catch (error) {
		console.log(error.response.body);
	}
};

app.get("/", (req, res) => {
    lookup();
    got.get(`https://api.edamam.com/api/food-database/v2/parser?upc=012000001291&app_id=${id}&app_key=${key}`, {responseType: 'json'})
        .then(res => {
            const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
            console.log('Status Code:', res.statusCode);
            console.log('Date in Response header:', headerDate);
            console.log(JSON.stringify(res.body));
        })
        .catch(err => {
            console.log('Error: ', err.message);
        });
})

app.listen(port, () => {console.log(`Server is running on port ${port}!`)})