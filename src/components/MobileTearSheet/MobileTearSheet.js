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
        margin: "0 10px",
        // maxWidth: 200,
        width: '33%',
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
      <div className="jcFlexCol curr-stats" style={{...prepareStyles(styles.root), textAlign: "center"}}>
        <div style={{...prepareStyles(styles.container), ...this.props.style}}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default MobileTearSheet;