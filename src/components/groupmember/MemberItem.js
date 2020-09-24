import React, {Component} from 'react';
import Icon from '../independent/Icon';
import PropTypes from 'prop-types';


/**
 * This component is the li element which will be included in the
 * group member view. It will render differently, and will have different
 * functionality depending on if the user is the admin of the group or not.
 */
export class MemberItem extends Component {
  /**
   * This function checks if the current listet member is the logged on user.
   * @return {boolean} - true if the member if the current logged in user.
   */
  userIsMember = () => {
    return this.props.member.userid === this.props.currentUser.userid;
  }

  /**
   * The render function will load different <li> based on if the member
   * listed is the current logged on user. If it is, a (you) tag will be
   * visible beside the users name
   * @return {HTMLElement} - a list item with the username of the user
   */
  render() {
    const {userid, username, contribution} = this.props.member;
    return (
      <li className="inlineFlex">
        <div className="inlineFlex">
          <Icon name="person" fill="black" />
          <span style={{marginLeft: '5px'}}>
            {username}{this.userIsMember() && ' (meg)'} |
                        Totalt bidratt: {contribution}kr
          </span>
        </div>
        {this.props.editMode && !this.userIsMember() &&
          <button
            onClick={() => this.props.removeUserById(userid)}
            style={{margin: '0px'}}
            className={this.props.editMode ? 'redButton' :
              undefined}
          >
            <Icon name="delete" />
          </button>
        }
      </li>
    );
  }
}

MemberItem.propTypes = {
  member: PropTypes.object,
  currentUser: PropTypes.object,
  editMode: PropTypes.bool,
  removeUserById: PropTypes.func,
};

export default MemberItem;
