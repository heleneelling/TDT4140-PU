import React, {Component} from 'react';
import RegisterForm from './RegisterForm';
import Header from '../independent/Header';
import PropTypes from 'prop-types';

/**
 * This component is the endoint for the URL "/register". It renders the
 * header and the registerform.
 */
export class RegisterPage extends Component {
  /**
   * The render function renders the header with the registerPage as its origin,
   * and the registerform with testingfunc set to undefined as this is not
   * a testrun.
   * @return {HTMLElement} - the htmlelement containing the other elements
   * contained in the register page
   */
  render() {
    return (
      <>
        <Header origin="registerPage" history={this.props.history} />
        <div className="main">
          <RegisterForm testingFunc={undefined} />
        </div>
      </>
    );
  }
}

RegisterPage.propTypes = {
  history: PropTypes.object,
};

export default RegisterPage;
