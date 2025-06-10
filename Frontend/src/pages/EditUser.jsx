import React, { useState } from "react";

const EditUser = ({ currentName = "", onSave }) => {
  const [name, setName] = useState(currentName);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) onSave(name);
  };

  const handleCancel = () => {
    window.location.href = "/dashboard";
  };

  return (
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
          <button type="submit">Save</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
