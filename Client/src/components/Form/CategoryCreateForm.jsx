import React from 'react'

const CategoryCreateForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="admin__create-input"
            placeholder="Назвние категории"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <button type="submit" className="admin__create-category-btn btn btn-Noactive">
          Добавить
        </button>
      </form>
    </>
  )
}

export default CategoryCreateForm