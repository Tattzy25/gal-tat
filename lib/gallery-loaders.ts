// lib/gallery-loaders.ts
import { imageIndex } from "@/lib/search";

export type GalleryItem = {
  id: string;
  url: string;
  style?: string;
  label?: string;
};

function mapDocToGalleryItem(doc: any): GalleryItem | null {
  if (!doc) return null;

  const content = doc.content ?? {};

  const url: string =
    typeof content.image_urls === "string"
      ? content.image_urls
      : typeof content.image_url === "string"
        ? content.image_url
        : typeof content.style_image_url === "string"
          ? content.style_image_url
          : "";

  if (!url || url.trim().length === 0) return null;

  const style = typeof content.style === "string" ? content.style : undefined;

  return {
    id: String(doc.id),
    url,
    style,
    label: style,
  };
}

function mapDocsToGalleryItems(docs: any[]): GalleryItem[] {
  return docs
    .map(mapDocToGalleryItem)
    .filter((item): item is GalleryItem => item !== null);
}

/**
 * Global gallery – first N images in the index.
 */
export async function loadAllImages(
  limit: number = 50,
): Promise<GalleryItem[]> {
  const res: any = await imageIndex.range({
    cursor: "0",
    limit,
  });

  const docs: any[] = Array.isArray(res.documents) ? res.documents : [];
  return mapDocsToGalleryItems(docs);
}

/**
 * Images belonging to a specific user, using a metadata-based filter.
 * Requires documents to have `metadata.user_id` set when upserting.
 */
export async function loadUserImages(
  userId: string,
  limit: number = 50,
): Promise<GalleryItem[]> {
  if (!userId) return [];

  const docs: any[] = await imageIndex.search({
    query: "*",
    limit,
    filter: `@metadata.user_id = '${userId}'`,
  });

  return mapDocsToGalleryItems(docs);
}

/**
 * Images the user has liked. You pass in the Upstash document IDs from
 * your own likes/favorites storage; this just fetches and normalizes them.
 */
export async function loadLikedImages(
  ids: string[],
  limit?: number,
): Promise<GalleryItem[]> {
  if (!ids || ids.length === 0) return [];

  const slice = typeof limit === "number" ? ids.slice(0, limit) : ids;

  const docs: any[] = await imageIndex.fetch({
    ids: slice,
  });

  return mapDocsToGalleryItems(docs);
}

/**
 * Favorite models rendered with the same gallery UI.
 * Same idea as liked images: you pass model document IDs and this
 * turns them into GalleryItem objects.
 */
export async function loadFavoriteModels(
  ids: string[],
  limit?: number,
): Promise<GalleryItem[]> {
  if (!ids || ids.length === 0) return [];

  const slice = typeof limit === "number" ? ids.slice(0, limit) : ids;

  const docs: any[] = await imageIndex.fetch({
    ids: slice,
  });

  return mapDocsToGalleryItems(docs);
}
