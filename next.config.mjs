/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

    images: {

      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'assets.coingecko.com',
          pathname: '**',
        },
      ]
    },
  
};

export default nextConfig;
