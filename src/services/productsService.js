import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
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

/* -------------------------------------------------------------------------- */
/*                            ACTUALIZAR PRODUCTO                             */
/* -------------------------------------------------------------------------- */
export const updateProduct = async (id, productData) => {
  try {
    await updateDoc(doc(productsRef, id), productData);
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    throw error;
  }
};

/* -------------------------------------------------------------------------- */
/*                            ELIMINAR PRODUCTO                               */
/* -------------------------------------------------------------------------- */
export const deleteProduct = async (id) => {
  try {
    await deleteDoc(doc(productsRef, id));
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    throw error;
  }
};

/* -------------------------------------------------------------------------- */
/*                            CREAR ORDEN DE COMPRA                          */
/* -------------------------------------------------------------------------- */
const ordersRef = collection(db, "orders");

export const createOrder = async ({ items, total }) => {
  try {
    const orderRef = await addDoc(ordersRef, {
      items: items.map(({ id, name, price, image }) => ({
        productId: id,
        name,
        price: Number(price),
        image,
      })),
      total: Number(total),
      status: "recibida",
      createdAt: serverTimestamp(),
    });

    return orderRef.id;
  } catch (error) {
    console.error("Error al guardar la orden de compra:", error);
    throw error;
  }
};

/* -------------------------------------------------------------------------- */
/*                         TRAER ÓRDENES DE COMPRA                           */
/* -------------------------------------------------------------------------- */
export const getOrders = async () => {
  try {
    const ordersQuery = query(ordersRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(ordersQuery);

    return snapshot.docs.map((orderDoc) => ({
      id: orderDoc.id,
      ...orderDoc.data(),
    }));
  } catch (error) {
    console.error("Error al traer las órdenes de compra:", error);
    throw error;
  }
};


/* -------------------------------------------------------------------------- */
/*                         Cancelar una orden                        */
/* -------------------------------------------------------------------------- */

export const cancelOrder= async(id)=>{
const orderRef =doc(db,"orders",id);
await updateDoc(orderRef,{status: "cancelada"});


};