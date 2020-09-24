import React from 'react';
import Logo from '../../../public/media/logo.png';
import Icon from './Icon';
import RegisterButton from '../login/RegisterButton';
import LoginButton from '../register/LoginButton';
import LogoutButton from './LogoutButton';
import PropTypes from 'prop-types';

/**
 * To use a Header:
 * 1. Import it: import Header from ./Header
 * 2. Place the element wherever you want: <Header/>
 * 3. If not logged in, pass in the origin (which page you are currently on):
 * <Header origin="loginPage"/>
 *   If logged in, pass in the first name of the user (temporarily just
 * username): <Header name="this.state.currentUser.username/>"
 * @return {HTMLElement} - the header element corresponding to the origin
 */
const Header = ({origin = '', name = '', history = {}, logout = () => { }}) =>
  (
    <header className="inlineFlex">
      {getLayout(origin, name, history, logout)}
    </header>
  );

const rand = require('random-key');
const logo = (<img key={rand.generate()} src={Logo} alt="ShopStop logo"
  className="logo" />);

/**
   * This function will return a button which will take the user to the
   * profile page
   * @param {string} name -username of the user
   * @param {object} history - router history used to redirect
   * @return {HTMLElement} - profile button
   */
const accountButton = (name, history) => (
  <button key={rand.generate()} className="blueButton"
    onClick={ () => {
      history.push('/profile');
    }}>
    <Icon name="account" />
    <span style={{marginLeft: '5px'}}>{name}</span>
  </button>
);
/**
 * The function will return a different layout for the header
 * depending on the parameters
 * @param {string} origin - origin of the page
 * @param {string} name - username of the current user
 * @param {object} history - history object for redirecting user
 * @param {Function} logout - logout function
 * @return {HTMLElement} - header layout
 */
const getLayout = (origin, name, history, logout) => {
  switch (origin) {
    case ('frontPage'):
      return (
        <>
          <LoginButton history={history} />
          <RegisterButton history={history} />
        </>
      );
    case ('loginPage'):
      return (
        <>
          {logo}
          <RegisterButton history={history} />
        </>
      );
    case ('registerPage'):
      return (
        <>
          {logo}
          <LoginButton history={history} />
        </>
      );
    case ('accountPage'):
      return (
        <>
          {logo}
          <LogoutButton history={history} logout={logout} />
        </>
      );
    default:
      return (
        <>
          {logo}
          <LogoutButton history={history} logout={logout} />
          {accountButton(name, history)}
        </>
      );
  }
};

Header.propTypes = {
  origin: PropTypes.string,
  name: PropTypes.string,
  history: PropTypes.object,
  logout: PropTypes.func,
};

export default Header;
