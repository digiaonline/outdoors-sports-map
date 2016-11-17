import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetchUnits} from '../../unit/actions';
import {setLocation} from '../../map/actions';
import {getAttr} from '../../unit/helpers';
import {changeLanguage} from '../../language/actions';
import * as fromMap from '../../map/selectors';
import * as fromSearch from '../../search/selectors';
import * as fromUnit from '../../unit/selectors';
import * as fromLanguage from '../../language/selectors';
import {DefaultFilters} from '../../unit/constants';
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
    this.getAttr = this.getAttr.bind(this);
  }

  getChildContext() {
    return {
      getAttr: this.getAttr
    };
  }

  componentWillMount() {
    this.props.fetchUnits();
    this.props.setLocation(locations.HELSINKI);

    this.pollUnitsInterval = setInterval(this.props.fetchUnits, POLL_INTERVAL);

    if(!localStorage.getItem('outdoors-sports-map:language')) {
      const userLang = navigator.language || navigator.userLanguage;

      if(userLang === 'sv' || userLang === 'sv-sv' || userLang === 'sv-fi') {
        this.handleChangeLanguage('sv');

      } else if(userLang === 'fi') {
        this.handleChangeLanguage('fi');
      }
    }
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

  componentWillReceiveProps(nextProps) {
    if(nextProps.activeLanguage !== this.props.activeLanguage) {
      this.forceUpdate();
    }
  }

  handleChangeLanguage(language) {
    this.props.changeLanguage(language);
  }

  openModal() {
    this.setState({modalOpen: true});
  }

  closeModal() {
    this.setState({modalOpen: false});
  }

  getAttr(attr) {
    const {activeLanguage} = this.props;
    return getAttr(attr, activeLanguage);
  }

  render() {
    const {unitData, isLoading, isSearching, position, mapCenter, activeLanguage, params, location: {query: {filter}}} = this.props;
    const activeFilter = filter ? arrayifyQueryValue(filter) : DefaultFilters;

    return (
      <div className="home">
        <UnitBrowser isLoading={isLoading} isSearching={isSearching} units={unitData} activeFilter={activeFilter} handleClick={this.openModal} position={mapCenter} />
        <MapView activeLanguage={activeLanguage} params={params} setLocation={this.props.setLocation} position={position} units={unitData} changeLanguage={this.handleChangeLanguage} handleClick={this.openModal} mapCenter={mapCenter}/>
        <SingleUnitModalContainer isOpen={this.state.modalOpen} units={unitData} params={params} handleClick={this.closeModal} />
      </div>
    );
  }
}

HomeContainer.childContextTypes = {
  getAttr: React.PropTypes.func
};

const mapStateToProps = (state, props) => ({
  unitData: fromUnit.getVisibleUnits(state, props.location.query.filter ? arrayifyQueryValue(props.location.query.filter) : DefaultFilters),
  activeLanguage: fromLanguage.getLanguage(state),
  isLoading: fromUnit.getIsLoading(state),
  mapCenter: fromMap.getLocation(state),
  isSearching: fromSearch.getIsFetching(state)
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({fetchUnits, setLocation, changeLanguage}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(
  HomeContainer
);
