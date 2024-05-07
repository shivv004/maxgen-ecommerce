import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout"
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const CategoryProduct = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const getProductsByCategory = async () => {
      try {
        const { data } = await axios.get(`/api/v1/product/product-category/${slug}`);
        setProducts(data.products);
        setCategory(data.category);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (slug) {
      getProductsByCategory();
    }
  }, [slug]);

  return (
    <Layout>
      <div className="container mt-3 category">
        {category && (
          <div>
            <h4 className="text-center">Category - {category.name}</h4>
            <h6 className="text-center">{products.length} results found</h6>
          </div>
        )}
        <div className="row">
          <div className="col-md-9 offset-1">
            <div className="d-flex flex-wrap">
              {products.map((product) => (
                <div className="card m-2" key={product.id}>
                  <img
                    src={product.thumbnail}
                    className="card-img-top"
                    alt={product.title}
                  />
                  <div className="card-body">
                    <div className="card-name-price">
                      <h5 className="card-title">{product.title}</h5>
                      <h5 className="card-title card-price">
                        {product.price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </h5>
                    </div>
                    <p className="card-text">{product.description.substring(0, 60)}...</p>
                    <div className="card-name-price">
                      <button
                        className="btn btn-info ms-1"
                        onClick={() => navigate(`/product/${product.id}`)}
                      >
                        More Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;