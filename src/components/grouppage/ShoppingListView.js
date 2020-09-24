
import React, {Component} from 'react';
import {BASEURL, PORT} from '../../Constants';
import axios from 'axios';
import ShoppingList from './ShoppingList';
import AddShoppingList from './AddShoppingList';
import PropTypes from 'prop-types';

/**
 * This component is the unordered list element which holds all the
 * shoppinglistnames the current group has. It also has some HTTP functionality
 * such as adding a new shoppinglist to the database via the API.
 */
export class ShoppingListView extends Component {
  state = {
    shoppingLists: [],
    selectedList: {},
  }

  /**
   * This function start a testrun when the props isTest boolean is set
   * to true.
   */
  startTestRun = () => {
    this.setState({
      shoppingLists: [
        {'listid': 33, 'listname': 'newlist', 'iscomplete': 0, 'groupid': 63},
        {'listid': 34, 'listname': 'dsds', 'iscomplete': 0, 'groupid': 63},
      ],
    }, () => {
      this.listAlreadyExists('newlist');
      this.addShoppingList('newlist');
      this.addShoppingList('newlist2');
      this.listClickHandler(33);
    });
  }

  /**
   * This function runs every time the page is loaded.
   * It will call the function which gets all the shoppinglists
   * for the selected group
   */
  componentDidMount() {
    if (this.props.isTest) {
      this.startTestRun();
    }
    setTimeout(() => {
      this.getGroupShoppingLists();
    }, 20);
  }

  /**
   * This function gets all the shoppinglists for the selected group.
   * It will update the state to hold these lists, and will also sort these so
   * that the order will be the same for all users.
   */
  getGroupShoppingLists = () => {
    this.setState({shoppingLists: []});
    axios.get(`http://${BASEURL}:${PORT}/shoppinglists?GroupID=
      ${this.props.selectedGroup.groupid}`)
        .then((response) => {
          const relationList = response.data;
          for (const shoppingList of relationList) {
            this.setState({
              shoppingLists: [...this.state.shoppingLists,
                shoppingList],
            }, () => {
              this.setState({
                shoppingLists:
                this.state.shoppingLists.sort(function(a, b) {
                  return a.listid - b.listid;
                }),
              });
            });
          }
        }).catch();
  }

  /**
    * This checks if the current listname is contained in the list of all
    * names. It does this by adding all the names to a array, and checking
    * whether the provided name is included in that list.
    * @param {string} listname - the name of the list
    * @return {boolean} - true if the list is already included, else false
    */
  listAlreadyExists = (listname) => {
    const lists = [];
    for (const list of this.state.shoppingLists) {
      lists.push(list.listname.toLowerCase());
    }
    return lists.includes(listname.toLowerCase());
  }

  /**
   * This function takes a list name as a parameter and will POST a
   * shoppinglist with the name provided. It will then reload the
   * shoppinglists
   * @param {string} listname - name of the new list
   */
  addShoppingList = (listname) => {
    if (listname === '' || this.listAlreadyExists(listname)) {
      // list already exists
      return;
    }
    this.setState({shoppingLists: []});
    axios.post(`http://${BASEURL}:${PORT}/shoppinglists/`, {
      listname: listname,
      iscomplete: 0,
      groupid: this.props.selectedGroup.groupid,
    }).then((response) => {
      this.getGroupShoppingLists();
    }).catch();
  }

  /**
   * This function will send the user to the path provided.
   * @param {string} path - path to redirect to
   */
  _redirect = (path) => {
    this.props.history.push(path);
  }

  /**
   * This function will run when the user clicks on a listitem.
   * It will then call Apps listClickHandler function which changes the
   * path to show the list details.
   * @param {number} listid - the id of the clicked list
   */
  listClickHandler = (listid) => {
    const selectedList = this.state.shoppingLists.filter((list) => {
      return list.listid === listid;
    })[0];
    this.setState({selectedList: selectedList}, () => {
      this.props.listClickHandler(selectedList);
      this._redirect(`/overview/list/${selectedList.listname}`);
    });
  }

  /**
   * The render function will render all the shoppinglist in an ordered way
   * into the ul element. It goes through all the lists in the group, and
   * displays the name of each one in the ul.
   * @return {HTMLElement} - a ul containing all the shoppinglist names
   */
  render() {
    return (
      <>
        <ul>
          {this.state.shoppingLists.map((shoppingList) => {
            return <ShoppingList key={shoppingList.listid}
              shoppingList={shoppingList}
              listClickHandler={this.listClickHandler}
              isTest = {false} />;
          })}
        </ul>
        <AddShoppingList addShoppingList={this.addShoppingList} />
      </>
    );
  }
}

ShoppingListView.propTypes = {
  isTest: PropTypes.bool,
  selectedGroup: PropTypes.object,
  history: PropTypes.object,
  listClickHandler: PropTypes.func,
};

export default ShoppingListView;
