import React, { useState } from "react";
const API_URL = process.env.NEXT_PUBLIC_API_URL
const UploadPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      // Your upload function
      await uploadImage(formData);

      // Clear the file input
      setFile(null);
    } catch (error) {
      console.error("Error uploading image:", error);
      // Handle error
    }
  };

  const uploadImage = async (formData: FormData) => {
    try {
        console.log("api- ",API_URL)
        const response = await fetch(API_URL + "/upload", {method:"POST", body:formData})
    
        console.log("Image uploaded successfully");
    }   catch (error) {
        throw new Error("Error uploading image");
    }
  };

  return (
    <div>
      <h1>Upload a File</h1>
      <form onSubmit={handleFormSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default UploadPage;