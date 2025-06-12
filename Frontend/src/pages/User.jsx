import React, { useState } from "react";
import "./user.scss";
import BalanceChecking from "../components/BalanceChecking";
import UserProfileForm from "../components/UserProfileForm";

const User = () => {
  return (
    <section className="user-page">
      <h1>Edit user info</h1>
      <UserProfileForm />
      <BalanceChecking />
    </section>
  );
};

export default User;
