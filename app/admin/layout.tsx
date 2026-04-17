import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import AdminNav from "@/components/admin/admin-nav";
import AuthGate from "@/components/admin/auth-gate";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen grain-overlay bg-[hsl(var(--background))]">
      <header className="fixed top-0 left-0 right-0 z-40 px-[5vw] md:px-[8vw] py-6 flex items-center justify-between bg-[hsl(var(--background))]/80 backdrop-blur-sm border-b border-[hsl(var(--border))]">
        <div className="flex items-center gap-6">
          <Link
            href="/home"
            className="font-display italic text-2xl text-[hsl(var(--primary))]"
          >
            R&amp;P
          </Link>
          <span className="meta-label hidden md:inline">
            Admin · Paloma &amp; Rodrigo
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/home"
            className="meta-label hover:text-[hsl(var(--primary))] transition-colors"
          >
            Site
          </Link>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-8 h-8",
              },
            }}
          />
        </div>
      </header>

      <AdminNav />

      <main className="relative z-10 pt-44 pb-20 px-[5vw] md:px-[8vw]">
        <AuthGate>{children}</AuthGate>
      </main>
    </div>
  );
}
