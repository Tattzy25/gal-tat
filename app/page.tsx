import type { Metadata } from "next";
import { Suspense } from "react";
import Background from "@/components/Background";
import { CustomHHeader } from "@/components/CustomHHeader";
import { Results } from "@/components/results";
import { UploadedImagesProvider } from "@/components/uploaded-images-provider";

export const metadata: Metadata = {
  title: "vectr",
  description: "vectr",
};

const ImagesSkeleton = () => (
  <div className="columns-3 gap-4">
    {Array.from({ length: 9 }, (_, idx) => {
      // Deterministically pick an aspect ratio for each skeleton (to keep keys and aspect ratio stable)
      const aspects = [
        "aspect-square", // 1:1
        "aspect-video", // 16:9
        "aspect-[9/16]", // 9:16; needs tailwind support or define this utility in your css
      ];
      // Use modulo for stable assignment
      const aspect = aspects[idx % aspects.length];
      // Compose the className
      const className = `mb-4 rounded-xl bg-card p-2 shadow-xl ${aspect}`;
      return <div className={className} key={`skeleton-${aspect}-${idx}`} />;
    })}
  </div>
);

const Home = () => (
  <div className="relative min-h-screen">
    <Background />
    <div className="relative z-10">
      <UploadedImagesProvider>
        <CustomHHeader
          items={[
            { label: "Inspirations", href: "/inspirations" },
            { label: "My Gallery", href: "/my-gallery" },
          ]}
          glassProps={{
            width: 600,
            height: 50,
            borderRadius: 20,
            className: "my-custom-class",
            displace: 0.5,
            distortionScale: -180,
            redOffset: 0,
            greenOffset: 10,
            blueOffset: 20,
            brightness: 50,
            opacity: 0.93,
            mixBlendMode: "screen",
          }}
        />
        <div className="relative w-full py-8">
          <Suspense fallback={<ImagesSkeleton />}>
            <Results />
          </Suspense>
        </div>
      </UploadedImagesProvider>
    </div>
  </div>
);

export default Home;
