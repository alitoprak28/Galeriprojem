export type VehicleAspect = "portrait" | "landscape" | "cinema";

export type Vehicle = {
  slug: string;
  title: string;
  eyebrow: string;
  tagline: string;
  brand: string;
  series: string;
  bodyStyle: string;
  year: string;
  price: string;
  priceNote: string;
  monthlyPayment: string;
  mileage: string;
  fuel: string;
  transmission: string;
  drivetrain: string;
  power: string;
  color: string;
  seats: string;
  location: string;
  warranty: string;
  image: string;
  aspect: VehicleAspect;
  description: string;
  narrative: string;
  highlights: string[];
  atmosphere: string;
};

const createBlurDataURL = (from: string, to: string) =>
  `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1500">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="${from}" />
          <stop offset="100%" stop-color="${to}" />
        </linearGradient>
      </defs>
      <rect width="1200" height="1500" fill="url(#g)" />
    </svg>
  `)}`;

export const dealershipInfo = {
  name: "Maslak Oto Galeri",
  tagline: "İkinci El Otomobil Alım Satım",
  phoneDisplay: "+90 212 555 07 07",
  phoneRaw: "+902125550707",
  email: "iletisim@maslakotogaleri.com",
  whatsapp: "https://wa.me/905325550707",
  address: "Maslak Atatürk Oto Sanayi, Sarıyer / İstanbul",
  hours: "Pazartesi - Cumartesi / 09:00 - 19:00"
};

export const vehicles: Vehicle[] = [
  {
    slug: "porsche-911-turbo-s",
    title: "Porsche 911 Turbo S",
    eyebrow: "Yeni Giriş",
    tagline: "Günlük kullanıma uygun süper spor otomobil, kusursuz servis geçmişi ile.",
    brand: "Porsche",
    series: "911",
    bodyStyle: "Coupe",
    year: "2024",
    price: "₺4.980.000",
    priceNote: "KDV durumu ve takas opsiyonu için danışmanla görüşün.",
    monthlyPayment: "₺182.000 / ay",
    mileage: "8.400 km",
    fuel: "Benzin",
    transmission: "PDK Otomatik",
    drivetrain: "AWD",
    power: "650 hp",
    color: "GT Silver Metallic",
    seats: "4 koltuk",
    location: "İstanbul / Maslak",
    warranty: "Porsche Approved kontrolü hazır",
    image: "/cars/luxury-sedan-dark.jpg",
    aspect: "portrait",
    description:
      "Kapalı showroom stoklarımızın en hızlı ama en rafine otomobillerinden biri. Düşük kilometresi, şeffaf bakım geçmişi ve hatasız kozmetik durumu ile üst segment müşteri beklentisine doğrudan cevap verir.",
    narrative:
      "Bu araç; performans kadar güven arayan alıcılar için konumlandı. Yetkili servis kayıtları, orijinal boya durumu ve yüksek ikinci el likiditesi sayesinde karar sürecini hızlandırır.",
    highlights: ["Sport Chrono", "Ön aks kaldırma", "Bose surround"],
    atmosphere: "Hızlı teslim, koleksiyon seviyesinde kondisyon"
  },
  {
    slug: "mercedes-s580-4matic-long",
    title: "Mercedes-Benz S 580 4MATIC Long",
    eyebrow: "VIP Seçim",
    tagline: "Şoförlü kullanıma da bireysel lükse de yakışan, tam donanımlı uzun şasi.",
    brand: "Mercedes-Benz",
    series: "S-Serisi",
    bodyStyle: "Sedan",
    year: "2023",
    price: "₺6.750.000",
    priceNote: "Kurumsal alım ve noter süreci aynı gün planlanabilir.",
    monthlyPayment: "₺246.000 / ay",
    mileage: "12.900 km",
    fuel: "Mild Hybrid Benzin",
    transmission: "9G-TRONIC",
    drivetrain: "4MATIC",
    power: "503 hp",
    color: "Obsidian Black",
    seats: "5 koltuk",
    location: "İstanbul / Maslak",
    warranty: "Yetkili servis geçmişi eksiksiz",
    image: "/cars/showroom-luxury-front.jpg",
    aspect: "landscape",
    description:
      "Sessizlik, malzeme kalitesi ve arka yaşam alanı odaklı bu konfigürasyon; üst düzey yönetici ve aile kullanımı için özel seçildi.",
    narrative:
      "Bu sınıftaki araçlarda müşterinin baktığı üç şey nettir: kondisyon, servis geçmişi ve satış desteği. Ekspertiz, plaka devri ve lojistik akışı tek ekip tarafından yönetilir.",
    highlights: ["Burmester 4D", "Arka executive koltuk", "Panoramik tavan"],
    atmosphere: "Prestij, konfor ve temsil gücü"
  },
  {
    slug: "audi-rs6-avant-performance",
    title: "Audi RS 6 Avant Performance",
    eyebrow: "Hızlı Teslim",
    tagline: "Aile otomobili pratikliği ile süper otomobil karakterini tek gövdede toplar.",
    brand: "Audi",
    series: "RS 6",
    bodyStyle: "Performance Wagon",
    year: "2024",
    price: "₺5.890.000",
    priceNote: "Ekspertiz raporu ve detaylı video talep edilebilir.",
    monthlyPayment: "₺214.000 / ay",
    mileage: "6.200 km",
    fuel: "Benzin",
    transmission: "Tiptronic",
    drivetrain: "quattro",
    power: "630 hp",
    color: "Daytona Gray",
    seats: "5 koltuk",
    location: "İstanbul / Maslak",
    warranty: "Audi bakım kayıtları mevcut",
    image: "/cars/sedan-silver-side.jpg",
    aspect: "portrait",
    description:
      "RS modelleri içinde hem görsel etki hem kullanım esnekliği açısından en çok talep gören seçeneklerden biri. Boyasız gövdesi ve düşük kilometresi ile öne çıkıyor.",
    narrative:
      "Müşterinin bu araçta görmek istediği üç temel şey var: kondisyon, hikaye ve hız. Biz bu üçlüye ek olarak takas ve finansman tarafında da hızlı çözüm sunuyoruz.",
    highlights: ["RS Dynamic Package", "Seramik fren", "Bang & Olufsen"],
    atmosphere: "Aileye uygun, agresif, yüksek talep gören stok"
  },
  {
    slug: "bmw-x7-m60i-xdrive",
    title: "BMW X7 M60i xDrive",
    eyebrow: "Aile SUV",
    tagline: "Yedi kişilik lüks, güçlü V8 karakteri ve yüksek donanım paketi ile hazır.",
    brand: "BMW",
    series: "X7",
    bodyStyle: "Luxury SUV",
    year: "2023",
    price: "₺5.490.000",
    priceNote: "Kurumsal filo ve bireysel kullanım için ayrı teklif hazırlanır.",
    monthlyPayment: "₺199.000 / ay",
    mileage: "18.400 km",
    fuel: "Mild Hybrid Benzin",
    transmission: "8 İleri Otomatik",
    drivetrain: "xDrive",
    power: "530 hp",
    color: "Black Sapphire",
    seats: "7 koltuk",
    location: "İstanbul / Maslak",
    warranty: "Bakım paketi devam ediyor",
    image: "/cars/suv-bmw-front.jpg",
    aspect: "cinema",
    description:
      "Büyük aileler ve makam kullanımı için güçlü bir alternatif. İç mekandaki teknolojik atmosfer ile dışarıdaki görsel ağırlık dengeli biçimde birleşiyor.",
    narrative:
      "Bu stok, geniş hacim ve prestiji tek otomobilde isteyen müşteri için seçildi. Görüşme sürecinde koltuk düzeni, kullanım senaryosu ve takas opsiyonları beraber planlanır.",
    highlights: ["Sky Lounge", "Bowers & Wilkins", "M Sport diferansiyel"],
    atmosphere: "Geniş hacim, üst düzey temsil, güçlü motor"
  },
  {
    slug: "range-rover-autobiography-p530",
    title: "Range Rover Autobiography P530",
    eyebrow: "Showroom Favorisi",
    tagline: "Şehir içi prestij ve uzun yol konforunu aynı anda isteyenler için seçildi.",
    brand: "Range Rover",
    series: "Autobiography",
    bodyStyle: "Ultra Luxury SUV",
    year: "2024",
    price: "₺8.450.000",
    priceNote: "Özel sigorta ve kapalı taşıma desteği sunulur.",
    monthlyPayment: "₺308.000 / ay",
    mileage: "4.100 km",
    fuel: "Benzin",
    transmission: "Otomatik",
    drivetrain: "AWD",
    power: "530 hp",
    color: "Carpathian Grey",
    seats: "5 koltuk",
    location: "İstanbul / Maslak",
    warranty: "Land Rover onaylı bakım geçmişi",
    image: "/cars/suv-dark-garage.jpg",
    aspect: "portrait",
    description:
      "Autobiography paketi sayesinde malzeme kalitesi ve arka kabin deneyimi üst seviyede. Düşük kilometresi ve dikkatli kullanım geçmişi ile doğrudan üst segment alıcıya hitap ediyor.",
    narrative:
      "Bu tip araçlarda ilk telefon görüşmesinden teslimata kadar sürecin net olması önemlidir. Bu yüzden ekspertiz, takas, noter ve taşıma tarafını tek akışta yönetiyoruz.",
    highlights: ["Executive Class Seats", "Meridian Signature", "All wheel steering"],
    atmosphere: "Sessiz, ağırbaşlı ve çok güçlü bir lüks hissi"
  },
  {
    slug: "lexus-lx600-executive",
    title: "Lexus LX 600 Executive",
    eyebrow: "Nadir Konfigürasyon",
    tagline: "Arazi gücü ile makam konforunu tek gövdede birleştiren seçkin bir alternatif.",
    brand: "Lexus",
    series: "LX 600",
    bodyStyle: "Executive SUV",
    year: "2024",
    price: "₺7.290.000",
    priceNote: "Türkiye geneli teslimat planlanabilir.",
    monthlyPayment: "₺264.000 / ay",
    mileage: "9.600 km",
    fuel: "Benzin",
    transmission: "10 İleri Otomatik",
    drivetrain: "4x4",
    power: "409 hp",
    color: "Sonic Titanium",
    seats: "4 koltuk",
    location: "İstanbul / Maslak",
    warranty: "Lexus bakım geçmişi ve ekspertizi hazır",
    image: "/cars/suv-white-showroom.jpg",
    aspect: "landscape",
    description:
      "Türkiye pazarında sık rastlanmayan Executive konfigürasyon, arka yaşam alanına odaklanan üst segment alıcı için hazırlandı.",
    narrative:
      "Farklı marka arayan müşteriler için seçtiğimiz bu araç, kopya stoklardan uzak duran galeriler adına güçlü bir vitrin ürünüdür. Nadirdir, dikkat çeker ve satış masasında fark yaratır.",
    highlights: ["Mark Levinson", "Rear Executive Package", "Adaptif süspansiyon"],
    atmosphere: "Nadir, güvenli, yüksek temsil değeri"
  },
  {
    slug: "volkswagen-passat-business-1-5-etsi",
    title: "Volkswagen Passat 1.5 eTSI Business",
    eyebrow: "Yeni İlan",
    tagline: "Aile ve iş kullanımına uygun, temiz kondisyonlu ve düşük kilometreli sedan.",
    brand: "Volkswagen",
    series: "Passat",
    bodyStyle: "Sedan",
    year: "2023",
    price: "₺2.245.000",
    priceNote: "Detaylı ekspertiz ve takas değerlendirmesi için arayın.",
    monthlyPayment: "₺81.000 / ay",
    mileage: "41.200 km",
    fuel: "Benzin",
    transmission: "DSG Otomatik",
    drivetrain: "FWD",
    power: "150 hp",
    color: "Reflex Silver",
    seats: "5 koltuk",
    location: "İstanbul / Maslak",
    warranty: "Servis bakımlı",
    image: "/cars/luxury-sedan-dark.jpg",
    aspect: "landscape",
    description:
      "Daha klasik galeri müşterisinin çok aradığı, kolay satılan ve geniş kitleye hitap eden modellerden biridir.",
    narrative:
      "Fiyat-performans ve marka algısı dengeli olduğu için showroom trafiğinde hızlı dönen araç grubuna girer.",
    highlights: ["Geri görüş kamerası", "Adaptif hız sabitleme", "Digital Cockpit"],
    atmosphere: "Hızlı dönüşlü, güven veren ana stok"
  },
  {
    slug: "fiat-egea-cross-1-6-multijet",
    title: "Fiat Egea Cross 1.6 Multijet",
    eyebrow: "Ekonomik Seçim",
    tagline: "Düşük işletme maliyeti ve yüksek talep gören kasa yapısıyla güçlü vitrin aracı.",
    brand: "Fiat",
    series: "Egea Cross",
    bodyStyle: "Crossover",
    year: "2022",
    price: "₺1.125.000",
    priceNote: "Bireysel ve ticari kullanıcı için uygun finansman yönlendirmesi yapılır.",
    monthlyPayment: "₺41.000 / ay",
    mileage: "87.500 km",
    fuel: "Dizel",
    transmission: "Manuel",
    drivetrain: "FWD",
    power: "130 hp",
    color: "Titanyum Gri",
    seats: "5 koltuk",
    location: "İstanbul / Maslak",
    warranty: "Ekspertiz raporu hazır",
    image: "/cars/showroom-luxury-front.jpg",
    aspect: "portrait",
    description:
      "Günlük kullanıma uygun, pazarı hızlı olan ve geniş kitleye hitap eden bir stok. Klasik galeri müşteri akışında çok sorulan araçlardan biridir.",
    narrative:
      "Sade, temiz ve ulaşılabilir fiyatlı araçlar galerinin günlük satış ritmini taşır. Bu araç tam olarak o rol için konumlandırıldı.",
    highlights: ["Geri görüş kamerası", "CarPlay", "Çift bölgeli klima"],
    atmosphere: "Geniş müşteri kitlesine hitap eden ana stok"
  },
  {
    slug: "renault-megane-touch-edc",
    title: "Renault Megane Touch EDC",
    eyebrow: "Fırsat Aracı",
    tagline: "Otomatik vites, dengeli fiyat ve temiz kullanım geçmişiyle hızlı satılabilir stok.",
    brand: "Renault",
    series: "Megane",
    bodyStyle: "Sedan",
    year: "2021",
    price: "₺1.365.000",
    priceNote: "Ön rezervasyon ve kapora ile araç ayrılabilir.",
    monthlyPayment: "₺49.000 / ay",
    mileage: "69.300 km",
    fuel: "Benzin",
    transmission: "EDC Otomatik",
    drivetrain: "FWD",
    power: "140 hp",
    color: "Beyaz",
    seats: "5 koltuk",
    location: "İstanbul / Maslak",
    warranty: "Tramer ve ekspertiz özeti hazır",
    image: "/cars/sedan-silver-side.jpg",
    aspect: "cinema",
    description:
      "Sedan pazarında hızlı dönen, aile kullanımına uygun ve showroom ziyaretlerinde sık sorulan araç grubunda yer alır.",
    narrative:
      "Daha iş odaklı çalışan galeriler için bu tip araçlar vitrin kalabalığını satışa çevirir. Hızlı talep alır, karar süresi kısadır.",
    highlights: ["Otomatik vites", "Dokunmatik ekran", "LED far"],
    atmosphere: "Sade, net, günlük satış ritmine uygun"
  },
  {
    slug: "toyota-corolla-dream-xpack",
    title: "Toyota Corolla Dream X-Pack",
    eyebrow: "Güvenli Tercih",
    tagline: "Sorunsuzluk algısı yüksek, aile kullanıcılarının en çok sorduğu modellerden biri.",
    brand: "Toyota",
    series: "Corolla",
    bodyStyle: "Sedan",
    year: "2022",
    price: "₺1.590.000",
    priceNote: "Araç geçmişi ve boya ölçümleri danışman tarafından paylaşılır.",
    monthlyPayment: "₺57.000 / ay",
    mileage: "52.900 km",
    fuel: "Benzin",
    transmission: "Otomatik",
    drivetrain: "FWD",
    power: "123 hp",
    color: "İnci Beyaz",
    seats: "5 koltuk",
    location: "İstanbul / Maslak",
    warranty: "Yetkili servis bakımlı",
    image: "/cars/luxury-sedan-dark.jpg",
    aspect: "portrait",
    description:
      "Sorunsuzluk algısı ve güçlü ikinci el değeri nedeniyle klasik galeriler için güven veren vitrinin önemli parçasıdır.",
    narrative:
      "Kararsız müşteriyi rahatlatan araçların başında gelir. Pazarı geniştir, açıklaması kolaydır ve güven hissi yüksektir.",
    highlights: ["Güvenlik paketi", "Geri görüş kamerası", "Şerit takip"],
    atmosphere: "Güven odaklı, kolay anlatılan, hızlı talep alan"
  },
  {
    slug: "peugeot-3008-allure",
    title: "Peugeot 3008 Allure",
    eyebrow: "SUV Seçenek",
    tagline: "Crossover segmentinde aile müşterisi için dengeli donanım ve güçlü görünüm.",
    brand: "Peugeot",
    series: "3008",
    bodyStyle: "SUV",
    year: "2022",
    price: "₺1.975.000",
    priceNote: "Kasko, kredi ve takas senaryosu aynı görüşmede hazırlanabilir.",
    monthlyPayment: "₺71.000 / ay",
    mileage: "58.600 km",
    fuel: "Benzin",
    transmission: "Otomatik",
    drivetrain: "FWD",
    power: "130 hp",
    color: "Siyah",
    seats: "5 koltuk",
    location: "İstanbul / Maslak",
    warranty: "Kaporta ve ekspertiz raporu hazır",
    image: "/cars/suv-dark-garage.jpg",
    aspect: "landscape",
    description:
      "SUV arayan müşterilerin fiyat, donanım ve görünüm arasında kolay karar verdiği modellerden biridir.",
    narrative:
      "Bir galerinin stok yapısında hem üst segment hem aile SUV tarafı olmalı. Bu araç o boşluğu net şekilde doldurur.",
    highlights: ["Panoramik cam tavan", "Hayalet ekran", "Adaptif sürüş modları"],
    atmosphere: "Aile SUV pazarında kuvvetli vitrin aracı"
  },
  {
    slug: "honda-civic-eco-executive",
    title: "Honda Civic Eco Executive",
    eyebrow: "LPG Uyumlu",
    tagline: "Geniş müşteri kitlesine hitap eden, dayanıklılığı ile öne çıkan sedan seçenek.",
    brand: "Honda",
    series: "Civic",
    bodyStyle: "Sedan",
    year: "2021",
    price: "₺1.455.000",
    priceNote: "Araç takası ve noter planlaması hızlı biçimde yapılır.",
    monthlyPayment: "₺52.000 / ay",
    mileage: "74.800 km",
    fuel: "Benzin",
    transmission: "Otomatik",
    drivetrain: "FWD",
    power: "129 hp",
    color: "Gri",
    seats: "5 koltuk",
    location: "İstanbul / Maslak",
    warranty: "Ekspertiz ve servis özetleri hazır",
    image: "/cars/luxury-sedan-dark.jpg",
    aspect: "portrait",
    description:
      "Dayanıklılığı ve ikinci elde güçlü talebi sayesinde klasik galerilerde sürekli sorulan araç grubunda yer alır.",
    narrative:
      "İş odaklı stok yönetiminde pazarı oturmuş araçlar önemlidir. Civic bu açıdan güvenli ve hızlı dönen bir seçenektir.",
    highlights: ["Executive donanım", "Geri kamera", "Dijital klima"],
    atmosphere: "Geniş kitleye hitap eden güvenli stok"
  }
];

export const storyMetrics = [
  {
    label: "Aktif ilan",
    value: "120+"
  },
  {
    label: "Marka seçeneği",
    value: "18"
  },
  {
    label: "Günlük güncelleme",
    value: "Her gün"
  }
];

export const brandLabels = [
  "Porsche",
  "Mercedes-Benz",
  "Audi",
  "BMW",
  "Range Rover",
  "Lexus",
  "Volvo",
  "Maserati",
  "Bentley",
  "Land Rover",
  "Volkswagen",
  "Fiat",
  "Renault",
  "Toyota",
  "Peugeot",
  "Honda"
];

export const quickFinderOptions = {
  brands: ["Tümü", "Porsche", "Mercedes-Benz", "Audi", "BMW", "Range Rover", "Lexus", "Volkswagen", "Fiat", "Renault", "Toyota", "Peugeot", "Honda"],
  bodyStyles: ["Tümü", "Coupe", "Sedan", "Performance Wagon", "Luxury SUV", "Ultra Luxury SUV", "Executive SUV", "Crossover", "SUV"],
  fuels: ["Tümü", "Benzin", "Mild Hybrid Benzin", "Dizel"]
};

export const serviceHighlights = [
  {
    title: "Takas Yönetimi",
    description:
      "Mevcut aracınız aynı gün değerlenir, yeni stokla takas senaryosu satış danışmanı tarafından netleştirilir.",
    eyebrow: "Hızlı Değerleme"
  },
  {
    title: "Kredi ve Finansman",
    description:
      "Anlaşmalı banka ve finans kuruluşları üzerinden örnek ödeme planı hazırlanır. Evrak akışı satış danışmanı tarafından takip edilir.",
    eyebrow: "Satış Desteği"
  },
  {
    title: "Bağımsız Ekspertiz",
    description:
      "Araç geçmişi, boya durumu, kilometre ve mekanik görünüm müşterinin önüne şeffaf biçimde çıkarılır.",
    eyebrow: "Güven Katmanı"
  },
  {
    title: "Kapalı Teslimat",
    description:
      "İstanbul içi showroom teslimi, şehir dışı kapalı taşıma ve noter koordinasyonu tek akışta ilerler.",
    eyebrow: "Teslim Süreci"
  },
  {
    title: "Video Sunum",
    description:
      "İl dışındaki müşteri için yürüyüş videosu, ekspertiz özeti ve canlı görüşme hızlıca paylaşılır.",
    eyebrow: "Uzaktan Satış"
  },
  {
    title: "Satış Sonrası Yönlendirme",
    description:
      "Sigorta, bakım ve aksesuar tarafında müşteriye teslim sonrası da net yönlendirme yapılır.",
    eyebrow: "Müşteri Deneyimi"
  }
];

export const dealershipStats = [
  {
    label: "Aylık arama talebi",
    value: "540+"
  },
  {
    label: "Ortalama geri dönüş",
    value: "15 dk"
  },
  {
    label: "Türkiye geneli teslimat",
    value: "81 il"
  },
  {
    label: "Aktif showroom akışı",
    value: "Haftalık"
  }
];

export const customerStories = [
  {
    name: "Ayhan D.",
    city: "İstanbul",
    vehicle: "Volkswagen Passat",
    quote:
      "Passat için aradım, ekspertizi ve takas hesabını aynı gün öğrendim. Araç başında sürpriz çıkmadı."
  },
  {
    name: "Seda Y.",
    city: "Bursa",
    vehicle: "Peugeot 3008",
    quote:
      "İl dışından baktım; video, fiyat ve noter planı net geldi. Uğraştırmadan güven verdi."
  },
  {
    name: "Mehmet T.",
    city: "Ankara",
    vehicle: "Toyota Corolla",
    quote:
      "Aradığım şey gösteriş değil, temiz araç ve düzgün esnaflıktı. İkisini de burada gördüm."
  }
];

export const faqItems = [
  {
    question: "Araçların ekspertiz ve geçmiş bilgileri paylaşılabiliyor mu?",
    answer:
      "Evet. Her araç için ekspertiz, kilometre, boya ve servis geçmişi bilgileri talep halinde danışman tarafından detaylı biçimde paylaşılır."
  },
  {
    question: "Takas ve kredi süreci aynı anda ilerleyebilir mi?",
    answer:
      "Evet. Mevcut aracınızın ön değerlemesi ve yeni araç için finansman senaryosu aynı görüşmede birlikte planlanabilir."
  },
  {
    question: "Şehir dışından araç satın almak mümkün mü?",
    answer:
      "Mümkün. Video sunum, kapora, noter koordinasyonu ve kapalı taşıma desteği ile Türkiye genelinde teslimat organize edilir."
  },
  {
    question: "Araçları showroom’da görmek için randevu gerekiyor mu?",
    answer:
      "Randevu tavsiye edilir. Böylece araç hazırlanır, sıra beklemeden danışmanla görüşülür ve takas ya da kredi konusu aynı anda konuşulur."
  }
];

export const contactChannels = [
  {
    title: "WhatsApp'tan araç sorun",
    description: "Fiyat, ekspertiz özeti ve uygunluk durumunu birkaç mesajda öğrenin.",
    href: dealershipInfo.whatsapp,
    label: "WhatsApp Yaz"
  },
  {
    title: "Telefonla son fiyat alın",
    description: "Araç durumu, takas ve randevu için doğrudan satış ekibine bağlanın.",
    href: `tel:${dealershipInfo.phoneRaw}`,
    label: dealershipInfo.phoneDisplay
  },
  {
    title: "Kurumsal talep gönderin",
    description: "Toplu alım, filo ve kurumsal teklif için e-posta üzerinden ulaşın.",
    href: `mailto:${dealershipInfo.email}`,
    label: dealershipInfo.email
  }
];

export const blurDataURLBySlug: Record<string, string> = {
  "porsche-911-turbo-s": createBlurDataURL("#07090c", "#7e7e80"),
  "mercedes-s580-4matic-long": createBlurDataURL("#0b1016", "#8f97a2"),
  "audi-rs6-avant-performance": createBlurDataURL("#07090a", "#9da4ae"),
  "bmw-x7-m60i-xdrive": createBlurDataURL("#090909", "#7a6a54"),
  "range-rover-autobiography-p530": createBlurDataURL("#07090a", "#a29b92"),
  "lexus-lx600-executive": createBlurDataURL("#07111b", "#cfc9bf"),
  "volkswagen-passat-business-1-5-etsi": createBlurDataURL("#0b1016", "#8f97a2"),
  "fiat-egea-cross-1-6-multijet": createBlurDataURL("#07090a", "#9da4ae"),
  "renault-megane-touch-edc": createBlurDataURL("#090909", "#7a6a54"),
  "toyota-corolla-dream-xpack": createBlurDataURL("#07090a", "#a29b92"),
  "peugeot-3008-allure": createBlurDataURL("#07111b", "#cfc9bf"),
  "honda-civic-eco-executive": createBlurDataURL("#07090c", "#7e7e80")
};

export function getVehicleBySlug(slug: string) {
  return vehicles.find((item) => item.slug === slug);
}

export function getRelatedVehicles(slug: string, count = 2) {
  return vehicles.filter((item) => item.slug !== slug).slice(0, count);
}
