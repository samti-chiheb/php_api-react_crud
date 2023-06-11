import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateMissionForm = () => {
  const navigate = useNavigate();
  const [missionData, setMissionData] = useState({
    user_id: "",
    recruiter_id: "",
    client_name: "",
    name: "",
    location: "",
    remote: "",
    start_date: "",
    end_date: "",
    description: "",
    rate: "",
  });

  const [users, setUsers] = useState([]);
  const [recruiters, setRecruiters] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8888/rimender_poo/api/users")
      .then((response) => setUsers(response.data));

    axios
      .get("http://localhost:8888/rimender_poo/api/recruiters")
      .then((response) => setRecruiters(response.data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMissionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:8888/rimender_poo/api/missions/create",
        missionData
      )
      .then(function (response) {
        console.log(response.data);
        navigate("/missions");
      })
      .catch(function (error) {
        console.error(error);
      });

    setMissionData({
      user_id: "",
      recruiter_id: "",
      client_name: "",
      name: "",
      location: "",
      remote: "",
      start_date: "",
      end_date: "",
      description: "",
      rate: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        User:
        <select name="user_id" onChange={handleChange} required>
          <option>Select a user</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>{user.username}</option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Recruiter:
        <select name="recruiter_id" onChange={handleChange} required>
          <option>Select a recruiter</option>
          {recruiters.map((recruiter) => (
            <option key={recruiter.id} value={recruiter.id}>{recruiter.name}</option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Client Name:
        <input
          type="text"
          name="client_name"
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Name:
        <input type="text" name="name" onChange={handleChange} required />
      </label>
      <br />
      <label>
        Location:
        <input type="text" name="location" onChange={handleChange} />
      </label>
      <br />
      <label>
        Remote:
        <select name="remote" onChange={handleChange} required>
          <option>Select a remote option</option>
          <option value="Full Remote">Full Remote</option>
          <option value="No Remote">No Remote</option>
          <option value="Hybrid">Hybrid</option>
        </select>
      </label>
      <br />
      <label>
        Start Date:
        <input type="date" name="start_date" onChange={handleChange} required />
      </label>
      <br />
      <label>
        End Date:
        <input type="date" name="end_date" onChange={handleChange} required />
      </label>
      <br />
      <label>
        Description:
        <textarea name="description" onChange={handleChange} />
      </label>
      <br />
      <label>
        Rate:
        <input type="number" step="0.01" name="rate" onChange={handleChange} />
      </label>
      <br />
      <button type="submit">Create Mission</button>
    </form>
  );
};

export default CreateMissionForm;