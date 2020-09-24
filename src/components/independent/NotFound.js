import React, {Component} from 'react';

/**
 * This component is only rendered when the user tries to goto a URL
 * e.g. "/overview" without being logged into the application, or if an error
 * which does not throw an exception occurs. It will show a simple error
 * on the page.
 */
export class NotFound extends Component {
  /**
   * The render function renders a div with an h3 element which displays the
   * error to the user.
   * @return {HTMLElement} - div with simple error
   */
  render() {
    return (
      <div>
        <h3>Could not load page. This might be because you are not
                    logged in</h3>
      </div>
    );
  }
}

export default NotFound;
