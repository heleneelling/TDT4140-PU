import React from 'react';
import './shopstop_main.css';
import LoginPage from './components/login/LoginPage';
import { Route, withRouter } from 'react-router-dom';
import Overview from './components/groupoverview/Overview';
import axios from 'axios';
import { BASEURL, PORT, DEFAULTSTATE } from './Constants';
import GroupPage from './components/grouppage/GroupPage';
import GroupMemberPage from
  './components/groupmember/GroupMemberPage';
import ShoppingListDetail from
  './components/shoppinglistdetail/ShoppingListDetail';
import RegisterPage from './components/register/RegisterPage';
import PropTypes from 'prop-types';
import ProfilePage from './components/profile/ProfilePage';


/**
 * This is the main controller of the application. It is the component rendered
 * by the index.js file. It holds all the routers for the URL endpoints, and
 * some of the functionality for the rest of the application. It also holds
 * the state for most of the needed datatypes during runtime.
 */
class App extends React.Component {
  state = {
    currentUser: {},
    isLoggedIn: false,
    groups: [],
    selectedGroup: {},
    members: [],
    selectedList: {},
    selectedItem: {},
    wrongCredentials: false,
    contributionid: undefined,
  }

  /**
   * This method runs when the page is rendered. It plays a crucial role in the
   * persistance of the application When a user logs into the application, the
   * state will be set to whatever the user said, but when the user refreshs a
   * page, or goes back in the history, this method is very importand. It will
   * save the current state in localStorage, and load it. The reason this works
   * with multiple user, is that it is only run when a user leaves and loads a
   * new page, which means that they will never overlap eachother.
   */
  componentDidMount() {
    if (this.props.isTest) {
      this.startTestRun()
    }
    window.addEventListener('beforeunload', this.onUnload);
    const persistState = JSON.parse(localStorage.getItem('rootState'));
    if (persistState && persistState.isLoggedIn) {
      try {
        this.setState(persistState, () => {
          this.getGroupWithUserID(this.state.currentUser.userid);
          this.setState({ wrongCredentials: false });
        });
      } catch (e) {
        // is not json
      }
    }
  }


  unloadStateAfterLogout = () => {
    this.setState(DEFAULTSTATE);
  }

  /**
   * This function is the one that actually sets the localstorage to the
   * current state
   * @param {Event} e - The event of the unload
   */
  onUnload = (e) => {
    // the method that will be used for both add and remove event
    e.preventDefault();
    localStorage.setItem('rootState', JSON.stringify(this.state));
  }

  /**
   * This function removes the listener when the user leaves the window
   */
  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onUnload);
  }

  /**
   * This function sends a HTTP GET request and queries on the userid.
   * It will fetch all the grouprelations the user is a member of, and then
   * call the getGroupById function to fetch the information of the
   * specific group in question.
   * @param {number} userid - The id of the user
   */
  getGroupWithUserID = (userid) => {
    this.setState({ groups: [] });
    axios.get(`http://${BASEURL}:${PORT}/memberofgroup/?userid=${userid}`)
      .then((response) => {
        const relationList = response.data;
        for (const relation of relationList) {
          this.getGroupById(relation.groupid);
          /* This fetches the extra information about a spesific group */
        }
      }).catch();
  }

  /**
   * If for some reason a bug happened where a group was loaded multiple times,
   * this function will catch it. It checks whether there already exists a
   * group with the id as the one provided.
   * @param {number} groupid - The id of the group
   * @return {boolean} - true if the group is already loaded, else false
   */
  groupAlreadyLoaded = (groupid) => {
    for (const group of this.state.groups) {
      if (group.groupid === groupid) {
        return true;
      }
    }
    return false;
  }

  /**
   * This function send a HTTP GET request which queries on groupid to get
   * information about a specific group. Is pushes the group to the state,
   * which saves information about all of the groups the current user is a
   * member of.
   * @param {number} groupid - The id of the group
   */
  getGroupById = (groupid) => {
    axios.get(`http://${BASEURL}:${PORT}/groups/${groupid}`)
      .then((response) => {
        const newGroup = response.data;
        if (!this.groupAlreadyLoaded(newGroup.groupid)) {
          this.setState({ groups: [...this.state.groups, newGroup] }, () => {
            this.setState({
              groups: this.state.groups.sort(function (a, b) {
                return a.groupid - b.groupid;
              }),
            });
          });
        }
        // Sorting the groups based on id
      }).catch();
  }

  /**
    * This function sends a HTTP GET requests that queries on the email given
    * by the user. If a user exists with the email, we check if the password is
    * correct, if not, we change the state so that the components know that this
    * is the wrong credentials for that email. If the password is correct, we
    * save this in localstorage and change page to another window.
    * @param {object} credentials - The credentials of gotten by the user
    */
  getUserWithEmail = (credentials) => {
    if (credentials === null) return;
    this.setState({ DEFAULTSTATE });
    axios.get(`http://${BASEURL}:${PORT}/users/?email=${credentials.email}`)
      .then((response) => {
        const user = response.data[0];
        if (user && user.password === credentials.password) {
          this.setState({ currentUser: user, isLoggedIn: true });
          this.getGroupWithUserID(user.userid);
          this._redirect('/overview');
        } else {
          this.setState({ DEFAULTSTATE }, () => {
            this.setState({ wrongCredentials: true });
          });
        }
      }).catch();
  }

  /**
   * This method changes the path on whatever the parameter is
   * @param {string} path - The path to redirect to
   */
  _redirect = (path) => {
    // this.setState({ redirect: path })
    this.props.history.push(path);
  }

  /**
   * This function edits the selectedGroup. It is passed as a prop.
   * @param {object} group - The group to update
   */
  updateSelectedGroup = (group) => {
    this.setState({ selectedGroup: group });
  }

  /**
   * This function edits the groups state. It is passed as a prop.
   * @param {object} newGroup - The group to update
   */
  updateGroupState = (newGroup) => {
    this.setState({ groups: [...this.state.groups, newGroup] });
  }

  /**
     * This function sends the GET request to load all the members for the
     * selected group based on the groupid. It calls the getUserById function
     * to load the individual users
    */
  getGroupMembers = () => {
    this.setState({ members: [] }, () => {
      axios.get(`http://${BASEURL}:${PORT}/memberofgroup/?groupid=
      ${this.state.selectedGroup.groupid}`)
        .then((response) => {
          const relations = response.data;
          for (const relation of relations) {
            this.getUserById(relation.userid);
          }
          this.setState({
            members: this.state.members.sort(function (a, b) {
              return b.contribution - a.contribution;
            }),
          });
        }).catch();
    });
  }

  /**
   * This function sends a GET request on the provided userid.
   * It then pushes the new user to the state
   * @param {number} id - The id of the user
  */
  getUserById = (id) => {
    axios.get(`http://${BASEURL}:${PORT}/users/${id}`)
      .then((response) => {
        const newMember = response.data;
        axios.get(`http://${BASEURL}:${PORT}/membercontributions?UserID=${id}
        &GroupID=${this.state.selectedGroup.groupid}`)
          .then((response) => {
            if (id === this.state.currentUser.userid) {
              this.setState({
                contributionid: response.data[0].primaryid,
                contribution: response.data[0].contribution,
              });
            }
            newMember.contribution = response.data[0].contribution;
            newMember.contributionid = response.data[0].primaryid;
            this.setState({ members: [...this.state.members, newMember] });
          });
      }).catch();
  }

  /**
   * This function takes in a group and returns if the current user is the
   * admin of the group in question. Currently not called anywhere
   * @return  {boolean} - true if the user is admin, else false
   */
  checkIfGroupAdmin = () => {
    return this.state.selectedGroup.adminid === this.state.currentUser.userid;
  }

  /**
   * This checks if the current userid is currently a member of the group
   * @param {string} email - The email of the user to check
   * @return {boolean} - true if the user with the provided email is already
   *                      a member
   */
  memberAlreadyExists = (email) => {
    const memberEmails = [];
    for (const member of this.state.members) {
      memberEmails.push(member.email);
    }
    return memberEmails.includes(email);
  }

  /**
   * This method takes an email as a parameter, and then sends a GET request
   * with this as a query parameter. If there exists a user with that email
   * the user will then be added to the current group.
   * @param {string} email - The email of the user to add
   * @returns {undefined} - exits the function if the user is not admin
   */
  addMemberByEmail = (email) => {
    if (!this.checkIfGroupAdmin()) {
      return;
    }
    if (email && !this.memberAlreadyExists(email)) {
      axios.get(`http://${BASEURL}:${PORT}/users/?email=${email}`)
        .then((response) => {
          if (response.data.length > 0) {
            const newMember = response.data[0];
            axios.post(`http://${BASEURL}:${PORT}/memberofgroup/`, {
              userid: newMember.userid,
              groupid: this.state.selectedGroup.groupid,
            });
            axios.get(`http://${BASEURL}:${PORT}/membercontributions?UserID=
            ${newMember.userid}&GroupID=${this.state.selectedGroup.groupid}`)
              .then((response) => {
                if (response.data.length === 0) {
                  axios.post(`http://${BASEURL}:${PORT}/membercontributions/`, {
                    contribution: 0,
                    userid: newMember.userid,
                    groupid: this.state.selectedGroup.groupid,
                  });
                }
              }).then(() => {
                this.getGroupMembers();
              });
          } else {
            // no user exists
          }
        }).catch();
    } else {
      // user already member
    }
  }

  /**
   * This function validates the remove user function. It should not be
   * possible to delete one self from the group.
   * @param {number} userid - The id of the user
   * @return {boolean} - true if the given id is the same as the current logged
   *                      in user
    */
  checkEqualUser = (userid) => {
    return userid && this.state.currentUser.userid &&
      userid === this.state.currentUser.userid;
  }

  /**
   * This function removes the current selected member from the current selected
   * group. It does so by first getting the id of the member-group relation of
   * the two, and then sends a DELETE request on that is to the api.
   * The groupmembers are the once again loaded with the getGroupMembers.
   * @param {number} userid - The id of the user to remove.
   * @returns {undefined} - exits the function if the user tries to remove self
   */
  removeUserById = (userid) => {
    if (this.checkEqualUser(userid)) {
      return;
    }
    axios.get(`http://${BASEURL}:${PORT}/memberofgroup/?userid=${userid}
    &groupid=${this.state.selectedGroup.groupid}`)
      .then((response) => {
        const relationid = response.data[0].id;
        axios.delete(`http://${BASEURL}:${PORT}/memberofgroup/${relationid}`)
          .then(() => {
            this.getGroupMembers(this.state.selectedGroup.groupid);
          });
      }).catch();
  }

  /**
   * This function will run when a list is clicked. The state will be updated
   * so that the provided list will be the new selected list.
   * @param {Array} list - The list that was just clicked
   */
  listClickHandler = (list) => {
    this.setState({ selectedList: list });
  }

  /**
   * This function will run when an item is clicked. It will set the states
   * selectedItem to the selected item.
   * @param {object} item - The item just clicked on
   */
  itemClickHandler = (item) => {
    this.setState({ selectedItem: item });
  }

  /**
   * This function will update the current contribution to be equal to the
   * provided value.
   * @param {number} value - The new contribution value.
   */
  updateContribution = (value) => {
    this.setState({ contribution: value });
  }

  /**
   * Main render function  for the application.
   * @return {HTMLElement} - a HTML div wrapper for the page.
   */
  render() {
    return (
      <div>
        <Route exact path="/" render={(props) => (
          <LoginPage getUserWithEmail={this.getUserWithEmail}
            isLoggedIn={this.state.isLoggedIn}
            history={this.props.history}
            wrongCredentials={this.state.wrongCredentials} />
          /* This is the login page */
        )} />
        <Route exact path="/register" render={(props) => (
          <RegisterPage history={this.props.history}
            isLoggedIn={this.state.isLoggedIn} />
          /* This is the login page */
        )} />
        <Route exact path="/overview" render={(props) => (
          <Overview currentUser={this.state.currentUser}
            isLoggedIn={this.state.isLoggedIn}
            selectedGroup={this.updateSelectedGroup}
            groups={this.state.groups}
            updateGroupState={this.updateGroupState}
            unloadStateAfterLogout={this.unloadStateAfterLogout}
            getGroupWithUserID={this.getGroupWithUserID}
            history={this.props.history}
          /> /* This is the overview page  */
        )} />
        <Route exact path="/overview/:groupname" render={(props) => (
          <GroupPage selectedGroup={this.state.selectedGroup}
            currentUser={this.state.currentUser}
            updateGroupMembers={this.updateGroupMembers}
            members={this.state.members}
            listClickHandler={this.listClickHandler}
            isLoggedIn={this.state.isLoggedIn}
            checkIfGroupAdmin={this.checkIfGroupAdmin}
            removeUserById={this.removeUserById}
            addMemberByEmail={this.addMemberByEmail}
            unloadStateAfterLogout={this.unloadStateAfterLogout}
            getGroupMembers={this.getGroupMembers}
          /> /* This is the group detail page */
        )} />
        <Route exact path="/overview/:groupname/members" render={(props) => (
          <GroupMemberPage selectedGroup={this.state.selectedGroup}
            currentUser={this.state.currentUser}
            members={this.state.members}
            addMemberByEmail={this.addMemberByEmail}
            getGroupMembers={this.getGroupMembers}
            removeUserById={this.removeUserById}
            isLoggedIn={this.state.isLoggedIn}
            history={this.props.history}
            checkIfGroupAdmin={this.checkIfGroupAdmin}
            unloadStateAfterLogout={this.unloadStateAfterLogout}
          /> /* This is the group detail page */
        )} />
        <Route exact path="/overview/list/:selectedList" render={(props) => (
          <ShoppingListDetail currentUser={this.state.currentUser}
            selectedList={this.state.selectedList}
            itemClickHandler={this.itemClickHandler}
            state={this.state}
            isLoggedIn={this.state.isLoggedIn}
            selectedGroup={this.state.selectedGroup}
            history={this.props.history}
            unloadStateAfterLogout={this.unloadStateAfterLogout}
            contributionid={this.state.contributionid}
            contribution={this.state.contribution}
            updateAppContribution={this.updateContribution}
            isTest={false} />
          /* This is the shoppinglist detail page */
        )} />
        <Route exact path="/profile" render={(props) => (
          <ProfilePage currentUser={this.state.currentUser}
            isLoggedIn={this.state.isLoggedIn}
            history={this.props.history}
            unloadStateAfterLogout={this.unloadStateAfterLogout} />
          /* This is the profile detail page */
        )} />
      </div>
    );
  }
  /**
  * This function will start a testrun if the prop isTest is set to true.
  * If an exception happens in this function, the test will fail
  */
  startTestRun = () => {
    this.setState({
      currentUser: {
        "userid": 1, "username": "Hauk",
        "email": "haukao@stud.ntnu.no",
        "avatar": "testing",
        "password": "135be41b841c9ed446b0bf4ec1a7a2ee29ebd7f4",
        "age": 56, "phone": 76000200
      },
      groups: [
        { "groupid": 62, "groupname": "dfsfs", "adminid": 1 },
        { "groupid": 63, "groupname": "newgroup", "adminid": 1 }
      ],
      selectedGroup: { "groupid": 62, "groupname": "dfsfs", "adminid": 1 },
      members: [{
        "userid": 1, "username": "Hauk", "email": "haukao@stud.ntnu.no",
        "avatar": "testing",
        "password": "135be41b841c9ed446b0bf4ec1a7a2ee29ebd7f4",
        "age": 56, "phone": 76000200, "contribution": 0, "contributionid": 18
      }]

    }, () => {
      this.getGroupWithUserID(1)
      this.groupAlreadyLoaded(62)
      this.groupAlreadyLoaded(100)
      this.getGroupById(61)
      this.getUserWithEmail(null)
      this.getUserWithEmail({ username: "test", password: "test" })
      this.updateSelectedGroup({
        "groupid": 63, "groupname": "newgroup",
        "adminid": 1
      })
      this.updateGroupState({
        "groupid": 101, "groupname": "newgroup3",
        "adminid": 2
      })
      this.getGroupMembers()
      this.getUserById(1)
      this.checkIfGroupAdmin()
      this.memberAlreadyExists("haukao@stud.ntnu.no")
      this.memberAlreadyExists("nonexistent@email.com")
      this.addMemberByEmail("nonexistent@email.com")
      this.checkEqualUser(1)
      this.checkEqualUser(2)
      this.listClickHandler({
        "listid": 33, "listname": "newlist", "iscomplete": 0,
        "groupid": 63
      })
      this.updateContribution(100)
      this.itemClickHandler({
        "itemid": 1, "itemname": "Melk", "price": 17,
        "imagepath": "Melk.png", "isChecked": false
      })
      this.removeUserById(20)
      this.removeUserById(1)
      this.unloadStateAfterLogout()
      this.componentWillUnmount()
      this._redirect("/overview")
    })
  }
}

App.propTypes = {
  history: PropTypes.object,
  isTest: PropTypes.bool
};

export default withRouter(App);

