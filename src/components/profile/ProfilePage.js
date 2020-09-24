import React, {Component} from 'react';
import Header from '../independent/Header';
import ProfileView from './ProfileView';
import Icon from '../independent/Icon';
import PropTypes from 'prop-types';
import NotFound from '../independent/NotFound';

/**
 * This is the endpoint for the URL "/profile". It will display the information
 * about the current logged in user.
 */
export class ProfilePage extends Component {
  /**
     * The render method will render the header and profileview
     * @return {HTMLElement} - a div with the profilepage information
     */
  render() {
    return this.props.isLoggedIn ? (
            <div>
              <Header origin="accountPage"
                history={this.props.history}
                logout={this.props.unloadStateAfterLogout} />
              <div className="inlineFlex">
                <button
                  className="blueButton"
                  style={{marginRight: '5px'}}
                  onClick={() => {
                    this.props.history.goBack();
                  }}
                >
                  <Icon name="back" />
                </button>
              </div>
              <ProfileView currentUser = {this.props.currentUser} />
            </div>
        ) :
        <NotFound/>;
  }
}

ProfilePage.propTypes = {
  currentUser: PropTypes.object,
  history: PropTypes.object,
  isLoggedIn: PropTypes.bool,
  unloadStateAfterLogout: PropTypes.func,
};

export default ProfilePage;
