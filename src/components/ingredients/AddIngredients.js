import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ConnectedAddIngredient } from './AddIngredient';
import { unselectedIngredients, findIngredientById } from '../../reducers/ingredients';

export class AddIngredients extends Component {
  constructor(props) {
    super(props);
  }

  handleOnSubmit(event) {
    event.preventDefault();
  }

  render(){
    const addIngredients = this.props.unselectedIngredients && this.props.unselectedIngredients
      .map(ingredient => {
        return <ConnectedAddIngredient {...ingredient} />
      });

    const ingredients = this.props.selectedIngredients && this.props.selectedIngredients
      .map(ingredient => {
        return <li>{ingredient.name}</li>
      });

    return(
      <div>
        <div>
          Ingredients
          {ingredients}
        </div>
        <div>
          Add More ingredients
          {addIngredients}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const selectedIngredients = state.recipeForm.ingredientIds.map(ingredientId => {
    return findIngredientById(ingredientId, state.ingredients);
  });

  return {ingredients: state.ingredients || [],
    selectedIngredients: selectedIngredients || [],
    unselectedIngredients: unselectedIngredients(state.ingredients, state.recipeForm.ingredientIds) || []}
};

export const ConnectedAddIngredients = connect(mapStateToProps)(AddIngredients);
