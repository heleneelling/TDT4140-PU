import React, {Component} from 'react';
import Header from '../independent/Header';
import {withRouter} from 'react-router-dom';
import ShoppingListView from './ShoppingListView';
import Icon from '../independent/Icon';
import NotFound from '../independent/NotFound';
import GroupMemberView from '../groupmember/GroupMemberView';
import axios from 'axios';
import {BASEURL, PORT} from '../../Constants';
import PropTypes from 'prop-types';

/**
 * This is the URL endpoint for "/<groupname>". It renders different components
 * depending on the width of the users window. It will show a list of
 * shoppinglists that belongs to the group, and the members of the
 * group if the window is wide enough. It also renders the header.
 */
export class GroupPage extends Component {
    state = {
      width: window.innerWidth,
    }

    /**
     * This function will run when the window is loaded. It will set an
     * eventlistener to check whenever the user resizes the window.
     * If so, it will call the handleWindowResize function
     */
    componentDidMount() {
      window.addEventListener('resize', this.handleWindowResize);
    }

    /**
     * This function will run when the window is exited.
     * It will remove the eventlistener added in componentDidMount
     */
    componentWillUnmount() {
      window.removeEventListener('resize', this.handleWindowResize);
    }

    /**
     * This function edits the state width of the window based on the window
     * width of the user.
     */
    handleWindowResize = () => {
      this.setState({width: window.innerWidth});
    }

    /**
     * This function takes the user to the previous page visited.
     */
    goBack = () => {
      this.props.history.goBack();
    }

    /**
     * This method changes tha path to view the selected group
     * member detail page
     */
    viewMembers = () => {
      this.props.history.push(`/overview/
        ${this.props.selectedGroup.groupname}/members`);
    }

    /**
     * This function will delete the current selected group by clicking
     * the delete group button. It will the redirect the user.
     */
    deleteGroup = () => {
      this.props.history.replace('/overview');
      axios.delete(`http://${BASEURL}:${PORT}/groups/
        ${this.props.selectedGroup.groupid}`).catch();
    }

    /**
     * This render function will render differently depending on if a user is
     * logged in or not AND whether the width of the window is less than 500
     * pixels. If the window width is less than 500, the groupmemberview will
     * not be visible on the page, and will then have to be opened as any other
     * page by clicking the button that appears in its place.
     * @return {HTMLElement} - either the grouppage or NotFound depending
     * on login status
     */
    render() {
      const isMobile = this.state.width <= 500;
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
                      style={{marginRight: '5px'}}
                      onClick={this.goBack}
                    >
                      <Icon name="back" />
                    </button>
                    <h3>{this.props.selectedGroup.groupname}</h3>
                    <button
                      className="redButton"
                      onClick={() => {
                        this.deleteGroup();
                      }}
                    >
                                Slett gruppe
                      <Icon name="delete" />
                    </button>
                  </div>
                  {isMobile &&
                            <button className="blueButton"
                              onClick={this.viewMembers}>
                              <Icon name="group" />
                            </button>
                  }
                </div>
                <div className="inlineDiv">
                  <div style={{flexGrow: '3'}}>
                    <p>Våre handlelister:</p>
                    <ShoppingListView
                      selectedGroup={this.props.selectedGroup}
                      listClickHandler={this.props.listClickHandler}
                      history={this.props.history} />
                  </div>
                  {!isMobile &&
                            <div style={{flexGrow: 1}} className="sidebar">
                              <GroupMemberView
                                members={this.props.members}
                                addMemberByEmail={this.props.addMemberByEmail}
                                currentUser={this.props.currentUser}
                                removeUserById={this.props.removeUserById}
                                checkIfGroupAdmin={this.props.checkIfGroupAdmin}
                                getGroupMembers={this.props.getGroupMembers}
                              />
                            </div>
                  }
                </div>
              </div>
            </> :
            <NotFound />;
    }
}

GroupPage.propTypes = {
  history: PropTypes.object,
  selectedGroup: PropTypes.object,
  listClickHandler: PropTypes.func,
  members: PropTypes.array,
  addMemberByEmail: PropTypes.func,
  currentUser: PropTypes.object,
  removeUserById: PropTypes.func,
  checkIfGroupAdmin: PropTypes.func,
  getGroupMembers: PropTypes.func,
  isLoggedIn: PropTypes.bool,
  unloadStateAfterLogout: PropTypes.func,
};

export default withRouter(GroupPage);
