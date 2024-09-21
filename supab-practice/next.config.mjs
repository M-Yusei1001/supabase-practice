/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode:true,
    webpack:(config,{dev})=>{
        if(dev){
            config.watchOptions = {
                poll:1000,
                aggregateTimeout:200,
            };
        }
        return config;
    },
    images:{
        remotePatterns:[
            {
                protocol:'https',
                hostname: 'www.pokemon.com',
                port:'',
                pathname:'/static-assets/content-assets/**',
            },
        ],
    },
};

export default nextConfig;