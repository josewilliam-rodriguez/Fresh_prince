export const getImageURL = async (file) => {
    const imagen = new FormData();
    imagen.append("upload_preset", 'fdelivery_preset');
    imagen.append("file", file);
  
    const resp = await fetch("https://api.cloudinary.com/v1_1/duqoqmq8i/upload", { 
        method: "POST",
        body: imagen
    })
    const data = await resp.json();
    console.log(data)
    return data.secure_url
  }