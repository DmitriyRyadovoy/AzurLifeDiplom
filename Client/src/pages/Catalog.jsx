import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout';
import { useAuth } from '../context/auth';
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from 'axios';
import toast from "react-hot-toast";
import SearchInput from '../components/Form/SearchInput';
import like from '../assets/Icons/PageCartId/icons8-червы-50.png'
import repost from '../assets/Icons/PageCartId/icons8-вправо-2-50.png'
const Catalog = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  // Получание всего каталога
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:4040/api/catalog/all-catalog");
      setProducts(data.products);
    } catch (error) {
      console.log(error)
    }
  }
  // Получение всех категорий
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("http://localhost:4040/api/category/all-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);
  // Фильтры по категориям
  const handleFilter = (value, id) => {
    let all = [...checked]
    if (value) {
      all.push(id)
    } else {
      all = all.filter(category => category !== id)
    }
    setChecked(all)
  };
  useEffect(() => {
    if (!checked.length) getAllProducts();
  }, [checked.length]);

  useEffect(() => {
    if (checked.length) filterProduct();
  }, [checked]);
  // Получение отфильтрованных продуктов
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("http://localhost:4040/api/catalog/product-filters", {
        checked
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="catalogPage">
      <Layout>
        <div className='catalogPage__filters-navbar mb-product mg-page'>
          <div className="container">
            <div className="catalogPage__filters">
              <form className='catalogPage__filters-form'>
                <button
                  className="catalogPage__filters-btn"
                >
                  Фильтры
                </button>
                {categories?.map((category) => (
                  <label>
                    <span>
                      <input
                        type="checkbox"
                        key={category._id}
                        onChange={(e) => handleFilter(e.target.checked, category._id)}
                      />
                    </span>
                    <span>{category.name}</span>
                  </label>
                ))}
                <button
                  className="catalogPage__filters-btn-reset btn btn-Noactive"
                  onClick={() => window.location.reload()}
                >
                  Сбросить фильтры
                </button>
              </form>
              <div className="catalogPage__filters-search">
                <SearchInput />
              </div>
            </div>
          </div>
        </div>
        <div className="catalogPage__sorting mb-product">
          <div className="container">
            <div className="catalogPage__ads-found">
              <p>{products?.length}</p>
              <p>Объявлений найдено</p>
            </div>
          </div>
        </div>
        <div className="catalogPage__all-catalog mb">
          <div className="container">
            <div className="catalogPage__all-catalog-content">
              {products?.map((product) => (
                <div className="catalogPage__catalog-item" >
                  <div className="catalogPage__catalog-item-img">
                    <img
                      src={`http://localhost:4040/api/catalog/product-photo/${product._id}`}
                      className="catalogPage__catalog-img"
                      alt={product.name}
                    />
                  </div>
                  <div className="catalogPage__catalog-item-content">
                    <Link to={`/product/${product.slug}`} className="catalogPage__catalog-item-title">
                      <div>
                        <p>{product.name}</p>
                      </div>
                    </Link>
                    <div className="catalogPage__catalog-item-description">
                      <p>{product.description.substring(0, 300)}</p>
                    </div>
                    <div className="catalogPage__catalog-item-price product-price">
                      <p>{product.price} ₽</p>
                    </div>
                    <div className="catalogPage__catalog-item-profile">
                      <div className='catalogPage__item-profile'>
                        {!product?.user?.surname ? (
                          <>
                          </>
                        ) : (
                          <><p>{product?.user?.surname}</p></>
                        )
                        }
                        <p>{product?.user?.name}</p>
                      </div>
                      <div>
                        <button className="catalogPage__catalog-item-profile-btn-tel">{product?.user?.phone}</button>
                      </div>
                    </div>
                  </div>
                  <div className='catalogPage__catalog-item-actions'>
                    <div>
                      <button
                        className='catalogPage__catalog-item-actions-btn btn'
                        onClick={() => {
                          setCart([...cart, product]);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, product])
                          )
                          toast.success("Item Added to cart");
                        }}
                      >
                        <img src={like} alt="likeimg" className='img' />
                      </button>
                    </div>
                    <div>
                      <button className='catalogPage__catalog-item-actions-btn btn'>
                        <img src={repost} alt="repostimg" className='img' />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout >
    </div >
  )
}

export default Catalog