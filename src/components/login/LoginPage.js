import React, {Component} from 'react';
import '../../shopstop_main.css';
import LoginForm from './Loginform';
import Header from '../independent/Header';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * This is the page loaded by the URL endpoint "/".
 * It will load the Header and the Loginform.
 */
export class LoginPage extends Component {
  /**
         * Main render function of the LoginPage.
         * It renders the LoginForm and passes in props from and to App.js
         * @return {HTMLElement} - Returns the JSX to be parsed by the compiler.
         */
  render() {
    return (
      <>
        <Header origin="loginPage" history={this.props.history} />
        <div className="main">
          <LoginForm
            getUserWithEmail={this.props.getUserWithEmail}
            isLoggedIn={this.props.isLoggedIn}
            wrongCredentials={this.props.wrongCredentials} />
        </div>
      </>
    );
  }
}

LoginPage.propTypes = {
  history: PropTypes.object,
  getUserWithEmail: PropTypes.func,
  isLoggedIn: PropTypes.bool,
  wrongCredentials: PropTypes.bool,
};

export default withRouter(LoginPage);
