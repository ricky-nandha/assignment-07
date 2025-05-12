import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

dotenv.config();

const db = new pg.Pool({
  connectionString: process.env.DATABASE_CONNECTION_STRING,
});

app.get("/", (req, res) => {
  res.json("root route");
});

app.get("/film-reviews", async function (req, res) {
  const filmReviews = await db.query(`SELECT * FROM film_reviews`);
  res.json(filmReviews.rows);
});

app.post("/film-reviews", async function (request, response) {
  console.log("POST route of /film-reviews has been hit");

  console.log("The request body is: ", request.body);

  const formValues = request.body;

  const dbResponse = await db.query(
    `
    INSERT INTO film_reviews 
    (title, rating, review, watching_experience) 
    VALUES ($1, $2, $3, $4)`,
    [
      formValues.filmTitle,
      formValues.filmRating,
      formValues.filmReview,
      formValues.filmWatching,
    ]
  );
});

app.get("/film-reviewsratingquery", async function (request, response) {
  const yearQuery = request.query.year;
  const queriedFilms = await db.query(
    `SELECT * FROM film_reviews WHERE rating = $1`,
    [queriedFilms]
  );
  console.log(queriedFilms.rows);

  response.json(queriedFilms.rows);
});

app.listen(PORT, function () {
  console.log(`the server is on ${PORT}`);
});
