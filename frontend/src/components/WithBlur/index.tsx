import React from "react";

interface BlurRegion {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface WithBlurProps {
  blurRegions: BlurRegion[];
  originalWidth: number;
  originalHeight: number;
  children: React.ReactNode;
}

// should place divs with blur regions on top of the video, use % for positioning, dont use canvas
const WithBlur: React.FC<WithBlurProps> = ({
  blurRegions,
  originalWidth,
  originalHeight,
  children,
}) => {
  return (
    <div
      style={{
        position: "relative",
        width: "fit-content",
        height: "fit-content",
        overflow: "hidden",
      }}
    >
      {children}
      {blurRegions.map((region) => (
        <div
          key={`${region.x}-${region.y}-${region.width}-${region.height}`}
          style={{
            position: "absolute",
            top: `${(region.y / originalHeight) * 100}%`,
            left: `${(region.x / originalWidth) * 100}%`,
            width: `${(region.width / originalWidth) * 100}%`,
            height: `${(region.height / originalHeight) * 100}%`,
            zIndex: 100,
            pointerEvents: "none",
            // background: "red",
            filter: "blur(20px)",
            backdropFilter: "blur(20px)",
          }}
        />
      ))}
    </div>
  );
};

export default WithBlur;
