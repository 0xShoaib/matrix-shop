import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import Spinner from "../components/Spinner";

import { UserContext } from "../context/UserContext";
import Footer from "../components/Footer";

export default function Login() {
  const { dispatch } = useContext(UserContext);

  const { handleSubmit, register, errors } = useForm();

  const history = useHistory();

  const [serverError, setServerError] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);

  const onLogin = (data) => {
    console.log(data);
    setShowSpinner(true);

    fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setShowSpinner(false);

        if (result.error) {
          console.log("Error: ", result.error);
          setServerError(result.error);
        }

        console.log(result);

        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));

        dispatch({ type: "USER", payload: result.user });
        history.push("/");
      });
  };
  return (
    <>
      <div className="LoginWrapper">
        {serverError ? <p className="ServerError">{serverError}</p> : null}
        <h2>Login</h2>
        <form onSubmit={handleSubmit(onLogin)}>
          <div>
            <input
              type="text"
              name="email"
              ref={register({
                required: "Required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            <label>Email</label>
            <p className="FormError">{errors.email && errors.email.message}</p>
          </div>
          <div>
            <input
              type="password"
              name="password"
              ref={register({
                required: "Required",
                minLength: {
                  value: 8,
                  message: "Password must have at least 8 characters ",
                },
              })}
            />
            <label>Password</label>
            <p className="FormError">
              {errors.password && errors.password.message}
            </p>
          </div>
          {showSpinner ? (
            <button className="LoginBtn SpinnerBtn">
              <Spinner />
            </button>
          ) : (
            <button className="LoginBtn">Login</button>
          )}
        </form>
        <p className="QuestionOnForm">
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </div>
      <Footer />
    </>
  );
}
