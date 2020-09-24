import React, {Component} from 'react';
import PropTypes from 'prop-types';

/**
 * The component will list up the information about the user.
 * It is a subcomponent of the loginpage
 */
export class ProfileView extends Component {
  /**
     * This render function will show list up the information about the current
     * logged in user.
     * @return {HTMLElement} - a div element with the information
     */
  render() {
    return (
      <div>
        <h1>Brukerprofil</h1>
        <h5><b>Brukernavn:</b> {this.props.currentUser.username}</h5>
        <h5><b>Email:</b> {this.props.currentUser.email}</h5>
        <h5><b>Alder:</b> {this.props.currentUser.age} år</h5>
        <h5><b>Telefonnr.:</b> {this.props.currentUser.phone}</h5>
      </div>
    );
  }
}

ProfileView.propTypes = {
  currentUser: PropTypes.object,
};

export default ProfileView;
