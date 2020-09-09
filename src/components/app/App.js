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
      currentRecipe: {},
      cuisine: 'all',
      isFetching: false
    };

    this.setCurrentRecipe = this.setCurrentRecipe.bind(this);
    this.setRandomRecipe = this.setRandomRecipe.bind(this);

    this.changeAll = this.changeAll.bind(this);
    this.changeChinese = this.changeChinese.bind(this);
    this.changeFilipino = this.changeFilipino.bind(this);
    this.changeThai = this.changeThai.bind(this);
    this.changeWestern = this.changeWestern.bind(this);
  }

  // initial requesting of data when app is loaded
  componentDidMount() {

    // requesting all recipes
    fetchData.getAllRecipes().then(allRecipes => {
      
      console.log(allRecipes)

      // setting default image if there is no image uploaded
      allRecipes.map(recipe => {
        if (recipe.image === '') {
          recipe.image = UploadLogo;
        }
      })
 
      // setting random current recipe for "surprise me!" page
      const numberOfRecipes = allRecipes.length;
      const randomRecipeId = Number(Math.floor((Math.random() * numberOfRecipes) + 1));
      const foundRecipe = allRecipes.find(recipe => recipe.id === randomRecipeId);
      this.setState({
        recipes: allRecipes,
        currentRecipe: foundRecipe
      })

    })
  }

  // updating state of cuisine so display of "all recipe" will change according to cuisine clicked
  changeAll() {
    this.setState({
      cuisine: 'all'
    })
  }

  changeChinese() {
    this.setState({
      cuisine: 'chinese'
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
    const foundRecipe = this.state.recipes.find(recipe => recipe.id === randomRecipeId);
    this.setState({
      currentRecipe: foundRecipe
    })
  }

  // updating state of current recipe so recipe page will show what is clicked
  setCurrentRecipe(event) {
    const id = Number(event.target.attributes.recipeId.value);
    const foundRecipe = this.state.recipes.find(recipe => recipe.id === id);
    this.setState({
      currentRecipe: foundRecipe
    });
  }

  render() {
    return (
      <div className="App">
        <Topbar />

        <Menu 
          changeAll={this.changeAll}
          changeChinese={this.changeChinese}
          changeFilipino={this.changeFilipino}
          changeThai={this.changeThai}
          changeWestern={this.changeWestern}
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
