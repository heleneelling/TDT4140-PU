import React, {Component} from 'react';
import GroupItem from './GroupItem';
import PropTypes from 'prop-types';

/**
 * This component works as a container for the listelements containing the
 * groupnames. It is a html ul element.
 */
export class Groups extends Component {
  /**
   * The render function returns the list of the groups
   * @return {HTMLElement} - html ul element with the groups
   */
  render() {
    return (
      <ul>
        {this.props.groups.map((group) => {
          return <GroupItem key={group.groupid} group={group}
            groupclickHandler={this.props.groupclickHandler} />;
        })}
      </ul>
    );
  }
}

Groups.propTypes = {
  groups: PropTypes.array,
  groupclickHandler: PropTypes.func,
};

export default Groups;
