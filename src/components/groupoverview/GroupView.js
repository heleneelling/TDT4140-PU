import React, {Component} from 'react';
import Groups from './Groups';
import Icon from '../independent/Icon';
import PropTypes from 'prop-types';

/**
 * This component holds the list of groups and also adds the input field
 * for a new group and button to add it.
 */
export class GroupView extends Component {
  state = {
    groupName: '',
  }

  /**
   * This function is called whenever the input changes.
   * It changes the state to reflect this.
   * @param {Event} e - The event of the change
   */
  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  /**
   * The render function returns a element which wraps the groups and
   * the functionality to add a new group into one. It will pass the groupname
   * up the ladder.
   * @return {HTMLElement} - a wrapper for the groupview
   */
  render() {
    return (
      <>
        <Groups groups={this.props.groups}
          groupclickHandler={this.props.groupclickHandler} />
        <div className="inlineFlex">
          <input id="groupnameinput" type="text" name="groupName"
            placeholder="Navn på ny gruppe..."
            onChange={this.onChange} />
          <button
            onClick={this.props.postGroup.bind(this,
                this.state.groupName)}>
            <Icon name="groupAdd" />
          </button>
        </div>
      </>
    );
  }
}

GroupView.propTypes = {
  groups: PropTypes.array,
  groupclickHandler: PropTypes.func,
  postGroup: PropTypes.func,
};

export default GroupView;
