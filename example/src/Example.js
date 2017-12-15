import React, { Component } from 'react';

import PeripheralView from 'peripheral-view';

const style = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    outline: '1px solid black'
  },
  panel: {
    flex: '1 1 512px',
    height: '512px',
    margin: '32px',
    overflowY: 'auto',
    outline: '1px solid black'
  },
  button: {
    flex: '0 1 10%',
    margin: '16px'
  },
  code: {
    whiteSpace: 'pre-wrap',
    fontSize: '18px'
  }
};

class Example extends Component {
  render() {
    const { length, radius, renderMap, renderMapString } = this.props;

    const code = `<PeripheralView
  ref={r => this.view = r}
  length={${length}}
  radius={${radius}}
  renderMap={${renderMapString}}
/>

<button
  style={style.button}
  onClick={() => this.view.scrollTo(250)}
>
  Scroll To 250
</button>`;

    return (
      <div style={style.container}>
        <div style={style.panel}>
          <code style={style.code}>
            {code}
          </code>
        </div>
        <button style={style.button} onClick={() => this.view.scrollTo(250)}>Scroll To 250</button>
        <div style={style.panel}>
          <PeripheralView
            ref={r => this.view = r}
            length={length}
            radius={radius}
            renderMap={renderMap}
          />
        </div>
      </div>
    );
  }
}

export default Example;