import { Search } from "@upstash/search";
import { ResultsClient } from "./results.client";

export type GalleryItem = {
  id: string;
  url: string;
  title: string;
  tags: string;
  shortDescription: string;
  mood: string;
  style: string;
  colorScheme: string;
  sku: string;
  prompt: string;
  seoTitle: string;
  seoDescription: string;
  body: string;
};

async function fetchInitialImages(): Promise<GalleryItem[]> {
  const upstash = Search.fromEnv();
  const index = upstash.index("gallery");

  const { documents } = await index.range({
    cursor: "0",
    limit: 50,
  });

  return documents.map((doc: any) => ({
    id: doc.id,
    url: doc.content?.image_url || "",
    title: doc.content?.Title || "",
    tags: doc.content?.Tags || "",
    shortDescription: doc.content?.["Short Description"] || "",
    mood: doc.content?.Mood || "",
    style: doc.content?.Style || "",
    colorScheme: doc.content?.["Color Scheme"] || "",
    sku: doc.metadata?.Sku || "",
    prompt: doc.metadata?.Prompt || "",
    seoTitle: doc.metadata?.["SEO Title"] || "",
    seoDescription: doc.metadata?.["SEO Description"] || "",
    body: doc.metadata?.Body || "",
  }));
}

export const Results = async () => {
  const initialData = await fetchInitialImages();
  return <ResultsClient initialData={initialData} />;
};
