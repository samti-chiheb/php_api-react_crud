import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateUserForm = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    email: "",
  });

  const { id } = useParams();

  // get on user and set it as userdata
  useEffect(() => {
    axios
      .get(`http://localhost:8888/rimender_poo/api/users/${id}`, userData)
      .then(function (response) {
        console.log(response.data);
        setUserData(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8888/rimender_poo/api/users/${id}/edit`, userData)
      .then(function (response) {
        console.log(response.data);
        navigate("/users");
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          name="username"
          value={userData.username}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        First Name:
        <input
          type="text"
          name="firstname"
          value={userData.firstname}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Last Name:
        <input
          type="text"
          name="lastname"
          value={userData.lastname}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">Update User</button>
    </form>
  );
};

export default UpdateUserForm;
