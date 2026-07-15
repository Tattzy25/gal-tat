import { Search } from "@upstash/search";

const upstash = Search.fromEnv();
const index = upstash.index("batch002");

type TattooProduct = {
  imageId: string;
  imageUrl: string;
  title: string;
  tags: string;
  shortDescription: string;
  dimensions: string;
  imageAltText: string;
  mood: string;
  style: string;
  colorScheme: string;
  vendor?: string;
  prompt: string;
  seoTitle: string;
  seoDescription: string;
  body: string;
  urlHandle?: string;
  productCategory?: string;
  type?: string;
  published?: string;
  status?: string;
  price?: string;
};

export const indexImage = async (product: TattooProduct): Promise<void> => {
  await index.upsert([
    {
      id: product.imageId,
      content: {
        image_name: product.title,
        image_url: product.imageUrl,
        Title: product.title,
        Tags: product.tags,
        "Short Description": product.shortDescription,
        Dimensions: product.dimensions,
        "Image Alt Text": product.imageAltText,
        Mood: product.mood,
        Style: product.style,
        "Color Scheme": product.colorScheme,
        Vendor: product.vendor || "TaTTTy",
      },
      metadata: {
        Sku: product.imageId,
        Prompt: product.prompt,
        "SEO Title": product.seoTitle,
        "SEO Description": product.seoDescription,
        Body: product.body,
        "URL handle": product.urlHandle || "",
        "Product category": product.productCategory || "",
        Type: product.type || "",
        "Published on online store": product.published || "",
        Status: product.status || "",
        Price: product.price || "",
      },
    },
  ]);
};
