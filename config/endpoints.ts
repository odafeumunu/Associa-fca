const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const endpoints = {
  State: {
    get_all_states: `${baseUrl}/states/`,
  },
  LGA: {
    get_lgas: `${baseUrl}/lgas/`,
  },
  Register: {
    register_player: `${baseUrl}/registrations/`,
  },
  Gallery: {
    fetch_images: `${baseUrl}/gallery/images/`,
  },
};