import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateMissionForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

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
      .get(`http://localhost:8888/rimender_poo/api/missions/${id}`)
      .then(function (response) {
        console.log(response.data);
        setMissionData(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });

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
      .put(
        `http://localhost:8888/rimender_poo/api/missions/${id}/edit`,
        missionData
      )
      .then(function (response) {
        console.log(response.data);
        navigate("/missions");
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        User:
        <select
          name="user_id"
          value={missionData.user_id}
          onChange={handleChange}
          required
        >
          {users.map((user) => (
            <option key={user.id} value={user.id}>{user.username}</option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Recruiter:
        <select
          name="recruiter_id"
          value={missionData.recruiter_id}
          onChange={handleChange}
          required
        >
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
          value={missionData.client_name}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={missionData.name}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Location:
        <input
          type="text"
          name="location"
          value={missionData.location}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Remote:
        <select
          name="remote"
          value={missionData.remote}
          onChange={handleChange}
          required
        >
          <option value="Full Remote">Full Remote</option>
          <option value="No Remote">No Remote</option>
          <option value="Hybrid">Hybrid</option>
        </select>
      </label>
      <br />
      <label>
        Start Date:
        <input
          type="date"
          name="start_date"
          value={missionData.start_date}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        End Date:
        <input
          type="date"
          name="end_date"
          value={missionData.end_date}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Description:
        <textarea
          name="description"
          value={missionData.description}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Rate:
        <input
          type="number"
          step="0.01"
          name="rate"
          value={missionData.rate}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">Update Mission</button>
    </form>
  );
};

export default UpdateMissionForm;
