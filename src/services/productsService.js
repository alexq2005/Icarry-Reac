import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase/config";

// Todas las funciones utilizan esta colección de Firestore.
const productsRef = collection(db, "products");

// Firestore devuelve documentos; los convierto al formato que usa la tienda.
const formatProducts = (snapshot) => {
  return snapshot.docs.map((productDoc) => {
    return { id: productDoc.id, ...productDoc.data() };
  });
};

/* -------------------------------------------------------------------------- */
/*                               TRAER PRODUCTOS                              */
/* -------------------------------------------------------------------------- */
export const getProducts = async () => {
  try {
    // Obtenemos todos los documentos de la colección.
    const snapshot = await getDocs(productsRef);
    return formatProducts(snapshot);
  } catch (error) {
    console.error("Error al traer los productos:", error);
    throw error;
  }
};

/* -------------------------------------------------------------------------- */
/*                            TRAER PRODUCTO POR ID                           */
/* -------------------------------------------------------------------------- */
export const getProductById = async (id) => {
  try {
    // Creamos la referencia al documento y lo buscamos por id.
    const productSnapshot = await getDoc(doc(productsRef, id));

    // Verificamos si el documento existe.
    if (productSnapshot.exists()) {
      return { id: productSnapshot.id, ...productSnapshot.data() };
    }

    return null;
  } catch (error) {
    console.error("Error al traer el producto por ID:", error);
    throw error;
  }
};

/* -------------------------------------------------------------------------- */
/*                         FILTRAR PRODUCTOS POR CATEGORÍA                    */
/* -------------------------------------------------------------------------- */
export const getByCategory = async (category) => {
  try {
    // Si recibimos una categoría, filtramos los productos desde Firestore.
    let productsQuery;
    if (category) {
      productsQuery = query(productsRef, where("category", "==", category));
    } else {
      productsQuery = productsRef;
    }

    const snapshot = await getDocs(productsQuery);
    return formatProducts(snapshot);
  } catch (error) {
    console.error("Error al filtrar los productos:", error);
    throw error;
  }
};

/* -------------------------------------------------------------------------- */
/*                               CREAR PRODUCTO                               */
/* -------------------------------------------------------------------------- */
export const createProduct = async (productData) => {
  try {
    // Agregamos el nuevo producto a la colección y devolvemos su id.
    const productRef = await addDoc(productsRef, productData);
    return productRef.id;
  } catch (error) {
    console.error("Error al crear el producto:", error);
    throw error;
  }
};
