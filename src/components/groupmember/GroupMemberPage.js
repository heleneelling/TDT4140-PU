import React, {Component} from 'react';
import Header from '../independent/Header';
import Icon from '../independent/Icon';
import NotFound from '../independent/NotFound';
import GroupMemberView from './GroupMemberView';
import PropTypes from 'prop-types';

/**
 * This component is the URL endpoint for "/groupname/members" and will not
 * be rendered if the users window width is wide enough. The members will then
 * be viewed directly in the grouppage. It will show all the members of the
 * group and will contain the functionality for adding and removing users
 * if the current user is the administrator.
 */
export class GroupMemberPage extends Component {
  /**
   * This method will move to the last visited page
   */
  goBack = () => {
    this.props.history.goBack();
  }

  /**
   * The render function renders differently depending on if the user is
   * logged in or not. If the user is logged in it will render the Header
   * and the groupmembers in a list. If not, the NotFound page will render.
   * @return {HTMLElement} - Differend depending on logged in status.
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
                style={{marginRight: '5px'}}
                onClick={this.goBack}
              >
                <Icon name="back" />
              </button>
              <h3>{this.props.selectedGroup.groupname}</h3>
            </div>
          </div>
          <GroupMemberView
            members={this.props.members}
            addMemberByEmail={this.props.addMemberByEmail}
            currentUser={this.props.currentUser}
            removeUserById={this.props.removeUserById}
            checkIfGroupAdmin={this.props.checkIfGroupAdmin}
            getGroupMembers={this.props.getGroupMembers}
          />
        </div>
      </> :
      <NotFound />;
  }
}

GroupMemberPage.propTypes = {
  history: PropTypes.object,
  isLoggedIn: PropTypes.bool,
  currentUser: PropTypes.object,
  unloadStateAfterLogout: PropTypes.func,
  selectedGroup: PropTypes.object,
  members: PropTypes.array,
  addMemberByEmail: PropTypes.func,
  removeUserById: PropTypes.func,
  checkIfGroupAdmin: PropTypes.func,
  getGroupMembers: PropTypes.func,
};

export default GroupMemberPage;
