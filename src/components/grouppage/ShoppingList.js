import React, {Component} from 'react';
import {BASEURL, PORT} from '../../Constants';
import axios from 'axios';
import Icon from '../independent/Icon';
import PropTypes from 'prop-types';

/**
 * This component will return a li element with a shoppinglistname. Clicking
 * it will go to the detail page of that shoppinglist, and all the information
 * about items and prices will be viewed there. This is only one clickable list
 * element contained in the ShoppingListView component.
 */
export class ShoppingList extends Component {
    state = {
      items: [],
    }

    /**
     * This function gets all the possible items from the API and database
     */
    getItems = () => {
      axios.get(`http://${BASEURL}:${PORT}/items`)
          .then((response) => {
            this.setState({items: response.data});
          }).catch();
    }

    /**
     * The render method takes in the id and name of the given list, and
     * displays the name of the list in the element. Clicking the element
     * will send the id up the ladder to be handled.
     * @return {HTMLElement} - the li element containing the listname
     */
    render() {
      const {listid, listname} = this.props.shoppingList;
      if (this.props.isTest) this.getItems();
      return (
        <li className="clickable"
          onClick={this.props.listClickHandler.bind(this, listid)}>
          <Icon name="shoppingCart" fill="white" />
          <span style={{marginLeft: '5px'}}>{listname}</span>
        </li>
      );
    }
}

ShoppingList.propTypes = {
  shoppingList: PropTypes.object,
  listClickHandler: PropTypes.func,
  isTest: PropTypes.bool,
};

export default ShoppingList;
