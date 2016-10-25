import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setHelloMessage} from '../actions';
import {getHelloMessage} from '../selectors';
//import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import {MapContainer} from '../../map/components/MapContainer.js';

const Header = ({children}) => <div>{children}</div>;
const Footer = ({children}) => <div>{children}</div>;
const ListContainer = ({children}) => <div className="list-container">{children}</div>;

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
    return (
      <div>
        <Header/>
        <ListContainer/>
        <MapContainer/>
        <Footer/>
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
