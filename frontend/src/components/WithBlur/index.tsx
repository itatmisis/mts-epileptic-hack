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
  isFullscreen?: boolean;
}

const WithBlur: React.FC<WithBlurProps> = ({
  isFullscreen = false,
  blurRegions,
  originalWidth,
  originalHeight,
  children,
}) => {
  return (
    <div
      style={{
        width: isFullscreen ? "fit-content" : "100%",
        height: "fit-content",

        // width: "100%",
        // height: "100%",
        position: "relative",
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
