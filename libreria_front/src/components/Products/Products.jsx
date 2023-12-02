import { useContext, useState, useEffect } from "react";
import { dataContext } from "../Context/DataContext.jsx";
import axios from "axios";
import './Products.css'

const Products = () => {
  const [data, setData] = useState([]);
  const { buyProducts } = useContext(dataContext);

  useEffect(() => {
    axios('http://localhost:4000/api/products').then((res) => setData(res.data));
  }, [])

  return data.map((product) => {
    return (
      <div className="card-item" key={product.id}>
        <div className="separator-item">
          <div className="info-item">
            <div className="left-card">
              <img src={`http://localhost:4000/image/${product.img}`} alt="img-product-card" className="image" />
            </div>
            <div className="right-card">
              <h3 className="name">{product.name}</h3>
              <p className="description">{product.description}</p>
              <h4 className="price">${product.price}</h4>
            </div>
          </div>
          <div className="button-item">
            <button className="add" onClick={() => buyProducts(product)}>Agregar al carrito</button>
          </div>
        </div>
      </div>
    );
  })
}

export default Products
