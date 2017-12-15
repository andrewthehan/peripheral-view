import React, { Component } from 'react';

import Example from './Example';

const style = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
};

class App extends Component {
  render() {
    return (
      <div style={style.container}>
        <Example
          length={1000}
          radius={100}
          renderMap={i => <div key={i}>{i}</div>}
          renderMapString={'i => <div key={i}>{i}</div>'}
        />
        <Example
          length={1000}
          radius={100}
          renderMap={i => <div key={i} style={{ outline: '1px solid black', height: ((i % 10) + 3) * 10 }}>{i}</div>}
          renderMapString={`i =>
    <div key={i} style={{
      outline: '1px solid black',
      height: ((i % 10) + 3) * 10
    }}>
      {i}
    </div>
  `}
        />
        <Example
          length={Infinity}
          radius={100}
          renderMap={i => <div key={i}>{i}</div>}
          renderMapString={'i => <div key={i}>{i}</div>'}
        />
      </div>
    );
  }
}

export default App;
