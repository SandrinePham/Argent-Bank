import React, { useState } from "react";
import BalanceChecking from "../components/BalanceChecking";
import "./user.scss";



const User = ({ currentName = "", onSave }) => {
  const [name, setName] = useState(currentName);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) onSave(name);
  };

  const handleCancel = () => {
    window.location.href = "/dashboard";
  };

  return (
    <>
      <div className="editUser">
        <h2>Edit user info</h2>
        <form onSubmit={handleSubmit} className="editUserContent">
          <label >
            User name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <div className="editUserBtn">
            <button className="editBtn" type="submit">Save</button>
            <button className="editBtn" type="button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
      <BalanceChecking />
    </>
  );
};

export default User;
