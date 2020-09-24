import React, {Component} from 'react';
import NotFound from '../independent/NotFound';
import axios from 'axios';
import {BASEURL, PORT} from '../../Constants';
import GroupView from './GroupView';
import Header from '../independent/Header';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * This component is the URL endpoint for the "/overview". It is the page
 * that will be rendered after a successful login. All the groups the user
 * is a member of will be listed, and the user may also make a new group by
 * typing in the name of the group in the input box.
 */
export class Overview extends Component {
  /**
   * This function runs when the page is loaded. It will call the
   * getGroupWithUserID function in App.js to load the groups
   * existing in the database.
   */
  componentDidMount() {
    setTimeout(() => {
      this.props.getGroupWithUserID(this.props.currentUser.userid);
    }, 20);
  }

    /**
     * This method changes the path to the selected groups detail page
     * @param {string} groupname - the name of the group
     */
    _redirect = (groupname) => {
      this.props.history.push(`/overview/${groupname}`);
    }

    /**
     * This function runs when the user clicks on one of the listed groups
     * It will set the selected group to the group with that id.
     * @param {number} groupid - the id of the clicked group
     */
    groupclickHandler = (groupid) => {
      const selectedGroup = this.props.groups.filter((group) => {
        return group.groupid === groupid;
      });

      this.setState({selectedGroup: selectedGroup[0]}, () => {
        this.props.selectedGroup(selectedGroup[0]);
        this._redirect(this.state.selectedGroup.groupname);
      });
    }

    /**
     * This function makes and returns a list of all the current groupnames
     * that are already used by the user
     * @return {Array} - an array of all the groupnames
     */
    getGroupNameList = () => {
      const names = [];
      for (const group of this.props.groups) {
        names.push(group.groupname.toLowerCase());
      }
      return names;
    }

    /**
     * This function validates a potential new groupname for the user.
     * It checks if the groupname is empty or already taken by one of the groups
     * the user is already a member of.
     * @param {string} groupname - the name of the group
     * @return {boolean} - returns true if the groupname provided is already in
     * the list of groupnames, else false
     */
    validateGroupName = (groupname) => {
      return !(groupname === '' ||
            this.getGroupNameList().includes(groupname.toLowerCase()));
    }

    /**
     * This function sends two POST requests to the API. When the user types
     * in a groupname to create a new user, it will be checked by the
     * validateGroupName function if the username passes, a POST request to
     * add the group to the database is sent with the groupname and userid as
     * parameters. It will then get a response, which also has the primary key
     * "groupid" from the database. We then save this new group in the props
     * for display. After that the function sends another POST request
     * to the API to save the relation between the current user, and the
     * newly created group for persistence between sessions. It takes the
     * groupid (which we just got)and the userid as parameters, sends the
     * POST request. It will also get the contribution for the current
     * group so that the list over the most contributing members are up to date.
     * @param {string} groupname - name of the new group
     */
    postGroup = (groupname) => {
      if (this.validateGroupName(groupname)) {
        axios.post(`http://${BASEURL}:${PORT}/groups/`, {
          groupname: groupname,
          adminid: this.props.currentUser.userid,
        }).then((response) => {
          const newGroup = response.data;
          this.props.updateGroupState(newGroup);
        }).then(() => {
          const lastGroup = this.props.groups[this.props.groups.length - 1];
          axios.post(`http://${BASEURL}:${PORT}/memberofgroup/`, {
            groupid: lastGroup.groupid,
            userid: this.props.currentUser.userid,
          });
          axios.post(`http://${BASEURL}:${PORT}/membercontributions/`, {
            contribution: 0,
            userid: this.props.currentUser.userid,
            groupid: lastGroup.groupid,
          });
        }).catch();
      } else {
        // wrong credentials
      }
    }

    /**
     *
     * Main render function of the Overview class.
     * Renders different pages based on if the user is logged in or not.
     * @return {HTMLElement} - returns the overview page or NotFound depending
     * on the login status
     */
    render() {
      return this.props.isLoggedIn ?
            <>
              <Header name={this.props.currentUser.username}
                history={this.props.history}
                logout={this.props.unloadStateAfterLogout} />
              <div className="main">
                <h3>Mine grupper</h3>
                <GroupView groupclickHandler={this.groupclickHandler}
                  groups={this.props.groups}
                  currentUser={this.props.currentUser}
                  postGroup={this.postGroup} />
              </div>
            </> :
            <NotFound />;
    }
}

Overview.propTypes = {
  getGroupWithUserID: PropTypes.func,
  currentUser: PropTypes.object,
  history: PropTypes.object,
  groups: PropTypes.array,
  selectedGroup: PropTypes.func,
  updateGroupState: PropTypes.func,
  isLoggedIn: PropTypes.bool,
  unloadStateAfterLogout: PropTypes.func,
};

export default withRouter(Overview);
