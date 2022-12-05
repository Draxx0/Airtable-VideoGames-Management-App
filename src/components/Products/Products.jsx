import { useNavigate } from "react-router-dom";
import { UpdateAirtable } from "../../services/airtable";
import "./Product.css";

const Products = ({ products }) => {
  const navigate = useNavigate();
  const productOutOfStock = products.filter(
    (product) => product.field?.quantity === 0
  );

  const productInStock = products.filter(
    (product) => product.field?.quantity > 0
  );

  const handleSendEmail = (id) => {
    UpdateAirtable(id);
  };

  return (
    <div className="stocks-container">
      <div className="products-container">
        <h2 className="title">Produits en stock</h2>
        <div className="products">
          {productInStock.map((product, index) => (
            <div key={index} className="product">
              <div className="product-top">
                <div className="overlay"></div>
                <img src={product.field.photo} alt="" className="product-img" />
                <div className="product-type">
                  {product.field.type?.map((type, index) => (
                    <span className="product-label" key={index}>
                      {type}
                      {""}{" "}
                    </span>
                  ))}
                </div>
              </div>
              <div className="product-bottom">
                <div className="container">
                  <h2 className="product-title">{product.field.names}</h2>
                  <p className="product-description">
                    {product.field.description}{" "}
                  </p>
                  <div className="row">
                    {product.field.price && (
                      <p className="product-price">
                        Prix :{" "}
                        <span className="colored bold">
                          {product.field.price} €
                        </span>
                      </p>
                    )}
                    {product.field.quantity && (
                      <p className="product-quantity">
                        Quantité :{" "}
                        <span className="colored bold">
                          {" "}
                          {product.field.quantity}{" "}
                        </span>
                      </p>
                    )}
                  </div>
                  {product.field.names && (
                    <button
                      className="product-add"
                      onClick={() => navigate(`/orders/${product.id}`)}
                    >
                      Ajouter le produit
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="products-container">
        <h2 className="title">Produits hors stock</h2>
        {productOutOfStock.length === 0 ? (
          <p className="colored bold">Tous les produits sont en stock</p>
        ) : (
          <div className="products">
            {productOutOfStock.map((product, index) => (
              <div key={index} className="product">
                <div className="product-top">
                  <div className="overlay"></div>
                  <img
                    src={product.field.photo}
                    alt=""
                    className="product-img"
                  />
                  <div className="product-type">
                    {product.field.type?.map((type, index) => (
                      <span className="product-label" key={index}>
                        {type}
                        {""}{" "}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="product-bottom">
                  <div className="container">
                    <h2 className="product-title">{product.field.names}</h2>
                    <p className="product-description">
                      {product.field.description}{" "}
                    </p>
                    <div className="row">
                      {product.field.price && (
                        <p className="product-price">
                          Prix :{" "}
                          <span className="colored bold">
                            {product.field.price} €
                          </span>
                        </p>
                      )}

                      <p className="product-quantity">
                        Quantité :
                        <span className="colored bold">
                          {" "}
                          {product.field.quantity}{" "}
                        </span>
                      </p>
                    </div>
                    <button
                      className="product-add"
                      onClick={() => handleSendEmail(product.id)}
                    >
                      Envoyer une demande de restock
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
