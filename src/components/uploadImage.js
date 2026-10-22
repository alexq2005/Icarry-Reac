const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;
const ENDPOINT = "https://api.imgbb.com/1/upload";

export const uploadImage = async (file) => {
  if (!IMGBB_API_KEY) {
    throw new Error("Configura VITE_IMGBB_API_KEY para subir imágenes.");
  }

  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch(`${ENDPOINT}?key=${IMGBB_API_KEY}`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();

    if (!data.success) {
      throw new Error("Error al subir la imagen");
    }

    return data.data.url;
  } catch (error) {
    console.error("ImgBB error:", error);
    throw error;
  }
};
