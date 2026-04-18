import { faqItems } from "@/lib/gallery-data";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

export function FaqSection() {
  return (
    <section className="section-space pt-6">
      <div className="page-shell space-y-12">
        <SectionHeading
          eyebrow="Sık Sorulan Sorular"
          title="Aklınıza takılan temel soruların cevapları burada."
          description="Ekspertiz, takas, kredi, teslimat ve randevu ile ilgili en çok sorulan soruları sizin için kısa ve net şekilde yazdık."
        />

        <div className="grid gap-4">
          {faqItems.map((item, index) => (
            <Reveal key={item.question} delay={index * 0.04}>
              <details className="group border border-foreground/10 bg-panel px-6 py-5 shadow-panel">
                <summary className="cursor-pointer list-none font-display text-2xl uppercase tracking-[-0.04em] text-foreground marker:content-none">
                  {item.question}
                </summary>
                <p className="mt-4 max-w-4xl text-base leading-8 text-muted">{item.answer}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
