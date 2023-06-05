import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/Admin/adminMenu";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  // Get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:4040/api/catalog/all-catalog");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Someething Went Wrong");
    }
  };
  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
      <div className="admin mb">
        <div className="container">
          <div className="row mg-page">
            <div className="admin__AdminMenu">
              <AdminMenu />
            </div>
            <div className="admin__products">
              <p className="admin__title title mb-product">Все объявление</p>
              <div className="admin__products-content">
                {products?.map((product) => (
                  <div className="cont">
                    <div className="admin__products-item">
                      <Link
                        key={product._id}
                        to={`/dashboard/admin/product/${product.slug}`}
                        className="product-link"
                      >
                        <div className="admin__products-images">
                          <img
                            src={`http://localhost:4040/api/catalog/product-photo/${product._id}`}
                            className="admin__products-images img"
                            alt={product.name}
                          />
                        </div>
                      </Link>
                      <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">{product.description.substring(0, 100)}</p>
                        <div className='admin__item-profile catalogPage__item-profile'>
                          {!product?.user?.surname ? (
                            <>
                            </>
                          ) : (
                            <><p>{product?.user?.surname}</p></>
                          )
                          }
                          <p>{product?.user?.name}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AdminProducts