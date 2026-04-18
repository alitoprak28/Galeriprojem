import { serviceHighlights } from "@/lib/gallery-data";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function ServicesSection() {
  return (
    <section id="hizmetler" className="section-space">
      <div className="page-shell space-y-12">
        <SectionHeading
          eyebrow="Galeri Hizmetleri"
          title="Araç alırken en çok sorulan konular."
          description="Takas olur mu, kredi çıkar mı, ekspertiz var mı, şehir dışına teslim olur mu; müşterinin aklındaki başlıkları burada topluca görebilirsiniz."
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {serviceHighlights.map((item, index) => (
            <Reveal
              key={item.title}
              delay={index * 0.04}
              className="border border-foreground/10 bg-panel p-6 shadow-panel sm:p-7"
            >
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted sm:text-[11px]">
                {item.eyebrow}
              </p>
              <h3 className="mt-4 font-display text-3xl uppercase tracking-[-0.04em] text-foreground">
                {item.title}
              </h3>
              <p className="mt-4 text-base leading-7 text-muted">{item.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
