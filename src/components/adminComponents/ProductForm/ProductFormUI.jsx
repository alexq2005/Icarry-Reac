import { Link } from "react-router-dom";

// categorias permitidas
const categories = [
  { value: "items-del-juego", label: "Items del juego" },
  { value: "merchandising", label: "Merchandising" },
];

export const ProductFormUI = ({
  product,
  errors,
  loading,
  editMode,
  loadingProduct,
  image,
  onChange,
  onFileChange,
  onSubmit,
}) => {
  return (
    <section>
      <form className="product-form" onSubmit={onSubmit}>
        <h2>{editMode ? "Editar producto" : "Agregar nuevo producto"}</h2>

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
          <select
            id="product-category"
            name="category"
            value={product.category}
            onChange={onChange}
          >
            <option value="">Elegí una categoría</option>
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
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
          {image && (
            <img className="product-form-image" src={image} alt={product.name} />
          )}
          <input
            id="product-image"
            type="file"
            accept="image/*"
            onChange={onFileChange}
          />
          {errors.file && <p className="error">{errors.file}</p>}
        </div>

        <button
          className="btn bg-primary"
          type="submit"
          disabled={loading || loadingProduct}
        >
          {loading
            ? "Guardando..."
            : editMode
              ? "Guardar cambios"
              : "Guardar"}
        </button>

        {/* vuelve al panel sin guardar */}
        <Link className="btn btn-cancel" to="/admin/dashboard">
          Cancelar
        </Link>

        {errors.general && <p className="error">{errors.general}</p>}
      </form>
    </section>
  );
};
