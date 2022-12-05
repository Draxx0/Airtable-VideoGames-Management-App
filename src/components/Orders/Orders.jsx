import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UpdateAirtable, CreateAirtable } from "../../services/airtable";
import { toast, ToastContainer } from "react-toastify";

const Orders = ({ products, setProducts }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({});

  const currentProduct = products.find((product) => product.id === id);

  const currentProductQuantity = currentProduct.field.quantity;

  const totalPrice = credentials.quantity * currentProduct.field.price;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.quantity > currentProductQuantity) {
      toast.error("Quantité insuffisante");
    } else {
      const newCredentials = {
        ...credentials,
        totalPrice: totalPrice,
      };
      setCredentials(newCredentials);
      UpdateAirtable(id, newCredentials, currentProductQuantity);
      CreateAirtable("COMMANDES", newCredentials, currentProduct);
      const currentProductNewQuantity =
        currentProductQuantity - credentials.quantity;
      const newProduct = {
        ...currentProduct,
        field: {
          ...currentProduct.field,
          quantity: currentProductNewQuantity,
        },
      };
      setProducts(
        products.map((product) => (product.id === id ? newProduct : product))
      );
      navigate("/");
    }
  };
  return (
    <>
      <div className="orders">
        <h2 className="title">Commandes</h2>

        <form action="" onSubmit={handleSubmit}>
          <div className="form-content">
            <div className="form-group">
              <label htmlFor="email">Veuillez insérer l'email du client</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="quantity">Veuillez insérer la quantité</label>
              <input
                type="number"
                name="quantity"
                id="quantity"
                onChange={handleChange}
              />
            </div>

            <input type="submit" value="Confirmer commande" />

            <button type="button" onClick={() => navigate(-1)}>
              Annuler
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Orders;
