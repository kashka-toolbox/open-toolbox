import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return { // TODO: adjust this later!
        name: 'Coolbox',
        short_name: 'Cool box',
        description: 'A high quality set of tools for everyone!',
        start_url: '/de/',

        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
            {
                "src": "/web-app-manifest-192x192.png",
                "sizes": "192x192",
                "type": "image/png",
                "purpose": "any"
            },
            {
                "src": "/web-app-manifest-512x512.png",
                "sizes": "512x512",
                "type": "image/png",
                "purpose": "maskable"
            }
        ],

        screenshots: [
            {
                src: '/screenshot-fullsize.png',
                type: 'image/png',
                sizes: '1527x993',  
            }
        ],
    }
}