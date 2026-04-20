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
  bodyStyle?: "SUV" | "Sedan" | "Coupe" | "Crossover";
  fuel?: "Benzin" | "Dizel";
  brand?: string;
  useCase?: "family" | "city" | "long" | "premium";
  electricRequested?: boolean;
};

const brandCatalog = Array.from(new Set(vehicles.map((vehicle) => vehicle.brand)));

export const advisorQuickActions: AdvisorQuickAction[] = [
  {
    id: "budget",
    label: "Butceme uygun arac bul",
    prompt: "Butceme uygun arac bulmama yardimci olur musun?"
  },
  {
    id: "suv",
    label: "SUV arac oner",
    prompt: "SUV arac onerir misin?"
  },
  {
    id: "electric",
    label: "Elektrikli arac goster",
    prompt: "Elektrikli arac gosterir misin?"
  },
  {
    id: "premium",
    label: "Premium araclari listele",
    prompt: "Premium araclara bakiyorum."
  },
  {
    id: "family",
    label: "Aile icin arac oner",
    prompt: "Aile kullanimi icin genis bir arac bakiyorum."
  },
  {
    id: "contact",
    label: "Hizli iletisime gec",
    prompt: "Hizli iletisime gecmek istiyorum."
  }
];

const startActions: AdvisorAction[] = [
  {
    label: "WhatsApp ile iletisime gec",
    href: dealershipInfo.whatsapp
  },
  {
    label: "Telefonla ara",
    href: `tel:${dealershipInfo.phoneRaw}`
  }
];

export const initialAdvisorMessage: AdvisorMessage = {
  id: "welcome",
  role: "assistant",
  text:
    "Merhaba, ben Galeri Danismani. Butcenize ve kullanim amaciniza gore size uygun araclari kisa sorularla onerebilirim.",
  actions: startActions
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
    normalized.includes("lux") ||
    normalized.includes("ust segment") ||
    normalized.includes("prestij")
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
    if (vehiclePrice <= preferences.budgetMax * 1.1) {
      score += 5;
    } else if (vehiclePrice <= preferences.budgetMax * 1.25) {
      score += 2;
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
      score += 2;
    }

    if (vehiclePrice <= 2_500_000) {
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
    reasons.push("butceye yakin");
  }

  if (preferences.bodyStyle && matchesBodyStyle(vehicle, preferences.bodyStyle)) {
    reasons.push("aradiginiz kasa tipine uygun");
  }

  if (preferences.fuel && normalizeText(vehicle.fuel).includes(normalizeText(preferences.fuel))) {
    reasons.push(`${preferences.fuel.toLocaleLowerCase("tr")} tercihinize uyuyor`);
  }

  if (preferences.brand && vehicle.brand === preferences.brand) {
    reasons.push(`${vehicle.brand} tercihinize uyuyor`);
  }

  if (preferences.useCase === "family") {
    reasons.push("aile kullanimi icin ferah");
  }

  if (preferences.useCase === "premium") {
    reasons.push("premium his veriyor");
  }

  if (reasons.length === 0) {
    reasons.push("stokta dikkat ceken bir secenek");
  }

  return reasons.slice(0, 2).join(", ");
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
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map((item) => toRecommendation(item.vehicle, preferences));
}

function needsContact(text: string) {
  const normalized = normalizeText(text);

  return (
    normalized.includes("iletisim") ||
    normalized.includes("arayin") ||
    normalized.includes("whatsapp") ||
    normalized.includes("telefon") ||
    normalized.includes("ulas")
  );
}

function askNextQuestion(preferences: AdvisorPreferences) {
  if (!preferences.budgetMax) {
    return "Yaklasik butce araliginiz nedir?";
  }

  if (!preferences.bodyStyle && !preferences.useCase) {
    return "SUV, sedan ya da aile kullanimi gibi bir onceliginiz var mi?";
  }

  if (!preferences.fuel && !preferences.electricRequested) {
    return "Yakitta benzin, dizel ya da farkli bir tercihiniz var mi?";
  }

  if (!preferences.brand) {
    return "Belli bir marka dusunuyor musunuz, yoksa secenekleri karistirayim mi?";
  }

  return undefined;
}

export function createAdvisorReply(
  userText: string,
  currentPreferences: AdvisorPreferences
): { nextPreferences: AdvisorPreferences; message: AdvisorMessage } {
  const nextPreferences = mergePreferences(currentPreferences, userText);
  const normalized = normalizeText(userText);

  if (needsContact(userText)) {
    return {
      nextPreferences,
      message: {
        id: `assistant-contact-${Date.now()}`,
        role: "assistant",
        text:
          "Isterseniz sizi hizlica satis ekibine yonlendireyim. WhatsApp veya telefonla aninda bilgi alabilirsiniz.",
        actions: startActions
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
          "Su an stokta elektrikli arac gorunmuyor. Dilerseniz size dusuk tuketimli sedan veya SUV secenekleri gosterebilirim.",
        actions: [
          {
            label: "SUV stoklarini ac",
            href: "/gallery?body=SUV"
          },
          {
            label: "WhatsApp ile sor",
            href: dealershipInfo.whatsapp
          }
        ]
      }
    };
  }

  const askQuestion = askNextQuestion(nextPreferences);

  if (askQuestion && !normalized.includes("oner") && !normalized.includes("liste")) {
    return {
      nextPreferences,
      message: {
        id: `assistant-question-${Date.now()}`,
        role: "assistant",
        text: `Size daha net arac onerebilmem icin bir sey daha sorayim. ${askQuestion}`
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
          "Bu filtrelere tam oturan stok bulamadim. Butceyi biraz esnetirsek ya da kasa tipini genisletirsek size daha iyi secenekler cikarabilirim.",
        actions: startActions
      }
    };
  }

  return {
    nextPreferences,
    message: {
      id: `assistant-reco-${Date.now()}`,
      role: "assistant",
      text:
        "Size uygun olabilecek birkac araci ayirdim. Isterseniz detay sayfasina gecin ya da hizli bilgi icin bize yazin.",
      recommendations,
      actions: startActions
    }
  };
}
