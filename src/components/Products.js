import React from "react";
import axios from "common/axios";

import { CSSTransition, TransitionGroup } from "react-transition-group";

import Toolbox from "components/Toolbox";
import Product from "components/Product";

import Panel from "components/Panel";
import AddInventory from "components/AddInventory";

class Products extends React.Component {
  state = {
    products: [],
    sourceProducts: [],
    cartNum: 0,
  };

  //load after first init
  componentDidMount() {
    axios.get("/products").then((response) => {
      this.setState({
        products: response.data,
        sourceProducts: response.data,
      });
    });
    this.updateCartNum();
  }

  //Search function
  search = (text) => {
    //Get new array
    let _products = [...this.state.sourceProducts];

    //Filter New Array
    _products = _products.filter((p) => {
      const matchArray = p.name.match(new RegExp(text, "gi"));
      return !!matchArray;
    });

    //Set State
    this.setState({ products: _products });
  };

  addProduct = (product) => {
    const _products = [...this.state.products];
    _products.push(product);

    const _sProducts = [...this.state.products];
    _sProducts.push(product);
    this.setState({
      products: _products,
      sourceProducts: _sProducts,
    });
  };

  updateProduct = (product) => {
    const _products = [...this.state.products];
    const _index = _products.findIndex((p) => p.id === product.id);
    _products.splice(_index, 1, product);

    const _sProducts = [...this.state.sourceProducts];
    const _sIndex = _sProducts.findIndex((p) => p.id === product.id);
    _sProducts.splice(_sIndex, 1, product);
    this.setState({
      products: _products,
      sourceProducts: _sProducts,
    });
  };

  deleteProduct = (id) => {
    const _products = this.state.products.filter((p) => p.id !== id);
    const _sProducts = this.state.sourceProducts.filter((p) => p.id !== id);

    this.setState({
      products: _products,
      sourceProducts: _sProducts,
    });
  };

  // Add stock 把 Panel的子组件 作为参数传给 Panel
  toAdd = () => {
    Panel.open({
      component: AddInventory,
      addCallback: (data) => {
        if (data) {
          this.addProduct(data);
        }
        console.log("Data: ", data);
      },
    });
  };

  updateCartNum = async () => {
    const cartNum = await this.initCartNum();
    this.setState({
      cartNum: cartNum,
    });
  };

  initCartNum = async () => {
    const res = await axios.get(`/carts`);
    const carts = res.data || [];
    const cartNum = carts
      .map((cart) => cart.mount)
      .reduce((a, value) => a + value, 0);
    return cartNum;
  };

  render() {
    return (
      <div>
        <Toolbox search={this.search} cartNum={this.state.cartNum} />
        <div className="products">
          <div className="columns is-multiline is-desktop">
            <TransitionGroup component={null}>
              {this.state.products.map((product) => {
                return (
                  <CSSTransition
                    classNames="product-fade"
                    timeout={300}
                    key={product.id}
                  >
                    <div className="column is-3" key={product.id}>
                      <Product
                        product={product}
                        updateProduct={this.updateProduct}
                        deleteProduct={this.deleteProduct}
                        updateCartNum={this.updateCartNum}
                      />
                    </div>
                  </CSSTransition>
                );
              })}
            </TransitionGroup>
          </div>
          <button className="button is-primary add-btn" onClick={this.toAdd}>
            add
          </button>
        </div>
      </div>
    );
  }
}

export default Products;
