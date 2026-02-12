import DotGrid from "./DotGrid";

const Background = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none fixed inset-0 z-0 [clip-path:inset(0_round_24px)]"
    data-slot="background"
  >
    <div style={{ width: "100%", height: "100dvh", position: "relative" }}>
      <DotGrid
        dotSize={2}
        gap={15}
        baseColor="#f6f4f4"
        activeColor="#00ff11"
        proximity={120}
        shockRadius={250}
        shockStrength={5}
        resistance={750}
        returnDuration={1.5}
      />
    </div>
  </div>
);

export default Background;
