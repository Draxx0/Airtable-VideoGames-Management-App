import { useEffect, useState } from "react";
import "./app.css";
import Orders from "./components/Orders/Orders";
import Products from "./components/Products/Products";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import {
  CreateAirtable,
  ReadAirtable,
  UpdateAirtable,
  DeleteAirtable,
} from "./services/airtable";
import CreateProduct from "./components/Products/CreateProduct";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const [orders, setorders] = useState([]);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    ReadAirtable(setorders, "COMMANDES");
    ReadAirtable(setProducts, "PRODUITS");
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Products products={products} />} />
          <Route
            path="/orders/:id"
            element={
              <Orders
                orders={orders}
                products={products}
                setProducts={setProducts}
              />
            }
          />
          <Route
            path="/create-product"
            element={
              <CreateProduct products={products} setProducts={setProducts} />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
