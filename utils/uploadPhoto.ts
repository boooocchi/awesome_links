import { toast } from "react-hot-toast";

export const uploadPhoto = async (
  e: React.ChangeEvent<HTMLInputElement>,
  error: any
) => {
  if (!e.target.files || e.target.files.length <= 0) return;
  const file = e.target.files[0];
  const filename = encodeURIComponent(file.name);
  const res = await fetch(`/api/upload-image?file=${filename}`);
  const data = await res.json();
  const formData = new FormData();

  Object.entries({ ...data.fields, file }).forEach(([key, value]) => {
    // @ts-ignore
    formData.append(key, value);
  });

  toast.promise(
    fetch(data.url, {
      method: "POST",
      body: formData
    }),
    {
      loading: "Uploading...",
      success: "Image successfully uploaded!🎉",
      error: `Upload failed 😥 Please try again ${error}`
    }
  );
};
