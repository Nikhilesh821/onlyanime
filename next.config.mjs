/** @type {import('next').NextConfig} */
const nextConfig = {
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
