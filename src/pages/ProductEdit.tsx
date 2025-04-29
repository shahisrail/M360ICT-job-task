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
} from "antd";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useGetCategoriesQuery,
} from "../api/productApi";
import { Product } from "../types/product.types";

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

  const onFinish = async (values: Partial<Product>) => {
    if (!product) {
      notification.error({ message: "Product not found" });
      return;
    }
  
    // Destructure all required fields from either `values` or fallback to `product`
    const updatedProduct: Product = {
      id: product.id,
      title: values.title ?? product.title,
      description: values.description ?? product.description,
      category: values.category ?? product.category,
      price: values.price ?? product.price,
      discountPercentage: values.discountPercentage ?? product.discountPercentage,
      rating: values.rating ?? product.rating,
      stock: values.stock ?? product.stock,
      tags: values.tags ?? product.tags,
      brand: values.brand ?? product.brand,
      sku: values.sku ?? product.sku,
      weight: values.weight ?? product.weight,
      dimensions: values.dimensions ?? product.dimensions,
      warrantyInformation:
        values.warrantyInformation ?? product.warrantyInformation,
      shippingInformation:
        values.shippingInformation ?? product.shippingInformation,
      availabilityStatus:
        values.availabilityStatus ?? product.availabilityStatus,
      reviews: values.reviews ?? product.reviews,
      returnPolicy: values.returnPolicy ?? product.returnPolicy,
      minimumOrderQuantity:
        values.minimumOrderQuantity ?? product.minimumOrderQuantity,
      meta: values.meta ?? product.meta,
      images: values.images ?? product.images,
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
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="price" label="Price">
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="category" label="Category">
          <Select>
            {categories.map((category) => (
              <Select.Option key={category.slug} value={category.name}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="description" label="Description">
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item name="availabilityStatus" label="Stock Status">
          <Select placeholder="Select stock status">
            <Select.Option value="In Stock">In Stock</Select.Option>
            <Select.Option value="Low Stock">Low Stock</Select.Option>
            <Select.Option value="Out of Stock">Out of Stock</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="stock" label="Stock Available">
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>

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
                  <Form.Item
                    {...restField}
                    name={[name, "rating"]}
                    rules={[{ type:"number", required: true, message: "Rating required" }]}
                  >
                    <InputNumber type="number" min={1} max={5} placeholder="Rating" />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, "comment"]}
                    rules={[{ required: true, message: "Comment required" }]}
                  >
                    <Input placeholder="Comment" />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, "reviewerName"]}
                    rules={[
                      { required: true, message: "Reviewer name required" },
                    ]}
                  >
                    <Input placeholder="Reviewer Name" />
                  </Form.Item>

                  <Button onClick={() => remove(name)} danger type="text">
                    Remove
                  </Button>
                </div>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block>
                  + Add Review
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

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
