import { useState } from "react";

export default function ImageUpload({ onUpload }) {
  const [preview, setPreview] = useState(null);

  const handleChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    onUpload(file);
  };

  return (
    <label className="upload-box">
      <input type="file" accept="image/*" onChange={handleChange} />
      {preview ? (
        <img src={preview} alt="Crop preview" />
      ) : (
        <span>Upload crop image</span>
      )}
    </label>
  );
}
