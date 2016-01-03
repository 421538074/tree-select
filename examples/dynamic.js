webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }
	
	__webpack_require__(2);
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(160);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _rcTreeSelect = __webpack_require__(161);
	
	var _rcTreeSelect2 = _interopRequireDefault(_rcTreeSelect);
	
	function generateTreeNodes(treeNode) {
	  var arr = [];
	  var key = treeNode.props.eventKey;
	  for (var i = 0; i < 3; i++) {
	    arr.push({ name: 'leaf ' + key + '-' + i, key: key + '-' + i });
	  }
	  return arr;
	}
	
	function setLeaf(treeData, curKey, level) {
	  var loopLeaf = function loopLeaf(data, lev) {
	    var l = lev - 1;
	    data.forEach(function (item) {
	      if (item.key.length > curKey.length ? item.key.indexOf(curKey) !== 0 : curKey.indexOf(item.key) !== 0) {
	        return;
	      }
	      if (item.children) {
	        loopLeaf(item.children, l);
	      } else if (l < 1) {
	        item.isLeaf = true;
	      }
	    });
	  };
	  loopLeaf(treeData, level + 1);
	}
	
	function getNewTreeData(treeData, curKey, child, level) {
	  var loop = function loop(data) {
	    if (level < 1 || curKey.length - 3 > level * 2) return;
	    data.forEach(function (item) {
	      if (curKey.indexOf(item.key) === 0) {
	        if (item.children) {
	          loop(item.children);
	        } else {
	          item.children = child;
	        }
	      }
	    });
	  };
	  loop(treeData);
	  setLeaf(treeData, curKey, level);
	}
	
	var Demo = _react2['default'].createClass({
	  displayName: 'Demo',
	
	  propTypes: {},
	  getInitialState: function getInitialState() {
	    return {
	      treeData: []
	    };
	  },
	  componentDidMount: function componentDidMount() {
	    var _this = this;
	
	    setTimeout(function () {
	      _this.setState({
	        treeData: [{ name: 'pNode 01', key: '0-0' }, { name: 'pNode 02', key: '0-1' }, { name: 'pNode 03', key: '0-2', isLeaf: true }]
	      });
	    }, 100);
	  },
	  onSelect: function onSelect(info) {
	    console.log('selected', info);
	  },
	  onLoadData: function onLoadData(treeNode) {
	    var _this2 = this;
	
	    return new Promise(function (resolve) {
	      setTimeout(function () {
	        var treeData = [].concat(_toConsumableArray(_this2.state.treeData));
	        getNewTreeData(treeData, treeNode.props.eventKey, generateTreeNodes(treeNode), 2);
	        _this2.setState({ treeData: treeData });
	        resolve();
	      }, 500);
	    });
	  },
	  render: function render() {
	    var loop = function loop(data) {
	      return data.map(function (item) {
	        if (item.children) {
	          return _react2['default'].createElement(
	            _rcTreeSelect.TreeNode,
	            { title: item.name, value: item.name, key: item.key },
	            loop(item.children)
	          );
	        }
	        return _react2['default'].createElement(_rcTreeSelect.TreeNode, { title: item.name, value: item.name, key: item.key, isLeaf: item.isLeaf });
	      });
	    };
	    var treeNodes = loop(this.state.treeData);
	    return _react2['default'].createElement(
	      'div',
	      { style: { padding: '10px 30px' } },
	      _react2['default'].createElement(
	        'h2',
	        null,
	        'dynamic render'
	      ),
	      _react2['default'].createElement(
	        _rcTreeSelect2['default'],
	        { style: { width: 300 }, onSelect: this.onSelect, loadData: this.onLoadData },
	        treeNodes
	      )
	    );
	  }
	});
	
	_reactDom2['default'].render(_react2['default'].createElement(Demo, null), document.getElementById('__react-content'));

/***/ }
]);
//# sourceMappingURL=dynamic.js.map