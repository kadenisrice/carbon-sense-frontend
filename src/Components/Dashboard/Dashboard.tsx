import { useContext, useEffect } from "react";
import Header from "../Header/Header";
import "./Dashboard.css";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

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
        <div className="carbon-emission"></div>

        <div className="challenge-friend">
          <div className="challenges"></div>

          <div className="friends"></div>
        </div>

        <div className="badges"></div>
      </div>
    </div>
  );
};

export default Dashboard;
