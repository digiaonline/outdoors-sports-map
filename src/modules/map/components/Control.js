import {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import L from 'leaflet';
import {MapControl} from 'react-leaflet';

export default class Control extends MapControl {  // note we're extending MapControl from react-leaflet, not Component from react

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    const {className, children} = this.props;

    const control = L.control({
      position: this.props.position || 'bottomright',
    });  // see http://leafletjs.com/reference.html#control-positions for other positions

    control.handleClick = this.handleClick;

    control.onAdd = function () {
      let div = L.DomUtil.create('div', `custom-control ${className}`);
      let link = L.DomUtil.create('a', 'custom-control-button', div);

      L.DomEvent
        .on(link, 'mousedown dblclick', L.DomEvent.stopPropagation)
        .on(link, 'click', L.DomEvent.stop)
        .on(link, 'click', this.handleClick, control);

      ReactDOM.render(children, link);

      return div;
    };

    this.leafletElement = control;
  }

  handleClick(event) {
    L.DomEvent.stopPropagation(event);
    event.stopPropagation();

    this.props.handleClick && this.props.handleClick(event);
  }

  static propTypes = {
    handleClick: PropTypes.func,
  }
}