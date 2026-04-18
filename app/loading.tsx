export default function Loading() {
  return (
    <div className="grid min-h-screen place-items-center bg-background px-6">
      <div className="w-full max-w-md space-y-6 text-center">
        <p className="font-display text-4xl uppercase tracking-[0.18em] text-foreground sm:text-5xl">
          Maslak Oto Galeri
        </p>
        <div className="h-px overflow-hidden bg-foreground/10">
          <div className="h-full w-1/3 animate-pulse bg-gradient-to-r from-transparent via-accent to-transparent" />
        </div>
        <p className="text-[11px] uppercase tracking-[0.34em] text-muted">Stok hazırlanıyor</p>
      </div>
    </div>
  );
}
