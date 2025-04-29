import React, { useState } from "react";
import { Table, Pagination, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import { Link, useNavigate } from "react-router-dom";
import {
  EyeOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useGetProductsQuery } from "../api/productApi";
import { Product } from "../types/product.types";
import ThumbnailLoader from "./ThumbnailLoader";
import ProductTableSkeleton from "./ProductTableSkeleton";

const ProductTable: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const pageSize = 10;
  const navigate = useNavigate();

  const { data, error, isLoading } = useGetProductsQuery({
    limit: pageSize,
    skip: (page - 1) * pageSize,
  });

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  if (isLoading) return <ProductTableSkeleton />;
  if (error) return <div className="text-red-500 text-center mt-4">Error fetching products.</div>;

  const columns: ColumnsType<Product> = [
    { title: "ID", dataIndex: "id", key: "id", responsive: ["lg"] },
    { title: "Title", dataIndex: "title", key: "title" },
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (thumbnail: string) => <ThumbnailLoader src={thumbnail} />,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `$${price}`,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      responsive: ["md"],
    },
    {
      title: "Product Details ",
      key: "actions",
      render: (_, record) => (
        <Tooltip title="View Details">
          <Link to={`/product/${record.id}`}>
            <EyeOutlined className="text-[#1890ff] hover:text-white text-xl" />
          </Link>
        </Tooltip>
      ),
    },
    {
      title: "Edit",
      key: "edit",
      render: (_, record) => (
        <Tooltip title="Edit Product">
          <EditOutlined
            onClick={() => navigate(`/product/edit/${record.id}`)}
            className="cursor-pointer text-[#52c41a] hover:text-white text-xl"
          />
        </Tooltip>
      ),
    },
  ];

  return (
    <div className="product-table-container p-4 md:bg-[#0e1a35] min-h-screen text-white">
      <h2 className="text-2xl font-semibold mb-4 text-white">Product List</h2>
      <div className="overflow-x-auto">
        <Table
          dataSource={data?.products || []}
          columns={columns}
          rowKey="id"
          pagination={false}
          className="  rounded shadow-lg"
        />
      </div>
      <div className="flex justify-center mt-6">
        <Pagination
          current={page}
          pageSize={pageSize}
          total={data?.total || 0}
          onChange={handlePageChange}
          className="text-white"
        />
      </div>
    </div>
  );
};

export default ProductTable;
