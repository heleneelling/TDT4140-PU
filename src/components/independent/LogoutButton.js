
import React, {Component} from 'react';
import PropTypes from 'prop-types';

/**
 * This component has the sole purpose of taking the user to the loginpage,
 * which in turn means that the user is logged out of the application because
 * the localstorage is then cleared.
 */
export class LogoutButton extends Component {
  /**
   * This function will call the logout function from props which clears the
   * localstorage. It then redirects the user to the login page.
   */
    logout = () => {
      this.props.logout();
      this.props.history.replace('/');
    }

    /**
     * The render function will render a HTML button with the logout function
     * as the onclick function.
     * @return {HTMLElement} - logout button
     */
    render() {
      return (
        <button
          onClick={() => {
            this.logout();
          }}>
                Logg ut
        </button>
      );
    }
}

LogoutButton.propTypes = {
  logout: PropTypes.func,
  history: PropTypes.object,
};

export default LogoutButton;
