const input = document.querySelector('.search-bar');
const cards = document.querySelector('.recipe-cards');
const homeContainer = document.querySelector('.home-container');
let userInput = '';

let startIndex = 0;
let recipesPerPage = 9;

// Capturing user data
function userData(e) {
    userInput = e.value;
    console.log(userInput);
}

// Fetching API
const fetchRecipe = async () => {
    if (userInput === '') {
        alert("Enter a recipe to search!");
    } else {
        homeContainer.innerHTML = '';
        displayFetchingMessage();
        const url = `https://api.edamam.com/search?q=${userInput}&app_id=8dc19ce5&app_key=4b3c818552e58cf36d490f9670d8b6ea&from=${startIndex}&to=${startIndex + recipesPerPage}&calories=591-722&health=alcohol-free`;
        const data = await axios.get(url);
        console.log(data);
        input.value = '';
        createCards(data.data.hits);
    }
}

// Search button functionality
function search() {
    if (userInput === '')
        alert("Enter a recipe to search!");
    else
        fetchRecipe();
}

// Fetching recipe message
const displayFetchingMessage = () => {
    const messageDiv = document.createElement('div');
    messageDiv.innerHTML = 'Fetching Recipe...';
    messageDiv.classList.add('text-color-green', 'my-3', 'text-center', 'fs-1');
    homeContainer.appendChild(messageDiv);
}

// Create cards to display recipes
const createCards = (recipes) => {
    homeContainer.innerHTML = '';
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('row', 'p-1', 'pt-5', 'p-md-5');

    const recipeHeader = document.createElement("h3");
    recipeHeader.innerHTML = `${userInput.toUpperCase()} recipes`;
    recipeHeader.classList.add('text-color-green', 'mt-2', 'mt-md-2', 'mb-4', 'mb-md-5', 'text-center', 'fs-1');
    cardContainer.appendChild(recipeHeader);

    if (recipes.length === 0) {
        cardContainer.innerHTML = '';
        displayRecipeNotFound();
    }

    recipes.forEach((recipe, i) => {
        const { image, label, dishType, url, cuisineType } = recipe.recipe;

        const cardCol = document.createElement('div');
        cardCol.classList.add('col-12', 'col-md-4', 'mb-4', 'd-flex', 'justify-content-around');

        const card = document.createElement('div');
        card.classList.add('card');
        card.style.width = '19rem';

        card.innerHTML =
            `
            <img src="${image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${label}</h5>
                <p class="card-text">${cuisineType} ${dishType}</p>
                <a href="${url}" class="btn card-btn-clr" target="_blank">View Recipe</a>
            </div>
            `;

        cardCol.appendChild(card);
        cardContainer.appendChild(cardCol);
    });

    // Pagination
    const paginationDiv = document.createElement("div")
    paginationDiv.classList.add("pagination")

    const prevBtn = document.createElement('button')
    prevBtn.innerHTML = 'Prev'
    const nextBtn = document.createElement('button')
    nextBtn.innerHTML = 'Next'

    cardContainer.appendChild(paginationDiv)
    paginationDiv.append(prevBtn, nextBtn)

    cards.innerHTML = '';
    cards.appendChild(cardContainer);

    // Update the Next button click event handler
    nextBtn.addEventListener('click', () => {
        startIndex += recipesPerPage;
        fetchRecipe();
    });

    // Update the Previous button click event handler
    prevBtn.addEventListener('click', () => {
        if (startIndex >= recipesPerPage) {
            startIndex -= recipesPerPage;
            fetchRecipe();
        }
    })

    if (recipes.length === 0) {
        paginationDiv.classList.add('hide')
    }
}

const displayRecipeNotFound = () => {
    const div = document.createElement("div");
    div.classList.add("center-content");

    const img = document.createElement("img");
    img.src = './Images/search.png';

    const h3 = document.createElement('h3');
    h3.classList.add('text-color-white', 'mt-3');
    h3.innerHTML = 'No recipes found';

    div.append(img, h3);
    homeContainer.appendChild(div);
}
