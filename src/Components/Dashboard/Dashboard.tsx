import { useContext, useEffect } from "react";
import Header from "../Header/Header";
import "./Dashboard.css";
import AuthContext from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { account, user } = useContext(AuthContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (!account || !user) {
      navigate("/");
    }
  }, [account, user]);

  return (
    <div className="Dashboard">
      <Header />
      <h2 className="greeting">Hello, {user?.displayName}</h2>

      <div className="windows">
        <Link to={"/carbon-emission"}>
          <div className="carbon-emission">
            <h3>your carbon emission</h3>
          </div>
        </Link>

        <div className="challenge-friend">
          <Link to={"/challenges"}>
            <div className="challenges">
              <h3>challenges</h3>
            </div>
          </Link>

          <Link to={"/friends"}>
            <div className="friends">
              <h3>friends</h3>
            </div>
          </Link>
        </div>

        <Link to={"/badges"}>
          <div className="badges">
            <h3>your badges</h3>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
