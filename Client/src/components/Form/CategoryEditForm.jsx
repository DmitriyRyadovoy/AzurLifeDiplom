import React from 'react'

const CategoryEditForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="admin__create-input admin__edit-input"
            placeholder="Назвние категории"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <button type="submit" className="admin__create-category-btn btn btn-Noactive">
          Сохранить
        </button>
      </form>
    </>
  )
}

export default CategoryEditForm