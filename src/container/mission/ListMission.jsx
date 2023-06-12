import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ListMission = () => {
  const [missions, setMissions] = useState([]);

  useEffect(() => {
    getMissions();
  }, []);

  const getMissions = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/missions`
    );
    const missionsData = response.data;
    for (let i = 0; i < missionsData.length; i++) {
      const userResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/${missionsData[i].user_id}`
      );
      const recruiterResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}/recruiters/${
          missionsData[i].recruiter_id
        }`
      );
      missionsData[i].username = userResponse.data.username;
      missionsData[i].recruitername = recruiterResponse.data.name;
    }
    setMissions(missionsData);
  };

  const deleteMission = (id) => {
    axios
      .delete(`${import.meta.env.VITE_API_URL}/missions/${id}/delete`)
      .then(() => {
        getMissions();
      });
  };

  return (
    <div>
      <h1>List of Missions</h1>
      <table>
        <thead>
          <tr>
            <th>Client Name</th>
            <th>Name</th>
            <th>Location</th>
            <th>Remote</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Description</th>
            <th>Rate</th>
            <th>User Name</th>
            <th>Recruiter Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {missions.map((mission, key) => (
            <tr key={key} id={mission.id}>
              <td>{mission.client_name}</td>
              <td>{mission.name}</td>
              <td>{mission.location}</td>
              <td>{mission.remote}</td>
              <td>{mission.start_date}</td>
              <td>{mission.end_date}</td>
              <td>{mission.description}</td>
              <td>{mission.rate}</td>
              <td>{mission.username}</td>
              <td>{mission.recruitername}</td>
              <td>
                <button
                  onClick={() => {
                    deleteMission(mission.id);
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
                  to={`${mission.id}/edit`}
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

export default ListMission;
