import React, {Component} from 'react';
import Icon from '../independent/Icon';
import PropTypes from 'prop-types';

/**
 * This component is a listitem containing the groupname of the provided group.
 * It will bind the id of the group to the groupClickHandler function that will
 * be used up the ladder.
 */
export class GroupItem extends Component {
  /**
   * The render function returns the li element with the groupname
   * @return {HTMLElement} - list element containing the groupname.
   */
  render() {
    const {groupid, groupname} = this.props.group;
    return (
      <li className="clickable"
        onClick={this.props.groupclickHandler.bind(this, groupid)}>
        <Icon name="group" fill="white" />
        <span style={{marginLeft: '5px'}}>{groupname}</span>
      </li>
    );
  }
}

GroupItem.propTypes = {
  group: PropTypes.object,
  groupclickHandler: PropTypes.func,
};

export default GroupItem;
