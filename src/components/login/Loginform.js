import React, {Component} from 'react';
import PropTypes from 'prop-types';

/**
 * This component is the main component of the login page. It takes in the user
 * input and will hash it if it is written in the password field. The
 * functionality for adding the user is in LoginPage, so the information is
 * passed up the ladder by the getUserWithEmail prop call.
 */
export class LoginForm extends Component {
    state = {
      email: '',
      password: '',
      clicked: false,
    }

    /**
     * This function runs everytime the form changes (if the user types in
     * something or erases something). It will hash the password entered
     * real-time, and update the state based on what is typed in
     * @param {Event} e - the event of the change.
     */
    onChange = (e) => {
      const hash = require('object-hash');
      if (e.target.name === 'password') {
        this.setState({[e.target.name]: hash.sha1(e.target.value)}, () => {
        });
      } else {
        this.setState({[e.target.name]: e.target.value}, () => {
        });
      }
    }

    /**
     * This function runs when the submitbutton is clicked. It will change
     * "clicked" to true, and will clear the form. It calls the getUserWithEmail
     * function in App.js (through LoginPage) with the current state as
     * parameter. The state passed as a parameter is called 'credentials'
     * in App.js
     * @param {Event} e - the event of the submit.
     */
    onSubmit = (e) => {
      e.preventDefault();
      this.setState({clicked: true});
      this.clearForm();
      this.props.getUserWithEmail(this.state);
    }

    /**
     * This function clears the form input fields for the login form.
     */
    clearForm = () => {
      for (const element of document.getElementsByClassName('validate')) {
        element.value = '';
      }
    }

    /**
     * Main render function of the loginform. It renders the inputfields
     * and the submit button that can be seen on the login page. It will
     * also render the login error, depending on if the user typed in the wrong
     * credentials.
     * @return {HTMLElement} - the form element for the login page.
     */
    render() {
      return (
        <form onSubmit={this.onSubmit} className="flexCenter">
          <h3>Logg inn</h3>
          <div>
            <input name="email" type="email" placeholder="E-post"
              className="validate blueInput" onChange={this.onChange} />
            <label htmlFor="email"></label>
          </div>
          <div>
            <input name="password" type="password" placeholder="Passord"
              className="validate blueInput" onChange={this.onChange} />
            <label htmlFor="password"></label>
          </div>
          <div>
            <button type="submit" name="login"
              className="blueButton">Logg inn</button>
          </div>
          {this.props.wrongCredentials &&
                    <p id="loginerror">Feil brukernavn eller passord!</p>
          }
        </form>
      );
    }
}

LoginForm.propTypes = {
  getUserWithEmail: PropTypes.func,
  wrongCredentials: PropTypes.bool,
};

export default LoginForm;
