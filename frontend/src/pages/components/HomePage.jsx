import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/auth";

const HomePage = () => {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { api, searchQuery, setSearchQuery } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchItems();
  }, [selectedCategory]);

  const fetchItems = async () => {
    try {
      let url = `${api}/item/`;
      if (selectedCategory) url += `?category=${selectedCategory}`;

      const response = await axios.get(url);
      console.log(response);

      if (Array.isArray(response.data.items)) {
        setItems(response.data.items);
      } else {
        console.error("Unexpected API response format:", response.data);
        setItems([]);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
      setItems([]);
    }
  };

  const filteredItems = Array.isArray(items)
    ? items.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div
      style={{
        margin: "0 auto",
        padding: "30px",
        textAlign: "center",
        height:"90vh"
      }}
    >
      {/* Category Dropdown */}
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        style={{
          width: "83%",
          padding: "10px",
          fontSize: "16px",
          marginBottom: "20px",
          border: "1px solid #ddd",
          borderRadius: "5px",
        }}
      >
        <option value="">All Categories</option>
        <option value="Electronics">Electronics</option>
        <option value="Furniture">Furniture</option>
        <option value="Clothing">Clothing</option>
        <option value="Books">Books</option>
        <option value="Other">Other</option>
      </select>

      {/* Item List */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "40px",
          marginTop: "20px",
          overflowY:"scroll",
          scrollbarWidth:"none",
          height:"67vh"
        }}
      >
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div
              key={item._id}
              onClick={() => navigate(`/item/${item._id}`)}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "15px",
                textAlign: "center",
                backgroundColor: "#fff",
                cursor: "pointer",
                transition: "0.3s",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            >
              <img
                src={`${api}/item/image/${item._id}`}
                alt={item.title}
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "5px",
                }}
              />
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  margin: "10px 0",
                }}
              >
                {item.title}
              </h3>
              <p style={{ fontSize: "14px", color: "#777" }}>{item.category}</p>
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#28a745",
                }}
              >
                ${item.price}
              </p>
            </div>
          ))
        ) : (
          <p style={{ fontSize: "18px", color: "#777" }}>No items found.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
