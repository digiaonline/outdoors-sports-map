import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setHelloMessage} from '../actions';
import {getHelloMessage} from '../selectors';

export class HomeContainer extends Component {
  static propTypes = {
    setHelloMessage: PropTypes.func.isRequired,
    helloMessage: PropTypes.string
  };

  static defaultProps = {
    helloMessage: 'Hello from React!'
  };

  componentWillMount() {
    this.props.setHelloMessage('Hello from React and Redux!');
  }

  render() {
    const {helloMessage} = this.props;

    return (
      <div>
        {helloMessage}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  helloMessage: getHelloMessage(state)
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({setHelloMessage}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(
  HomeContainer
);