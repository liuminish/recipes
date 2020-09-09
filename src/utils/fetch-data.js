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

// GET all cooking styles

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

// POST/create meal types for recipe
fetchData.createRecipe = (recipeId, mealType) => {
  const url = `${baseUrl}/recipe/${recipeId}/meals`;
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({mealTypes: mealType})
  };
  return fetch(url, fetchOptions).then(response => {
    if (!response.ok) {
      return new Promise(resolve => resolve(null));
    }
    return response.json().then(jsonResponse => {
      return jsonResponse.mealType;
    });
  });
};

// POST/create cuisine types for recipe
fetchData.createRecipe = (recipeId, cuisineType) => {
  const url = `${baseUrl}/recipe/${recipeId}/cuisines`;
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({cuisineTypes: cuisineType})
  };
  return fetch(url, fetchOptions).then(response => {
    if (!response.ok) {
      return new Promise(resolve => resolve(null));
    }
    return response.json().then(jsonResponse => {
      return jsonResponse.cuisineType;
    });
  });
};

// POST/create cooking styles for recipe
fetchData.createRecipe = (recipeId, cookingStyle) => {
  const url = `${baseUrl}/recipe/${recipeId}/styles`;
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({cookingStyles: cookingStyle})
  };
  return fetch(url, fetchOptions).then(response => {
    if (!response.ok) {
      return new Promise(resolve => resolve(null));
    }
    return response.json().then(jsonResponse => {
      return jsonResponse.cookingStyle;
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

// PUT/update meal type for one recipe
fetchData.updateRecipe = (recipeId, mealType) => {
  const url = `${baseUrl}/recipes/${recipeId}`;
  const fetchOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({mealType: mealType})
  };
  return fetch(url, fetchOptions).then(response => {
    if (!response.ok) {
      return new Promise(resolve => resolve(null));
    }
    return response.json().then(jsonResponse => {
      return jsonResponse.mealType;
    });
  });
};

// PUT/update cuisine type for one recipe
fetchData.updateRecipe = (recipeId, cuisineType) => {
  const url = `${baseUrl}/recipes/${recipeId}`;
  const fetchOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({cuisineTypes: cuisineType})
  };
  return fetch(url, fetchOptions).then(response => {
    if (!response.ok) {
      return new Promise(resolve => resolve(null));
    }
    return response.json().then(jsonResponse => {
      return jsonResponse.cuisineType;
    });
  });
};

// PUT/update cooking style for one recipe
fetchData.updateRecipe = (recipeId, cookingStyle) => {
  const url = `${baseUrl}/recipes/${recipeId}`;
  const fetchOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({cookingStyles: cookingStyle})
  };
  return fetch(url, fetchOptions).then(response => {
    if (!response.ok) {
      return new Promise(resolve => resolve(null));
    }
    return response.json().then(jsonResponse => {
      return jsonResponse.cookingStyle;
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