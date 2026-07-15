// components/results.tsx
import { imageIndex } from "@/lib/search";
import { ResultsClient } from "./results.client";

export type ImageItem = { id: string; url: string; style?: string };
export type InitialData = { items: ImageItem[]; nextCursor: string | null };

function normalizeDocs(docs: any[]): ImageItem[] {
  return docs
    .map((doc) => {
      const content = doc.content ?? {};
      const url =
        typeof content.image_urls === "string"
          ? content.image_urls
          : typeof content.image_url === "string"
            ? content.image_url
            : "";

      return {
        id: String(doc.id),
        url: String(url),
        style: content.style ? String(content.style) : undefined,
      };
    })
    .filter((d) => d.url.trim().length > 0);
}

async function fetchInitial(): Promise<InitialData> {
  const res: any = await imageIndex.range({
    cursor: "0",
    limit: 60,
  });

  return {
    items: normalizeDocs(res.documents ?? []),
    nextCursor: res.nextCursor ?? null,
  };
}

export const Results = async () => {
  const initialData = await fetchInitial();
  return <ResultsClient initialData={initialData} />;
};
