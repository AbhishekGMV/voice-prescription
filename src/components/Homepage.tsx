import { Link } from "react-router-dom";
import pat from "../assets/Homepage-bg-cover.jpg";
import "../styles/homepage.css";

export default function Homepage() {
  if (!import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key");
  }

  return (
    <div className="homepage">
      <div className="backk">
        <center>
          <div className="container">
            <div className="flexx">
              <div style={{ width: "30rem", height: "30rem" }}>
                <div>
                  <img
                    src={pat}
                    width="400px"
                    alt="patient"
                    height="400px"
                  ></img>
                  <div>
                    <button type="button" className="rand">
                      <Link to="/patient/login">Patient Login </Link>
                    </button>
                  </div>
                </div>
              </div>
              <div
                style={{ width: "30rem", height: "30rem", marginLeft: "50px" }}
              >
                <div>
                  <img
                    src={pat}
                    width="400px"
                    alt="patient"
                    height="400px"
                  ></img>
                  <div>
                    <button type="button" className="rand">
                      <Link to="/doctor/login">Doctor Login </Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </center>{" "}
      </div>
    </div>
  );
}
