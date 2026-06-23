import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // All Pokémon artwork is served from pokemondb.net
        protocol: "https",
        hostname: "img.pokemondb.net",
      },
    ],
  },
};

export default nextConfig;
