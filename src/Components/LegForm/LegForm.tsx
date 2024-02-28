import Passenger from "../../Models/Passenger";
import "./LegForm.css";

interface Props {
  passenger: Passenger;
}

const LegForm = ({ passenger }: Props) => {
  return <div className="LegForm">LegForm works</div>;
};

export default LegForm;
