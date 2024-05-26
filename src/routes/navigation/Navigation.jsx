import { Link } from "react-router-dom";
import "./navigation.styles.scss";
import CrwnLogo from "../../assets/crown.svg?react";
import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";

const Navigation = () => {
  const {currentUser} = useContext(UserContext)
  
  return (
    <div className="navigation">
      <Link className="logo-container" to="/">
        <CrwnLogo />
      </Link>

      <div className="nav-links-container">
        <Link className="nav-link" to="/shop">
          SHOP
        </Link>
        {currentUser ? <span className="nav-link" to="/auth">
          SIGN OUT
        </span> : <Link className="nav-link" to="/auth">
          SIGN IN
        </Link>}
        
      </div>
    </div>
  );
};

export default Navigation;
