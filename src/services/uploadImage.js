/* -------------------------------------------------------------------------- */
/*                               CLAVE DE IMGBB                               */
/* -------------------------------------------------------------------------- */
const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;
const ENDPOINT = "https://api.imgbb.com/1/upload";

/* -------------------------------------------------------------------------- */
/*                      SUBO LA IMAGEN Y DEVUELVO LA URL                      */
/* -------------------------------------------------------------------------- */
export const uploadImage = async (file) => {
  /* -------------------------------------------------------------------------- */
  /*                             SIN CLAVE NO SUBE                              */
  /* -------------------------------------------------------------------------- */
  if (!IMGBB_API_KEY) {
    throw new Error("Configura VITE_IMGBB_API_KEY para subir imágenes.");
  }

  /* -------------------------------------------------------------------------- */
  /*                             PREPARO LA IMAGEN                              */
  /* -------------------------------------------------------------------------- */
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch(`${ENDPOINT}?key=${IMGBB_API_KEY}`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();

    /* -------------------------------------------------------------------------- */
    /*                            SI FALLA TIRO ERROR                             */
    /* -------------------------------------------------------------------------- */
    if (!data.success) {
      throw new Error("Error al subir la imagen");
    }

    return data.data.url;
  } catch (error) {
    console.error("ImgBB error:", error);
    throw error;
  }
};
