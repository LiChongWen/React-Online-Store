import React, { useState, useEffect, useMemo } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Layout from "Layout";
import CartItem from "components/CartItem";
import axios from "common/axios";
import { formatPrice } from "common/helper";

const Cart = () => {
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    const user = global.auth.getUser() || {};
    axios.get(`/carts?userId=${user.email}`).then((res) => setCarts(res.data));
  }, []);

  const totalPrice = useMemo(() => {
    const totalPrice = carts
      .map((cart) => cart.mount * parseInt(cart.price))
      .reduce((a, value) => a + value, 0);
    return formatPrice(totalPrice);
  }, [carts]);

  const updateCart = (cart) => {
    const newCarts = [...carts];
    const _index = newCarts.findIndex((c) => c.id === cart.id);
    newCarts.splice(_index, 1, cart);
    setCarts(newCarts);
  };

  const deleteCart = (cart) => {
    const newCarts = carts.filter((c) => c.id !== cart.id);
    setCarts(newCarts);
  };

  return (
    <Layout>
      <div className="cart-page">
        <p className="title has-text-centered">Cart Page</p>
        <span className="cart-title">Shopping Cart</span>
        <div className="cart-list">
          <TransitionGroup component={null}>
            {carts.map((cart) => (
              <CSSTransition classNames="cart-item" timeout={300} key={cart.id}>
                <CartItem
                  key={cart.id}
                  cart={cart}
                  deleteCart={deleteCart}
                  updateCart={updateCart}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
        {carts.length === 0 ? <p className="no-cart">No GOOODS</p> : ""}
        <div className="cart-total">
          Total
          <span className="total-price">{totalPrice}</span>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
