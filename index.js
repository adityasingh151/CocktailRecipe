import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

// Route to render the index page
app.get("/", async (req, res) => {
    try {
        const cocktail = await getRandomCocktail();
        res.render("index", { cocktail });
    } catch (error) {
        console.error('Error rendering index page:', error);
        res.status(500).send('Error rendering index page. Please try again later.');
    }
});

// Function to fetch a random cocktail from the CocktailDB API
async function getRandomCocktail() {
    try {
        const response = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/random.php");
        return response.data.drinks[0];
    } catch (error) {
        throw new Error('Error fetching random cocktail:', error);
    }
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
