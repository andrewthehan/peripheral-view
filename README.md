# peripheral-view [![npm](https://img.shields.io/npm/v/peripheral-view.svg?maxAge=86400)](https://www.npmjs.com/package/peripheral-view)

React component for rendering a sliding window view of elements.

[Live demo](https://andrewthehan.github.io/peripheral-view/)

## Installation

```
npm install peripheral-view --save
```

## Usage

```javascript
import PeripheralView from "peripheral-view";

<PeripheralView
  ref={r => (this.view = r)}
  length={1000}
  radius={100}
  renderMap={i => <div key={i}>{i}</div>}
  handleChange={i => console.log(i)}
/>;

this.view.scrollTo(250);
```

### Props

#### length

_type: `number`_

The maximum number of elements. To create a view with an infinite number of elements, use [`Infinity`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Infinity).

#### radius

_type: `number`_

The number of elements to render adjacent to both sides of the current element. This value must be large enough such that when the current view is rendered, there exists elements rendered outside of the scrolling viewport.

#### renderMap

_type: `number => React element`_

A mapping function from element index to React element. The React element returned must have the key prop and its value must be a nonnegative value (usually the value will be the parameter of renderMap). The value must be nonnegative because PeripheralView internally has components with negative keys.

#### handleChange

_type: `number => void`_

A callback that is called when the index used as the "center" is changed.

### Methods

#### scrollTo

_type: `number => void`_

Make the input index the current element. This brings the corresponding element to view by changing the scroll location of the nearest scrollable ancestor.
