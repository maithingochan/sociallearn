export const GLOBALTYPES = {
  AUTH: "AUTH",
  ALERT: "ALERT",
  THEME: "THEME",
  STATUS: "STATUS",
  MODEL: "MODEL"
}

export const EditData = (data, id, post) => {
  const newData = data.map(item => (item._id === id ? post : item))
  console.log(newData)
  return newData
}
export const DeleteData = (data, id) => {
  const newData = data.filter(item => item._id !== id)
  return newData
}