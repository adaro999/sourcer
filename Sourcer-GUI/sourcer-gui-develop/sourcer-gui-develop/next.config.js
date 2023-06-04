/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['localhost', 'jobtarget.com'],
  },
  output: 'standalone',
  reactStrictMode: true,
};

module.exports = nextConfig;
