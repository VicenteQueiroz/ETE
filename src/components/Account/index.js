// The Account page serves as the central place for users to manage their account,
// where it shows the PasswordChangeForm and PasswordResetForm, accessible by a standalone route.

import React from "react";

import { PasswordForgetForm } from "../PasswordForget";
import PasswordChangeForm from "../PasswordChange";

const AccountPage = () => (
  <div>
    <h1>Account Page</h1>
    <PasswordForgetForm />
    <PasswordChangeForm />
  </div>
);

export default AccountPage;
