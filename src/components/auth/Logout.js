import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.handleLogout();
    navigate("/", { state: { message: "You have been logged out" } });
    window.location.reload();
  };

  const isLoggedIn = auth !== null;

  return isLoggedIn ? (
    <>
      <button className="btn btn-primary" onClick={handleLogout}>
        Logout
      </button>
    </>
  ) : null;
};

export default Logout;
