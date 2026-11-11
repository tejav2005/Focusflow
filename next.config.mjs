/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        if (!isServer) {
            // Polyfill Node built-ins that @solana/web3.js needs in the browser
            config.resolve.fallback = {
                ...config.resolve.fallback,
                crypto: false,
                stream: false,
                http: false,
                https: false,
                zlib: false,
                url: false,
            };
        }
        return config;
    },
};

export default nextConfig;
