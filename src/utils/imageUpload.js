export const checkImage = (file) => {
  let err = "";
  if (!file) return (err = "File does not exist.");

  if (file.size > 1024 * 1024) err = "The largest image size is 1mb.";

  if (file.type !== "image/jpeg" && file.type !== "image/png")
    err = "Image format is incorrect.";
  return err;
};

export const imageUpload = async (images) => {
  console.log(images)
  let imgArr = [];
  for (const item of images) {
    const formData = new FormData();
    console.log(item)
    if (item.camera) {
      formData.append("file", item.camera);
    } else {
      formData.append("file", item);
    }

    formData.append("upload_preset", "sjjagtsk");
    formData.append("cloud_name", "dwy0xavmq");

    const res = await fetch("https://api.cloudinary.com/v1_1/dwy0xavmq/image/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    console.log(data)
    imgArr.push({ publid_id: data.public_id, url: data.secure_url });
  }
  return imgArr;
};
