"use client";
import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = () => (
  <ContentLoader
    speed={2}
    width={1280}
    height={55}
    viewBox="0 0 1280 55"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="15" y="15" rx="4" ry="4" width="40" height="40" />
    <rect x="80" y="15" rx="4" ry="4" width="150" height="40" />
    <rect x="270" y="15" rx="8" ry="8" width="480" height="40" />

    <rect x="790" y="15" rx="8" ry="8" width="80" height="40" />

    <rect x="900" y="15" rx="8" ry="8" width="120" height="40" />

    <rect x="1050" y="15" rx="8" ry="8" width="100" height="40" />

    <rect x="1170" y="15" rx="8" ry="8" width="70" height="40" />
  </ContentLoader>
);

export default Skeleton;
