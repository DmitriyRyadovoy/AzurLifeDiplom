import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/Layout/Admin/adminMenu';
import Layout from '../../components/Layout/Layout';
import toast from "react-hot-toast";
import axios from "axios";
import { Modal } from "antd";
import CategoryCreateForm from '../../components/Form/CategoryCreateForm';
import CategoryEditForm from '../../components/Form/CategoryEditForm';
const AdminCreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  // Handle Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:4040/api/category/create-category/", {
        name,
      });
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      // toast.error("somthing went wrong in input form");
    }
  };

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

  // Update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:4040/api/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data?.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Delete category
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:4040/api/category/delete-category/${pId}`
      );
      if (data.success) {
        toast.success(`category is deleted`);

        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Somtihing went wrong");
    }
  };
  return (
    <div className="admin">
      <Layout>
        <div className="container">
          <div className="admin__category row mb-product mg-page">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="admin__category-content flex">
              <div className="admin__title title mb-product">
                Категории
              </div>
              <div className="admin__category-form mb-product">
                <CategoryCreateForm
                  handleSubmit={handleSubmit}
                  value={name}
                  setValue={setName}
                />
              </div>

              <div className="admin__category-cont">
                <div className="admin__category-text">
                  <div className="admin__category-title">
                    <h3>Название</h3>
                  </div>
                  <div className="admin__category-title">
                    <h3>Функции</h3>
                  </div>
                </div>
                <div className="admin__category-item-cont">
                  {categories?.map((category) => (
                    <div className="admin__category-item cont">
                      <div className="admin__category-name" key={category._id}>
                        {category.name}
                      </div>
                      <div className="admin__category-actions">
                        <button
                          className="admin__category-edit-btn btn btn-Noactive"
                          onClick={() => {
                            setVisible(true);
                            setUpdatedName(category.name);
                            setSelected(category);
                          }}
                        >
                          Редактировать
                        </button>
                        <button
                          className="admin__category-destroy-btn btn"
                          onClick={() => {
                            handleDelete(category._id);
                          }}
                        >
                          Удалить
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <Modal
                onCancel={() => setVisible(false)}
                footer={null}
                open={visible}
              >
                <CategoryEditForm
                  value={updatedName}
                  setValue={setUpdatedName}
                  handleSubmit={handleUpdate}
                />
              </Modal>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default AdminCreateCategory