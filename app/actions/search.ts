// app/actions/search.ts
"use server";

import { imageIndex } from "@/lib/search";

type ImageItem = { id: string; url: string; style?: string };

type State = { data: ImageItem[] } | { error: string };

export async function search(
  _prevState: State,
  formData: FormData,
): Promise<State> {
  const query = formData.get("search");
  if (!query || typeof query !== "string") {
    return { error: "Missing search query" };
  }

  // One Upstash Search call per search submit
  const docs: any[] = await imageIndex.search({
    query,
    limit: 50,
  });

  const data: ImageItem[] = docs
    .map((doc) => ({
      id: String(doc.id),
      url: String(doc.content?.image_url ?? ""),
      style: doc.content?.style ? String(doc.content.style) : undefined,
    }))
    .filter((d) => d.url.trim().length > 0);

  return { data };
}
