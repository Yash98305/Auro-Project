import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { Avatar, Button } from "@mui/material";

const ItemDetailPage = () => {
  const { id } = useParams();
  const { api, auth } = useAuth();
  const [item, setItem] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newReview, setNewReview] = useState({ comment: "", rating: 5 });

  useEffect(() => {
    fetchItemDetails();
  }, []);

  const fetchItemDetails = async () => {
    try {
      const response = await axios.get(`${api}/item/${id}`);
      setItem(response.data.item);
      fetchReviews();
    } catch (err) {
      setError("Error fetching item details.");
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${api}/item/review/${id}`);
      setReviews(response.data);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!auth) {
      alert("You need to be logged in to submit a review.");
      return;
    }

    try {
      const response = await axios.post(
        `${api}/item/review/create`,
        {
          reviewedUser: item.seller._id,
          comment: newReview.comment,
          rating: newReview.rating,
          itemId: id,
        },
        { headers: { Authorization: `${auth.token}` } }
      );

      setReviews([...reviews, response.data.review]);
      setNewReview({ comment: "", rating: 5 });
    } catch (err) {
      console.error("Error submitting review:", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div
      style={{
        display: "flex",
        height: "80vh",
        padding: 30,
      }}
    >
      <div>
        <img
          src={`${api}/item/image/${item._id}`}
          alt={item.title}
          style={{
            width: "100%",
            height: "400px",
            objectFit:"cover",
            borderRadius: "10px",
            marginBottom: "20px",
            boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
          }}
        />
      </div>
      <div
        style={{
          margin: "auto",
          padding: "20px",
          overflowY: "scroll",
          height: "70vh",
        }}
      >
        <h2
          style={{
            fontSize: "26px",
            fontWeight: "bold",
            textAlign: "center",
            color: "#333",
          }}
        >
          {item.title}
        </h2>

        <p style={{ fontSize: "18px", marginBottom: "10px" }}>
          <strong>Category:</strong> {item.category}
        </p>
        <p style={{ fontSize: "18px", fontWeight: "bold", color: "#28a745" }}>
          <strong>Price:</strong> {item.price} rs
        </p>
        <p style={{ fontSize: "16px", color: "#555", lineHeight: "1.5" }}>
          <strong>Description:</strong> {item.description}
        </p>

        {/* Seller Information */}
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <h3 style={{ marginBottom: "10px" }}>Seller Information</h3>
          <p>
            <strong>Name:</strong> {item.seller.name}
          </p>
          <Link
            to={`/profile/${item.seller._id}`}
            style={{ color: "#007bff", textDecoration: "none" }}
          >
            View Seller's Profile
          </Link>
        </div>
        {auth && (
          <div
            style={{
              marginTop: "30px",
              padding: "15px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <h3 style={{ marginBottom: "10px" }}>Leave a Review</h3>
            <form onSubmit={handleReviewSubmit}>
              <label style={{ fontSize: "16px", fontWeight: "bold" }}>
                Rating:
              </label>
              <select
                value={newReview.rating}
                onChange={(e) =>
                  setNewReview({
                    ...newReview,
                    rating: parseInt(e.target.value),
                  })
                }
                style={{
                  width: "100%",
                  padding: "8px",
                  marginTop: "5px",
                  fontSize: "16px",
                  borderRadius: "5px",
                  border: "1px solid #ddd",
                }}
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {Array.from({ length: num }, () => "★").join("")}
                  </option>
                ))}
              </select>

              <label
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  marginTop: "10px",
                }}
              >
                Comment:
              </label>
              <textarea
                value={newReview.comment}
                onChange={(e) =>
                  setNewReview({ ...newReview, comment: e.target.value })
                }
                required
                style={{
                  width: "100%",
                  height: "80px",
                  marginTop: "5px",
                  padding: "8px",
                  fontSize: "14px",
                  borderRadius: "5px",
                  border: "1px solid #ddd",
                }}
              />

              <button
                type="submit"
                style={{
                  marginTop: "10px",
                  padding: "10px",
                  background: "#007bff",
                  color: "white",
                  fontSize: "16px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  width: "100%",
                }}
              >
                Submit Review
              </button>
            </form>
          </div>
        )}

        <div style={{ marginTop: "30px" }}>
          <h3
            style={{
              marginBottom: "15px",
              borderBottom: "2px solid #ddd",
              paddingBottom: "5px",
            }}
          >
            Reviews
          </h3>
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index}
                style={{
                  display: "flex",
                  borderBottom: "1px solid #ddd",
                  padding: "10px 0",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
              
                <div >
                  <p style={{ fontWeight: "bold", fontSize: "16px" }}>
                    {review.reviewer.name}:
                  </p>
                  <p
                    style={{
                      color: "#666",
                      fontSize: "15px",
                      marginBottom: "5px",
                    }}
                  >
                    {review.comment}
                  </p>
                  <p style={{ color: "#f39c12", fontSize: "18px" }}>
                    {Array.from({ length: review.rating }, (_, i) => "★").join(
                      ""
                    )}
                    {Array.from(
                      { length: 5 - review.rating },
                      (_, i) => "☆"
                    ).join("")}
                  </p>
                </div>
                <Avatar
                style={{ border: "1px solid black", zIndex: "11 !important" }}
                sx={{ width: 50, height: 50 }}
                src={review.reviewer.photo?`${api}/user/photo/${review.reviewer._id}`:review.reviewer.avatar}
                alt="error"
              />
              </div>
              
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
        <button
                type="submit"
                style={{
                  marginTop: "10px",
                  padding: "10px",
                  background: "green",
                  color: "white",
                  fontSize: "16px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  width: "100%",
                }}
              >
               Chat With the person

              </button>
     
      </div>
    </div>
  );
};

export default ItemDetailPage;
