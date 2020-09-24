import React, {Component} from 'react';
import MemberItem from './MemberItem';
import AddMember from './AddMember';
import Icon from '../independent/Icon';
import PropTypes from 'prop-types';

/**
 * This component show the members of a group in a list format. It will
 * render differently depending on if the user is the admin of the group.
 */
export class GroupMemberView extends Component {
  state = {
    editMode: false,
  }

  /**
   * This function runs when the page is loaded. It will refresh the
   * groupmembers to show new changes that may have occured.
   */
  componentDidMount() {
    setTimeout(() => {
      this.props.getGroupMembers();
    }, 10);
  }


  /**
   * This function will flip the editmode from true from false and vice versa.
   */
  toggleEditMode = () => {
    this.setState({editMode: !this.state.editMode});
  }

  /**
   * The render function will render the list of the groupmembers
   * and the functionality buttons for adding and removing users depending
   * on administrator rights.
   * @return {HTMLElement} - An HTML element which displays the users.
   */
  render() {
    return (
      <>
        <div className="inlineFlex">
          <p>Medlemmer:</p>
          {this.props.checkIfGroupAdmin() &&
            <button
              onClick={this.toggleEditMode}
              className={this.state.editMode ? 'selected' :
                undefined}
            >
              <Icon name="edit" />
            </button>
          }
        </div>
        <ul>
          {this.props.members.map((member) => {
            return <MemberItem key={member.userid}
              member={member}
              currentUser={this.props.currentUser}
              removeUserById={this.props.removeUserById}
              editMode={this.state.editMode} />;
          })}
        </ul>
        {this.props.checkIfGroupAdmin() &&
          <AddMember addMemberByEmail={this.props.addMemberByEmail} />
        }
      </>
    );
  }
}

GroupMemberView.propTypes = {
  getGroupMembers: PropTypes.func,
  checkIfGroupAdmin: PropTypes.func,
  members: PropTypes.array,
  currentUser: PropTypes.object,
  removeUserById: PropTypes.func,
  addMemberByEmail: PropTypes.func,
};

export default GroupMemberView;
