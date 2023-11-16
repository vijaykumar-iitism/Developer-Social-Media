import React from "react";
import { useSelector } from "react-redux";

import User from "./User";
import "./Users.css";

const UsersList = () => {
  const users = useSelector((state) => state.usersReducer);

  return (
    <div className="user-list-container">
      {users.map((user) => (
        //another component user passed as a signal prop
        <User user={user} key={user?._id} />
      ))}
    </div>
  );
};

export default UsersList;
