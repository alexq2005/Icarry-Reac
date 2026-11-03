import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductFormUI } from "./ProductFormUI";
import { validateProduct } from "../../../utils/validateProduct";
import { uploadImage } from "../../../services/uploadImage";
import { createProduct } from "../../../services/productsService";
import "./ProductFormContainer.css";

export const ProductFormContainer = () => {
  /* -------------------------------------------------------------------------- */
  /*                           ESTADOS DEL FORMULARIO                           */
  /* -------------------------------------------------------------------------- */
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

  /* -------------------------------------------------------------------------- */
  /*                   GUARDO LO QUE SE ESCRIBE EN CADA CAMPO                   */
  /* -------------------------------------------------------------------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0] || null;
    setFile(file);
  };

  /* -------------------------------------------------------------------------- */
  /*                AL ENVIAR LIMPIO ERRORES Y ACTIVO EL LOADING                */
  /* -------------------------------------------------------------------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    /* -------------------------------------------------------------------------- */
    /*                      VALIDO ANTES DE SUBIR LA IMAGEN                       */
    /* -------------------------------------------------------------------------- */
    const newErrors = validateProduct({ ...product, file });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      /* -------------------------------------------------------------------------- */
      /*                     SUBO LA IMAGEN Y ARMO EL PRODUCTO                      */
      /* -------------------------------------------------------------------------- */
      const imageUrl = await uploadImage(file);
      const productData = {
        ...product,
        price: Number(product.price),
        image: imageUrl,
      };

      const id = await createProduct(productData);

      /* -------------------------------------------------------------------------- */
      /*                    LIMPIO EL FORMULARIO Y VOY AL EXITO                     */
      /* -------------------------------------------------------------------------- */
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

  /* -------------------------------------------------------------------------- */
  /*                         LE PASO TODO AL FORMULARIO                         */
  /* -------------------------------------------------------------------------- */
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
