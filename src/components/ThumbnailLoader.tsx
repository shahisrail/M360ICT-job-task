"use client"

import type React from "react"
import { useState } from "react"
import { Skeleton } from "antd"

interface ThumbnailLoaderProps {
  src: string
  size?: number
}

const ThumbnailLoader: React.FC<ThumbnailLoaderProps> = ({ src, size = 60 }) => {
  const [imgLoaded, setImgLoaded] = useState(false)
  const [imgError, setImgError] = useState(false)

  return (
    <div style={{ width: size, height: size, position: "relative" }}>
      {!imgLoaded && !imgError && (
        <Skeleton.Image
          style={{
            width: size,
            height: size,
            borderRadius: 8,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          }}
          active
        />
      )}

      {!imgError ? (
        <img
          src={src || "/placeholder.svg"}
          alt="Product thumbnail"
          style={{
            width: size,
            height: size,
            objectFit: "cover",
            borderRadius: 8,
            position: "absolute",
            top: 0,
            left: 0,
            opacity: imgLoaded ? 1 : 0,
            transition: "opacity 0.3s ease, transform 0.3s ease",
            transform: imgLoaded ? "scale(1)" : "scale(0.8)",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
          }}
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgError(true)}
        />
      ) : (
        <div
          style={{
            width: size,
            height: size,
            borderRadius: 8,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#cbd5e0",
            fontSize: size < 40 ? "10px" : "12px",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          No Image
        </div>
      )}
    </div>
  )
}

export default ThumbnailLoader
