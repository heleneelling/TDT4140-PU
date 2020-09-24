import React, {Component} from 'react';
import Icon from '../independent/Icon';
import PropTypes from 'prop-types';

/**
 * This component will take in the user input for adding a new member for
 * a group he or she is the administrator of. It will pass the email provided
 * up the ladder.
 */
export class AddMember extends Component {
  state = {
    email: '',
  }

  /**
   * This function is called whenever the inputs change.
   * It changes the state to reflect the input.
   * @param {Event} e - The event of the change.
   */
  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  /* Function runs when the button is clicked,
  sends the input up the ladder to group-page*/
  onSubmit = (e) => {
    e.preventDefault();
    this.props.addMemberByEmail(this.state.email);
    document.getElementById('addMemberInput').value = '';
  }

  /**
   * This function will render the state and props of this component. It
   * will take in the input provided by the user for adding a new user.
   * @return {HTMLElement} - A HTML form element.
   */
  render() {
    return (
      <form className="inlineFlex" onSubmit={this.onSubmit}>
        <input id="addMemberInput" name="email" type="email"
          placeholder="E-post..." onChange={this.onChange} />
        <label htmlFor="email"></label>
        <button type="submit" name="login">
          <Icon name="personAdd" />
        </button>
      </form>
    );
  }
}

AddMember.propTypes = {
  addMemberByEmail: PropTypes.func,
};

export default AddMember;
