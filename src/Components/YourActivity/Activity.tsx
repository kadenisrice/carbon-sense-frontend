import { useContext } from "react";
import MainActivityForm from "../MainActivityForm/MainActivityForm";
import "./Activity.css";
import AuthContext from "../../context/AuthContext";

const Activity = () => {
  const { account } = useContext(AuthContext);

  return (
    <div className="Activity">
      <div className="activity-list-short">
        <h3>Your Activity</h3>
        <ul>
          {account?.activities?.map((activity) => {
            return (
              <li>
                <p>Name: {activity.name}</p>
                <p>Emission Type: {activity.typeOfCarbon}</p>
                <p>Total Carbon Emitted: {activity.carbon_lb}</p>
              </li>
            );
          })}
        </ul>
      </div>
      <MainActivityForm />
    </div>
  );
};

export default Activity;
