'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactWaypoint = require('react-waypoint');

var _reactWaypoint2 = _interopRequireDefault(_reactWaypoint);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PeripheralView = function (_Component) {
  _inherits(PeripheralView, _Component);

  function PeripheralView(props) {
    _classCallCheck(this, PeripheralView);

    var _this = _possibleConstructorReturn(this, (PeripheralView.__proto__ || Object.getPrototypeOf(PeripheralView)).call(this, props));

    _this.state = {
      currentIndex: 0,
      isScrolling: false
    };

    _this.handleWaypoint = _this.handleWaypoint.bind(_this);
    return _this;
  }

  _createClass(PeripheralView, [{
    key: 'scrollTo',
    value: function scrollTo(index) {
      this.setState({
        currentIndex: index,
        isScrolling: true
      });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var isScrolling = this.state.isScrolling;

      if (isScrolling === prevState.isScrolling) {
        return;
      }

      if (!isScrolling) {
        _reactDom2.default.findDOMNode(this.currentElement).scrollIntoView();
      } else {
        this.setState({
          isScrolling: false
        });
      }
    }
  }, {
    key: 'handleWaypoint',
    value: function handleWaypoint(wp, index) {
      var previousPosition = wp.previousPosition,
          currentPosition = wp.currentPosition;


      console.log('inScreen', index, previousPosition, currentPosition);
      if (previousPosition === _reactWaypoint2.default.above || previousPosition === _reactWaypoint2.default.below) {
        this.setState({
          currentIndex: index
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          length = _props.length,
          radius = _props.radius,
          renderMap = _props.renderMap,
          style = _props.style;
      var _state = this.state,
          currentIndex = _state.currentIndex,
          isScrolling = _state.isScrolling;

      console.log(currentIndex);

      if (isScrolling) {
        return _react2.default.createElement('div', { style: style });
      }

      var start = Math.max(0, currentIndex - radius);
      var end = Math.min(length, currentIndex + radius);

      var view = [];

      var _loop = function _loop(i) {
        var element = renderMap(i);
        var WithInnerRefComponent = withInnerRef(element.type);
        var component = _react2.default.createElement(WithInnerRefComponent, element.props);

        view[i - start] = _react2.default.createElement(
          _reactWaypoint2.default,
          _extends({}, i === currentIndex ? { ref: function ref(r) {
              return _this2.currentElement = r;
            } } : {}, {
            key: i,
            onEnter: function onEnter(wp) {
              return _this2.handleWaypoint(wp, i);
            },
            fireOnRapidScroll: true
          }),
          component
        );
      };

      for (var i = start; i < end; ++i) {
        _loop(i);
      }

      return _react2.default.createElement(
        'div',
        { style: style },
        view
      );
    }
  }]);

  return PeripheralView;
}(_react.Component);

exports.default = PeripheralView;


function withInnerRef(WrappedComponent) {
  return function (_WrappedComponent) {
    _inherits(WithInnerRef, _WrappedComponent);

    function WithInnerRef() {
      _classCallCheck(this, WithInnerRef);

      return _possibleConstructorReturn(this, (WithInnerRef.__proto__ || Object.getPrototypeOf(WithInnerRef)).apply(this, arguments));
    }

    _createClass(WithInnerRef, [{
      key: 'render',
      value: function render() {
        return _react2.default.cloneElement(_get(WithInnerRef.prototype.__proto__ || Object.getPrototypeOf(WithInnerRef.prototype), 'render', this).call(this), { ref: this.props.innerRef });
      }
    }]);

    return WithInnerRef;
  }(WrappedComponent);
}

