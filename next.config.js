/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  redirects: async () => {
    return [
               {
                   source: '/',
                   destination: '/location',
                   permanent: true,
                },
           ]
   },
}

module.exports = nextConfig
