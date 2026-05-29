/** biome-ignore-all lint/suspicious/noConsole: "Handy for debugging" */

import { Search } from "@upstash/search";
const upstash = Search.fromEnv();
const index = upstash.index("gallery");

// Your data shape — no Vercel Blob needed
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

export const indexImage = async (product: TattooProduct) => {
  "use step";

  const { attempt, stepStartedAt, stepId } = getStepMetadata();

  console.log(
    `[${stepId}] Indexing image (attempt ${attempt})...`,
    product.imageUrl,
  );

  try {
    await index.upsert([
      {
        id: product.imageId, // UNIQUE per image — not "gallery"
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

    console.log(
      `[${stepId}] Successfully indexed image at ${stepStartedAt.toISOString()}`,
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";

    if (
      message.includes("rate limit") ||
      message.includes("429") ||
      message.includes("quota")
    ) {
      throw new RetryableError(`Upstash rate limited: ${message}`, {
        retryAfter: "1m",
      });
    }

    if (
      message.includes("timeout") ||
      message.includes("network") ||
      message.includes("connection")
    ) {
      throw new RetryableError(`Upstash connection error: ${message}`);
    }

    throw new FatalError(`Failed to index image: ${message}`);
  }
};
