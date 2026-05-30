import { Search } from "@upstash/search";
import { ResultsClient } from "./results.client";

export type GalleryItem = {
  id: string;
  url: string;
  style: string;
};

async function fetchInitialImages(): Promise<GalleryItem[]> {
  const upstash = Search.fromEnv();
  const index = upstash.index("fuck-claude");

  const { documents } = await index.range({
    cursor: "",
    limit: 50,
  });

  return documents.map((doc: any) => ({
    id: doc.id,
    url: doc.content.url,
    style: doc.content.Style,
  }));
}

export const Results = async () => {
  const initialData = await fetchInitialImages();
  return <ResultsClient initialData={initialData} />;
};

export const revalidate = 3600;
