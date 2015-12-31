import 'rc-tree/assets/index.css';
import 'rc-tree-select/assets/index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import TreeSelect, { TreeNode } from 'rc-tree-select';

const asyncTree = [
  {name: 'pNode 01', key: '0-0'},
  {name: 'pNode 02', key: '0-1'},
  {name: 'pNode 03', key: '0-2', isLeaf: true},
];

const generateTreeNodes = (treeNode) => {
  const arr = [];
  const key = treeNode.props.eventKey;
  for (let i = 0; i < 3; i++) {
    arr.push({name: `leaf ${key}-${i}`, key: `${key}-${i}`});
  }
  return arr;
};

const Demo = React.createClass({
  propTypes: {},
  getInitialState() {
    return {
      treeData: [],
    };
  },
  componentDidMount() {
    this.timeout(100).then(() => {
      this.setState({
        treeData: asyncTree,
      });
      return asyncTree;
    });
  },
  timeout(duration = 0) {
    return new Promise((resolve) => {
      setTimeout(resolve.bind(this), duration);
    });
  },
  onSelect(info) {
    console.log('selected', info);
  },
  onLoadData(treeNode) {
    return this.timeout(500).then(() => {
      const treeData = [...this.state.treeData];
      const child = generateTreeNodes(treeNode);
      const curKey = treeNode.props.eventKey;
      const level = 2;
      const loop = (data) => {
        if (level < 1 || curKey.length - 3 > level * 2) return;
        data.forEach((item) => {
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
      const loopLeaf = (data, lev) => {
        const l = lev - 1;
        data.forEach((item) => {
          if ((item.key.length > curKey.length) ? item.key.indexOf(curKey) !== 0 :
            curKey.indexOf(item.key) !== 0) {
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
      this.setState({treeData});
      return child;
    });
  },
  render() {
    const loop = (data) => {
      return data.map((item) => {
        if (item.children) {
          return <TreeNode title={item.name} value={item.name} key={item.key}>{loop(item.children)}</TreeNode>;
        }
        return <TreeNode title={item.name} value={item.name} key={item.key} isLeaf={item.isLeaf} />;
      });
    };
    const treeNodes = loop(this.state.treeData);
    return (
      <div style={{padding: '10px 30px'}}>
        <h2>dynamic render</h2>
        <TreeSelect style={{width: 300}} onSelect={this.onSelect} loadData={this.onLoadData}>
          {treeNodes}
        </TreeSelect>
      </div>
    );
  },
});

ReactDOM.render(<Demo />, document.getElementById('__react-content'));
