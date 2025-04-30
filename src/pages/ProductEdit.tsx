"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { Form, Input, Button, Select, InputNumber, notification, Breadcrumb, Spin } from "antd"
import {
  UploadOutlined,
  SaveOutlined,
  CloseOutlined,
  ShopOutlined,
  TagOutlined,
  FileTextOutlined,
  DollarOutlined,
  StarOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons"
import { useGetProductByIdQuery, useUpdateProductMutation, useGetCategoriesQuery } from "../api/productApi"
import type { updateProduct } from "../types/product.types"
import "../styles/Productedit.css"

// Constants for stock status
const STOCK_STATUS_OPTIONS = [
  { value: "In Stock", label: "In Stock" },
  { value: "Low Stock", label: "Low Stock" },
  { value: "Out of Stock", label: "Out of Stock" },
]

const ProductEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { data: product, isLoading: productLoading } = useGetProductByIdQuery(Number(id))
  const { data: categories = [], isLoading: categoriesLoading } = useGetCategoriesQuery()
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation()
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  // Normalize product data on load
  useEffect(() => {
    if (!productLoading && product) {
      const normalizedProduct = {
        ...product,
        reviews: product.reviews?.map((review) => (typeof review === "string" ? { review } : { ...review })) || [],
      }
      form.setFieldsValue(normalizedProduct)
      setPreviewImage(product.thumbnail)
    }
  }, [productLoading, product, form])

  // Submit handler for form data
  const onFinish = async (values: Partial<updateProduct>) => {
    if (!product) {
      notification.error({
        message: "Error",
        description: "Product not found",
        placement: "topRight",
      })
      return
    }

    // Construct updated product object
    const updatedProduct: updateProduct = {
      id: product.id,
      title: values.title ?? product.title,
      description: values.description ?? product.description,
      category: values.category ?? product.category,
      price: values.price ?? product.price,
      rating: values.rating ?? product.rating,
      stock: values.stock ?? product.stock,
      availabilityStatus: values.availabilityStatus ?? product.availabilityStatus,
      reviews: values.reviews ?? product.reviews,
      thumbnail: values.thumbnail ?? product.thumbnail,
    }

    try {
      await updateProduct(updatedProduct).unwrap()
      notification.success({
        message: "Success",
        description: "Product updated successfully!",
        placement: "topRight",
      })
      navigate(`/product/${updatedProduct.id}`)
    } catch (error) {
      console.error("Error updating product:", error)
      notification.error({
        message: "Error",
        description: "Failed to update product. Please try again.",
        placement: "topRight",
      })
    }
  }

  if (productLoading || categoriesLoading || !product) {
    return (
      <div className="product-edit-container">
        <div className="flex items-center justify-center min-h-[60vh]">
          <Spin size="large" tip="Loading product data..." />
        </div>
      </div>
    )
  }

  return (
    <div className="product-edit-container">
      <div className="max-w-4xl mx-auto px-4">
        {/* Page Header */}
        <div className="page-header">
          <div>
            <Breadcrumb className="breadcrumb-nav">
              <Breadcrumb.Item>
                <Link to="/">Home</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to="/products">Products</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to={`/product/${id}`}>{product.title}</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Edit</Breadcrumb.Item>
            </Breadcrumb>
            <h1 className="page-title">Edit Product</h1>
          </div>
        </div>

        {/* Form Container */}
        <div className="form-container">
          <Form form={form} onFinish={onFinish} layout="vertical" requiredMark={false} initialValues={product}>
            {/* Basic Information Section */}
            <div className="form-section">
              <h3 className="section-title">
                <ShopOutlined className="icon" /> Basic Information
              </h3>

              {/* Product Title */}
              <Form.Item
                name="title"
                label="Product Title"
                rules={[{ required: true, message: "Please enter product title" }]}
              >
                <Input placeholder="Enter product title" />
              </Form.Item>

              {/* Product Description */}
              <Form.Item
                name="description"
                label="Description"
                rules={[{ required: true, message: "Please enter product description" }]}
              >
                <Input.TextArea rows={4} placeholder="Enter detailed product description" />
              </Form.Item>

              {/* Product Category */}
              <Form.Item
                name="category"
                label="Category"
                rules={[{ required: true, message: "Please select a category" }]}
              >
                <Select placeholder="Select product category">
                  {categories.map((category) => (
                    <Select.Option key={category.slug} value={category.name}>
                      {category.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            {/* Pricing & Inventory Section */}
            <div className="form-section">
              <h3 className="section-title">
                <TagOutlined className="icon" /> Pricing & Inventory
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Product Price */}
                <Form.Item
                  name="price"
                  label="Price ($)"
                  rules={[{ required: true, message: "Please enter product price" }]}
                >
                  <InputNumber
                    min={0}
                    precision={2}
                    style={{ width: "100%" }}
                    placeholder="0.00"
                    prefix={<DollarOutlined />}
                  />
                </Form.Item>

                {/* Stock Available */}
                <Form.Item
                  name="stock"
                  label="Stock Quantity"
                  rules={[{ required: true, message: "Please enter stock quantity" }]}
                >
                  <InputNumber min={0} style={{ width: "100%" }} placeholder="0" />
                </Form.Item>
              </div>

              {/* Stock Status */}
              <Form.Item
                name="availabilityStatus"
                label="Stock Status"
                rules={[{ required: true, message: "Please select stock status" }]}
              >
                <Select placeholder="Select stock status">
                  {STOCK_STATUS_OPTIONS.map(({ value, label }) => (
                    <Select.Option key={value} value={value}>
                      {label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              {/* Product Rating */}
              <Form.Item name="rating" label="Rating (1-5)">
                <InputNumber min={0} max={5} step={0.1} style={{ width: "100%" }} />
              </Form.Item>
            </div>

            {/* Product Image Section */}
            <div className="form-section">
              <h3 className="section-title">
                <FileTextOutlined className="icon" /> Product Image
              </h3>

              {/* Thumbnail Image */}
              <Form.Item
                name="thumbnail"
                label="Product Thumbnail"
                rules={[{ required: true, message: "Please provide a thumbnail image URL" }]}
              >
                <div className="thumbnail-upload">
                  {previewImage && (
                    <div className="thumbnail-preview">
                      <img
                        src={previewImage || "/placeholder.svg"}
                        alt="Product thumbnail"
                        style={{ maxWidth: "100%", maxHeight: "200px" }}
                      />
                      <div className="thumbnail-overlay">
                        <Button icon={<UploadOutlined />}>Change Image</Button>
                      </div>
                    </div>
                  )}
                  <Input
                    placeholder="Enter image URL"
                    onChange={(e) => setPreviewImage(e.target.value)}
                    addonAfter={<UploadOutlined />}
                  />
                </div>
              </Form.Item>
            </div>

            {/* Reviews Section */}
            <div className="form-section">
              <h3 className="section-title">
                <StarOutlined className="icon" /> Product Reviews
              </h3>

              <Form.List name="reviews">
                {(fields, { add, remove }) => (
                  <>
                    <div className="reviews-list">
                      {fields.map(({ key, name, ...restField }) => (
                        <div key={key} className="review-item">
                          <div className="review-item-header">
                            <Form.Item
                              {...restField}
                              name={[name, "reviewerName"]}
                              rules={[{ required: true, message: "Reviewer name required" }]}
                              style={{ marginBottom: "8px" }}
                            >
                              <Input placeholder="Reviewer Name" />
                            </Form.Item>

                            <button
                              type="button"
                              className="remove-review"
                              onClick={() => remove(name)}
                              aria-label="Remove review"
                            >
                              <DeleteOutlined />
                            </button>
                          </div>

                          <div style={{ display: "flex", gap: "12px", marginBottom: "8px" }}>
                            <Form.Item
                              {...restField}
                              name={[name, "rating"]}
                              rules={[{ required: true, message: "Rating required" }]}
                              style={{ marginBottom: "0", flex: "0 0 100px" }}
                            >
                              <InputNumber min={1} max={5} placeholder="Rating" style={{ width: "100%" }} />
                            </Form.Item>

                            <Form.Item
                              {...restField}
                              name={[name, "date"]}
                              rules={[{ required: true, message: "Date required" }]}
                              style={{ marginBottom: "0", flex: "1" }}
                            >
                              <Input placeholder="Review Date (YYYY-MM-DD)" />
                            </Form.Item>
                          </div>

                          <Form.Item
                            {...restField}
                            name={[name, "comment"]}
                            rules={[{ required: true, message: "Comment required" }]}
                            style={{ marginBottom: "0" }}
                          >
                            <Input.TextArea placeholder="Review Comment" rows={2} />
                          </Form.Item>
                        </div>
                      ))}
                    </div>

                    {/* Add Review Button */}
                    <Form.Item style={{ marginTop: "16px" }}>
                      <button
                        type="button"
                        className="add-review-button"
                        onClick={() =>
                          add({
                            rating: 5,
                            comment: "",
                            date: new Date().toISOString().split("T")[0],
                            reviewerName: "",
                            reviewerEmail: "",
                          })
                        }
                      >
                        <PlusOutlined /> Add Review
                      </button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </div>

            {/* Form Actions */}
            <div className="form-actions">
              <button type="button" className="cancel-button" onClick={() => navigate(`/product/${id}`)}>
                <CloseOutlined /> Cancel
              </button>
              <button type="submit" className="submit-button" disabled={isUpdating}>
                <SaveOutlined /> {isUpdating ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default ProductEdit
