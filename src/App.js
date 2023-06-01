import React, { useState } from "react";
import "./App.scss";

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const fetchUser = async () => {
    try {
      const response = await fetch("https://randomuser.me/api/");
      const data = await response.json();
      const user = data.results[0];
      setUsers((prevUsers) => [user, ...prevUsers]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectUser = (user) => {
    setSelectedUsers((prevSelectedUsers) => {
      if (prevSelectedUsers.includes(user)) {
        return prevSelectedUsers.filter(
          (selectedUser) => selectedUser !== user
        );
      } else {
        return [...prevSelectedUsers, user];
      }
    });
  };

  const handleDeleteSelectedUsers = () => {
    setUsers((prevUsers) =>
      prevUsers.filter((user) => !selectedUsers.includes(user))
    );
    setSelectedUsers([]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={fetchUser}>Generar usuario</button>
        {selectedUsers.length > 0 && (
          <button onClick={handleDeleteSelectedUsers}>Eliminar</button>
        )}
      </header>
      <div className="UserContainer">
        {users.map((user, index) => (
          <div
            className={`UserCard ${
              selectedUsers.includes(user) ? "selected" : ""
            }`}
            key={index}
            onClick={() => handleSelectUser(user)}
          >
            <img src={user.picture.large} alt="User" />
            <p>{`${user.name.first} ${user.name.last}`}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
