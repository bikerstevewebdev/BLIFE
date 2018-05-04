import React, {Component} from 'react';
import PropTypes from 'prop-types';

class MobileTearSheet extends Component {

  static propTypes = {
    children: PropTypes.node
  };



  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  render() {
    const {
      prepareStyles,
    } = this.context.muiTheme;

    const styles = {
      root: {
        marginBottom: 24,
        marginRight: 24,
        maxWidth: 200,
        width: '100%',
      },
      container: {
        border: 'solid 1px #d9d9d9',
        height: this.props.height,
        overflow: 'hidden',
      },
      bottomTear: {
        display: 'block',
        position: 'relative',
        marginTop: -10,
        maxWidth: 200,
      },
    };

    return (
      <div style={prepareStyles(styles.root)}>
        <div style={prepareStyles(styles.container)}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default MobileTearSheet;