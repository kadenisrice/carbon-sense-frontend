import "./LandingPage.css";
import carbonLogo from "../../assets/images/footprint icon white.png";
import { signInWithGoogle } from "../../firebaseConfig";
import googleLogo from "../../assets/images/googleLogo.png";
import { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const { account } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (account) {
      navigate("/dashboard");
    }
  }, [account]);

  return (
    <div className="LandingPage">
      <div className="logo">
        <h2 className="title">CarbonSense</h2>
        <img src={carbonLogo} alt="" />
      </div>

      <div className="sign-in-outer2">
        <div className="sign-in-outer1">
          <div className="sign-in-options">
            <button onClick={signInWithGoogle}>
              <img className="google-logo" src={googleLogo} alt="" />
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
