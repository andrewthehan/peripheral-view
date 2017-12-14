
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

    if(previousPosition === Waypoint.above || previousPosition === Waypoint.below){
      this.setState({
        currentIndex: index
      });
    }
  }

  render() {
    const { length, radius, renderMap } = this.props;
    const { currentIndex, isScrolling } = this.state;

    if(isScrolling) {
      return [];
    }

    const start = Math.max(0, currentIndex - radius);
    const end = Math.min(length, currentIndex + radius);

    const waypoints = [];
    for(let i = start; i < end; ++i){
      waypoints[i - start] = (
        <Waypoint
          {...(i === currentIndex ? { ref: r => this.currentElement = r } : {})}
          key={-(i + 1)}
          onEnter={wp => this.handleWaypoint(wp, i)}
          fireOnRapidScroll
        />
      );
    }

    const view = waypoints.reduce((a, x, i) => a.concat(x, renderMap(i + start)), []);
    return view;
  }
}

export default PeripheralView;
