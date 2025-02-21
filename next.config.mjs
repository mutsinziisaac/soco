/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["soqo.s3.amazonaws.com", "soqo.s3.eu-north-1.amazonaws.com"],
  },

  eslint: false,
};

export default nextConfig;
