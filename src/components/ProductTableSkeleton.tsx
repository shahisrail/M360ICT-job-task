import type React from "react"
import { Skeleton } from "antd"

const ProductTableSkeleton: React.FC = () => {
  const rows = Array.from({ length: 10 })

  return (
    <div className="product-table-container">
      <div className="product-header">
        <Skeleton.Input active style={{ width: 200, height: 40 }} />
        <Skeleton.Input active style={{ width: 250, height: 40 }} />
      </div>

      <div className="table-wrapper">
        <div style={{ padding: "1rem" }}>
          {/* Table Header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "70px 2fr 120px 150px 120px 120px 120px",
              gap: "16px",
              padding: "16px",
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              borderRadius: "8px 8px 0 0",
            }}
          >
            <div>ID</div>
            <div>Product</div>
            <div>Price</div>
            <div>Category</div>
            <div>Stock</div>
            <div>Rating</div>
            <div>Actions</div>
          </div>

          {/* Table Rows */}
          {rows.map((_, index) => (
            <div
              key={index}
              style={{
                display: "grid",
                gridTemplateColumns: "70px 2fr 120px 150px 120px 120px 120px",
                gap: "16px",
                padding: "16px",
                borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
              }}
            >
              <Skeleton.Input active style={{ width: 40, height: 24 }} />
              <div style={{ display: "flex", gap: "1rem" }}>
                <Skeleton.Image active style={{ width: 60, height: 60, borderRadius: 8 }} />
                <div>
                  <Skeleton.Input active style={{ width: 150, height: 20, marginBottom: 8 }} />
                  <Skeleton.Input active style={{ width: 200, height: 16 }} />
                </div>
              </div>
              <Skeleton.Input active style={{ width: 80, height: 24 }} />
              <Skeleton.Input active style={{ width: 100, height: 24 }} />
              <Skeleton.Input active style={{ width: 80, height: 24 }} />
              <Skeleton.Input active style={{ width: 100, height: 24 }} />
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                <Skeleton.Button active shape="circle" style={{ width: 32, height: 32 }} />
                <Skeleton.Button active shape="circle" style={{ width: 32, height: 32 }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pagination-container">
        <Skeleton.Input active style={{ width: 300, height: 40 }} />
        <Skeleton.Input active style={{ width: 200, height: 20 }} />
      </div>
    </div>
  )
}

export default ProductTableSkeleton
