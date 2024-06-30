/** @type {import('next').NextConfig} */
// const API_URL = process.env.NEXT_PUBLIC_BASE_URL;
const nextConfig = {
  images: {
    // domains: [API_URL],
    domains: ["ecommerce-backend-api-production-84b3.up.railway.app"],
  },
  swcMinify: true,
  productionBrowserSourceMaps: false,
  optimizeFonts: false,
  // async rewrites() {
  //   return [
  //     {
  //       source: "/:path*",
  //       destination: `${API_URL}/:path*`,
  //     },
  //   ];
  // },
};

export default nextConfig;
