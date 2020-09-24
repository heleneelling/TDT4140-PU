import React, {Component} from 'react';
import PropTypes from 'prop-types';

/**
 * This button has the sole purpose of sending the user to the register page.
 */
export class RegisterButton extends Component {
    /**
     * This function will send the user to the register page.
     */
    gotoRegister = () => {
      this.props.history.push('/register');
    }

    /**
     * It renders a button which calls the gotoRegister function when clicked
     * @return {HTMLElement} - a HTML button which redirects the user
     */
    render() {
      return (
        <button onClick={this.gotoRegister}>
                Registrer deg
        </button>
      );
    }
}

RegisterButton.propTypes = {
  history: PropTypes.object,
};

export default RegisterButton;
