import React, { useState, useEffect } from "react";
import AdminMenu from '../../components/Layout/Admin/adminMenu'
import Layout from '../../components/Layout/Layout'
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");

  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:4040/api/catalog/single-product/${params.slug}`
      );
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setAddress(data.product.address)
      setPrice(data.product.price);
      setCategory(data.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);
  //get all category
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

  //create product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("address", address);
      productData.append("price", price);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      const { data } = axios.put(
        `http://localhost:4040/api/catalog/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  //delete a product
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Вы уверены, что хотите удалить объявление о недвижимости?");
      if (!answer) return;
      const { data } = await axios.delete(
        `http://localhost:4040/api/catalog/delete-product/${id}`
      );
      toast.success("Объявление успешно удалено");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  console.log(category.name)
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="title">
              Редактирование объявления
            </div>
            <div className="newProduct__content">
              <div className="newProduct__type-products mb-product">
                <div className="container">
                  <div className="newProduct__cont">
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
                        <Select.Option key={category._id} value={category.name}>
                          {category.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </div>
                </div>
              </div>
              <div className="newProduct__name-product mb-product">
                <div className="container">
                  <div className="newProduct__cont">
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
                  <div className="newProduct__cont">
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
                  <div className="newProduct__cont">
                    <p className="newProduct__title-text">Фотографии</p>
                    <div className="newProduct__title-description-block">
                      <p className="newProduct__title-description">Покупателей привлекают качественные фотографии</p>
                      <p>Добавьте от 3 фото. Покажите комнаты, кухню, санузел, вид из окна, подъезд, фасад здания, парковку.</p>
                    </div>
                    <div className="newProduct__photo-content">
                      <label className="btn btn-outline-secondary col-md-12">
                        <p>{photo ? photo.name : "Выбрать фото"}</p>
                        <input
                          type="file"
                          name="photo[]"
                          accept="image/*"
                          multiple
                          onChange={(e) => setPhoto(e.target.files[0])}
                          hidden
                        />
                      </label>

                      <div className="mb-3">
                        {photo ? (
                          <div className="text-center">
                            <img
                              src={URL.createObjectURL(photo)}
                              alt="product_photo"
                              height={"200px"}
                              className="img img-responsive"
                            />
                          </div>
                        ) : (
                          <div className="text-center">
                            <img
                              src={`http://localhost:4040/api/catalog/product-photo/${id}`}
                              alt="product_photo"
                              height={"200px"}
                              className="img img-responsive"
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
                  <div className="newProduct__cont">
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
              <div className="newProduct__price-product mb-product">
                <div className="container">
                  <div className="newProduct__cont">
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
                  <button className="newProduct__create-btn" onClick={handleUpdate}>
                    Обновить объявление
                  </button>
                  <button className="newProduct__create-btn" onClick={handleDelete}>
                    Удалить объявление
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
