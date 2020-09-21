import React from 'react';
import './App.css';

// import main components
import { Topbar, Menu } from '../navibar/Navibar';
import Searchbar from '../searches/searchbar/Searchbar'
import Mainpage from '../main-page/MainPage';

// import other components
import AllRecipes from '../recipes/recipe-list-page/AllRecipes';
import SearchResults from '../recipes/recipe-list-page/SearchResults';
import RecipePage from '../recipes/single-recipe-page/RecipePage';
import SearchByRecipe from '../searches/search-by/SearchByRecipe';
import SearchByIngre from '../searches/search-by/SearchByIngre';
import AddRecipe from '../add-recipe/AddRecipe';

// import requests
import fetchData from '../../utils/fetch-data';

// sample image file
import UploadLogo from '../../media/upload_logo.png';

import { Switch, Route } from 'react-router-dom';
import { RiLoader5Fill } from "react-icons/ri";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      recipeTotal: null,
      searchedRecipes: [],
      searchTerm: {},

      cuisineTypes: [],
      mealTypes: [],
      cookingStyles: [],
      units: [],

      currentRecipe: {},
    
      cuisine: 'all',
      isFetching: false,
      isEdit: false,
      isDuplicate: false,
    };

    this.getFullRecipe = this.getFullRecipe.bind(this);
    this.getAllRecipes = this.getAllRecipes.bind(this);
    this.searchRecipes = this.searchRecipes.bind(this);

    this.changeAll = this.changeAll.bind(this);
    this.changeCuisine = this.changeCuisine.bind(this);

    this.isEditMode = this.isEditMode.bind(this);
    this.isDuplicateMode = this.isDuplicateMode.bind(this);
    this.resetModes = this.resetModes.bind(this);
  }

  // requesting full info for one recipe
  getFullRecipe(recipeId) {
    fetchData.getRecipe(recipeId).then(recipe => {

      // setting default image if there is no image uploaded
      if (recipe.image === '') {
          recipe.image = UploadLogo;
      }

      // changing cuisine types to array
      let cuisineList = recipe.cuisine_type.split(',');
      cuisineList = cuisineList.map(string => Number(string));
      
      const newCuisineList = [];
      
      cuisineList.map(number => {
        return this.state.cuisineTypes.map(cuisineType => {
          if (cuisineType.id === number) {
            return newCuisineList.push(cuisineType.type)
          } else {
            return null;
          }
        })
      })

      delete recipe.cuisine_type;
      recipe.cuisineType = newCuisineList;

      // changing meal types to array
      let mealList = recipe.meal_type.split(',');
      mealList = mealList.map(string => Number(string));
      
      const newMealList = [];
      
      mealList.map(number => {
        return this.state.mealTypes.map(mealType => {
          if (mealType.id === number) {
            return newMealList.push(mealType.type)
          } else {
            return null;
          }
        })
      })

      delete recipe.meal_type;
      recipe.mealType = newMealList;

      // changing cooking styles to array
      let styleList = recipe.cooking_style.split(',');
      styleList = styleList.map(string => Number(string));
      
      const newStyleList = [];
      
      styleList.map(number => {
        return this.state.cookingStyles.map(cookingStyle => {
          if (cookingStyle.id === number) {
            return newStyleList.push(cookingStyle.type)
          } else {
            return null;
          }
        })
      })

      delete recipe.cooking_style;
      recipe.cookingStyle = newStyleList;

      // changing ingredients to an array of objects
      let ingredientData = recipe.ingredients.split(',');
      const ingredientArray = [];
      ingredientData.map(string => {
        const array = string.split('-');
        const object = {
          amount: Number(array[0]),
          unit: array[1],
          ingredient: array[2]
        }
        return ingredientArray.push(object)
      })

      recipe.ingredients = ingredientArray;

      // changing instructions to an array
      recipe.instructions = recipe.instructions.split('&');

      // setting state for current recipe
      this.setState({currentRecipe: recipe})
    })
  }

  // requesting all recipes
  getAllRecipes() {
    
    fetchData.getAllRecipes('').then(allRecipes => {

      // setting default image if there is no image uploaded
      allRecipes.map(recipe => {
        if (recipe.image === '') {
          return recipe.image = UploadLogo;
        } else {
          return null;
        }
      })

      // converting requested data to format needed at frontend
      allRecipes.map(recipe => {

        // changing cuisine types to array
        let cuisineData = recipe.cuisineType.split(',');
        cuisineData = cuisineData.map(string => Number(string));
        const cuisineArray = [];
        cuisineData.map(number => {
          return this.state.cuisineTypes.map(cuisineType => {
            if (cuisineType.id === number) {
              return cuisineArray.push(cuisineType.type)
            } else {
              return null;
            }
          })
        })

        recipe.cuisineType = cuisineArray;

        // changing meal types to array
      
        let mealData = recipe.mealType.split(',');
        mealData = mealData.map(string => Number(string));
        const mealArray = [];
        mealData.map(number => {
          return this.state.mealTypes.map(mealType => {
            if (mealType.id === number) {
              return mealArray.push(mealType.type)
            } else {
              return null;
            }
          })
        })

       recipe.mealType = mealArray;

       // changing cooking styles to array
        let styleData = recipe.cookingStyle.split(',');
        styleData = styleData.map(string => Number(string));
        const styleArray = [];
        styleData.map(number => {
          return this.state.cookingStyles.map(cookingStyle => {
            if (cookingStyle.id === number) {
              return styleArray.push(cookingStyle.type)
            } else {
              return null;
            }
          })
        })

        recipe.cookingStyle = styleArray;

        // changing ingredients to an array of objects
        let ingredientData = recipe.ingredients.split(',');
        const ingredientArray = [];
        ingredientData.map(string => {
          const array = string.split('-');
          const object = {
            amount: Number(array[0]),
            unit: array[1],
            ingredient: array[2]
          }
          return ingredientArray.push(object)
        })

        recipe.ingredients = ingredientArray;

        // changing instructions to an array
        return recipe.instructions = recipe.instructions.split('&');

      })
      
      // setting recipes state
      this.setState({recipes: allRecipes})
    })
  }

  // searching recipes
  searchRecipes(searchObject, searchTerm) {
    this.setState({
      isFetching: true,
      searchTerm: searchTerm
    })
    fetchData.getAllRecipes(searchObject).then(searchedRecipes => {

      // setting default image if there is no image uploaded
      searchedRecipes.map(recipe => {
        if (recipe.image === '') {
          return recipe.image = UploadLogo;
        } else {
          return null;
        }
      })

      // converting requested data to format needed at frontend
      searchedRecipes.map(recipe => {

        // changing cuisine types to array
        let cuisineData = recipe.cuisineType.split(',');
        cuisineData = cuisineData.map(string => Number(string));
        const cuisineArray = [];
        cuisineData.map(number => {
          return this.state.cuisineTypes.map(cuisineType => {
            if (cuisineType.id === number) {
              return cuisineArray.push(cuisineType.type)
            } else {
              return null;
            }
          })
        })

        recipe.cuisineType = cuisineArray;

        // changing meal types to array
      
        let mealData = recipe.mealType.split(',');
        mealData = mealData.map(string => Number(string));
        const mealArray = [];
        mealData.map(number => {
          return this.state.mealTypes.map(mealType => {
            if (mealType.id === number) {
              return mealArray.push(mealType.type)
            } else {
              return null;
            }
          })
        })

       recipe.mealType = mealArray;

       // changing cooking styles to array
        let styleData = recipe.cookingStyle.split(',');
        styleData = styleData.map(string => Number(string));
        const styleArray = [];
        styleData.map(number => {
          return this.state.cookingStyles.map(cookingStyle => {
            if (cookingStyle.id === number) {
              return styleArray.push(cookingStyle.type)
            } else {
              return null;
            }
          })
        })

        recipe.cookingStyle = styleArray;

        // changing ingredients to an array of objects
        let ingredientData = recipe.ingredients.split(',');
        const ingredientArray = [];
        ingredientData.map(string => {
          const array = string.split('-');
          const object = {
            amount: Number(array[0]),
            unit: array[1],
            ingredient: array[2]
          }
          return ingredientArray.push(object)
        })

        recipe.ingredients = ingredientArray;

        // changing instructions to an array
        return recipe.instructions = recipe.instructions.split('&');

      })
      
      // setting recipes state
      this.setState({
        searchedRecipes: searchedRecipes,
        cuisine: 'all'
      })
    }).then(
      this.setState({isFetching: false})
    )
  }

  // initial requesting of data when app is loaded
  async componentDidMount() {
    this.setState({ isFetching: true })
    const { cuisineTypes } = await fetchData.getAllCuisineTypes()
    const { mealTypes } = await fetchData.getAllMealTypes()
    const { cookingStyles } = await fetchData.getAllCookingStyles()
    const { units } = await fetchData.getAllUnits()
    const recipeTotal = await fetchData.getRecipeTotal()

    this.setState({
      cuisineTypes,
      mealTypes,
      cookingStyles,
      units,
      recipeTotal,
      isFetching: false,
    })

  }

  // set state of current recipe
  setCurrentRecipe(recipe) {
    this.setState({currentRecipe: recipe})
  }

  // updating state of cuisine so display of "all recipe" will change according to cuisine clicked
  changeAll() {
    this.setState({
      cuisine: 'all'
    })
  }

  changeCuisine(cuisine) {
    this.setState({
      cuisine: cuisine
    })
  }

  // change state when in edit mode
  isEditMode() {
    console.log('edit!!')
    this.setState({isEdit: true})
  }

  // change state when in duplicate mode
  isDuplicateMode() {
    this.setState({isDuplicate: true})
  }

  // reset states after editing/adding
  resetModes() {
    this.setState({
      isEdit: false,
      isDuplicate: false
    })
  }

  render() {
    if (this.state.isFetching) {
      return (
        <div className="loading-screen">
          <RiLoader5Fill />
        </div>
      )
    }
    return (
      <div className="App">
        <Topbar />

        <Menu 
          changeAll={this.changeAll}
          changeCuisine={this.changeCuisine}
          cuisineTypes={this.state.cuisineTypes}
        />

        <Searchbar 
          searchRecipes={this.searchRecipes}
        />

        <Switch>

          <Route path='/' exact>
            <Mainpage 
              recipes={this.state.recipes}
              recipeTotal={this.state.recipeTotal}
              searchRecipes={this.searchRecipes}
            />
          </Route>

          <Route path='/all-recipes'>
            <AllRecipes
              cuisine={this.state.cuisine} 
              recipes={this.state.recipes}
              getAllRecipes={this.getAllRecipes}
            />
          </Route>

          <Route path='/recipe-page/:recipeId'>
            <RecipePage
              currentRecipe={this.state.currentRecipe}
              getFullRecipe={this.getFullRecipe}
              isEditMode={this.isEditMode}
              isDuplicateMode={this.isDuplicateMode}
            />
          </Route>

          <Route path='/search-by-recipe'>
            <SearchByRecipe 
              cuisineTypes={this.state.cuisineTypes}
              mealTypes={this.state.mealTypes}
              cookingStyles={this.state.cookingStyles}
              searchRecipes={this.searchRecipes}
            />
          </Route>

          <Route path='/search-by-ingre'>
            <SearchByIngre 
              searchRecipes={this.searchRecipes}
            />
          </Route>

          <Route path='/add-edit-recipe'>
            <AddRecipe 
              currentRecipe={this.state.currentRecipe}
              isEdit={this.state.isEdit}
              isDuplicate={this.state.isDuplicate}
              cuisineTypes={this.state.cuisineTypes}
              mealTypes={this.state.mealTypes}
              cookingStyles={this.state.cookingStyles}
              units={this.state.units}
              isFetching={this.state.isFetching}
              getAllRecipes={this.getAllRecipes}
              resetModes={this.resetModes}
            />
          </Route>

          <Route path='/search-results'>
            <SearchResults 
              cuisine={this.state.cuisine} 
              searchedRecipes={this.state.searchedRecipes}
              searchTerm={this.state.searchTerm}
              isFetching={this.state.isFetching}
            />
          </Route>

        </Switch>
      </div>
    )
    
  }
}

export default App;
