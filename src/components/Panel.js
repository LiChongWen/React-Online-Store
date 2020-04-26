// 一次渲染 随需调用

//装载组件
//  1.子组件作为参数传递并被渲染
//  2.子组件可以关闭弹出层
//  3.Panel的子组件 可以和 Panel的调用者 通讯

import React, { Component } from "react";
import { render } from "react-dom";

class Panel extends Component {
  state = {
    active: false,
    component: null,
    addCallback: () => {},
  };

  close = () => {
    this.setState({ active: false });
  };

  sbmit = (data) => {
    this.close();
    this.state.addCallback(data);
  };

  open = (
    options = {
      props: {},
    }
  ) => {
    const { props, component, addCallback } = options; //get constructor
    const _key = new Date().getTime();
    //create component using constructor
    const _component = React.createElement(component, {
      ...props,
      close: this.close,
      sbmit: this.sbmit,
      key: _key,
    });
    this.setState({
      component: _component,
      active: true,
      addCallback: addCallback,
    });
  };

  render() {
    const _class = {
      true: "panel-wrapper active",
      false: "panel-wrapper",
    };

    return (
      <div className={_class[this.state.active]}>
        <div className="over-layer" onClick={this.close}></div>
        <div className="panel">
          <div className="head">
            <span className="close" onClick={this.close}>
              x
            </span>
            {this.state.component}
          </div>
        </div>
      </div>
    );
  }
}

// 一次渲染 随需调用 在 root load 时把创建好的 object 加到root上去，之后不用每次点击重新创建
const _div = document.createElement("div");
document.body.appendChild(_div);

const _panel = render(<Panel />, _div);
export default _panel;
