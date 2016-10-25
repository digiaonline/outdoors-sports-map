import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetchUnits} from '../../unit/actions';
import {getAllUnits} from '../../unit/selectors';
import {UnitServices} from '../../unit/constants';
//import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import {MapContainer} from '../../map/components/MapContainer.js';

const Header = ({children}) => <div>{children}</div>;
const Footer = ({children}) => <div>{children}</div>;
const ListContainer = ({children}) => <div className="list-container">{children}</div>;

export class HomeContainer extends Component {
  static propTypes = {
    fetchUnits: PropTypes.func.isRequired,
    unitData: PropTypes.array
  };

  static defaultProps = {
    unitData: []
  };

  componentWillMount() {
    this.props.fetchUnits({service: UnitServices.ICE_SKATING_FIELD});
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
  unitData: getAllUnits(state)
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({fetchUnits}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(
  HomeContainer
);