import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {fetchUnits} from '../../unit/actions';
import {setLocation} from '../../map/actions';
import {changeLanguage} from '../../language/actions';
import * as fromMap from '../../map/selectors';
import * as fromSearch from '../../search/selectors';
import * as fromUnit from '../../unit/selectors';
import * as fromLanguage from '../../language/selectors';
import {DefaultFilters} from '../../unit/constants';
import MapView from '../../unit/components/MapView.js';
import UnitBrowser from '../../unit/components/UnitBrowser.js';
import SingleUnitModalContainer from '../../unit/components/SingleUnitModalContainer';
import {locations, views, POLL_INTERVAL} from '../constants.js';
import {arrayifyQueryValue} from '../../common/helpers';

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

  constructor(props) {
    super(props);
    this.state = {
      selectedView: props.selectedView
    };

    this.state = {modalOpen: false};

    this.openUnit = this.openUnit.bind(this);
    this.closeUnit = this.closeUnit.bind(this);
    this.handleChangeLanguage = this.handleChangeLanguage.bind(this);
    this.getActiveLanguage = this.getActiveLanguage.bind(this);
    this.setLocation = this.setLocation.bind(this);
    this.setView = this.setView.bind(this);
  }

  getChildContext() {
    return {
      getActiveLanguage: this.getActiveLanguage
    };
  }

  componentWillMount() {
    this.props.fetchUnits();

    this.pollUnitsInterval = setInterval(this.props.fetchUnits, POLL_INTERVAL);
    this.initialPosition = this.props.position;

    // TODO: re-enable langauge guessing from browser
    // if(!getStoredLang()) {
    //   const userLang = navigator.language || navigator.userLanguage;
    //
    //   if(userLang === 'sv' || userLang === 'sv-sv' || userLang === 'sv-fi') {
    //     this.handleChangeLanguage('sv');
    //
    //   } else if(userLang === 'fi') {
    //     this.handleChangeLanguage('fi');
    //   }
    // }
  }

  componentWillUnmount() {
    clearInterval(this.pollUnitsInterval);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.activeLanguage !== this.props.activeLanguage) {
      this.forceUpdate();
    }
  }

  handleChangeLanguage(language) {
    this.props.changeLanguage(language);
  }

  setLocation(location: array) {
    this.props.setLocation(location);
  }

  setView(coordinates) {
    this.refs.map.getWrappedInstance().setView(coordinates);
  }

  openUnit(unitId: string) {
    const {router, location: {query}} = this.props;
    router.push({
      pathname: `/unit/${unitId}`,
      query
    });
  }

  closeUnit() {
    const {router, location: {query}} = this.props;
    router.push({
      pathname: '/',
      query
    });
  }

  getActiveLanguage() {
    return this.props.activeLanguage;
  }

  render() {
    const {unitData, isLoading, isSearching, mapCenter, address, activeLanguage, params, location: {query: {filter}}} = this.props;
    const activeFilter = filter ? arrayifyQueryValue(filter) : DefaultFilters;

    return (
      <div className="home">
        <UnitBrowser
          isLoading={isLoading}
          isSearching={isSearching}
          units={unitData}
          selectedUnitId={+params.unitId}
          activeFilter={activeFilter}
          openUnit={this.openUnit}
          position={mapCenter}
          address={address}
          params={params}
          setLocation={this.setLocation}
          setView={this.setView}
        />
        <MapView
          ref="map"
          activeLanguage={activeLanguage}
          selectedUnitId={+params.unitId}
          params={params}
          setLocation={this.props.setLocation}
          position={this.initialPosition}
          units={unitData}
          changeLanguage={this.handleChangeLanguage}
          openUnit={this.openUnit}
          mapCenter={mapCenter}
        />
        <SingleUnitModalContainer isLoading={isLoading} isOpen={!!params.unitId} units={unitData} params={params} handleClick={this.closeUnit} />
      </div>
    );
  }
}

HomeContainer.childContextTypes = {
  getActiveLanguage: React.PropTypes.func
};

const mapStateToProps = (state, props) => ({
  unitData: fromUnit.getVisibleUnits(state, props.location.query),
  activeLanguage: fromLanguage.getLanguage(state),
  isLoading: fromUnit.getIsLoading(state),
  mapCenter: fromMap.getLocation(state),
  position: fromMap.getLocation(state),
  address: fromMap.getAddress(state),
  isSearching: fromSearch.getIsFetching(state)
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({fetchUnits, setLocation, changeLanguage}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(
  HomeContainer
));
