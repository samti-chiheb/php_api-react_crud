import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateRecruiterForm = () => {
  const navigate = useNavigate();

  const [recruiterData, setRecruiterData] = useState({
    user_id: "",
    name: "",
    email: "",
    phone: "",
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8888/rimender_poo/api/users")
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecruiterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:8888/rimender_poo/api/recruiters/create",
        recruiterData
      )
      .then((response) => {
        console.log(response.data);
        navigate("/recruiters");
      })
      .catch((error) => {
        console.error(error);
      });

    setRecruiterData({
      user_id: "",
      name: "",
      email: "",
      phone: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        User:
        <select
          name="user_id"
          value={recruiterData.user_id}
          onChange={handleChange}
        >
          <option value="">--Select a User--</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={recruiterData.name}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={recruiterData.email}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Phone:
        <input
          type="text"
          name="phone"
          value={recruiterData.phone}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">Create Recruiter</button>
    </form>
  );
};

export default CreateRecruiterForm;
