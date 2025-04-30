

import type React from "react"
import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useGetProductByIdQuery } from "../api/productApi"
import { Button, Rate, Row, Col, Skeleton, Breadcrumb } from "antd"
import { 
  ShoppingCartOutlined, 
  HeartOutlined, 
  ShareAltOutlined, 
  ArrowLeftOutlined,
  StarFilled
} from "@ant-design/icons"
import "../styles/ProductDetail.css"

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data, error, isLoading } = useGetProductByIdQuery(Number(id))

  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined)
  const [visibleReviewsCount, setVisibleReviewsCount] = useState<number>(3)

  if (isLoading) {
    return (
      <div className="product-detail-container">
        <div className="product-content">
          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <Skeleton.Image style={{ width: "100%", height: 400, borderRadius: 12 }} active />
              <div style={{ marginTop: 20, display: "flex", gap: 8 }}>
                {Array.from({ length: 4 }).map((_, idx) => (
                  <Skeleton.Image key={idx} style={{ width: 80, height: 80, borderRadius: 8 }} active />
                ))}
              </div>
            </Col>
            <Col xs={24} md={12}>
              <Skeleton active paragraph={{ rows: 2 }} />
              <Skeleton.Button active style={{ width: 120, height: 40, marginTop: 16, marginBottom: 16 }} />
              <Skeleton active paragraph={{ rows: 1 }} />
              <Skeleton.Button active style={{ width: 100, height: 32, marginTop: 16, marginBottom: 16 }} />
              <Skeleton active paragraph={{ rows: 6 }} />
              <div style={{ display: "flex", gap: 16, marginTop: 24 }}>
                <Skeleton.Button active style={{ width: 120, height: 40 }} />
                <Skeleton.Button active style={{ width: 120, height: 40 }} />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
  
  if (error) return (
    <div className="product-detail-container">
      <div className="product-content" style={{ textAlign: "center" }}>
        <h2>Error fetching product details</h2>
        <p>Please try again later or contact support if the problem persists.</p>
        <Button 
          type="primary" 
          onClick={() => navigate("/")}
          icon={<ArrowLeftOutlined />}
          className="primary-button"
        >
          Back to Products
        </Button>
      </div>
    </div>
  )
  
  if (!data) return null

  const images = data.images || []
  const displayImage = selectedImage || data.thumbnail
  
  const warrantyInformation = data.warrantyInformation || "1 year manufacturer warranty"
  const shippingInformation = data.shippingInformation || "Delivered within 5-7 business days"
  const weight = data.weight || "500g"
  
  let stockStatus = "In Stock"
  let stockClass = "in-stock"
  
  if (data.stock <= 0) {
    stockStatus = "Out of Stock"
    stockClass = "out-of-stock"
  } else if (data.stock <= 10) {
    stockStatus = "Low Stock"
    stockClass = "low-stock"
  }

  const reviews = data.reviews || []

  const handleLoadMore = () => {
    setVisibleReviewsCount((prev) => prev + 3)
  }

  const handleShowLess = () => {
    setVisibleReviewsCount(3)
  }

  return (
    <div className="product-detail-container">
      {/* Breadcrumb Navigation */}
      <div className="product-header">
        <Breadcrumb className="product-breadcrumb">
          <Breadcrumb.Item>
            <a onClick={() => navigate("/")}>Home</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a onClick={() => navigate("/products")}>Products</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{data.category}</Breadcrumb.Item>
          <Breadcrumb.Item>{data.title}</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      {/* Main Product Content */}
      <div className="product-content">
        <Row gutter={[24, 24]}>
          {/* Left side: Images */}
          <Col xs={24} md={12}>
            <div className="main-image-wrapper">
              <img 
                src={displayImage || "/placeholder.svg"} 
                alt={data.title}
                style={{ 
                  width: "100%", 
                  height: "auto", 
                  maxHeight: "400px",
                  objectFit: "contain",
                  display: "block",
                  margin: "0 auto"
                }}
              />
            </div>
            
            <div className="thumbnail-images">
              {(images.length > 0 ? images : [data.thumbnail]).slice(0, 4).map((img, idx) => (
                <div 
                  key={idx}
                  className={`thumbnail-item ${img === displayImage ? 'active' : ''}`}
                  onClick={() => setSelectedImage(img)}
                >
                  <img 
                    src={img || "/placeholder.svg"} 
                    alt={`${data.title} - Image ${idx + 1}`}
                    style={{ width: "80px", height: "80px", objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>
          </Col>

          {/* Right side: Details */}
          <Col xs={24} md={12}>
            <h1 className="product-title">{data.title}</h1>
            
            <div className="product-price">
              ${data.price.toFixed(2)}
              {data.discountPercentage > 0 && (
                <span className="discount-badge">{Math.round(data.discountPercentage)}% OFF</span>
              )}
            </div>
            
            <div className="product-rating">
              <Rate allowHalf disabled defaultValue={data.rating} />
              <span className="rating-number">({data.rating})</span>
            </div>
            
            <div className={`product-stock ${stockClass}`}>
              {stockStatus} {data.stock > 0 && `(${data.stock} available)`}
            </div>
            
            {/* Product Details */}
            <div className="product-details">
              <div className="details-card">
                <h3 className="details-title">Product Details</h3>
                <div className="details-list">
                  <div className="details-item">
                    <span className="details-label">Brand</span>
                    <span className="details-value">{data.brand}</span>
                  </div>
                  <div className="details-item">
                    <span className="details-label">Category</span>
                    <span className="details-value">{data.category}</span>
                  </div>
                  <div className="details-item">
                    <span className="details-label">SKU</span>
                    <span className="details-value">{data.sku}</span>
                  </div>
                  <div className="details-item">
                    <span className="details-label">Weight</span>
                    <span className="details-value">{weight}</span>
                  </div>
                </div>
              </div>
              
              <div className="details-card">
                <h3 className="details-title">Shipping & Returns</h3>
                <div className="details-list">
                  <div className="details-item">
                    <span className="details-label">Warranty</span>
                    <span className="details-value">{warrantyInformation}</span>
                  </div>
                  <div className="details-item">
                    <span className="details-label">Shipping</span>
                    <span className="details-value">{shippingInformation}</span>
                  </div>
                  <div className="details-item">
                    <span className="details-label">Return Policy</span>
                    <span className="details-value">{data.returnPolicy || "30-day returns"}</span>
                  </div>
                </div>
              </div>
              
              <div className=" ">
                <h3 className="details-title">Description</h3>
                <p>{data.description}</p>
              </div>
            </div>
      
            <div className="product-actions">
              <button 
                className="action-button primary-button"
                disabled={data.stock <= 0}
              >
                <ShoppingCartOutlined /> Add to Cart
              </button>
              <button className="action-button secondary-button">
                <HeartOutlined /> Add to Wishlist
              </button>
              <button className="action-button secondary-button">
                <ShareAltOutlined /> Share
              </button>
            </div>
          </Col>
        </Row>
      </div>

      {/* Reviews Section */}
      <div className="reviews-section">
        <div className="reviews-header">
          <h2 className="reviews-title">Customer Reviews</h2>
          <div className="product-rating">
            <StarFilled style={{ color: "#f6e05e", marginRight: "4px" }} />
            <span style={{ fontWeight: "bold" }}>{data.rating}</span>
            <span style={{ color: "#cbd5e0", marginLeft: "4px" }}>
              ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
            </span>
          </div>
        </div>

        {reviews.length > 0 ? (
          <>
            {reviews.slice(0, visibleReviewsCount).map((review, idx) => (
              <div key={idx} className="review-card">
                <div className="review-header">
                  <span className="reviewer-name">{review.reviewerName}</span>
                  <span className="review-date">{new Date(review.date).toLocaleDateString()}</span>
                </div>
                <Rate disabled allowHalf defaultValue={review.rating} />
                <p className="review-comment">"{review.comment}"</p>
              </div>
            ))}

            {/* Load More / Show Less */}
            <div className="load-more-container">
              {visibleReviewsCount < reviews.length ? (
                <button className="load-more-button" onClick={handleLoadMore}>
                  Load More Reviews
                </button>
              ) : reviews.length > 3 ? (
                <button className="load-more-button" onClick={handleShowLess}>
                  Show Less
                </button>
              ) : null}
            </div>
          </>
        ) : (
          <p style={{ textAlign: "center", color: "#cbd5e0" }}>No reviews available for this product.</p>
        )}
      </div>
     
      <div style={{ textAlign: "center", marginTop: "2rem", marginBottom: "2rem" }}>
        <Button 
          type="primary" 
          onClick={() => navigate("/")}
          icon={<ArrowLeftOutlined />}
          className="primary-button"
        >
          Back to Products
        </Button>
      </div>
    </div>
  )
}

export default ProductDetail
