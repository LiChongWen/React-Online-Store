import React from "react";
import UserProfile from "components/UserProfile";
import Panel from "components/Panel";
import { Link, withRouter } from "react-router-dom";

const Header = (props) => {
  const toProfile = () => {
    Panel.open({
      component: UserProfile,
      props: {
        user: props.user,
      },
      addCallback: (data) => {
        if (data === "logout") {
          props.history.go(0);
        }
      },
    });
  };

  return (
    <div className="header">
      <div className="grid">
        <div className="star">
          <a href="/">Home</a>
        </div>
        <div className="end">
          {props.user.nickname ? (
            <span className="nickname" onClick={toProfile}>
              <i className="far fa-user"></i>
              {props.user.nickname}
            </span>
          ) : (
            <React.Fragment>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default withRouter(Header);
