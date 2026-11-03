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
/*          TODAS LAS FUNCIONES UTILIZAN ESTA COLECCIÓN DE FIRESTORE          */
/* -------------------------------------------------------------------------- */
const productsRef = collection(db, "products");

/* -------------------------------------------------------------------------- */
/* FIRESTORE DEVUELVE DOCUMENTOS; LOS CONVIERTO AL FORMATO QUE USA LA TIENDA  */
/* -------------------------------------------------------------------------- */
const formatProducts = (snapshot) => {
  return snapshot.docs.map((productDoc) => {
    return { id: productDoc.id, ...productDoc.data() };
  });
};

/* -------------------------------------------------------------------------- */
/*                              TRAER PRODUCTOS                               */
/* -------------------------------------------------------------------------- */
export const getProducts = async () => {
  try {
    /* -------------------------------------------------------------------------- */
    /*               OBTENEMOS TODOS LOS DOCUMENTOS DE LA COLECCIÓN               */
    /* -------------------------------------------------------------------------- */
    const snapshot = await getDocs(productsRef);
    return formatProducts(snapshot);
  } catch (error) {
    console.error("Error al traer los productos:", error);
    throw error;
  }
};

/* -------------------------------------------------------------------------- */
/*                           TRAER PRODUCTO POR ID                            */
/* -------------------------------------------------------------------------- */
export const getProductById = async (id) => {
  try {
    /* -------------------------------------------------------------------------- */
    /*          CREAMOS LA REFERENCIA AL DOCUMENTO Y LO BUSCAMOS POR ID           */
    /* -------------------------------------------------------------------------- */
    const productSnapshot = await getDoc(doc(productsRef, id));

    /* -------------------------------------------------------------------------- */
    /*                     VERIFICAMOS SI EL DOCUMENTO EXISTE                     */
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
/*                      FILTRAR PRODUCTOS POR CATEGORÍA                       */
/* -------------------------------------------------------------------------- */
export const getByCategory = async (category) => {
  try {
    /* -------------------------------------------------------------------------- */
    /*    SI RECIBIMOS UNA CATEGORÍA, FILTRAMOS LOS PRODUCTOS DESDE FIRESTORE     */
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
/*                               CREAR PRODUCTO                               */
/* -------------------------------------------------------------------------- */
export const createProduct = async (productData) => {
  try {
    /* -------------------------------------------------------------------------- */
    /*       AGREGAMOS EL NUEVO PRODUCTO A LA COLECCIÓN Y DEVOLVEMOS SU ID        */
    /* -------------------------------------------------------------------------- */
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
/*                             ELIMINAR PRODUCTO                              */
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
/*                           CREAR ORDEN DE COMPRA                            */
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
/*                          TRAER ÓRDENES DE COMPRA                           */
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
/*                             CANCELAR UNA ORDEN                             */
/* -------------------------------------------------------------------------- */
export const cancelOrder = async (id) => {
  try {
    await updateDoc(doc(ordersRef, id), { status: "cancelada" });
  } catch (error) {
    console.error("Error al cancelar la orden de compra:", error);
    throw error;
  }
};
