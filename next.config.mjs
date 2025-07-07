/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'img-c.udemycdn.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 's3.amazonaws.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'via.placeholder.com',
                port: '',
                pathname: '/**',
            }
        ],
        unoptimized: true, // Desabilita a otimização para evitar problemas com imagens externas
    }
};

export default nextConfig;
