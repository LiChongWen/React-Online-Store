import React from "react";
import { useForm } from "react-hook-form";
import Layout from "Layout";
import axios from "common/axios";
import { toast } from "react-toastify";

export default function Register(props) {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {
    //handle login logic
    try {
      const { nickname, email, password } = data;
      const res = await axios.post(`/auth/register`, {
        nickname,
        email,
        password,
        type: 0,
      });
      const jwToken = res.data;
      global.auth.setToken(jwToken);
      toast.success("Register success");
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
            <label className="label">Nickname</label>
            <div className="control">
              <input
                className={`input ${errors.nickname && "is-danger"}`}
                type="text"
                placeholder="Nickname"
                name="nickname"
                ref={register({ required: true })}
              />
            </div>
          </div>
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
            <button className="button is-fullwidth is-primary">Submit</button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
