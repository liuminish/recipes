import 'whatwg-fetch';

const fetchData = {};
const baseUrl = 'http://localhost:4000/api';

// GET all recipes (with minimum information)
fetchData.getAllRecipes = () => {
  const url = `${baseUrl}/recipes`;

  return fetch(url).then(response => {
    if (!response.ok) {
      return new Promise(resolve => resolve([]));
    }
    return response.json().then(jsonResponse => {
      return jsonResponse.recipes.map(recipe => {
        return {
          id: recipe.id,
          name: recipe.name,
          image: recipe.image,
          time: recipe.time,
          servings: recipe.servings,
          cuisineType: recipe.cuisine_type,
          mealType: recipe.meal_type,
          cookingStyle: recipe.cooking_style,
          notes: recipe.notes
        };
      });
    });
  });
};

// GET all cuisine types

fetchData.getAllCuisineTypes = () => {
  const url = `${baseUrl}/cuisine-types`;

  return fetch(url).then(response => {
    if (!response.ok) {
      return new Promise(resolve => resolve([]));
    }
    return response.json().then(jsonResponse => {
      return jsonResponse
    });
  });
}

// GET all meal types

fetchData.getAllMealTypes = () => {
  const url = `${baseUrl}/meal-types`;

  return fetch(url).then(response => {
    if (!response.ok) {
      return new Promise(resolve => resolve([]));
    }
    return response.json().then(jsonResponse => {
      return jsonResponse
    });
  });
}

// GET all cooking styles

fetchData.getAllCookingStyles = () => {
  const url = `${baseUrl}/cooking-styles`;

  return fetch(url).then(response => {
    if (!response.ok) {
      return new Promise(resolve => resolve([]));
    }
    return response.json().then(jsonResponse => {
      return jsonResponse
    });
  });
}

// GET one recipe
fetchData.getRecipe = recipeId => {
  const url = `${baseUrl}/recipes/${recipeId}`;
  return fetch(url).then(response => {
    if (!response.ok) {
      return new Promise(resolve => resolve(null));
    }
    return response.json().then(jsonResponse => {
      return jsonResponse.recipe;
    });
  });
};

// POST/create one recipe
fetchData.createRecipe = recipe => {
  const url = `${baseUrl}/recipe`;
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({recipe: recipe})
  };
  return fetch(url, fetchOptions).then(response => {
    if (!response.ok) {
      return new Promise(resolve => resolve(null));
    }
    return response.json().then(jsonResponse => {
      return jsonResponse.recipe;
    });
  });
};

// POST/create ingredients for recipe
fetchData.createRecipe = (recipeId, ingredient) => {
  const url = `${baseUrl}/recipe/${recipeId}/ingredients`;
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ingredient: ingredient})
  };
  return fetch(url, fetchOptions).then(response => {
    if (!response.ok) {
      return new Promise(resolve => resolve(null));
    }
    return response.json().then(jsonResponse => {
      return jsonResponse.ingredient;
    });
  });
};

// POST/create instructions for recipe
fetchData.createRecipe = (recipeId, instruction) => {
  const url = `${baseUrl}/recipe/${recipeId}/instructions`;
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({instruction: instruction})
  };
  return fetch(url, fetchOptions).then(response => {
    if (!response.ok) {
      return new Promise(resolve => resolve(null));
    }
    return response.json().then(jsonResponse => {
      return jsonResponse.instruction;
    });
  });
};

// PUT/update one recipe
fetchData.updateRecipe = recipe => {
  const url = `${baseUrl}/recipes/${recipe.id}`;
  const fetchOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({recipe: recipe})
  };
  return fetch(url, fetchOptions).then(response => {
    if (!response.ok) {
      return new Promise(resolve => resolve(null));
    }
    return response.json().then(jsonResponse => {
      return jsonResponse.recipe;
    });
  });
};

// DELETE one recipe
fetchData.deleteRecipe = recipeId => {
  const url = `${baseUrl}/recipes/${recipeId}`;
  const fetchOptions = {
    method: 'DELETE'
  };
  return fetch(url, fetchOptions);
};


export default fetchData;