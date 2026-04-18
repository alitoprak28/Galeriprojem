import { customerStories, dealershipStats } from "@/lib/gallery-data";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function SocialProofSection() {
  return (
    <section id="guvence" className="section-space">
      <div className="page-shell space-y-12">
        <SectionHeading
          eyebrow="Neden Biz"
          title="Müşterilerimizin bizi tercih etme sebebi belli."
          description="Net fiyat, düzgün iletişim ve satış sonrası da ulaşılabilir olmak bizim için önemli. Aşağıdaki yorumlar da bunu gösteriyor."
        />

        <div className="grid gap-5 lg:grid-cols-4">
          {dealershipStats.map((item, index) => (
            <Reveal
              key={item.label}
              delay={index * 0.05}
              className="border border-foreground/10 bg-panel px-5 py-6 shadow-panel"
            >
              <p className="font-display text-4xl uppercase tracking-[-0.05em] text-foreground">
                {item.value}
              </p>
              <p className="mt-3 text-[11px] uppercase tracking-[0.26em] text-muted">
                {item.label}
              </p>
            </Reveal>
          ))}
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {customerStories.map((story, index) => (
            <Reveal
              key={`${story.name}-${story.vehicle}`}
              delay={0.08 + index * 0.05}
              className="border border-foreground/10 bg-panel p-6 shadow-panel sm:p-7"
            >
              <p className="text-base leading-8 text-muted">“{story.quote}”</p>
              <div className="mt-6 border-t border-foreground/10 pt-5">
                <p className="font-display text-2xl uppercase tracking-[-0.04em] text-foreground">
                  {story.name}
                </p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.26em] text-muted">
                  {story.city} / {story.vehicle}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
