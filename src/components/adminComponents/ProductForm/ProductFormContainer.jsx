import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductFormUI } from "./ProductFormUI";
import { validateProduct } from "../../../utils/validateProduct";
import { uploadImage } from "../../../services/uploadImage";
import { createProduct } from "../../../services/productsService";
import "./ProductFormContainer.css";

export const ProductFormContainer = () => {
  /* ------------------------------------------------------------------------ */
  /*                            ESTADO DEL FORMULARIO                         */
  /* ------------------------------------------------------------------------ */
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState(null);
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
  });

  /* ------------------------------------------------------------------------ */
  /*                         MANEJO DE CAMBIOS DEL FORMULARIO                 */
  /* ------------------------------------------------------------------------ */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0] || null;
    setFile(file);
  };

  /* ------------------------------------------------------------------------ */
  /*                    VALIDACIÓN Y GUARDADO DEL PRODUCTO                    */
  /* ------------------------------------------------------------------------ */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    // Valido los datos antes de subir la imagen o guardar el producto.
    const newErrors = validateProduct({ ...product, file });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      // Subo la imagen y armo la estructura del producto.
      const imageUrl = await uploadImage(file);
      const productData = {
        ...product,
        price: Number(product.price),
        image: imageUrl,
      };

      const id = await createProduct(productData);

      // Limpio el formulario y muestro la confirmación del alta.
      setProduct({ name: "", price: "", category: "", description: "" });
      setFile(null);
      navigate(`/admin/products/success/${id}`, { replace: true });
    } catch (error) {
      console.error("Error al guardar el producto:", error);
      setErrors({ general: error.message });
    } finally {
      setLoading(false);
    }
  };

  /* ------------------------------------------------------------------------ */
  /*                            VISTA DEL FORMULARIO                          */
  /* ------------------------------------------------------------------------ */
  return (
    <ProductFormUI
      product={product}
      errors={errors}
      loading={loading}
      onChange={handleChange}
      onFileChange={handleFileChange}
      onSubmit={handleSubmit}
    />
  );
};
