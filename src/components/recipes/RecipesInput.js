import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addRecipe } from '../../actions/recipes';
import { AddIngredients } from '../ingredients/AddIngredients';

export class RecipesInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      calories: ''
    };
  }

  handleOnRecipeNameChange(event) {
    this.setState({
      name: event.target.value
    });
  }

  handleOnCaloriesChange(event) {
    this.setState({
      calories: event.target.value
    });
  }

  handleOnSubmit(event) {
    event.preventDefault();
    const recipe = Object.assign({}, this.state, {ingredientIds: this.props.selectedIngredients});
    this.props.addRecipe(recipe);
  }

  render(){
    return(
      <form onSubmit={(event) => this.handleOnSubmit(event)}>
        <p><input type="text" onChange={this.handleOnRecipeNameChange.bind(this)}
                  placeholder="Recipe name" /></p>
        <p><input type="text" onChange={this.handleOnCaloriesChange.bind(this)}
                  placeholder="Calories" /></p>

        <AddIngredients />
        <input type="submit" />
      </form>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addRecipe: addRecipe
  }, dispatch);
};

const mapStateToProps = (state) => {
  return { selectedIngredients: state.recipeForm.ingredientIds };
};

export const ConnectedRecipesInput = connect(mapStateToProps, mapDispatchToProps)(RecipesInput);
