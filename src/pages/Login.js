import React from "react";
import { useForm } from "react-hook-form";
import Layout from "Layout";
import axios from "common/axios";
import { toast } from "react-toastify";

export default function Login(props) {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {
    //handle login logic
    try {
      const { email, password } = data;
      const res = await axios.post(`/auth/login`, { email, password });
      const jwToken = res.data;
      global.auth.setToken(jwToken);
      toast.success("Login success");
      props.history.push("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
    // router to root page
  };

  return (
    <Layout>
      <div className="login-wrapper">
        <form className="box login-box" onSubmit={handleSubmit(onSubmit)}>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                className={`input ${errors.email && "is-danger"}`}
                type="email"
                placeholder="Email"
                name="email"
                ref={register({ required: true })}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input
                className={`input ${errors.password && "is-danger"}`}
                type="password"
                placeholder="Password"
                name="password"
                ref={register({ required: true })}
              />
            </div>
          </div>
          <div className="control">
            <button className="button is-fullwidth is-primary">Login</button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
