import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import Spinner from "../components/Spinner";

import { UserContext } from "../context/UserContext";
import Footer from "../components/Footer";

export default function Signup() {
  const { dispatch } = useContext(UserContext);

  const { handleSubmit, register, errors, getValues } = useForm();

  const history = useHistory();

  const [serverError, setServerError] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);

  const onSignup = (data) => {
    console.log(data);
    setShowSpinner(true);

    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
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
      <div className="SignupWrapper">
        {serverError ? <p className="ServerError">{serverError}</p> : null}

        <h2>Signup</h2>
        <form onSubmit={handleSubmit(onSignup)}>
          <div>
            <input
              type="text"
              name="name"
              ref={register({
                required: "Required",
                message: "Required",
              })}
            />
            <label>Name</label>
            <p className="FormError">{errors.name && errors.name.message}</p>
          </div>
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
          <div>
            <input
              type="password"
              name="confirmPassword"
              ref={register({
                required: "Required",
                validate: (value) =>
                  value === getValues("password") || "Password not matched",
              })}
            />
            <label>Confirm Password</label>
            <p className="FormError">
              {errors.confirmPassword && errors.confirmPassword.message}
            </p>
          </div>
          {showSpinner ? (
            <button className="SignupBtn SpinnerBtn">
              <Spinner />
            </button>
          ) : (
            <button className="SignupBtn">Signup</button>
          )}
        </form>
        <p className="QuestionOnForm">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
      <Footer />
    </>
  );
}
