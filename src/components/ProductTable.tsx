import type React from "react";
import { useState } from "react";
import { Table, Pagination, Tooltip, Badge, Tag, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { EyeOutlined, EditOutlined } from "@ant-design/icons";
import { useGetProductsQuery } from "../api/productApi";
import ThumbnailLoader from "./ThumbnailLoader";
import type { Product } from "../types/product.types";

import ProductTableSkeleton from "./ProductTableSkeleton";
import "../styles/ProductTable.css";

const ProductTable: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const pageSize = 10;


  const { data, error, isLoading } = useGetProductsQuery({
    limit: pageSize,
    skip: (page - 1) * pageSize,
  });

  const handlePageChange = (page: number) => {
    setPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) return <ProductTableSkeleton />;
  if (error)
    return (
      <div className="error-container">
        <div className="error-message">
          <h3>Error fetching products</h3>
          <p>
            Please try again later or contact support if the problem persists.
          </p>
        </div>
      </div>
    );

  const columns: ColumnsType<Product> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      responsive: ["lg"],
      width: 70,
      render: (id: number) => <span className="product-id">{id}</span>,
    },
    {
      title: "Product",
      key: "product",
      render: (_, record) => (
        <div className="product-info">
          <div className="product-thumbnail">
            <ThumbnailLoader src={record.thumbnail} />
          </div>
          <div className="product-details">
            <h3 className="product-title">{record.title}</h3>
            <p className="product-description">
              {record.description.substring(0, 60)}...
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 120,
      render: (price: number, record) => (
        <div className="product-price">
          <span className="current-price">${price}</span>
          {record.discountPercentage > 0 && (
            <div className="discount-badge">
              <Badge
                count={`${Math.round(record.discountPercentage)}% OFF`}
                style={{ backgroundColor: "#ff4d4f" }}
              />
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      responsive: ["md"],
      width: 150,
      render: (category: string) => (
        <Tag color="blue" className="category-tag">
          {category}
        </Tag>
      ),
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      responsive: ["md"],
      width: 120,
      render: (stock: number) => {
        let color = "green";
        let status = "In Stock";

        if (stock <= 0) {
          color = "red";
          status = "Out of Stock";
        } else if (stock <= 10) {
          color = "orange";
          status = "Low Stock";
        }

        return (
          <Tag color={color} className="stock-tag">
            {status} {stock > 0 && `(${stock})`}
          </Tag>
        );
      },
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      responsive: ["lg"],
      width: 120,
      render: (rating: number) => (
        <div className="rating-stars">
          {Array.from({ length: 5 }).map((_, index) => (
            <span
              key={index}
              className={`star ${index < Math.floor(rating) ? "filled" : ""} ${
                index === Math.floor(rating) && rating % 1 > 0
                  ? "half-filled"
                  : ""
              }`}
            >
              ★
            </span>
          ))}
          <span className="rating-value">{rating}</span>
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 120,
      render: (_, record) => (
        <Space size="middle" className="action-buttons">
          <Tooltip title="View Details">
            <Link to={`/product/${record.id}`} className="view-button">
              <EyeOutlined />
            </Link>
          </Tooltip>
          <Tooltip title="Edit Product">
            
                 <Link to={`/product/edit/${record.id}`} className="view-button">
              <EditOutlined />
            </Link>
            
            
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="product-table-container">
      <div className="product-header">
        <h2>Product Catalog</h2>
      </div>

      <div className="table-wrapper">
        <Table
          dataSource={data?.products || []}
          columns={columns}
          rowKey="id"
          pagination={false}
          className="products-table"
          rowClassName="product-row"
          
        />
      </div>

      <div className="pagination-container">
        <Pagination
          current={page}
          pageSize={pageSize}
          total={data?.total || 0}
          onChange={handlePageChange}
          showSizeChanger={false}
          className="custom-pagination"
        />
        <div className="pagination-info">
          Showing {(page - 1) * pageSize + 1} to{" "}
          {Math.min(page * pageSize, data?.total || 0)} of {data?.total || 0}{" "}
          products
        </div>
      </div>
    </div>
  );
};

export default ProductTable;
