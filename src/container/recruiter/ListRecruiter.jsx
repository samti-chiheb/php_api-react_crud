import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ListRecruiters = () => {
  const [recruiters, setRecruiters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRecruiters();
  }, []);

  const getRecruiters = async () => {
    const recruitersResponse = await axios.get(
      `${import.meta.env.VITE_API_URL}/recruiters`
    );
    const recruiterData = recruitersResponse.data;

    // Fetch username for each recruiter
    for (let recruiter of recruiterData) {
      const userResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/${recruiter.user_id}`
      );
      recruiter.username = userResponse.data.username;
    }

    setRecruiters(recruiterData);
    setLoading(false);
  };

  const deleteRecruiter = (id) => {
    axios
      .delete(`${import.meta.env.VITE_API_URL}/recruiters/${id}/delete`)
      .then(() => {
        getRecruiters();
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>List of Recruiters</h1>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {recruiters.map((recruiter, key) => (
            <tr key={key} id={recruiter.id}>
              <td>{recruiter.username}</td>
              <td>{recruiter.name}</td>
              <td>{recruiter.email}</td>
              <td>{recruiter.phone}</td>
              <td>
                <button
                  onClick={() => {
                    deleteRecruiter(recruiter.id);
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
                  to={`${recruiter.id}/edit`}
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

export default ListRecruiters;
