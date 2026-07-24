/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  allowedDevOrigins: ["192.168.10.102"],
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" }
    ]
  }
};

export default nextConfig;
