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

/* -------------------------------------------------------------------------- */
/*                    COLECCION DE PRODUCTOS EN FIRESTORE                     */
/* -------------------------------------------------------------------------- */
const productsRef = collection(db, "products");

/* -------------------------------------------------------------------------- */
/*                    PASO LOS DOCUMENTOS A OBJETOS CON ID                    */
/* -------------------------------------------------------------------------- */
const formatProducts = (snapshot) => {
  return snapshot.docs.map((productDoc) => {
    return { id: productDoc.id, ...productDoc.data() };
  });
};

/* -------------------------------------------------------------------------- */
/*                         TRAIGO TODOS LOS PRODUCTOS                         */
/* -------------------------------------------------------------------------- */
export const getProducts = async () => {
  try {
    const snapshot = await getDocs(productsRef);
    return formatProducts(snapshot);
  } catch (error) {
    console.error("Error al traer los productos:", error);
    throw error;
  }
};

/* -------------------------------------------------------------------------- */
/*                         TRAIGO UN PRODUCTO POR ID                          */
/* -------------------------------------------------------------------------- */
export const getProductById = async (id) => {
  try {
    const productSnapshot = await getDoc(doc(productsRef, id));

    /* -------------------------------------------------------------------------- */
    /*                           SI EXISTE LO DEVUELVO                            */
    /* -------------------------------------------------------------------------- */
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
/*                          PRODUCTOS POR CATEGORIA                           */
/* -------------------------------------------------------------------------- */
export const getByCategory = async (category) => {
  try {
    /* -------------------------------------------------------------------------- */
    /*                    SI HAY CATEGORIA FILTRO EN FIRESTORE                    */
    /* -------------------------------------------------------------------------- */
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
/*                              CREO UN PRODUCTO                              */
/* -------------------------------------------------------------------------- */
export const createProduct = async (productData) => {
  try {
    /* -------------------------------------------------------------------------- */
    /*                         LO AGREGO Y DEVUELVO SU ID                         */
    /* -------------------------------------------------------------------------- */
    const productRef = await addDoc(productsRef, productData);
    return productRef.id;
  } catch (error) {
    console.error("Error al crear el producto:", error);
    throw error;
  }
};

/* -------------------------------------------------------------------------- */
/*                           ACTUALIZO UN PRODUCTO                            */
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
/*                             BORRO UN PRODUCTO                              */
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
/*                         GUARDO LA ORDEN DE COMPRA                          */
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
/*                  TRAIGO LAS ORDENES, LAS ULTIMAS PRIMERO                   */
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
/*                       MARCO LA ORDEN COMO CANCELADA                        */
/* -------------------------------------------------------------------------- */
export const cancelOrder = async (id) => {
  try {
    await updateDoc(doc(ordersRef, id), { status: "cancelada" });
  } catch (error) {
    console.error("Error al cancelar la orden de compra:", error);
    throw error;
  }
};
