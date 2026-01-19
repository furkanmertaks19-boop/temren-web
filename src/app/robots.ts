import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin', '/api', '/private'], // Gereksiz taranmayı engeller
            },
        ],
        sitemap: 'https://temrenmakina.com/sitemap.xml',
    };
}