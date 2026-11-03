import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductFormUI } from "../../ProductForm/ProductFormUI";
import { validateProduct } from "../../../../utils/validateProduct";
import { uploadImage } from "../../../../services/uploadImage";
import {
  createProduct,
  getProductById,
  updateProduct,
} from "../../../../services/productsService";
import "../../ProductForm/ProductFormContainer.css";
/* -------------------------------------------------------------------------- */
/*                            IMPORT PARA TOASTIFY                            */
/* -------------------------------------------------------------------------- */
import { toast } from "react-toastify";

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

  /* -------------------------------------------------------------------------- */
  /*                SI HAY ID, TRAEMOS EL PRODUCTO PARA EDITARLO                */
  /* -------------------------------------------------------------------------- */
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

    /* -------------------------------------------------------------------------- */
    /*       MODIFICAMOS LOS ESTADOS PARA EL "LOADING MIENTRAS SE PROCESA"        */
    /* -------------------------------------------------------------------------- */
    setErrors({});
    setLoading(true);

    /* -------------------------------------------------------------------------- */
    /*          VALIDAR INPUTS (SI EDITO, ALCANZA CON LA IMAGEN ACTUAL)           */
    /* -------------------------------------------------------------------------- */
    const newErrors = validateProduct({ ...product, file: file || product.image });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      /* -------------------------------------------------------------------------- */
      /*                SUBIR LA IMAGEN SOLO SI SE ELIGIO UNA NUEVA                 */
      /* -------------------------------------------------------------------------- */
      const imageUrl = file ? await uploadImage(file) : product.image;

      /* -------------------------------------------------------------------------- */
      /*                      ARMAR LA ESTRUCTURA DEL PRODUCTO                      */
      /* -------------------------------------------------------------------------- */
      const productData = {
        ...product,
        price: Number(product.price),
        image: imageUrl,
      };

      if (id) {
        /* -------------------------------------------------------------------------- */
        /*                                MODIFICACION                                */
        /* -------------------------------------------------------------------------- */
        await updateProduct(id, productData);
        toast.success("Producto actualizado");
        navigate("/admin/dashboard", { replace: true });
      } else {
        /* -------------------------------------------------------------------------- */
        /*                                    ALTA                                    */
        /* -------------------------------------------------------------------------- */
        const newId = await createProduct(productData);
        /* -------------------------------------------------------------------------- */
        /*                             VACIAR FORMULARIO                              */
        /* -------------------------------------------------------------------------- */
        setProduct({ name: "", price: "", category: "", description: "" });
        setFile(null);

        /* -------------------------------------------------------------------------- */
        /*                        NAVEGAR A LA PAGINA DE EXITO                        */
        /* -------------------------------------------------------------------------- */
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
