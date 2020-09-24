import React, { Component } from 'react';
import Header from '../independent/Header';
import Item from './Item';
import PossibleItem from './PossibleItem';
import Icon from '../independent/Icon';
import NotFound from '../independent/NotFound';
import axios from 'axios';
import { BASEURL, PORT } from '../../Constants';
import PropTypes from 'prop-types';

/**
 * This is the endpoint for the URL "/overview/list/:selectedList".
 * It will display the information about the selected list such as items
 * and total price. The functionality to add items are also contained
 * within this component.
 */
export class ShoppingListDetail extends Component {
  state = {
    items: [],
    checkedItems: [],
    possibleItems: [],
    editMode: false,
    checkAll: false,
    contribution: 0,
  }

  /**
   * This function runs every time the page is loaded. It will call the
   * function which gets all the shoppinglists for the selected group
   */
  componentDidMount() {
    setTimeout(() => {
      if (this.props.isLoggedIn) {
        this.getShoppingListItems();
        this.setState({ contribution: this.props.contribution });
      }
    }, 1);
  }
  /**
   * This function gets all the shoppinglists for the selected group. It
   * sends a HTTP get request with the selectedlist ID and then gets the items
   * with the ids from the response. It sorts the items on id so that
   * the list looks the same for all members of the group. It will update the
   * state to hold these lists.
   */
  getShoppingListItems = () => {
    this.setState({ items: [] });
    if (this.props.isTest) {
      this.startTestRun();
    } else {
      axios.get(`http://${BASEURL}:${PORT}/iteminlist?ListID=
        ${this.props.selectedList.listid}`).catch()
        .then((response) => {
          for (const relation of response.data) {
            axios.get(`http://${BASEURL}:${PORT}/items/
                    ${relation.itemid}`).catch()
              .then((response) => {
                const newItem = response.data;
                newItem.isChecked = !!relation.ischecked;
                this.setState({
                  items: [...this.state.items,
                    newItem],
                }, () => {
                  this.setState({
                    items: this.state.items.sort(function (a, b) {
                      return a.itemid - b.itemid;
                    }),
                  });
                });
              }).catch()
          }
        }).catch()
    }
    setTimeout(() => {
      this.getPossibleItems();
      this.getTotalPrice();
    }, 100);
  }

  /**
   * This funciton will filter out all the already added items from the list
   * of items, and makes it impossible to add items to the shoppinglist which
   * is already there. This is also checked in the backend. It will then
   * update the state to hold these items.
   */
  getPossibleItems = () => {
    const possibleItems = [];
    const alreadyIds = this.getItemIds(this.state.items);
    axios.get(`http://${BASEURL}:${PORT}/items/`).catch()
      .then((response) => {
        const itemList = response.data;
        for (const item of itemList) {
          if (!alreadyIds.includes(item.itemid)) {
            possibleItems.push(item);
          }
        }
        this.setState({ possibleItems: possibleItems });
      }).catch();
  }

  /**
   * This is a helper function which takes in a list of items, and will
   * return a list of all the ids of the items in the list provided.
   * @param {Array} list - the list of items
   * @return {Array} - an array containing all the ids of the items included
   * in the provided list of items
   */
  getItemIds = (list) => {
    const itemids = [];
    for (const item of list) {
      itemids.push(item.itemid);
    }
    return itemids;
  }

  /**
   * This is a helper function which will return the id of the item chosen in
   * the dropdown menu
   * @return {number} - the id of the item chosen in the dropdown
   */
  getChosenItem = () => {
    return document.getElementById('itemdropdown').value;
  }

  /**
   * This is a helper function which returns true if the itemid provided is
   * included in the items in the list.
   * @param {number} itemid - the itemid to check
   * @return {bool} true if the itemid is included in the lsit
   */
  itemAlreadyInList = (itemid) => {
    const itemIds = this.getItemIds(this.state.items);
    return itemIds.includes(itemid);
  }

  /**
   * This function will add the selected item to the list. It will first get
   * the item chosen in the dropdown, and from' there it will send a post
   * request to the API. Lastly, it will update the list to show the new
   * change.
   */
  addItem = () => {
    const newItemId = this.getChosenItem();
    axios.post(`http://${BASEURL}:${PORT}/iteminlist/`, {
      ischecked: 0,
      listid: this.props.selectedList.listid,
      itemid: newItemId,
    }).catch().then(() => {
      this.getShoppingListItems();
    }).catch();
  }

  /**
   * This function will flip the editmode to true from false and vice versa.
   */
  toggleEditMode = () => {
    this.setState({ editMode: !this.state.editMode });
  }

  /**
   * This function will take the user to the last visited page.
   */
  goBack = () => {
    this.props.history.goBack();
  }

  /**
   * This function will calculate and return the total price of all the items
   * in the shoppinglist
   * @return {number} - the accumulated price of all the items in the current
   * shoppinglist
   */
  getTotalPrice = () => {
    let totalPrice = 0;
    for (const item of this.state.items) {
      totalPrice += item.price;
    }
    return totalPrice;
  }

  /**
   * This function takes in an item in the shoppinglist, and will uncheck or
   * check the item as "bought". It will call the appropriate helper function
   * depending on if it is a uncheck or check.
   * @param {object} item - item to check or uncheck
   * @return {undefined} - exits the function
   */
  checkOrUncheckItem = (item) => {
    for (const i of this.state.items) {
      if (i.itemid === item.itemid) {
        if (!item.isChecked) {
          this.checkItem(item);
          return;
        } else {
          this.uncheckItem(item);
          return;
        }
      }
    }
  }

  /**
   * This method will change the items isChecked attribute to true (1) and
   * will call the sendCheckPost with the item.
   * @param {object} item - the item to check
   */
  checkItem = (item) => {
    item.isChecked = true;
    this.sendCheckPost(1, item); // 1 for true
  }

  /**
   * This method will take in either 1 or 0 (true or false), and an item, and
   * will send a PUT request to the database changing the items isChecked
   * state in the database. It will also change the contribution variable to
   * either add or remove the price.
   * @param {number} tinyint - 1 for true, 0 for false
   * @param {object} item - the item to change
   * @returns {undefined} - exits the functions if a relations is undefined
   */
  sendCheckPost = (tinyint, item) => {
    const value = item.isChecked ? item.price : -item.price;
    axios.get(`http://${BASEURL}:${PORT}/iteminlist/?ListID=
        ${this.props.selectedList.listid}&ItemID=${item.itemid}`)
      .then((relation) => {
        const relationid = relation.data[0].id;
        console.log(relationid)
        axios.put(`http://${BASEURL}:${PORT}/iteminlist/${relationid}/`,
          {
            ischecked: tinyint,
            listid: this.props.selectedList.listid,
            itemid: item.itemid,
          });
        this.setState({ contribution: this.state.contribution + value },
          () => {
            axios.put(`http://${BASEURL}:${PORT}/membercontributions/
                    ${this.props.contributionid}/`, {
              contribution: this.state.contribution,
              userid: this.props.currentUser.userid,
              groupid: this.props.selectedGroup.groupid,
            });
          });
      }).catch()
  }

  /**
   * This method will set the provided items isChecked attribute to false,
   * and will call the sendCheckPost function.
   * @param {object} item - the item to uncheck
   */
  uncheckItem = (item) => {
    item.isChecked = false;
    this.sendCheckPost(0, item); // 0 for false
  }

  /**
   * This function will return true if all the items are checked as true,
   * and false if not.
   * @return {bool} - true if all items are checked, else false
   */
  isAllChecked = () => {
    for (const item of this.state.items) {
      if (!item.isChecked) return false;
    }
    return true;
  }

  /**
   * This function will check all the unchecked items, and will uncheck all
   * items if all items is unchecked already.
   */
  checkAll = () => {
    const allChecked = this.isAllChecked();
    for (const item of this.state.items) {
      if (!allChecked) {
        if (!item.isChecked) {
          this.checkItem(item);
        }
      } else {
        this.uncheckItem(item);
      }
    }
  }

  /**
   * This function will send a DELETE request to the API, which deletes the
   * current selected listfrom the database. It will then take the user to
   * the previous page.
   */
  deleteCurrentList = () => {
    axios.delete(`http://${BASEURL}:${PORT}/shoppinglists/
        ${this.props.selectedList.listid}`).catch();
    this.goBack();
  }

  /**
   * The render function will render all the items and functionality for adding
   * new items. It will render the icons differently depenting on the editmode,
   * and the dropdownmenu based on what is already included in the list
   * @return {HTMLElement} - the wrapper for all other components in the
   * shoppinglist detail view.
   */
  render() {
    return this.props.isLoggedIn ?
      <>
        <Header name={this.props.currentUser.username}
          history={this.props.history}
          logout={this.props.unloadStateAfterLogout} />
        <div className="main">
          <div className="inlineFlex">
            <div className="inlineFlex">
              <button
                className="blueButton"
                style={{ marginRight: '5px' }}
                onClick={this.goBack}

              >
                <Icon name="back" />
              </button>
              <h3>{this.props.selectedList.listname}</h3>
            </div>
            <div className="inlineFlex">
              <button
                style={{ marginRight: '5px' }}
                className={this.state.editMode ? 'redButton' : undefined}
                onClick={
                  this.state.editMode ?
                    () => {
                      this.deleteCurrentList();
                    } :
                    () => {
                      this.checkAll();
                    }
                }
              >
                <Icon name={this.state.editMode ? 'deleteAll' :
                  'checkAll'} />
              </button>
              <button
                onClick={this.toggleEditMode}
                className={this.state.editMode ? 'selected' :
                  undefined}
              >
                <Icon name="edit" />
              </button>
            </div>
          </div>
          <ul>
            {this.state.items.map((item) => {
              return <Item
                checkOrUncheckItem={this.checkOrUncheckItem}
                key={item.itemid}
                getShoppingListItems={this.getShoppingListItems}
                selectedList={this.props.selectedList}
                item={item}
                itemClickHandler={this.props.itemClickHandler}
                editMode={this.state.editMode} />;
            })}
          </ul>
          <br />
          <div className="inlineFlex">
            <div>
              <label htmlFor="itemdropdown">Velg vare: </label>
              <select id="itemdropdown">
                {this.state.possibleItems.map((item) => {
                  return <PossibleItem key={item.itemid}
                    item={item} />;
                })}
              </select>
            </div>
            <button onClick={this.addItem}>
              <Icon name="add" />
            </button>
          </div>
          <p><b>Totalpris:</b> {this.getTotalPrice()}kr</p>
        </div>
      </> :
      <NotFound />;
  }

  /**
   * This function will run through the crucial functions to test in this
   * function if the isTest prop is set to true.
   */
  startTestRun = () => {
    this.setState({
      items: [{
        'itemid': 1, 'itemname': 'Melk', 'price': 17,
        'imagepath': 'Melk.png', 'isChecked': false,
      }],
      possibleItems: [
        {
          'itemid': 4, 'itemname': 'Bacon',
          'price': 28, 'imagepath': 'Bacon.png',
        },
      ],
    }, () => {
      this.checkItem(this.state.items[0]);
      this.checkOrUncheckItem(this.state.items[0]);
      this.isAllChecked();
      this.checkAll();

      this.uncheckItem(this.state.items[0]);
      this.checkOrUncheckItem(this.state.items[0]);
      this.isAllChecked();
      this.checkAll();

      this.getItemIds(this.state.items);
      this.addItem();
      this.itemAlreadyInList(1)
      this.itemAlreadyInList(2)
      this.toggleEditMode()
      this.deleteCurrentList()
      this.goBack()
    });
  }
}


ShoppingListDetail.propTypes = {
  contribution: PropTypes.number,
  selectedList: PropTypes.object,
  history: PropTypes.object,
  contributionid: PropTypes.number,
  currentUser: PropTypes.object,
  isLoggedIn: PropTypes.bool,
  unloadStateAfterLogout: PropTypes.func,
  itemClickHandler: PropTypes.func,
  selectedGroup: PropTypes.object,
  isTest: PropTypes.bool,
};

export default ShoppingListDetail;
