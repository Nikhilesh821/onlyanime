/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
    images:{
        remotePatterns:[{
            hostname:"res.cloudinary.com"
        }]
    }
};


export default nextConfig;
