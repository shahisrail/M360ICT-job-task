import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetProductByIdQuery } from "../api/productApi";
import { Button, Descriptions, Image, Rate, Row, Col, Divider ,Skeleton} from "antd";
import "../styles/ProductDetail.css";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetProductByIdQuery(Number(id));

  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [visibleReviewsCount, setVisibleReviewsCount] = useState<number>(5);

  if (isLoading) {  return (
    <div className="product-detail-container">
      <Row gutter={24}>
        <Col xs={24} md={12}>
          <Skeleton.Image style={{ width: 900, height: 400, borderRadius: 10 }} active />
          <div style={{ marginTop: 20, display: "flex", gap: 8 }}>
            {Array.from({ length: 3 }).map((_, idx) => (
              <Skeleton.Avatar key={idx} shape="square" size={80} active />
            ))}
          </div>
        </Col>
        <Col xs={24} md={12}>
          <Skeleton active paragraph={{ rows: 8 }} />
        </Col>
      </Row>
    </div>
  );
}
  if (error) return <div>Error fetching product details</div>;
  if (!data) return null;

  const images = data.images || [];

  const warrantyInformation = data.warrantyInformation || "1 year manufacturer warranty.";
  const shippingInformation = data.shippingInformation || "Delivered within 5-7 business days.";
  const availabilityStatus = data.stock > 0 ? "Available" : "Out of Stock";
  const weight = data.weight || "500g";

  const reviews = data.reviews || [];

  const handleLoadMore = () => {
    setVisibleReviewsCount((prev) => prev + 5);
  };

  const handleShowLess = () => {
    setVisibleReviewsCount(5);
  };

  return (
    <div className="product-detail-container">
      <Row gutter={24}>
        {/* Left side: Images */}
        <Col xs={24} md={12}>
          <div className="main-image-wrapper">
            <Image
              width="100%"
              height={400}
              style={{ objectFit: "contain", borderRadius: 10, background: "#f5f5f5" }}
              src={selectedImage || data.thumbnail}
              preview={{ mask: "Click to Zoom" }}
            />
          </div>
          <div className="thumbnail-images" style={{ marginTop: 20, display: "flex", gap: 8 }}>
            {(images.length > 0 ? images : [data.thumbnail])
              .slice(0, 4)
              .map((img, idx) => (
                <Image
                  key={idx}
                  width={80}
                  height={80}
                  src={img}
                  
                  style={{
                    marginRight: 8,
                    border: selectedImage === img ? "2px solid #1890ff" : "1px solid #ddd",
                    borderRadius: 8,
                    cursor: "pointer",
                    objectFit: "cover",
                  }}
                  onClick={() => setSelectedImage(img)}
                  preview={false}
                />
              ))}
          </div>
        </Col>

        {/* Right side: Details */}
        <Col xs={24} md={12}>
          <h2 className="product-title">{data.title}</h2>

          <div className="product-price">${data.price}</div>

          <div className="product-rating">
            <Rate allowHalf disabled defaultValue={data.rating} />
            <span className="rating-number">({data.rating})</span>
          </div>

          <div className="product-stock">
            {data.stock > 0 ? (
              <span className="in-stock">In Stock ({data.stock})</span>
            ) : (
              <span className="out-of-stock">Out of Stock</span>
            )}
          </div>

          <Descriptions bordered column={1} size="small" style={{ marginTop: 20 }}>
            <Descriptions.Item label="Brand">{data.brand}</Descriptions.Item>
            <Descriptions.Item label="Category">{data.category}</Descriptions.Item>
            <Descriptions.Item label="Warranty">{warrantyInformation}</Descriptions.Item>
            <Descriptions.Item label="Shipping Info">{shippingInformation}</Descriptions.Item>
            <Descriptions.Item label="Availability Status">
              <span style={{ color: availabilityStatus === "Out of Stock" ? "red" : "green" }}>
                {availabilityStatus}
              </span>
            </Descriptions.Item>
            <Descriptions.Item label="Weight">{weight}</Descriptions.Item>
            <Descriptions.Item label="Description">{data.description}</Descriptions.Item>
          </Descriptions>

          <Button type="primary" style={{ marginTop: 24 }} onClick={() => navigate("/")}>
            Back to Products
          </Button>
        </Col>
      </Row>

      {/* Reviews Section */}
      <Divider orientation="left" style={{ marginTop: 40 }}>
        Reviews
      </Divider>

      {reviews.length > 0 ? (
        <div className="reviews-section">
          {reviews.slice(0, visibleReviewsCount).map((review, idx) => (
            <div key={idx} className="review-card">
              <Rate disabled allowHalf defaultValue={review.rating} />
              <p className="review-comment">"{review.comment}"</p>
              <div className="review-meta">
                <span>By: {review.reviewerName}</span> |
                <span> {new Date(review.date).toLocaleDateString()}</span>
              </div>
            </div>
          ))}

          {/* Load More / Show Less */}
          <div style={{ textAlign: "center", marginTop: 20 }}>
            {visibleReviewsCount < reviews.length ? (
              <Button onClick={handleLoadMore}>Load More</Button>
            ) : reviews.length > 5 ? (
              <Button onClick={handleShowLess}>Show Less</Button>
            ) : null}
          </div>
        </div>
      ) : (
        <p>No reviews available for this product.</p>
      )}
    </div>
  );
};

export default ProductDetail;
