import React, {Component} from 'react';
import PropTypes from 'prop-types';

/**
 * This component is the component which can be seen in the dropdown menu when
 * adding new items to the shoppinglist. It will display the name and price
 * of the item.
 */
export class PossibleItem extends Component {
  /**
   * The render function renders the option element for the item in the dropdown
   * with the name and price attached.
   * @return {HTMLElement} - the option element in the dropdown menu.
   */
  render() {
    const {itemname, price} = this.props.item;
    return (
      <option value={this.props.item.itemid}>
        {itemname} {price}kr
      </option>
    );
  }
}

PossibleItem.propTypes = {
  item: PropTypes.object,
};

export default PossibleItem;
