// app/actions/search.ts
"use server";

import { imageIndex } from "@/lib/search";

type ImageItem = { id: string; url: string; style?: string };

type State = { data: ImageItem[] } | { error: string };

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

export async function search(
  _prevState: State,
  formData: FormData,
): Promise<State> {
  const query = formData.get("search");
  if (!query || typeof query !== "string") {
    return { error: "Missing search query" };
  }

  const docs: any[] = await imageIndex.search({
    query,
    limit: 50,
  });

  return { data: normalizeDocs(docs) };
}

export async function loadMoreImages(cursor: string | null) {
  const res: any = await imageIndex.range({
    cursor: cursor ?? "0",
    limit: 60,
  });

  return {
    items: normalizeDocs(res.documents ?? []),
    nextCursor: res.nextCursor ?? null,
  };
}
