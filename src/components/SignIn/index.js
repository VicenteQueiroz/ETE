import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { PasswordForgetLink } from "../PasswordForget";
import { SignUpLink } from "../SignUp";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const SignInPage = () => (
  <div>
    <h1>Sign In</h1>
    <SignInForm />
    <PasswordForgetLink />
    <SignUpLink />
  </div>
);

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};

class SignInFormBase extends Component {
  state = { ...INITIAL_STATE };

  onSubmit = evt => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    evt.preventDefault();
  };

  onChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  render() {
    const isInvalid = this.state.password === "" || this.state.email === "";

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="email"
          value={this.state.email}
          onChange={this.onChange}
          type="text"
          placeholder="Email"
        />
        <input
          name="password"
          value={this.state.password}
          onChange={this.onChange}
          type="text"
          placeholder="password"
        />
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>
        {this.state.error && <p>{this.state.error.message}</p>}
      </form>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase
)(SignInFormBase);

export { SignInForm };

export default SignInPage;
