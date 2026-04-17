import Navigation from "@/components/wedding/navigation";
import SiteBackground from "@/components/wedding/site-background";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen grain-overlay bg-transparent">
      <SiteBackground />
      <Navigation />
      <main className="relative z-10">{children}</main>
    </div>
  );
}
