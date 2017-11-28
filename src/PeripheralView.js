
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Waypoint from 'react-waypoint';

class PeripheralView extends Component {
  constructor(props){
    super(props);

    this.state = {
      currentIndex: 0,
      isScrolling: false
    };

    this.handleWaypoint = this.handleWaypoint.bind(this);
  }

  scrollTo(index) {
    this.setState({
      currentIndex: index,
      isScrolling: true
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { isScrolling } = this.state;
    if(isScrolling === prevState.isScrolling){
      return;
    }

    if(!isScrolling){
      ReactDOM.findDOMNode(this.currentElement).scrollIntoView();
    }
    else {
      this.setState({
        isScrolling: false
      });
    }
  }

  handleWaypoint(wp, index) {
    const { previousPosition, currentPosition } = wp;

    console.log('inScreen', index, previousPosition, currentPosition);
    if(previousPosition === Waypoint.above || previousPosition === Waypoint.below){
      this.setState({
        currentIndex: index
      });
    }
  }

  render() {
    const { length, radius, renderMap, style } = this.props;
    const { currentIndex, isScrolling } = this.state;
    console.log(currentIndex);

    if(isScrolling) {
      return (
        <div style={style} />
      );
    }

    const start = Math.max(0, currentIndex - radius);
    const end = Math.min(length, currentIndex + radius);

    const view = [];
    for(let i = start; i < end; ++i){
      const element = renderMap(i);
      const WithInnerRefComponent = withInnerRef(element.type);
      const component = React.createElement(WithInnerRefComponent, element.props);

      view[i - start] = (
        <Waypoint
          {...(i === currentIndex ? { ref: r => this.currentElement = r } : {})}
          key={i}
          onEnter={wp => this.handleWaypoint(wp, i)}
          fireOnRapidScroll
        >
          {component}
        </Waypoint>
      );
    }

    return (
      <div style={style}>
        {view}
      </div>
    );
  }
}

export default PeripheralView;

function withInnerRef(WrappedComponent) {
  return class WithInnerRef extends WrappedComponent {
    render() {
      return React.cloneElement(super.render(), { ref: this.props.innerRef });
    }
  }
}