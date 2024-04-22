/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.CI === "true" ? "export" : undefined,
};

export default nextConfig;
