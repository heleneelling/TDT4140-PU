import React, {Component} from 'react';
import Icon from '../independent/Icon';
import PropTypes from 'prop-types';

/**
 * This component is the one that takes in the input from the user considering
 * a new shoppinglists name. It will pass the name up the ladder so that
 * a POST request may be made.
 */
export class AddShoppingList extends Component {
    state = {
      shoppingListName: '',
    }

    /**
     * This function is called whenever the inputs change.
     * @param {Event} e - The event to be changed in onChange.
     */
    onChange = (e) => {
      this.setState({[e.target.name]: e.target.value});
    }

    /**
     * Function runs when the button is clicked, it
     * sends the input up the ladder to group-page
     * @param {Event} e - The event of the submit btn.
     */
    onSubmit = (e) => {
      e.preventDefault();
      this.props.addShoppingList(this.state.shoppingListName);
      document.getElementById('shoppingListInput').value = '';
    }

    /**
     * Renders the form which the user interracts with to add a new
     * shoppinglist to a given group.
     * @return {HTMLElement} - the shoppinglist form
     */
    render() {
      return (
        <form onSubmit={this.onSubmit}>
          <div className="inlineFlex">
            <input id="shoppingListInput" name="shoppingListName"
              type="text" placeholder="Navn på ny handleliste..."
              onChange={this.onChange} />
            <label htmlFor="shoppingListName"></label>
            <button type="submit" name="addShoppingList">
              <Icon name="shoppingCartAdd" />
            </button>
          </div>
        </form>
      );
    }
}

AddShoppingList.propTypes = {
  addShoppingList: PropTypes.func,
};

export default AddShoppingList;
