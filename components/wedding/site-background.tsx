import Image from "next/image";

export default function SiteBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
    >
      <Image
        src="/igreja.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center select-none"
      />
      <div className="absolute inset-0 bg-white/90" />
    </div>
  );
}
