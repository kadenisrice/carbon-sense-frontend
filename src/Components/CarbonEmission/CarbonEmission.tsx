import Activity from "../Activity/Activity";
import Header from "../Header/Header";
import "./CarbonEmission.css";

const CarbonEmission = () => {
  return (
    <div className="CarbonEmission">
      <Header />
      <div className="carbon-emission-main">
        <div className="header-carbon-info">
          <h2>120kg</h2>
          <div className="bar-graph"></div>
          <p>try these things to lower your carbon footprint!</p>
        </div>
        <Activity />
      </div>
    </div>
  );
};

export default CarbonEmission;
