import React from 'react';

class Spinner extends React.Component {

  state = {show: true};

  show = () => this.setState({show: true});
  hide = () => this.setState({show: false});  

  isShowing = () => this.state.show;

  render() {
    
    if (this.state.show) {
      return (
        <div className="ui active centered inline huge text loader">
          <div className="ui text loader">Loading</div>
          { this.props.message }
        </div>
      );
    }
    return null;
  }

};

Spinner.defaultProps = {
  message: 'Loading...'
};

export default Spinner;