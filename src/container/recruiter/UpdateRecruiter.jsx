import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateRecruiterForm = () => {
  const navigate = useNavigate();

  const [recruiterData, setRecruiterData] = useState({
    user_id: "",
    name: "",
    email: "",
    phone: "",
  });

  const [users, setUsers] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    // Fetching the recruiter data
    axios
      .get(`${import.meta.env.VITE_API_URL}/recruiters/${id}`)
      .then((response) => {
        setRecruiterData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    // Fetching the users
    axios
      .get(`${import.meta.env.VITE_API_URL}/users`)
      .then((response) => {
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
      .put(
        `${import.meta.env.VITE_API_URL}/recruiters/${id}/edit`,
        recruiterData
      )
      .then(() => {
        navigate("/recruiters");
      })
      .catch((error) => {
        console.error(error);
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
          required
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
          required
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
          required
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
          required
        />
      </label>
      <br />
      <button type="submit">Update Recruiter</button>
    </form>
  );
};

export default UpdateRecruiterForm;