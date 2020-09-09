import React from 'react';
import './App.css';

// import main components
import { Topbar, Menu } from '../navibar/navibar';
import Searchbar from '../searches/searchbar/searchbar'
import Mainpage from '../main-page/main-page';

// import other components
import AllRecipes from '../recipes/recipe-list-page/all-recipes';
import RecipePage from '../recipes/single-recipe-page/recipe-page';
import SearchByRecipe from '../searches/search-by/search-by-recipe';
import SearchByIngre from '../searches/search-by/search-by-ingre';
import AddRecipe from '../add-recipe/add-recipe';

// import requests
import fetchData from '../../utils/fetch-data';

// sample image file
import UploadLogo from '../../media/upload_logo.png';

import { Switch, Route } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      cuisineTypes: [],
      mealTypes: [],
      cookingStyles: [],

      currentRecipe: {},
    
      cuisine: 'all',
      isFetching: false
    };

    this.setCurrentRecipe = this.setCurrentRecipe.bind(this);
    this.setRandomRecipe = this.setRandomRecipe.bind(this);

    this.changeAll = this.changeAll.bind(this);
    this.changeCuisine = this.changeCuisine.bind(this);
  }

  // function for requesting full info for one recipe
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
        this.state.cuisineTypes.map(cuisineType => {
          if (cuisineType.id === number) {
            newCuisineList.push(cuisineType.type)
          } else {
            return;
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
        this.state.mealTypes.map(mealType => {
          if (mealType.id === number) {
            newMealList.push(mealType.type)
          } else {
            return;
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
        this.state.cookingStyles.map(cookingStyle => {
          if (cookingStyle.id === number) {
            newStyleList.push(cookingStyle.type)
          } else {
            return;
          }
        })
      })

      delete recipe.cooking_style;
      recipe.cookingStyle = newStyleList;

      // setting state for current recipe
      this.setState({currentRecipe: recipe})
    })
  }



  // initial requesting of data when app is loaded
  componentDidMount() {

    // requesting cuisine types & setting state
    fetchData.getAllCuisineTypes().then(response => {
      this.setState({cuisineTypes: response.cuisineTypes})
    })

    // requesting meal types & setting state
    fetchData.getAllMealTypes().then(response => {
      this.setState({mealTypes: response.mealTypes})
    })

    // requesting cooking styles & setting state
    fetchData.getAllCookingStyles().then(response => {
      this.setState({cookingStyles: response.cookingStyles})
    })

    // requesting all recipes
    fetchData.getAllRecipes().then(allRecipes => {

      // setting default image if there is no image uploaded
      allRecipes.map(recipe => {
        if (recipe.image === '') {
          recipe.image = UploadLogo;
        }
      })

      // changing cuisine types to array

      allRecipes.map(recipe => {
        let array = recipe.cuisineType.split(',');
        array = array.map(string => Number(string));
        
        const newArray = [];
        
        array.map(number => {
          this.state.cuisineTypes.map(cuisineType => {
            if (cuisineType.id === number) {
              newArray.push(cuisineType.type)
            } else {
              return;
            }
          })
        })

        recipe.cuisineType = newArray;
      })

      // changing meal types to array

      allRecipes.map(recipe => {
        let array = recipe.mealType.split(',');
        array = array.map(string => Number(string));
        
        const newArray = [];
        
        array.map(number => {
          this.state.mealTypes.map(mealType => {
            if (mealType.id === number) {
              newArray.push(mealType.type)
            } else {
              return;
            }
          })
        })

        recipe.mealType = newArray;
      })

      // changing cooking styles to array

      allRecipes.map(recipe => {
        let array = recipe.cookingStyle.split(',');
        array = array.map(string => Number(string));
        
        const newArray = [];
        
        array.map(number => {
          this.state.cookingStyles.map(cookingStyle => {
            if (cookingStyle.id === number) {
              newArray.push(cookingStyle.type)
            } else {
              return;
            }
          })
        })

        recipe.cookingStyle = newArray;
      })
      
      // setting recipes state
      this.setState({recipes: allRecipes})
    })

    // setting random current recipe for "surprise me!" page
    const numberOfRecipes = this.state.recipes.length;
    const randomRecipeId = Number(Math.floor((Math.random() * numberOfRecipes) + 1));
    this.getFullRecipe(randomRecipeId);
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

  changeFilipino() {
    this.setState({
      cuisine: 'filipino'
    })
  }

  changeThai() {
    this.setState({
      cuisine: 'thai'
    })
  }

  changeWestern() {
    this.setState({
      cuisine: 'western'
    })
  }


  // setting random current recipe for "surprise me!" page when clicked
  setRandomRecipe() {
    const numberOfRecipes = this.state.recipes.length;
    const randomRecipeId = Number(Math.floor((Math.random() * numberOfRecipes) + 1));
    this.getFullRecipe(randomRecipeId);
  }

  // updating state of current recipe so recipe page will show what is clicked
  setCurrentRecipe(event) {
    const id = Number(event.target.attributes.recipeId.value);
    this.getFullRecipe(id);
  }

  render() {
    return (
      <div className="App">
        <Topbar />

        <Menu 
          changeAll={this.changeAll}
          changeCuisine={this.changeCuisine}
          cuisineTypes={this.state.cuisineTypes}
        />

        <Searchbar />

        <Switch>

          <Route path='/' exact>
            <Mainpage randomRecipe={this.setRandomRecipe} />
          </Route>

          <Route path='/all-recipes'>
            <AllRecipes recipes={this.state.recipes} setCurrentRecipe={this.setCurrentRecipe} cuisine={this.state.cuisine} />
          </Route>

          <Route path='/recipe-page'>
            <RecipePage recipe={this.state.currentRecipe} setCurrentRecipe={this.setCurrentRecipe} />
          </Route>

          <Route path='/search-by-recipe'>
            <SearchByRecipe />
          </Route>

          <Route path='/search-by-ingre'>
            <SearchByIngre />
          </Route>

          <Route path='/add-recipe'>
            <AddRecipe />
          </Route>

        </Switch>
      </div>
    )
  }
}

export default App;
