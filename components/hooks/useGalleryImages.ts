import { useQuery } from "@tanstack/react-query";
import { GalleryResponse } from "../types";
import api from "@/lib/axios";
import { endpoints } from "@/config/endpoints";

// Fetch function to get gallery images from the API using Axios
const fetchGalleryImages = async ({
  page,
  ordering,
  search,
}: {
  page: number;
  ordering: string;
  search: string;
}): Promise<GalleryResponse> => {
  const params = new URLSearchParams();

  // Add query parameters to the URL
  if (ordering) params.append("ordering", ordering);
  if (page) params.append("page", page.toString());
  if (search) params.append("search", search);

  // Make an Axios request
  const { data } = await api.get(
    `${endpoints.Gallery.fetch_images}?${params.toString()}`
  );

  return data;
};

// Hook to fetch gallery images with pagination and search parameters
export const useGalleryImages = ({
  page = 1,
  ordering = "",
  search = "",
}: {
  page?: number;
  ordering?: string;
  search?: string;
}) => {
  return useQuery<GalleryResponse, Error>({
    queryKey: ["gallery-images", { page, ordering, search }],
    queryFn: () => fetchGalleryImages({ page, ordering, search }),
    placeholderData: (previousData) => previousData, // v5 replacement for keepPreviousData
    refetchOnWindowFocus: false,
  });
};
