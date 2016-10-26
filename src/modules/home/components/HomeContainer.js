import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetchUnits} from '../../unit/actions';
import {getAllUnits} from '../../unit/selectors';
import {UnitServices} from '../../unit/constants';
//import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import {MapView} from '../../unit/components/MapView.js';
import {ListView} from '../../unit/components/ListView.js';
import {locations, views} from '../constants.js';

const Header = ({toggleView}) =>
  <div id="header" className="header">
    {/* TODO/FIXME: Translate placeholder */}
    <input id="search" type="text" placeholder="Etsi..." />
    <button id="toggle-view-button" onClick={toggleView}>M/L</button>
  </div>;
const Footer = ({children}) => <div>{children}</div>;

export class HomeContainer extends Component {
  static propTypes = {
    fetchUnits: PropTypes.func.isRequired,
    position: PropTypes.array.isRequired,
    selectedView: PropTypes.string.isRequired,
    unitData: PropTypes.array
  };

  static defaultProps = {
    unitData: [],
    position: locations.HELSINKI,
    selectedView: views.MAP
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedView: props.selectedView
    };

    this.toggleView = this.toggleView.bind(this);
  }

  toggleView() {
    console.log('wgfasdf');
    this.setState({selectedView: this.state['selectedView'] === views.MAP ? views.LIST : views.MAP});
  }

  componentWillMount() {
    // Fetch ice rinks in 10km radius from the passed position
    this.props.fetchUnits({
      service: `${UnitServices.ICE_SKATING_FIELD},${UnitServices.MECHANICALLY_FROZEN_ICE}`,
      lat: this.props.position[0],
      lon: this.props.position[1],
      distance: 10000,
      page_size: 1000
    });
  }

  render() {
    const {unitData, position} = this.props;
    const {selectedView} = this.state;
    return (
      <div>
        <Header toggleView={this.toggleView} units={unitData}/>
        <ListView selected={selectedView === views.LIST} units={unitData}/>
        <MapView selected={selectedView === views.MAP} position={position} units={unitData}/>
        <Footer/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  unitData: getAllUnits(state),
  selectedView: state.selectedView
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({fetchUnits}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(
  HomeContainer
);