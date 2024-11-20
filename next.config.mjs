import createNextIntlPlugin from 'next-intl/plugin';
import withPWAInit from "@ducanh2912/next-pwa";
const withNextIntl = createNextIntlPlugin();

const withPWA = withPWAInit({
    cacheOnFrontEndNav: true,           
    aggressiveFrontEndNavCaching: true,
    reloadOnOnline: true,
    swcMinify: true,
    dest: "public",
    fallbacks: {
        document: "/en/offline", 
    },
    workboxOptions: {   
        disableDevLogs: true,
    },
});



/** @type {import('next').NextConfig} */
const nextConfig = {
    // needed for containerization
    output: "standalone"
};



export default withPWA(withNextIntl(nextConfig));
