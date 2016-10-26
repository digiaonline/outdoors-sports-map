import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetchUnits} from '../../unit/actions';
import {getAllUnits} from '../../unit/selectors';
import {UnitServices} from '../../unit/constants';
//import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import {MapView} from '../../unit/components/MapView.js';
import {ListView} from '../../unit/components/ListView.js';
import {locations} from '../constants.js';

const Header = ({children}) => <div>{children}</div>;
const Footer = ({children}) => <div>{children}</div>;

export class HomeContainer extends Component {
  static propTypes = {
    fetchUnits: PropTypes.func.isRequired,
    position: PropTypes.array.isRequired,
    unitData: PropTypes.array
  };

  static defaultProps = {
    unitData: [],
    position: locations.HELSINKI
  };

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
    return (
      <div>
        <Header/>
        <ListView units={unitData}/>
        <MapView selected={true} position={position} units={unitData}/>
        <Footer/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  unitData: getAllUnits(state)
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({fetchUnits}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(
  HomeContainer
);