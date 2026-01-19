import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin', '/api'], // Yönetim paneli ve API yollarını engeller
        },
        sitemap: 'https://temrenmakina.com/sitemap.xml',
    };
}