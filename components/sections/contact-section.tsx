"use client";

import { FormEvent, useState } from "react";
import { MessageSquareText, PhoneCall, Send } from "lucide-react";

import { contactChannels, dealershipInfo, vehicles } from "@/lib/gallery-data";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function ContactSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [vehicle, setVehicle] = useState(vehicles[0]?.title ?? "");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const text = [
      "Merhaba,",
      `${vehicle} için bilgi almak istiyorum.`,
      name ? `İsim: ${name}` : "",
      phone ? `Telefon: ${phone}` : "",
      message ? `Not: ${message}` : ""
    ]
      .filter(Boolean)
      .join("\n");

    window.open(`${dealershipInfo.whatsapp}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <section id="iletisim" className="section-space">
      <div className="page-shell grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="space-y-8">
          <SectionHeading
            eyebrow="İletişim"
            title="Beğendiğiniz araç için bize hemen ulaşın."
            description="İster arayın, ister WhatsApp’tan yazın. Araç durumu, son fiyat, takas ve randevu bilgisini hızlıca paylaşalım."
          />

          <div className="grid gap-4">
            {contactChannels.map((channel, index) => (
              <Reveal
                key={channel.title}
                delay={index * 0.05}
                className="border border-foreground/10 bg-panel p-5 shadow-panel"
              >
                <p className="font-display text-2xl uppercase tracking-[-0.04em] text-foreground">
                  {channel.title}
                </p>
                <p className="mt-3 text-base leading-7 text-muted">{channel.description}</p>
                <a
                  href={channel.href}
                  className="mt-5 inline-flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-foreground transition hover:text-accent"
                >
                  {channel.label}
                  <Send className="h-4 w-4" />
                </a>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="border border-foreground/10 bg-panel p-6 shadow-panel sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2 border-b border-foreground/10 pb-5">
              <p className="text-[11px] uppercase tracking-[0.24em] text-muted">Hızlı Talep Formu</p>
              <p className="text-base leading-7 text-muted">
                Formu gönderdiğinizde WhatsApp açılır. Seçtiğiniz araç ve yazdığınız not hazır
                mesaj olarak bize iletilir.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.28em] text-muted">Ad Soyad</span>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Adınız"
                  className="w-full border border-foreground/10 bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
                />
              </label>
              <label className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.28em] text-muted">Telefon</span>
                <input
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="05xx xxx xx xx"
                  className="w-full border border-foreground/10 bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
                />
              </label>
            </div>

            <label className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.28em] text-muted">İlgi Duyulan Araç</span>
              <select
                value={vehicle}
                onChange={(event) => setVehicle(event.target.value)}
                className="w-full border border-foreground/10 bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
              >
                {vehicles.map((item) => (
                  <option key={item.slug} value={item.title}>
                    {item.title}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.28em] text-muted">Mesaj</span>
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                rows={5}
                placeholder="Takas, kredi, kapora ya da ekspertiz talebinizi yazın."
                className="w-full resize-none border border-foreground/10 bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
              />
            </label>

            <div className="grid gap-4 border-t border-foreground/10 pt-5 text-sm text-muted sm:grid-cols-2">
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em]">Showroom</p>
                <p className="mt-2 leading-7">{dealershipInfo.address}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em]">Çalışma Saatleri</p>
                <p className="mt-2 leading-7">{dealershipInfo.hours}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                className="inline-flex items-center gap-3 border border-accent bg-accent px-6 py-4 text-xs uppercase tracking-[0.28em] text-white transition hover:opacity-90"
              >
                WhatsApp Mesajı Hazırla
                <MessageSquareText className="h-4 w-4" />
              </button>
              <a
                href={`tel:${dealershipInfo.phoneRaw}`}
                className="inline-flex items-center gap-3 border border-foreground/10 px-6 py-4 text-xs uppercase tracking-[0.28em] text-foreground transition hover:border-foreground/20 hover:bg-foreground/[0.05]"
              >
                Telefonla Ara
                <PhoneCall className="h-4 w-4" />
              </a>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
