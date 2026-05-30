"use server";

import { Search } from "@upstash/search";

const upstash = Search.fromEnv();
const index = upstash.index("fuck-claude");

type SearchResponse = { data: any[] } | { error: string };

export const search = async (
  _prevState: SearchResponse | undefined,
  formData: FormData,
): Promise<SearchResponse> => {
  const query = formData.get("search");

  if (!query || typeof query !== "string") {
    return { error: "Please enter a search query" };
  }

  try {
    const results = await index.search({ query, limit: 50 });

    const data = results.map((result: any) => ({
      id: result.id,
      url: result.content?.image_url || "",
      title: result.content?.Title || "",
      tags: result.content?.Tags || "",
      shortDescription: result.content?.["Short Description"] || "",
      mood: result.content?.Mood || "",
      style: result.content?.Style || "",
      colorScheme: result.content?.["Color Scheme"] || "",
      sku: result.metadata?.Sku || "",
      prompt: result.metadata?.Prompt || "",
      seoTitle: result.metadata?.["SEO Title"] || "",
      seoDescription: result.metadata?.["SEO Description"] || "",
      body: result.metadata?.Body || "",
    }));

    return { data };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return { error: message };
  }
};
