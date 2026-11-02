import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ProductFormUI } from "./ProductFormUI";
import { validateProduct } from "../../../utils/validateProduct";
import { uploadImage } from "../../../services/uploadImage";
import {
  createProduct,
  getProductById,
  updateProduct,
} from "../../../services/productsService";
import "./ProductFormContainer.css";

export const ProductFormContainer = () => {
  /* ------------------------------------------------------------------------ */
  /*                            ESTADO DEL FORMULARIO                         */
  /* ------------------------------------------------------------------------ */
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState(null);
  const [loadedProduct, setLoadedProduct] = useState(null);
  const [loadError, setLoadError] = useState(null);
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
  });

  useEffect(() => {
    if (!id) {
      return;
    }

    let active = true;

    const loadProduct = async () => {
      try {
        const productData = await getProductById(id);
        if (!productData) {
          throw new Error("No se encontró el producto solicitado.");
        }

        if (active) {
          setProduct({
            name: productData.name || "",
            price: productData.price || "",
            category: productData.category || "",
            description: productData.description || "",
            image: productData.image || "",
          });
          setLoadedProduct({ id, data: productData });
        }
      } catch (error) {
        console.error("Error al cargar el producto para editar:", error);
        if (active) {
          setLoadError({ id, message: error.message });
        }
      }
    };

    loadProduct();

    return () => {
      active = false;
    };
  }, [id]);

  /* ------------------------------------------------------------------------ */
  /*                         MANEJO DE CAMBIOS DEL FORMULARIO                 */
  /* ------------------------------------------------------------------------ */
  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0] || null;
    setFile(selectedFile);
  };

  /* ------------------------------------------------------------------------ */
  /*                    VALIDACIÓN Y GUARDADO DEL PRODUCTO                    */
  /* ------------------------------------------------------------------------ */
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});
    setLoading(true);

    // Valido los datos antes de subir la imagen o guardar el producto.
    const newErrors = validateProduct({
      ...product,
      file: file || product.image,
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      // Si elegí otra imagen, la subo; si no, conservo la imagen actual.
      const imageUrl = file ? await uploadImage(file) : product.image;
      const productData = {
        ...product,
        price: Number(product.price),
        image: imageUrl,
      };

      if (id) {
        await updateProduct(id, productData);
        navigate("/admin/products", { replace: true });
      } else {
        const newProductId = await createProduct(productData);

        // Limpio el formulario y muestro la confirmación del alta.
        setProduct({ name: "", price: "", category: "", description: "" });
        setFile(null);
        navigate(`/admin/products/success/${newProductId}`, { replace: true });
      }
    } catch (error) {
      console.error("Error al guardar el producto:", error);
      setErrors({ general: error.message });
    } finally {
      setLoading(false);
    }
  };

  if (id && loadedProduct?.id !== id && loadError?.id !== id) {
    return (
      <section className="product-form-state" role="status">
        <p>Cargando producto...</p>
      </section>
    );
  }

  if (id && loadError?.id === id) {
    return (
      <section className="product-form-state" role="alert">
        <p>{loadError.message}</p>
        <Link className="btn bg-primary" to="/admin/products">
          Volver a productos
        </Link>
      </section>
    );
  }

  /* ------------------------------------------------------------------------ */
  /*                            VISTA DEL FORMULARIO                          */
  /* ------------------------------------------------------------------------ */
  return (
    <ProductFormUI
      product={product}
      errors={errors}
      loading={loading}
      editMode={Boolean(id)}
      loadingProduct={Boolean(id && loadedProduct?.id !== id)}
      image={product.image}
      onChange={handleChange}
      onFileChange={handleFileChange}
      onSubmit={handleSubmit}
    />
  );
};
