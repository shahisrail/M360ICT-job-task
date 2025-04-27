import React, { useState } from "react";
import { Table, Button, Pagination } from "antd"; 
import { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../api/productApi";
import { Product } from "../types/product.types";
import "../styles/ProductTable.css";
import ThumbnailLoader from "./ThumbnailLoader";
import ProductTableSkeleton from "./ProductTableSkeleton";

const ProductTable: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const pageSize = 10;

  const { data, error, isLoading } = useGetProductsQuery({
    limit: pageSize,
    skip: (page - 1) * pageSize,
  });

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  if (isLoading) return <ProductTableSkeleton />;
  if (error) return <div>Error fetching products.</div>;
  const columns: ColumnsType<Product> = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Title", dataIndex: "title", key: "title" },
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (thumbnail: string) => {
        return <ThumbnailLoader src={thumbnail} />;
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `$${price}`,
    },
    { title: "Category", dataIndex: "category", key: "category" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Link to={`/product/${record.id}`}>
          <Button type="primary">View Details</Button>
        </Link>
      ),
    },
  ];

  return (
    <div className="product-table-container">
      <Table
        dataSource={data?.products || []}
        columns={columns}
        rowKey="id"
        pagination={false}
      />
      <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
        <Pagination
          current={page}
          pageSize={pageSize}
          total={data?.total || 0}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ProductTable;
