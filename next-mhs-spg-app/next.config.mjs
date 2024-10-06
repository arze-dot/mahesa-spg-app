/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async headers() {
        return [
            {
                source: "/:path*",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "no-store",
                    },
                    {
                        key: "Content-Security-Policy",
                        value: "frame-ancestors none",
                    },
                    {
                        key: "Strict-Transport-Security",
                        value: "max-age=31536000; includeSubDomains",
                    },
                    {
                        key: "X-Content-Type-Options",
                        value: "nosniff",
                    },
                    {
                        key: "X-Frame-Options",
                        value: "DENY",
                    },
                    {
                        key: "Referrer-Policy",
                        value: "no-referrer",
                    },
                ],
            },
        ];
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "api-spg.mahesamegahmandiri.com",
                port: "",
                pathname: "/storage/**",
                search: "",
            },
            {
                protocol: "https",
                hostname: "*",
                port: "",
                pathname: "*",
                search: "",
            },
        ],
    },
    publicRuntimeConfig: {
        apiUrl: process.env.BASE_URL,
    },
    env: {
        apiUrl: process.env.BASE_URL,
    },
};

export default nextConfig;
