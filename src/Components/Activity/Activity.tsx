import MainActivityForm from "../MainActivityForm/MainActivityForm";
import "./Activity.css";

const Activity = () => {
  return (
    <div className="Activity">
      <div className="activity-list-short">
        <h3>Your Activity</h3>
        {/* put activity list here */}
      </div>
      <MainActivityForm />
    </div>
  );
};

export default Activity;
