/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
               {
                   source: '/',
                   destination: '/patient/Registration',
                   permanent: true,
                },
           ]
   },
}

module.exports = nextConfig
