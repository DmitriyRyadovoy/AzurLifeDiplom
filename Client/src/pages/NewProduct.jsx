import React, { useState, useEffect } from "react";
import Layout from '../components/Layout/Layout'
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
const { Option } = Select;
const NewProduct = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");

  // All Category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("http://localhost:4040/api/category/all-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);

  // Create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("address", address);
      productData.append("price", price);
      productData.append("photo", photo);
      productData.append("category", category);
      const { data } = axios.post(
        "http://localhost:4040/api/catalog/create-product",
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Объявление успешно отправленно");
      }
    } catch (error) {
      console.log(error);
      toast.error("Что-то пошло не так :(");
    }

  }
  return (
    <div className="newProduct">
      <Layout>
        {!auth.user ? (
          <>
            <div className="newProduct__noUser">
              <div className="container">
                <div className="newProduct__noUser-text title-page">
                  Для размещения объявлений на сайте, вам необходимо авторизироваться!!!
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="newProduct__content">
            <div className="newProduct__title mb-product">
              <div className="container">
                <p className="newProduct__title title">Новое объявление</p>
              </div>
            </div>
            <div className="newProduct__content">
              <div className="newProduct__type-products mb-product">
                <div className="container">
                  <div className="newProduct cont">
                    <p className="newProduct__title-text">Выберите тип недвижимости</p>
                    <Select
                      bordered={false}
                      placeholder="Выберите тип недвижимости"
                      size="large"
                      showSearch
                      className="newProduct__form-select"
                      onChange={(value) => {
                        setCategory(value);
                      }}
                    >
                      {categories?.map((category) => (
                        <Select.Option key={category._id} value={category._id}>
                          {category.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </div>
                </div>
              </div>

              <div className="newProduct__name-product mb-product">
                <div className="container">
                  <div className="newProduct cont">
                    <p className="newProduct__title-text">Название недвижимости</p>
                    <input
                      type="text"
                      value={name}
                      placeholder="Укажите название недвижимости"
                      className="newProduct__input name-input"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="newProduct__adress-product mb-product">
                <div className="container">
                  <div className="newProduct cont">
                    <p className="newProduct__title-text">Адрес</p>
                    <input
                      type="text"
                      placeholder="Укажите адрес имущества"
                      className="newProduct__input adress-input"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="newProduct__photo-product mb-product">
                <div className="container">
                  <div className="newProduct cont">
                    <p className="newProduct__title-text">Фотографии</p>
                    <div className="newProduct__title-description-block">
                      <p className="newProduct__title-description">Покупателей привлекают качественные фотографии</p>
                      <p>Добавьте от 3 фото. Покажите комнаты, кухню, санузел, вид из окна, подъезд, фасад здания, парковку.</p>
                    </div>
                    <div className="newProduct__photo-content">
                      <label className="btn btn-outline-secondary col-md-12">
                        <p className="newProduct__photo-btn">{photo ? photo.name : "Выбрать фото"}</p>

                        <input
                          type="file"
                          name="photo[]"
                          accept="image/*"
                          multiple
                          onChange={(e) => setPhoto(e.target.files[0])}
                          hidden
                        />
                      </label>

                      <div className="newProduct__photo-cont">
                        {photo && (
                          <div className="text-center">
                            <img
                              src={URL.createObjectURL(photo)}
                              alt="product_photo"
                              height={"200px"}
                              className="img newProduct__photo"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="newProduct__description-product mb-product">
                <div className="container">
                  <div className="newProduct cont">
                    <p className="newProduct__title-text">Описание</p>
                    <textarea
                      type="text"
                      value={description}
                      placeholder="Расскажите о недвижимости, собственниках, соседях, транспортной доступности и инфраструктуре"
                      className="newProduct__input newProduct__description-input"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="newProduct__contacts-product mb-product">
                <div className="container">
                  <div className="newProduct cont">
                    <p className="newProduct__title-text">Контакты</p>
                    <div className="newProduct__contacts-form">
                      <input type="text" placeholder="Номер телефона" className="newProduct__input contacts-input" value={`+${auth?.user?.phone}`} />
                      <input type="text" placeholder="Ваше имя" className="newProduct__input contacts-input" value={auth?.user?.name} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="newProduct__price-product mb-product">
                <div className="container">
                  <div className="newProduct cont">
                    <p className="newProduct__title-text">Цена недвижимости</p>
                    <input
                      type="number"
                      value={price}
                      placeholder="Укажите цену недвижимости"
                      className="newProduct__input price-input"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="newProduct__create-product mb">
                <div className="container">
                  <button className="newProduct__create-btn btn-Noactive" onClick={handleCreate}>
                    Разместить объявление
                  </button>
                </div>
              </div>

            </div>
          </div>
        )
        }
      </Layout>
    </div>
  )
}

export default NewProduct