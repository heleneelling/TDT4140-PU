import React, {Component} from 'react';
import PropTypes from 'prop-types';

/**
 * As the register button, this has the sole purpose of redirecting the user
 * to the loginpage.
 */
export class LoginButton extends Component {
    /**
     * This function will return the user to the loginpage.
     */
    gotoLoginPage = () => {
      this.props.history.push('/');
    }

    /**
     * It will render a HTML button which redirects the user when clicked
     * @return {HTMLElement} - a HTML button
     */
    render() {
      return (
        <button onClick={this.gotoLoginPage} className="blueButton">
                Logg inn
        </button>
      );
    }
}

LoginButton.propTypes = {
  history: PropTypes.object,
};

export default LoginButton;
