import React, { useState } from "react";
import { Skeleton } from "antd";

interface ThumbnailLoaderProps {
  src: string;
}

const ThumbnailLoader: React.FC<ThumbnailLoaderProps> = ({ src }) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div style={{ width: 50, height: 50, position: "relative" }}>
      {!imgLoaded && (
        <Skeleton.Image
          style={{ width: 50, height: 50, borderRadius: 8 }}
          active
        />
      )}
      <img
        src={src}
        alt="Thumbnail"
        style={{
          width: 50,
          height: 50,
          objectFit: "cover",
          borderRadius: 8,
          position: "absolute",
          top: 0,
          left: 0,
          opacity: imgLoaded ? 1 : 0,
          transition: "opacity 0.3s ease",
          transform: imgLoaded ? "scale(1)" : "scale(0.8)", // 👈 ছোট হয়ে আসবে
        }}
        onLoad={() => setImgLoaded(true)}
      />
    </div>
  );
};

export default ThumbnailLoader;
