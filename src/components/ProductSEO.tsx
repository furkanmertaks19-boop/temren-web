// src/components/ProductSEO.tsx
export default function ProductSEO({ name, description, image, slug }: any) {
    const fullUrl = `https://temrenmakina.com/urunler/${slug}`;

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org/",
                    "@type": "Product",
                    "name": name,
                    "image": `https://temrenmakina.com${image}`,
                    "description": description,
                    "brand": { "@type": "Brand", "name": "Temren Makina" },
                    "offers": {
                        "@type": "Offer",
                        "url": fullUrl,
                        "priceCurrency": "TRY",
                        "availability": "https://schema.org/InStock"
                    }
                })
            }}
        />
    );
}