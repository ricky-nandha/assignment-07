console.log("Hello films!");

const myFilmForm = document.getElementById("film-form");

myFilmForm.addEventListener("submit", handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();

  const data = new FormData(myFilmForm);
  const formValues = Object.fromEntries(data);

  console.log(formValues);

  const serverResponse = await fetch(
    "https://assignment-07-server.onrender.com/film-reviews",
    {
      method: "POST",
      body: JSON.stringify(formValues),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const parsedResponse = await serverResponse.json();

  console.log("The parsed servers response is: ", parsedResponse);

  if (parsedResponse.success === true) {
    myFilmForm.reset();

    getAndRenderFilms();
  }
}
const filmsContainer = document.getElementById("films-container");

async function getAndRenderFilms() {
  const response = await fetch(
    "https://assignment-07-server.onrender.com/film-reviews"
  );
  const data = await response.json();
  console.log(data);

  filmsContainer.innerHTML = "";

  data.reverse().forEach(function (individualReview) {
    const reviewDiv = document.createElement("div");
    const rating = document.createElement("p");
    const review = document.createElement("p");
    const watchingExperience = document.createElement("p");
    const title = document.createElement("h2");

    const starCount = Number(individualReview.rating);
    rating.innerHTML = "⭐".repeat(starCount);

    review.textContent = individualReview.review;
    watchingExperience.textContent = individualReview.watching_experience;
    title.textContent = individualReview.title;

    reviewDiv.append(title, rating, review, watchingExperience);
    filmsContainer.appendChild(reviewDiv);
  });
}

getAndRenderFilms();
