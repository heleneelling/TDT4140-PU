import React, { Component } from 'react';
import Icon from '../independent/Icon';
import axios from 'axios';
import { BASEURL, PORT } from '../../Constants';
import PropTypes from 'prop-types';

/**
 * This component is the component which displays the items in the shoppinglist.
 * It will display differently depending on multiple things, such as editmode,
 * whether is is checked as bought or not, and the picture of the item.
 */
export class Item extends Component {
  state = {
    checked: this.props.item.isChecked,
  }

  /**
   * This function will set the checked-state to whatever the
   * checkOrUncheckItem from props returns.
   */
  check = () => {
    this.setState({
      checked:
        this.props.checkOrUncheckItem(this.props.item),
    });
  }

  /**
   * This function will delete the chosen item from the current list. It will
   * send a DELETE request to the api with the itemid and listid. It will then
   * update the shoppinglist to show the changes.
   */
  removeItemFromList = () => {
    const itemid = this.props.item.itemid;
    const listid = this.props.selectedList.listid;
    axios.get(`http://${BASEURL}:${PORT}/iteminlist?ItemID=${itemid}
        &ListID=${listid}`)
      .then((response) => {
        const relationid = response.data[0].id;
        axios.delete(`http://${BASEURL}:${PORT}/iteminlist/
                ${relationid}`).then(() =>
          this.props.getShoppingListItems());
      }).catch();
  }

  /**
   * The render function for the item will take in the itemname, price,
   * isChecked boolean and the path for the image to display. It will then
   * bind the itemClickHandler to the itemid and send this up the ladder.
   * If the item is checked as bought, the item name will have a line through.
   * All items have different imagepaths, which will display different images.
   * Whether the editmode is in check or delete (true/false) different icons
   * will be rendered at each item. These icons will also have different¨
   * functionality when clicked.
   * @return {HTMLElement} - the li element for the item in the shoppinglist.
   */
  render() {
    const { itemname, price, isChecked, imagepath } = this.props.item;
    return (
      <li className="inlineFlex"
        onClick={this.props.itemClickHandler.bind(this,
          this.props.item)}>
        <span style={isChecked ? { textDecoration: 'line-through' } :
          undefined}>
          {itemname} <img style={{ width: '50px', height: '50px' }}
            src={`/images/${imagepath.toLowerCase()}`}
            alt={itemname} />
        </span>
        <div className="inlineFlex">
          {price}kr
            <button
            style={{ margin: '0px 0px 0px 5px' }}
            className={this.props.editMode ? 'redButton' :
              (isChecked ? 'selected' : undefined)}
            onClick={this.props.editMode ? () =>
              this.removeItemFromList() : () => this.check()}
          >
            <Icon name={this.props.editMode ? 'delete' : 'check'} />
          </button>
        </div>
      </li>
    );
  }
}

Item.propTypes = {
  item: PropTypes.object,
  editMode: PropTypes.bool,
  checkOrUncheckItem: PropTypes.func,
  selectedList: PropTypes.object,
  getShoppingListItems: PropTypes.func,
  itemClickHandler: PropTypes.func,
};

export default Item;
