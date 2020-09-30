import 'whatwg-fetch';

const fetchData = {};
let baseUrl = '';
if (window.location.hostname.includes('localhost')) {
  baseUrl = 'http://localhost:4000/api'
} else {
  baseUrl = 'https://api.recipes.liumin.dev/api'
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

// GET all units
fetchData.getAllUnits = () => {
  const url = `${baseUrl}/units`;

  return fetch(url).then(response => {
    if (!response.ok) {
      return new Promise(resolve => resolve([]));
    }
    return response.json().then(jsonResponse => {
      return jsonResponse
    });
  });
}

// GET total number of recipes
fetchData.getRecipeTotal = () => {
  const url = `${baseUrl}/recipes/total`;

  return fetch(url).then(response => {
    if (!response.ok) {
      return new Promise(resolve => resolve([]));
    }
    return response.json().then(jsonResponse => {
      return jsonResponse[0][Object.keys(jsonResponse[0])[0]]
    });
  });
}

// GET all recipes
fetchData.getAllRecipes = (searchObject) => {
  let searchTerm = '';

  if (searchObject.cuisineType) {

    const cuisineTerm = searchObject.cuisineType.reduce((acc, curr) => {
      const str = `cuisineType=${curr}`
      if (acc) {
        return acc = acc + '&' + str
      } else
      return str
    }, '')

    const mealTerm = searchObject.mealType.reduce((acc, curr) => {
      const str = `mealType=${curr}`
      if (acc) {
        return acc = acc + '&' + str
      } else
      return str
    }, '')

    const styleTerm = searchObject.cookingStyle.reduce((acc, curr) => {
      const str = `cookingStyle=${curr}`
      if (acc) {
        return acc = acc + '&' + str
      } else
      return str
    }, '')

    searchTerm = `?name=${searchObject.name}&${cuisineTerm}&${mealTerm}&${styleTerm}`;
    
  } else if (searchObject.inclIngre || searchObject.exclIngre) {

    const inclIngreTerm = searchObject.inclIngre.reduce((acc, curr) => {
      curr = curr.split(' ').join('+');
      const str = `inclIngre=${curr}`
      if (acc) {
        return acc = acc + '&' + str
      } else
      return str
    }, '')

    const exclIngreTerm = searchObject.exclIngre.reduce((acc, curr) => {
      curr = curr.split(' ').join('+');
      const str = `exclIngre=${curr}`
      if (acc) {
        return acc = acc + '&' + str
      } else
      return str
    }, '')

    searchTerm = `?name=${searchObject.name}&${inclIngreTerm}&${exclIngreTerm}`;
  }  else if (searchObject.name) {
    searchTerm = `?name=${searchObject.name}`
  }

  const url = `${baseUrl}/recipes${searchTerm}`;

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
          ingredients: recipe.ingredients,
          instructions: recipe.instructions,
          notes: recipe.notes
        };
      });
    });
  });
};

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
  const url = `${baseUrl}/recipes`;
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

// POST/upload one image
fetchData.uploadImage = image => {
  const url = `${baseUrl}/images`;
  const formData = new FormData()
  formData.append('myImage', image)

  const fetchOptions = {
    method: 'POST',
    body: formData,
  };

  return fetch(url, fetchOptions).then(response => {
    if (!response.ok) {
      return new Promise(resolve => resolve(null));
    }
    return response.json().then(jsonResponse => {
      return jsonResponse.name;
    });
  });
  
};

// GET one image
fetchData.downloadImage = fileName => {
  const url = `${baseUrl}/images/${fileName}`;
  return fetch(url).then(response => {
    if (!response.ok) {
      return new Promise(resolve => resolve(null));
    }

    return response;
  });
  
};

export default fetchData;