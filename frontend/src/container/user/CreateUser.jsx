import  { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"

const CreateUserForm = () => {
  
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission or API call to create a user

    axios.post('http://localhost:8888/rimender_poo/api/users/create', userData)
    .then(function(response){
      console.log(response.data); 
      navigate("/users");
    })

    // end of form submission
    setUserData({
      username: "",
      password: "",
      firstname: "",
      lastname: "",
      email: "",
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
      <button type="submit">Create User</button>
    </form>
  );
};

export default CreateUserForm;