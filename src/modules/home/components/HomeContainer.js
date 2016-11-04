import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetchUnits, singleUnitSelect} from '../../unit/actions';
import {getVisibleUnits, getSelectedUnit} from '../../unit/selectors';
//import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import {MapView} from '../../unit/components/MapView.js';
import {UnitBrowser} from '../../unit/components/UnitBrowser.js';
import {ListView} from '../../unit/components/ListView.js';
import SingleUnitModalContainer from '../../unit/components/SingleUnitModalContainer';
import {locations, views} from '../constants.js';

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

    this.state = {modalOpen: false};

    this.handleMapMove = this.handleMapMove.bind(this);
    this.toggleView = this.toggleView.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleView() {
    console.log('wgfasdf');
    this.setState({selectedView: this.state['selectedView'] === views.MAP ? views.LIST : views.MAP});
  }

  componentWillMount() {
    // Fetch ice rinks in 10km radius from the passed position
    this.props.fetchUnits();
  }

  handleMapMove(): void {
    //
  }

  toggleModal() {
    if (this.state.modalOpen === false) {
      this.setState({modalOpen: true});
    } else {
      this.setState({modalOpen: false});
    }
  }

  render() {
    const {unitData, position, params} = this.props;
    const {selectedView} = this.state;

    return (
      <div>
        {/*<Header toggleView={this.toggleView} toggleViewGlyph={selectedView === views.LIST ? 'globe' : 'list'} units={unitData}/>
        {/*<ListView selected={selectedView === views.LIST} units={unitData}/>*/}
        <UnitBrowser units={unitData} handleClick={this.toggleModal} />
        <MapView handleMoveend={this.handleMapMove} selected={selectedView === views.MAP} position={position} units={unitData}/>
        <SingleUnitModalContainer isOpen={this.state.modalOpen} units={unitData} params={params} handleClick={this.toggleModal} />
        <Footer/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  unitData: getVisibleUnits(state),
  selectedView: state.selectedView
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({fetchUnits, singleUnitSelect}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(
  HomeContainer
);
