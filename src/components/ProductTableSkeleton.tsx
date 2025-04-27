import React from "react";
import { Skeleton } from "antd";
import "../styles/ProductTableSkeleton.css";

const ProductTableSkeleton: React.FC = () => {
  const rows = Array.from({ length: 10 });

  return (
    <div className="product-table-skeleton">
      {/* Table Header */}
      <div className="product-table-skeleton-header">
        <div>ID</div>
        <div>Title</div>
        <div>Thumbnail</div>
        <div>Price</div>
        <div>Category</div>
        <div>Actions</div>
      </div>

      {/* Table Rows */}
      {rows.map((_, index) => (
        <div key={index} className="product-table-skeleton-row">
          <Skeleton.Input active style={{ width: 30, height: 16 }} />
          <Skeleton.Input active style={{ width: 120, height: 16 }} />
          <Skeleton.Avatar active shape="square" size={40} />
          <Skeleton.Input active style={{ width: 50, height: 16 }} />
          <Skeleton.Input active style={{ width: 100, height: 16 }} />
          <Skeleton.Button active style={{ width: 70, height: 32 }} />
        </div>
      ))}
    </div>
  );
};

export default ProductTableSkeleton;
