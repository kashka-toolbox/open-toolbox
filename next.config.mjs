/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.CI ? "export" : undefined,
  basePath: process.env.CI ? "/mortens-toolbox" : undefined,
};

export default nextConfig;
