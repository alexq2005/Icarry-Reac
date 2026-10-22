export const ProductFormUI = ({
  product,
  errors,
  loading,
  onChange,
  onFileChange,
  onSubmit,
}) => {
  return (
    <section>
      <form className="product-form" onSubmit={onSubmit}>
        <h2>Agregar nuevo producto</h2>

        <div>
          <label htmlFor="product-name">Nombre:</label>
          <input
            id="product-name"
            type="text"
            name="name"
            value={product.name}
            onChange={onChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="product-price">Precio:</label>
          <input
            id="product-price"
            type="number"
            name="price"
            value={product.price}
            onChange={onChange}
            min="0"
            step="0.01"
          />
          {errors.price && <p className="error">{errors.price}</p>}
        </div>

        <div>
          <label htmlFor="product-category">Categoría:</label>
          <input
            id="product-category"
            type="text"
            name="category"
            value={product.category}
            onChange={onChange}
          />
          {errors.category && <p className="error">{errors.category}</p>}
        </div>

        <div>
          <label htmlFor="product-description">Descripción:</label>
          <textarea
            id="product-description"
            name="description"
            value={product.description}
            onChange={onChange}
          />
          {errors.description && <p className="error">{errors.description}</p>}
        </div>

        <div>
          <label htmlFor="product-image">Imagen:</label>
          <input
            id="product-image"
            type="file"
            accept="image/*"
            onChange={onFileChange}
          />
          {errors.file && <p className="error">{errors.file}</p>}
        </div>

        <button className="btn bg-primary" type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Guardar"}
        </button>

        {errors.general && <p className="error">{errors.general}</p>}
      </form>
    </section>
  );
};
