import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductFormUI } from "./ProductFormUI";
import { validateProduct } from "../../../utils/validateProduct";
import { uploadImage } from "../../../services/uploadImage";
import {
  createProduct,
  getProductById,
  updateProduct,
} from "../../../services/productsService";
import "./ProductFormContainer.css";

export const ProductFormContainerDual = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState(null);
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
  });

  //si hay id, traemos el producto para editarlo
  useEffect(() => {
    if (!id) return;

    getProductById(id)
      .then((data) => {
        if (data) {
          setProduct({
            name: data.name || "",
            price: data.price || "",
            category: data.category || "",
            description: data.description || "",
            image: data.image || "",
          });
        }
      })
      .catch((error) => setErrors({ general: error.message }));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0] || null;
    setFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //modificamos los estados para el "loading mientras se procesa"
    setErrors({});
    setLoading(true);

    //validar inputs (si edito, alcanza con la imagen actual)
    const newErrors = validateProduct({ ...product, file: file || product.image });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      //subir la imagen solo si se eligio una nueva
      const imageUrl = file ? await uploadImage(file) : product.image;

      //armar la estructura del producto
      const productData = {
        ...product,
        price: Number(product.price),
        image: imageUrl,
      };

      if (id) {
        //modificacion
        await updateProduct(id, productData);
        navigate("/admin/products", { replace: true });
      } else {
        //alta
        const newId = await createProduct(productData);
        //vaciar formulario
        setProduct({ name: "", price: "", category: "", description: "" });
        setFile(null);

        //navegar a la pagina de exito
        navigate(`/admin/products/success/${newId}`, { replace: true });
      }
    } catch (error) {
      setErrors({ general: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductFormUI
      product={product}
      errors={errors}
      loading={loading}
      editMode={Boolean(id)}
      image={product.image}
      onChange={handleChange}
      onFileChange={handleFileChange}
      onSubmit={handleSubmit}
    />
  );
};
