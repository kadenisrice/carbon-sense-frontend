import "./Header.css";
import carbonLogo from "../../assets/images/footprint icon white.png";
import { signOut } from "../../firebaseConfig";
import { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { account, user } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!account || !user) {
      navigate("/");
    }
  }, [user]);

  return (
    <header className="Header">
      <div className="logo-container">
        <h1>CarbonSense</h1>
        <img src={carbonLogo} alt="" />
      </div>
      <button onClick={signOut}>Sign Out</button>
    </header>
  );
};

export default Header;
