import type { Metadata } from "next";
import { Suspense } from "react";
import { Results } from "@/components/results";

export const metadata: Metadata = {
  title: "gallery.tattty.com",
  description: "gallery.tattty.com",
};

const ImagesSkeleton = () => (
  <div className="columns-3 gap-4">
    {Array.from({ length: 9 }, (_, idx) => {
      const aspects = ["aspect-square", "aspect-video", "aspect-[9/16]"];
      const aspect = aspects[idx % aspects.length];
      return (
        <div
          className={`mb-4 rounded-xl bg-card p-2 shadow-xl ${aspect}`}
          key={`skeleton-${aspect}-${idx}`}
        />
      );
    })}
  </div>
);

const Home = () => (
  <div className="relative min-h-screen rounded-[24px]">
    <div className="relative w-full py-8">
      <Suspense fallback={<ImagesSkeleton />}>
        <Results />
      </Suspense>
    </div>
  </div>
);

export default Home;
