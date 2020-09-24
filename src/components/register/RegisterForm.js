
import React, {Component} from 'react';
import axios from 'axios';
import {BASEURL, PORT} from '../../Constants';
import PropTypes from 'prop-types';

/**
 * This component is the main component of the register page. It will take in
 * the users input and also contains the HTTP functionality for registering a
 * new user. It will also hash the password real-time
 */
export class RegisterForm extends Component {
  state = {
    firstname: '',
    email: '',
    age: undefined,
    phone: '',
    password: '',
    validatepassword: '',
    clicked: false,
    wrongCredentials: false,
    correctCredentials: false,
  }

  /**
   * This method will run whenever the user changes the inputfields.
   * If the changed field is the password field, it will hash the value.
   * @param {Event} e - the event of the change
   */
  onChange = (e) => {
    const hash = require('object-hash');
    if (e.target.name === 'password' ||
      e.target.name === 'validatepassword') {
      this.setState({[e.target.name]: hash.sha1(e.target.value)});
    } else {
      this.setState({[e.target.name]: e.target.value});
    }
  }

  /**
   * This function runs whenever the form is submitted. It will clear the
   * form and call the registerNewUser function.
   * @param {Event} e - the submit event
   */
  onSubmit = (e) => {
    e.preventDefault();
    this.setState({clicked: true});
    this.clearForm();
    this.registerNewUser();
  }

  /**
   * This function will check if the form is valid, and if it is, send a POST
   * request to the database with the credentials. The state will change
   * depending on if the response was good or not. The user will get feedback
   * based on this.
   * @return {undefined} - exits the function if the credentials are wrong
   */
  registerNewUser = () => {
    if (!this.validateForm()) {
      if (this.props.testingFunc) this.props.testingFunc(false);
      this.setState({wrongCredentials: true});
      return;
    }
    if (this.props.testingFunc) return this.props.testingFunc(true);

    axios.post(`http://${BASEURL}:${PORT}/users/`, {
      username: this.state.firstname,
      email: this.state.email,
      password: this.state.password,
      avatar: 'default',
      age: this.state.age,
      gender: this.state.gender,
      phone: this.state.phone,
    }).then(() => {
      this.setState({
        wrongCredentials: false,
        correctCredentials: true,
      });
    }).catch(() => this.setState({
      wrongCredentials: true,
      correctCredentials: false,
    }));
  }

  /**
   * This is a helper function which will check that nothing is empty in the
   * form, and that the password are equal.
   * @return {bool} - returns true if nothing is empty and the password are
   * equal, else false
   */
  validateForm = () => {
    return this.passwordAreEqual() &&
      this.state.firstname !== '' &&
      this.state.email !== '' &&
      this.state.age !== undefined &&
      this.state.phone !== '';
  }

  /**
   * This function will return true if the passwords are equal,
   * and false if not.
   * @return {bool} - returns true if the password are equal, else false
   */
  passwordAreEqual = () => {
    return this.state.password === this.state.validatepassword;
  }

  /**
   * This function clears the form input fields
   */
  clearForm = () => {
    for (const element of document.getElementsByClassName('validate')) {
      element.value = '';
    }
  }

  /**
   * The render function renders the form and the errors that follow depending
   * on if the user did not follow the correct procedure.
   * @return {HTMLElement} - the HTML form which will be seen on the register
   * page
   */
  render() {
    return (
      <form onSubmit={this.onSubmit} className="flexCenter">
        <h3>Registrer deg</h3>
        {/* Blir nå brukt som brukernavn*/}
        <div>
          <input name="firstname" type="text" placeholder="Fornavn"
            className="validate" onChange={this.onChange} />
          <label htmlFor="firstname"></label>
        </div>
        <div>
          <input name="email" type="email" placeholder="E-post"
            className="validate" onChange={this.onChange} />
          <label htmlFor="email"></label>
        </div>
        <div>
          <input name="age" type="number" min="6" max="100"
            placeholder="Alder" className="validate" onChange={this.onChange} />
            år
          <label htmlFor="age"></label>
        </div>
        <div>
          <input name="phone" type="tel"
            placeholder="Telefonnr...(eks. 12345678)"
            pattern="[0-9]{8}"
            className="validate" onChange={this.onChange} />
          <label htmlFor="phone"></label>
        </div>
        <div>
          <input name="password" type="password" placeholder="Passord"
            className="validate" onChange={this.onChange} />
          <label htmlFor="password"></label>
        </div>
        <div>
          <input name="validatepassword" type="password"
            placeholder="Bekreft passord" className="validate"
            onChange={this.onChange} />
          <label htmlFor="validatepasswordpassword"></label>
        </div>
        <div>
          <button type="submit"
            name="register">Registrer deg</button>
        </div>
        {this.state.wrongCredentials &&
          <p id="registererror">Det skjedde en feil med registeringen!</p>
        }
        {this.state.correctCredentials &&
          <p id="registergoodstuff">Du har registrert en ny bruker!</p>
        }

      </form>
    );
  }
}

RegisterForm.propTypes = {
  testingFunc: PropTypes.func,
};

export default RegisterForm;
