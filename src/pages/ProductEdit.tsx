import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Select,
  InputNumber,
  notification,
  Spin,
  Upload,
  Image,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useGetCategoriesQuery,
} from "../api/productApi";
import { updateProduct } from "../types/product.types";

// Constants for stock status
const STOCK_STATUS_OPTIONS = [
  { value: "In Stock", label: "In Stock" },
  { value: "Low Stock", label: "Low Stock" },
  { value: "Out of Stock", label: "Out of Stock" },
];

const ProductEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading: productLoading } = useGetProductByIdQuery(
    Number(id)
  );
  const { data: categories = [], isLoading: categoriesLoading } =
    useGetCategoriesQuery();
  const [updateProduct] = useUpdateProductMutation();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  // Normalize product data on load
  useEffect(() => {
    if (!productLoading && product) {
      const normalizedProduct = {
        ...product,
        reviews:
          product.reviews?.map((review) =>
            typeof review === "string" ? { review } : { ...review }
          ) || [],
      };
      form.setFieldsValue(normalizedProduct);
    }
  }, [productLoading, product, form]);

  // Submit handler for form data
  const onFinish = async (values: Partial<updateProduct>) => {
    if (!product) {
      notification.error({ message: "Product not found" });
      return;
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

      availabilityStatus:
        values.availabilityStatus ?? product.availabilityStatus,
      reviews: values.reviews ?? product.reviews,

      thumbnail: values.thumbnail ?? product.thumbnail,
    };

    try {
      console.log("Submitting updated product:", updatedProduct);
      await updateProduct(updatedProduct).unwrap();
      notification.success({ message: "Product updated successfully!" });
      navigate(`/product/${updatedProduct.id}`);
    } catch (error) {
      console.error("Error updating product:", error);
      notification.error({ message: "Failed to update product" });
    }
  };

  if (productLoading || categoriesLoading || !product) return <Spin />;

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: 24 }}>
      <h2>Edit Product</h2>
      <Form form={form} onFinish={onFinish} layout="vertical">
        {/* Product Title */}
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input aria-label="Product Title" />
        </Form.Item>

        {/* Product Price */}
        <Form.Item name="price" label="Price">
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>

        {/* Product Category */}
        <Form.Item name="category" label="Category">
          <Select aria-label="Product Category">
            {categories.map((category) => (
              <Select.Option key={category.slug} value={category.name}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {/* Product Description */}
        <Form.Item name="description" label="Description">
          <Input.TextArea rows={4} />
        </Form.Item>

        {/* Stock Status */}
        <Form.Item name="availabilityStatus" label="Stock Status">
          <Select placeholder="Select stock status">
            {STOCK_STATUS_OPTIONS.map(({ value, label }) => (
              <Select.Option key={value} value={value}>
                {label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {/* Stock Available */}
        <Form.Item name="stock" label="Stock Available">
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>

        {/* Thumbnail Image */}
        <Form.Item name="thumbnail" label="Thumbnail">
          <Upload
            action="/upload"
            listType="picture-card"
            showUploadList={false}
            beforeUpload={() => false}
            onChange={(info) => {
              if (info.file.status === "done") {
                form.setFieldsValue({ thumbnail: info.file.url });
              }
            }}
          >
            {form.getFieldValue("thumbnail") ? (
              <Image
                src={form.getFieldValue("thumbnail")}
                alt="Thumbnail"
                style={{ width: "100%", height: "auto" }}
              />
            ) : (
              <Button icon={<UploadOutlined />}>Upload Thumbnail</Button>
            )}
          </Upload>
        </Form.Item>

        {/* Reviews Section */}
        <Form.List name="reviews">
          {(fields, { add, remove }) => (
            <>
              <label>Reviews</label>
              {fields.map(({ key, name, ...restField }) => (
                <div
                  key={key}
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 8,
                    marginBottom: 12,
                  }}
                >
                  {/* Rating */}
                  <Form.Item
                    {...restField}
                    name={[name, "rating"]}
                    rules={[
                      {
                        type: "number",
                        required: true,
                        message: "Rating required",
                      },
                    ]}
                  >
                    <InputNumber
                      type="number"
                      min={1}
                      max={5}
                      placeholder="Rating"
                    />
                  </Form.Item>

                  {/* Comment */}
                  <Form.Item
                    {...restField}
                    name={[name, "comment"]}
                    rules={[{ required: true, message: "Comment required" }]}
                  >
                    <Input placeholder="Comment" />
                  </Form.Item>

                  {/* Reviewer Name */}
                  <Form.Item
                    {...restField}
                    name={[name, "reviewerName"]}
                    rules={[
                      { required: true, message: "Reviewer name required" },
                    ]}
                  >
                    <Input placeholder="Reviewer Name" />
                  </Form.Item>

                  {/* Remove Button */}
                  <Button onClick={() => remove(name)} danger type="text">
                    Remove
                  </Button>
                </div>
              ))}
              {/* Add Review Button */}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block>
                  + Add Review
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        {/* Submit Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductEdit;
