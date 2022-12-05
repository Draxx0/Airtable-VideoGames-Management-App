import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateAirtable } from "../../services/airtable";

const CreateProduct = ({ products, setProducts }) => {
  const [credentials, setCredentials] = useState({});
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    CreateAirtable("PRODUITS", credentials);
    setProducts([...products, credentials]);
    navigate("/");
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };
  return (
    <div className="create-product">
      <h2 className="title">Créer un produit</h2>

      <form action="" onSubmit={handleSubmit}>
        <div className="form-content">
          <div className="form-group">
            <label htmlFor="email">Nom du jeu</label>
            <input
              type="names"
              name="names"
              id="names"
              placeholder="Ex: GTA V"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="quantity">Description</label>
            <textarea
              name="description"
              id=""
              cols="30"
              rows="10"
              placeholder="Ex: GTA V est un jeu ou vous incarnez un Franklin, Michael et Trevor un ancien braqueur qui a décidé de changer de vie."
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="price">Prix</label>
            <input
              name="price"
              step="any"
              type="number"
              placeholder="Ex: 40"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="quantity">Quantité</label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              placeholder="Ex: 10"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="quantity">Cover du jeu</label>
            <input
              type="url"
              name="photo"
              id="photo"
              onChange={handleChange}
              placeholder="Ex: https://cover-gtav-jeu.jpg"
            />
          </div>

          <select name="type" onChange={handleChange}>
            <option value="mmo">mmo</option>
            <option value="rpg">rpg</option>
            <option value="fps">fps</option>
            <option value="sport">sport</option>
            <option value="action">action</option>
          </select>

          <input type="submit" value="Ajouter produit" />
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
