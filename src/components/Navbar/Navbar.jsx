import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import './Navbar.css'

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav>
      <div className="nav-row">
        <img src={Logo} className="logo" onClick={() => navigate("/")} />
        <h1>
          Bienvenue sur la sur la gestion des stocks{" "}
          <span className="colored">Micromania</span>
        </h1>
      </div>

      <Link to="create-product" className="button add">
        Ajouter un produit
      </Link>
    </nav>
  );
};

export default Navbar;
