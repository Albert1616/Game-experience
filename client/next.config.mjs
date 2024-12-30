/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol:'https',
                hostname:'media.rawg.io',
                port:'',
                pathname:'/media/**',

            }
        ]
    }
};
//https://media.rawg.io/media/games/b40/b40eba32d8715d5fdf9634939fe0eca3.jpg
export default nextConfig;
