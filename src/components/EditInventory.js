import React, { Component } from "react";
import axios from "common/axios";
import { toast } from "react-toastify";

class EidtInventory extends Component {
  state = {
    id: "",
    name: "",
    price: "",
    tags: "",
    image: "",
    status: "available",
  };

  componentDidMount() {
    const { id, name, tags, image, price, status } = this.props.product;
    this.setState({
      id: id,
      name: name,
      price: price,
      tags: tags,
      image: image,
      status: status,
    });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  submit = (e) => {
    e.preventDefault();
    const product = { ...this.state };
    axios.put(`products/${this.state.id}`, product).then((res) => {
      this.props.close();
      this.props.sbmit(product);
      toast.success("Update Success");
    });
  };

  close = () => {
    this.props.close();
  };

  onDelete = () => {
    this.props.close();
    const _id = this.state.id;
    axios.delete(`products/${_id}`).then((res) => {
      this.props.close();
      this.props.deleteProduct(_id);
      toast.success("Delete Success");
    });
  };

  render() {
    return (
      <div>
        <p className="title has-text-centered">Add Inventory</p>
        <form onSubmit={this.submit}>
          <div className="field">
            <div className="control">
              <label className="label">Name</label>
              <textarea
                className="textarea"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="label">Price</label>
              <input
                type="number"
                className="input"
                name="price"
                value={this.state.price}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="label">Tags</label>
              <input
                type="text"
                className="input"
                name="tags"
                value={this.state.tags}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="label">Image</label>
              <input
                type="text"
                className="input"
                name="image"
                value={this.state.image}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="label">Status</label>
              <div className="select is-fullwidth">
                <select
                  name="status"
                  value={this.state.status}
                  onChange={this.handleChange}
                >
                  <option>available</option>
                  <option>unavailable</option>
                </select>
              </div>
            </div>
          </div>
          <br />
          <div className="field is-grouped is-grouped-centered">
            <div className="control">
              <button className="button is-link">Update</button>
            </div>
            <div className="control">
              <button
                className="button is-danger"
                type="button"
                onClick={this.onDelete}
              >
                Delete
              </button>
            </div>
            <div className="control">
              <button className="button" type="button" onClick={this.close}>
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default EidtInventory;
