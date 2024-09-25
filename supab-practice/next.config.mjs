/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode:true,
    webpack:(config,{dev})=>{
        if(dev){
            config.watchOptions = {
                poll:5000,
                aggregateTimeout:300,
                ignored:["**/node_modules/**","**/.git/**","**/next/**"]
            };
        }
        return config;
    },
};

export default nextConfig;