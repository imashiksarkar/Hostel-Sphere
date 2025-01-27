import axios from 'axios'

export const uploadImage = async (file: File) => {
  const data = new FormData()

  data.append('file', file)
  data.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
      }/image/upload`,
      data,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    )

    return response.data
  } catch (error) {
    console.log(error)
  }
}
