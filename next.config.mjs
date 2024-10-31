/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images-app-bucket.s3.us-east-1.amazonaws.com",
      "images-app-bucket.s3.amazonaws.com",
    ], // NextJS'e izin verilen alan adları
  },
};

export default nextConfig;
