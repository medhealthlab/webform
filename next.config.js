/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
               {
                   source: '/',
                   destination: '/checkRegistration',
                   permanent: true,
                },
           ]
   },
}

module.exports = nextConfig
