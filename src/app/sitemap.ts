import { MetadataRoute } from 'next';
import connectDB from '@/lib/db';
import mongoose from 'mongoose';

// Modelleri güvenli çağırma (OverwriteModelError önleyici)
const getDynamicModels = () => {
    const Product = mongoose.models.Product || mongoose.model("Product", new mongoose.Schema({}, { strict: false }));
    const Blog = mongoose.models.Blog || mongoose.model("Blog", new mongoose.Schema({}, { strict: false }));
    return { Product, Blog };
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://temrenmakina.com';

    // 1. Veritabanına bağlan ve dinamik verileri çek
    await connectDB();
    const { Product, Blog } = getDynamicModels();

    const [products, blogs] = await Promise.all([
        Product.find({}, 'slug updatedAt').lean(),
        Blog.find({}, 'slug updatedAt').lean()
    ]);

    // 2. Statik Sayfalar (Anasayfa, Kurumsal vb.)
    const staticPages: MetadataRoute.Sitemap = [
        { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
        { url: `${baseUrl}/kurumsal`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/urunler`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/faaliyet-alanlari`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
        { url: `${baseUrl}/medya`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
        { url: `${baseUrl}/iletisim`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    ];

    // 3. Dinamik Ürün Sayfaları
    const productEntries: MetadataRoute.Sitemap = products.map((prod: any) => ({
        url: `${baseUrl}/urunler/${prod.slug}`,
        lastModified: prod.updatedAt || new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

    // 4. Dinamik Blog Sayfaları
    const blogEntries: MetadataRoute.Sitemap = blogs.map((post: any) => ({
        url: `${baseUrl}/medya/blog/${post.slug}`,
        lastModified: post.updatedAt || new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
    }));

    return [...staticPages, ...productEntries, ...blogEntries];
}