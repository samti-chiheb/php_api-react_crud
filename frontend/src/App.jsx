import "./App.css";
import { Footer, Header } from "./component";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import {
  CreateUser,
  UpdateUser,
  ListUser,
  ListRecruiter,
  CreateRecruiter,
  UpdateRecruiter,
  CreateMission,
  UpdateMission,
  ListMission,
} from "./container";

function App() {
  return (
    <>
      <header>
        <BrowserRouter>
          <nav>
            <ul>
              <li>
                <Link to="/users">List Users</Link>
              </li>
              <li>
                <Link to="/recruiters">List Recruiters</Link>
              </li>
              <li>
                <Link to="/missions">List Missions</Link>
              </li>
              <li>
                <Link to="/users/create">Create User</Link>
              </li>
              <li>
                <Link to="/recruiters/create">Create Recruiter</Link>
              </li>
              <li>
                <Link to="/missions/create">Create Mission</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="users" element={<ListUser />} />
            <Route path="users/create" element={<CreateUser />} />
            <Route path="users/:id/edit" element={<UpdateUser />} />

            <Route path="recruiters" element={<ListRecruiter />} />
            <Route path="recruiters/create" element={<CreateRecruiter />} />
            <Route path="recruiters/:id/edit" element={<UpdateRecruiter />} />

            <Route path="missions" element={<ListMission />} />
            <Route path="missions/create" element={<CreateMission />} />
            <Route path="missions/:id/edit" element={<UpdateMission />} />
          </Routes>
        </BrowserRouter>
      </header>
      <Header />

      <Footer />
    </>
  );
}

export default App;