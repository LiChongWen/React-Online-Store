import React, { Fragment } from "react";

class Login extends React.Component {
  // constructor() {
  //   super();
  //   // this.handleClick = this.handleClick.bind(this);
  //   this.state = {
  //     isLike: false,
  //     count: 0,
  //   };
  // }

  //受控组件

  //非受控组件

  state = {
    email: "",
    password: "",
  };

  //State

  // 命名和绑定
  // event
  // this
  // 传递参数

  handleSubmit = (event) => {
    //prevent default
    event.preventDefault();
    //get form data
    console.log(this.state);
    //handle login logic

    // router to root page
    this.props.history.push("/");
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <Fragment>
        <div className="login-wrapper">
          <form className="box login-box" onSubmit={this.handleSubmit}>
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  className="input"
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input
                  className="input"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="control">
              <button className="button is-fullwidth is-primary">Login</button>
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default Login;
