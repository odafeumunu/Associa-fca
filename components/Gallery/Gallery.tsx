"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useGalleryImages } from "../hooks/useGalleryImages";
import { Image as ImageType } from "../types";

const Gallery: React.FC = () => {
  const [page, setPage] = useState<number>(1);

  const { data, isLoading, isError, error, isFetching } = useGalleryImages({
    page,
    ordering: "-uploaded_at", // Default to newest first
    search: "",
  });

  // Accumulate all loaded images
  const [allImages, setAllImages] = React.useState<ImageType[]>([]);

  // Update accumulated images when new data arrives
  React.useEffect(() => {
    if (data?.results) {
      setAllImages((prev) => {
        // If it's page 1, replace all images
        if (page === 1) return data.results;
        // Otherwise, append new images (avoid duplicates)
        const newImages = data.results.filter(
          (img) => !prev.some((prevImg) => prevImg.id === img.id)
        );
        return [...prev, ...newImages];
      });
    }
  }, [data, page]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  if (isLoading && page === 1) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading images...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-10 text-red-500">
        <p className="text-lg font-semibold">Error loading images</p>
        <p className="text-sm mt-2">{(error as Error).message}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allImages.map((image: ImageType) => (
          <div
            key={image.id}
            className="gallery-item bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="relative w-full h-48">
              <Image
                src={image.image_file}
                alt={image.title || "Gallery image"}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
                {image.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                {image.description}
              </p>
              <p className="text-xs text-gray-400">
                {new Date(image.uploaded_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {allImages.length === 0 && !isLoading && (
        <div className="text-center py-20 text-gray-500">
          <p className="text-lg">No images found.</p>
        </div>
      )}

      {/* Load More Button */}
      {data?.next && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            disabled={isFetching}
            className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-medium shadow-md hover:shadow-lg">
            {isFetching ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading...
              </span>
            ) : (
              "Load More"
            )}
          </button>
        </div>
      )}

      {/* End Message */}
      {/* {!data?.next && allImages.length > 0 && (
        <div className="text-center mt-8 text-gray-500">
          <p>You&apos;ve reached the end! 🎉</p>
        </div>
      )} */}
    </div>
  );
};

export default Gallery;
