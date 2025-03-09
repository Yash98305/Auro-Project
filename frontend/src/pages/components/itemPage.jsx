import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth";

const ItemPage = () => {
  const { api, auth } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Electronics",
    price: "", // Ensuring it's controlled
    condition: "New",
    location: "",
    images: [],
    seller: auth?.user?._id || "",
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Handles text input fields properly
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handles image uploads correctly
const handleImageChange = (e) => {
  const files = Array.from(e.target.files);
  if (files.length === 0) {
    setMessage("Please select at least one image.");
    return;
  }

  setFormData((prevState) => ({
    ...prevState,
    images: files.filter((file) => file instanceof File),
  }));

  const previews = files.map((file) => URL.createObjectURL(file));
  setImagePreviews(previews);
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
  
    try {
      const formDataToSend = new FormData();
  
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "images" && value.length > 0) {
          value.forEach((file) => {
            if (file instanceof File) {
              formDataToSend.append("images", file);
            } else {
              console.error("Invalid file format:", file);
            }
          });
        } else {
          formDataToSend.append(key, value);
        }
      });
  
      if (formData.images.length === 0) {
        throw new Error("Please upload at least one image.");
      }
  
      await axios.post(`${api}/item/create`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      setMessage("Item listed successfully!");
      setFormData({
        title: "",
        description: "",
        category: "Electronics",
        price: "",
        condition: "New",
        location: "",
        images: [],
        seller: auth?.user?._id || "",
      });
      setImagePreviews([]);
    } catch (error) {
      console.error("Error:", error);
      setMessage(error.message || "Error listing item. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Create New Item</h2>
      {message && <p style={styles.message}>{message}</p>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="text" name="title" placeholder="Item Title" value={formData.title} onChange={handleChange} required style={styles.input} />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required style={styles.textarea} />

        <select name="category" value={formData.category} onChange={handleChange} required style={styles.select}>
          <option value="Electronics">Electronics</option>
          <option value="Furniture">Furniture</option>
          <option value="Clothing">Clothing</option>
          <option value="Books">Books</option>
          <option value="Other">Other</option>
        </select>

        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required style={styles.input} />

        <select name="condition" value={formData.condition} onChange={handleChange} required style={styles.select}>
          <option value="New">New</option>
          <option value="Used">Used</option>
          <option value="Fair">Fair</option>
        </select>

        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required style={styles.input} />

        <input type="file" multiple onChange={handleImageChange} accept="image/*" style={styles.fileInput} />

        <div style={styles.imagePreviewContainer}>
          {imagePreviews.map((src, index) => (
            <img key={index} src={src} alt="Preview" style={styles.imagePreview} />
          ))}
        </div>

        <button type="submit" style={styles.button} disabled={loading}>{loading ? "Listing..." : "List Item"}</button>
      </form>
    </div>
  );
};

// ✅ Improved styles
const styles = {
  container: {
    maxWidth: "500px",
    margin: "0 auto",
    padding: "20px",
    textAlign: "center",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  textarea: {
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    height: "100px",
  },
  select: {
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  fileInput: {
    padding: "10px",
  },
  imagePreviewContainer: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: "10px",
  },
  imagePreview: {
    width: "80px",
    height: "80px",
    objectFit: "cover",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "10px",
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  message: {
    fontSize: "16px",
    color: "green",
  },
};

export default ItemPage;
