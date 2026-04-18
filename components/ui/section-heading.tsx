import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left"
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl space-y-4",
        align === "center" && "mx-auto text-center"
      )}
    >
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="text-balance font-display text-4xl uppercase tracking-[-0.04em] text-foreground sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-base leading-7 text-muted sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

