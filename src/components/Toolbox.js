import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Toolbox extends Component {
  state = {
    searchText: "",
  };

  handleChange = (e) => {
    const value = e.target.value;
    this.setState({
      searchText: value,
    });
    this.props.search(value);
  };

  clearSearchText = (e) => {
    this.setState({ searchText: "" });
    this.props.search("");
  };

  goCart = () => {
    this.props.history.push(`/cart`);
  };

  render() {
    return (
      <div className="tool-box">
        <div className="log-text">Store</div>
        <div className="search-box">
          <div className="field has-addons">
            <div className="control">
              <input
                type="text"
                className="input search-input"
                placeholder="Search Product"
                value={this.state.searchText}
                onChange={this.handleChange}
              />
            </div>
            <div className="control">
              <button className="button" onClick={this.clearSearchText}>
                x
              </button>
            </div>
          </div>
        </div>
        <div className="cart-box" onClick={this.goCart}>
          <i className="fas fa-shopping-cart">
            <span className="cart-num">({this.props.cartNum})</span>
          </i>
        </div>
      </div>
    );
  }
}

export default withRouter(Toolbox);
