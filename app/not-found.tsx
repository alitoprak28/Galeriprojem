import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center px-6">
      <div className="max-w-2xl space-y-6 text-center">
        <p className="eyebrow justify-center">404</p>
        <h1 className="font-display text-5xl uppercase tracking-[-0.05em] sm:text-6xl">
          Bu araç şu anda vitrinde görünmüyor.
        </h1>
        <p className="text-base leading-7 text-muted sm:text-lg">
          Aradığınız ilan kaldırılmış olabilir ya da stok akışında güncelleme yapılmış olabilir.
        </p>
        <Link
          href="/gallery"
          className="inline-flex items-center gap-3 border border-foreground/10 px-5 py-3 text-xs uppercase tracking-[0.28em] transition hover:border-foreground/20 hover:bg-foreground/[0.05]"
        >
          Stoklara Dön
        </Link>
      </div>
    </div>
  );
}
