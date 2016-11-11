import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetchUnits} from '../../unit/actions';
import {setLocation} from '../../map/actions';
import {getLocation} from '../../map/selectors';
import {getVisibleUnits} from '../../unit/selectors';
import {changeLanguage} from '../../home/actions';
import {DefaultFilters} from '../../unit/constants';
//import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import {MapView} from '../../unit/components/MapView.js';
import UnitBrowser from '../../unit/components/UnitBrowser.js';
import SingleUnitModalContainer from '../../unit/components/SingleUnitModalContainer';
import {locations, views, POLL_INTERVAL} from '../constants.js';
import {arrayifyQueryValue} from '../../common/helpers';

export class HomeContainer extends Component {
  static propTypes = {
    fetchUnits: PropTypes.func.isRequired,
    position: PropTypes.array.isRequired,
    selectedView: PropTypes.string.isRequired,
    unitData: PropTypes.array,
    filter: PropTypes.any.isRequired
  };

  static defaultProps = {
    unitData: [],
    position: locations.HELSINKI,
    selectedView: views.MAP,
    filter: DefaultFilters
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedView: props.selectedView
    };

    this.state = {modalOpen: false};

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChangeLanguage = this.handleChangeLanguage.bind(this);
  }

  componentWillMount() {
    this.props.fetchUnits();
    this.props.setLocation(locations.HELSINKI);

    this.pollUnitsInterval = setInterval(this.props.fetchUnits, POLL_INTERVAL);
  }

  componentDidMount() {
    const {params} = this.props;

    if (params.unitId) {
      this.openModal();
    }
  }

  componentWillUnmount() {
    clearInterval(this.pollUnitsInterval);
  }

  handleChangeLanguage(language) {
    console.log(language);
    this.props.changeLanguage(language);
  }

  openModal() {
    this.setState({modalOpen: true});
  }

  closeModal() {
    this.setState({modalOpen: false});
  }

  render() {
    const {unitData, position, mapCenter, params, location: {query: {filter}}} = this.props;
    const activeFilter = arrayifyQueryValue(filter);
    console.log(unitData);

    return (
      <div>
        <UnitBrowser units={unitData} activeFilter={activeFilter} handleClick={this.openModal} position={mapCenter} />
        <MapView params={params} setLocation={this.props.setLocation} position={position} units={unitData} changeLanguage={this.handleChangeLanguage} handleClick={this.openModal} mapCenter={mapCenter}/>
        <SingleUnitModalContainer isOpen={this.state.modalOpen} units={unitData} params={params} handleClick={this.closeModal} />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  unitData: getVisibleUnits(state, props.location.query && props.location.query.filter && arrayifyQueryValue(props.location.query.filter)),
  mapCenter: getLocation(state)
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({fetchUnits, setLocation, changeLanguage}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(
  HomeContainer
);
