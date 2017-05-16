import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createIngredient } from '../../actions/ingredients';

export class IngredientsInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      calories: ''
    };
  }

  handleOnIngredientNameChange(event) {
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
    this.props.createIngredient(this.state);
  }

  render(){
    return(
      <form onSubmit={(event) => this.handleOnSubmit(event)}>
        <p><input type="text" onChange={this.handleOnIngredientNameChange.bind(this)}
                  placeholder="Ingredient name" /></p>
        <p><input type="text" onChange={this.handleOnCaloriesChange.bind(this)}
                  placeholder="Calories" /></p>

        <input type="submit" />
      </form>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    createIngredient: createIngredient
  }, dispatch);
};

export const ConnectedIngredientsInput = connect(null, mapDispatchToProps)(IngredientsInput);
