import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ListUser = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    axios.get(`${import.meta.env.VITE_API_URL}/users`).then((response) => {
      console.log(response.data);
      setUsers(response.data);
    });
  };

  const deleteUser = (id) => {
    axios
      .delete(`${import.meta.env.VITE_API_URL}/users/${id}/delete`)
      .then((response) => {
        console.log(response.data);
        getUsers();
      });
  };

  return (
    <div>
      <h1>List of Users</h1>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, key) => (
            <tr key={key} id={user.id}>
              <td>{user.username}</td>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.email}</td>
              <td>
                <button
                  onClick={() => {
                    deleteUser(user.id);
                  }}
                  style={{
                    backgroundColor: "lightcoral",
                    padding: "3px",
                    margin: "8px",
                  }}
                >
                  Delete
                </button>
                <Link
                  to={`${user.id}/edit`}
                  style={{
                    backgroundColor: "lightblue",
                    padding: "3px",
                    margin: "8px",
                  }}
                >
                  Update
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListUser;
