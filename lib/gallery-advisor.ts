import { dealershipInfo, type Vehicle, vehicles } from "@/lib/gallery-data";

export type AdvisorRole = "assistant" | "user";

export type AdvisorRecommendation = {
  slug: string;
  title: string;
  price: string;
  image: string;
  reason: string;
  tagline: string;
};

export type AdvisorAction = {
  label: string;
  href: string;
  tone?: "primary" | "secondary";
};

export type AdvisorMessage = {
  id: string;
  role: AdvisorRole;
  text: string;
  recommendations?: AdvisorRecommendation[];
  actions?: AdvisorAction[];
};

export type AdvisorQuickAction = {
  id: string;
  label: string;
  prompt: string;
};

export type AdvisorPreferences = {
  budgetMax?: number;
  bodyStyle?: "SUV" | "Sedan" | "Coupe" | "Crossover" | "Performance Wagon";
  fuel?: "Benzin" | "Dizel" | "Mild Hybrid Benzin";
  brand?: string;
  useCase?: "family" | "city" | "long" | "premium";
  electricRequested?: boolean;
};

const brandCatalog = Array.from(new Set(vehicles.map((vehicle) => vehicle.brand)));

export const advisorQuickActions: AdvisorQuickAction[] = [
  {
    id: "budget",
    label: "Butceme uygun arac bul",
    prompt: "Butceme uygun bir arac bakiyorum."
  },
  {
    id: "suv",
    label: "SUV arac bakiyorum",
    prompt: "SUV bir arac bakiyorum."
  },
  {
    id: "electric",
    label: "Elektrikli arac sor",
    prompt: "Elektrikli bir arac bakiyorum."
  },
  {
    id: "premium",
    label: "Premium arac bakiyorum",
    prompt: "Premium bir arac bakiyorum."
  },
  {
    id: "family",
    label: "Aile icin arac ariyorum",
    prompt: "Aile icin genis bir arac bakiyorum."
  },
  {
    id: "contact",
    label: "Hizli iletisime gec",
    prompt: "Satis ekibiyle hizli iletisime gecmek istiyorum."
  }
];

const contactActions: AdvisorAction[] = [
  {
    label: "WhatsApp ile sor",
    href: dealershipInfo.whatsapp,
    tone: "primary"
  },
  {
    label: "Telefonla ara",
    href: `tel:${dealershipInfo.phoneRaw}`,
    tone: "secondary"
  }
];

export const initialAdvisorMessage: AdvisorMessage = {
  id: "welcome",
  role: "assistant",
  text:
    "Merhaba, ben Galeri Danismani. Isterseniz birkac kisa soruyla size uygun araci birlikte belirleyelim.",
  actions: contactActions
};

function normalizeText(value: string) {
  return value
    .toLocaleLowerCase("tr")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function parsePrice(value: string) {
  return Number(value.replace(/[^\d]/g, ""));
}

function parseBudget(text: string) {
  const normalized = normalizeText(text).replace(/\s+/g, " ");
  const millionMatch = normalized.match(/(\d+(?:[.,]\d+)?)\s*(milyon|m)\b/);

  if (millionMatch) {
    return Math.round(Number(millionMatch[1].replace(",", ".")) * 1_000_000);
  }

  const thousandMatch = normalized.match(/(\d+(?:[.,]\d+)?)\s*bin\b/);

  if (thousandMatch) {
    return Math.round(Number(thousandMatch[1].replace(",", ".")) * 1_000);
  }

  const digitsOnly = normalized.match(/\b\d{6,8}\b/);

  if (digitsOnly) {
    return Number(digitsOnly[0]);
  }

  return undefined;
}

function detectBodyStyle(text: string): AdvisorPreferences["bodyStyle"] | undefined {
  const normalized = normalizeText(text);

  if (normalized.includes("suv")) {
    return "SUV";
  }

  if (normalized.includes("sedan")) {
    return "Sedan";
  }

  if (normalized.includes("coupe")) {
    return "Coupe";
  }

  if (normalized.includes("wagon") || normalized.includes("station")) {
    return "Performance Wagon";
  }

  if (normalized.includes("crossover") || normalized.includes("hatchback")) {
    return "Crossover";
  }

  return undefined;
}

function detectFuel(text: string): AdvisorPreferences["fuel"] | undefined {
  const normalized = normalizeText(text);

  if (normalized.includes("dizel")) {
    return "Dizel";
  }

  if (normalized.includes("hybrid") || normalized.includes("hibrit")) {
    return "Mild Hybrid Benzin";
  }

  if (normalized.includes("benzin")) {
    return "Benzin";
  }

  return undefined;
}

function detectUseCase(text: string): AdvisorPreferences["useCase"] | undefined {
  const normalized = normalizeText(text);

  if (normalized.includes("aile") || normalized.includes("cocuk")) {
    return "family";
  }

  if (normalized.includes("sehir ici") || normalized.includes("trafik")) {
    return "city";
  }

  if (normalized.includes("uzun yol")) {
    return "long";
  }

  if (
    normalized.includes("premium") ||
    normalized.includes("prestij") ||
    normalized.includes("ust segment") ||
    normalized.includes("makam")
  ) {
    return "premium";
  }

  return undefined;
}

function detectBrand(text: string) {
  const normalized = normalizeText(text);

  return brandCatalog.find((brand) => normalized.includes(normalizeText(brand)));
}

function mergePreferences(current: AdvisorPreferences, text: string): AdvisorPreferences {
  const normalized = normalizeText(text);
  const next: AdvisorPreferences = { ...current };
  const budget = parseBudget(text);

  if (budget) {
    next.budgetMax = budget;
  }

  const bodyStyle = detectBodyStyle(text);

  if (bodyStyle) {
    next.bodyStyle = bodyStyle;
  }

  const fuel = detectFuel(text);

  if (fuel) {
    next.fuel = fuel;
  }

  const brand = detectBrand(text);

  if (brand) {
    next.brand = brand;
  }

  const useCase = detectUseCase(text);

  if (useCase) {
    next.useCase = useCase;
  }

  if (normalized.includes("elektrik")) {
    next.electricRequested = true;
  }

  return next;
}

function matchesBodyStyle(vehicle: Vehicle, preferredBody?: AdvisorPreferences["bodyStyle"]) {
  if (!preferredBody) {
    return true;
  }

  if (preferredBody === "SUV") {
    return vehicle.bodyStyle.includes("SUV") || vehicle.bodyStyle.includes("Crossover");
  }

  if (preferredBody === "Crossover") {
    return vehicle.bodyStyle.includes("Crossover") || vehicle.bodyStyle.includes("SUV");
  }

  return vehicle.bodyStyle.includes(preferredBody);
}

function scoreVehicle(vehicle: Vehicle, preferences: AdvisorPreferences) {
  let score = 0;
  const vehiclePrice = parsePrice(vehicle.price);

  if (preferences.budgetMax) {
    if (vehiclePrice <= preferences.budgetMax * 1.08) {
      score += 5;
    } else if (vehiclePrice <= preferences.budgetMax * 1.18) {
      score += 3;
    } else if (vehiclePrice <= preferences.budgetMax * 1.3) {
      score += 1;
    } else {
      score -= 4;
    }
  }

  if (preferences.bodyStyle && matchesBodyStyle(vehicle, preferences.bodyStyle)) {
    score += 4;
  }

  if (preferences.fuel) {
    if (normalizeText(vehicle.fuel).includes(normalizeText(preferences.fuel))) {
      score += 4;
    } else if (
      preferences.fuel === "Benzin" &&
      normalizeText(vehicle.fuel).includes(normalizeText("Mild Hybrid Benzin"))
    ) {
      score += 2;
    } else {
      score -= 2;
    }
  }

  if (preferences.brand) {
    if (vehicle.brand === preferences.brand) {
      score += 5;
    } else {
      score -= 2;
    }
  }

  if (preferences.useCase === "family") {
    if (vehicle.bodyStyle.includes("SUV") || vehicle.bodyStyle.includes("Sedan")) {
      score += 3;
    }

    if (Number(vehicle.seats.replace(/[^\d]/g, "")) >= 5) {
      score += 2;
    }
  }

  if (preferences.useCase === "city") {
    if (vehicle.bodyStyle.includes("Sedan") || vehicle.bodyStyle.includes("Crossover")) {
      score += 3;
    }

    if (vehiclePrice <= 3_000_000) {
      score += 2;
    }
  }

  if (preferences.useCase === "long") {
    if (vehicle.bodyStyle.includes("Sedan") || vehicle.bodyStyle.includes("SUV")) {
      score += 3;
    }
  }

  if (preferences.useCase === "premium") {
    if (vehiclePrice >= 4_000_000) {
      score += 4;
    }

    if (
      vehicle.bodyStyle.includes("Luxury") ||
      vehicle.brand === "Mercedes-Benz" ||
      vehicle.brand === "BMW" ||
      vehicle.brand === "Range Rover" ||
      vehicle.brand === "Porsche"
    ) {
      score += 3;
    }
  }

  return score;
}

function buildReason(vehicle: Vehicle, preferences: AdvisorPreferences) {
  const reasons: string[] = [];

  if (preferences.budgetMax && parsePrice(vehicle.price) <= preferences.budgetMax * 1.1) {
    reasons.push("Butcenize yakin");
  }

  if (preferences.bodyStyle && matchesBodyStyle(vehicle, preferences.bodyStyle)) {
    reasons.push("Kasa tercihinize uygun");
  }

  if (preferences.fuel && normalizeText(vehicle.fuel).includes(normalizeText(preferences.fuel))) {
    reasons.push(`${preferences.fuel} tercihinize uygun`);
  }

  if (preferences.brand && vehicle.brand === preferences.brand) {
    reasons.push(`${vehicle.brand} tercihinize uyuyor`);
  }

  if (preferences.useCase === "family") {
    reasons.push("Aile kullanimi icin ferah");
  }

  if (preferences.useCase === "premium") {
    reasons.push("Showroom tarafinda guclu bir secenek");
  }

  if (reasons.length === 0) {
    reasons.push("Stokta dikkat ceken bir secenek");
  }

  return reasons.slice(0, 2).join(" / ");
}

function toRecommendation(vehicle: Vehicle, preferences: AdvisorPreferences): AdvisorRecommendation {
  return {
    slug: vehicle.slug,
    title: vehicle.title,
    price: vehicle.price,
    image: vehicle.image,
    tagline: vehicle.tagline,
    reason: buildReason(vehicle, preferences)
  };
}

function recommendVehicles(preferences: AdvisorPreferences) {
  return [...vehicles]
    .map((vehicle) => ({
      vehicle,
      score: scoreVehicle(vehicle, preferences)
    }))
    .filter((item) => item.score > -1)
    .sort((first, second) => second.score - first.score)
    .slice(0, 3)
    .map((item) => toRecommendation(item.vehicle, preferences));
}

function needsContact(text: string) {
  const normalized = normalizeText(text);

  return (
    normalized.includes("iletisim") ||
    normalized.includes("whatsapp") ||
    normalized.includes("telefon") ||
    normalized.includes("arayin") ||
    normalized.includes("ulasmak")
  );
}

function wantsRecommendations(text: string) {
  const normalized = normalizeText(text);

  return (
    normalized.includes("oner") ||
    normalized.includes("liste") ||
    normalized.includes("goster") ||
    normalized.includes("incele")
  );
}

function countKnownPreferences(preferences: AdvisorPreferences) {
  let count = 0;

  if (preferences.budgetMax) {
    count += 1;
  }

  if (preferences.bodyStyle) {
    count += 1;
  }

  if (preferences.fuel) {
    count += 1;
  }

  if (preferences.brand) {
    count += 1;
  }

  if (preferences.useCase) {
    count += 1;
  }

  return count;
}

function formatBudget(budget: number) {
  return `${budget.toLocaleString("tr-TR")} TL`;
}

function buildInventoryHref(preferences: AdvisorPreferences) {
  const params = new URLSearchParams();

  if (preferences.brand) {
    params.set("brand", preferences.brand);
  }

  if (preferences.fuel === "Dizel" || preferences.fuel === "Mild Hybrid Benzin") {
    params.set("fuel", preferences.fuel);
  }

  if (preferences.bodyStyle) {
    params.set("q", preferences.bodyStyle);
  } else if (preferences.useCase === "family") {
    params.set("q", "SUV");
  } else if (preferences.useCase === "city") {
    params.set("q", "Sedan");
  }

  return `/gallery${params.toString() ? `?${params.toString()}` : ""}`;
}

function buildSummary(preferences: AdvisorPreferences) {
  const parts: string[] = [];

  if (preferences.budgetMax) {
    parts.push(`${formatBudget(preferences.budgetMax)} civari`);
  }

  if (preferences.bodyStyle) {
    parts.push(`${preferences.bodyStyle.toLocaleLowerCase("tr")} tipinde`);
  }

  if (preferences.useCase === "family") {
    parts.push("aile kullanimina uygun");
  }

  if (preferences.useCase === "premium") {
    parts.push("premium hissi guclu");
  }

  if (preferences.brand) {
    parts.push(`${preferences.brand} odakli`);
  }

  return parts.length > 0 ? `${parts.join(", ")} bir arama icin` : "";
}

function askNextQuestion(preferences: AdvisorPreferences) {
  if (!preferences.budgetMax) {
    return "Yaklasik butce araliginiz nedir?";
  }

  if (!preferences.bodyStyle && !preferences.useCase) {
    return "SUV, sedan ya da aile kullanimi gibi bir onceliginiz var mi?";
  }

  if (!preferences.fuel && !preferences.electricRequested) {
    return "Yakitta benzin, dizel ya da hybrid gibi bir tercihiniz var mi?";
  }

  if (!preferences.brand) {
    return "Belli bir marka dusunuyor musunuz, yoksa stoktan karistirayim mi?";
  }

  return undefined;
}

export function createAdvisorReply(
  userText: string,
  currentPreferences: AdvisorPreferences
): { nextPreferences: AdvisorPreferences; message: AdvisorMessage } {
  const nextPreferences = mergePreferences(currentPreferences, userText);
  const askQuestion = askNextQuestion(nextPreferences);
  const recommendationIntent = wantsRecommendations(userText);
  const knownPreferences = countKnownPreferences(nextPreferences);

  if (needsContact(userText)) {
    return {
      nextPreferences,
      message: {
        id: `assistant-contact-${Date.now()}`,
        role: "assistant",
        text:
          "Tabii, sizi hizlica satis ekibimize yonlendirebilirim. WhatsApp ya da telefon tarafindan aninda bilgi alabilirsiniz.",
        actions: contactActions
      }
    };
  }

  if (nextPreferences.electricRequested) {
    return {
      nextPreferences,
      message: {
        id: `assistant-electric-${Date.now()}`,
        role: "assistant",
        text:
          "Su an vitrinde elektrikli arac gorunmuyor. Dilerseniz size dusuk tuketimli sedan ve SUV seceneklerini ayirayim.",
        actions: [
          {
            label: "SUV stoklarini ac",
            href: "/gallery?q=SUV",
            tone: "secondary"
          },
          {
            label: "WhatsApp ile sor",
            href: dealershipInfo.whatsapp,
            tone: "primary"
          }
        ]
      }
    };
  }

  if (askQuestion && (!recommendationIntent || knownPreferences < 2)) {
    return {
      nextPreferences,
      message: {
        id: `assistant-question-${Date.now()}`,
        role: "assistant",
        text: `Size daha net arac onerebilmem icin bir bilgi daha alayim. ${askQuestion}`
      }
    };
  }

  const recommendations = recommendVehicles(nextPreferences);

  if (recommendations.length === 0) {
    return {
      nextPreferences,
      message: {
        id: `assistant-empty-${Date.now()}`,
        role: "assistant",
        text:
          "Bu kriterlere tam oturan bir ilan cikmadi. Butceyi biraz esnetirsek ya da kasa tipini genisletirsek daha guclu secenekler cikarabilirim.",
        actions: [
          {
            label: "Tum stoklari ac",
            href: "/gallery",
            tone: "secondary"
          },
          {
            label: "WhatsApp ile sor",
            href: dealershipInfo.whatsapp,
            tone: "primary"
          }
        ]
      }
    };
  }

  const summary = buildSummary(nextPreferences);

  return {
    nextPreferences,
    message: {
      id: `assistant-reco-${Date.now()}`,
      role: "assistant",
      text: summary
        ? `${summary} size uygun olabilecek ilanlari ayirdim. Isterseniz detay sayfasina gecin ya da hizli bilgi icin bize yazin.`
        : "Size uygun olabilecek ilanlari ayirdim. Isterseniz detay sayfasina gecin ya da hizli bilgi icin bize yazin.",
      recommendations,
      actions: [
        {
          label: "Uygun stoklari ac",
          href: buildInventoryHref(nextPreferences),
          tone: "secondary"
        },
        {
          label: "WhatsApp ile bilgi al",
          href: dealershipInfo.whatsapp,
          tone: "primary"
        }
      ]
    }
  };
}
