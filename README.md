# peripheral-view [![npm](https://img.shields.io/npm/v/peripheral-view.svg?maxAge=86400)](https://www.npmjs.com/package/peripheral-view)
React component for rendering a sliding window view of elements.

## Installation
```
npm install peripheral-view --save
```

## Usage
```javascript
import PeripheralView from 'peripheral-view';

<PeripheralView
  ref={r => this.view = r}
  length={1000}
  radius={100}
  renderMap={i => <div key={i}>{i}</div>}
/>

this.view.scrollTo(250);
```

### Props
#### length
*type: `number`*

The maximum number of elements. To create a view with an infinite number of elements, use [`Infinity`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Infinity).

#### radius
*type: `number`*

The number of elements to render adjacent to both sides of the current element. This value must be large enough such that when the current view is rendered, there exists elements rendered outside of the window viewport.

#### renderMap
*type: `number => React element`*

A mapping function from element index to React element. The React element returned must have the key prop and its value must be a nonnegative value (usually the value will be the parameter of renderMap). The value must be nonnegative because PeripheralView internally has components with negative keys.

### Methods
#### scrollTo
*type: `number => void`*

Make the input index the current element. This brings the corresponding element to view by changing the scroll location of the nearest scrollable ancestor.
