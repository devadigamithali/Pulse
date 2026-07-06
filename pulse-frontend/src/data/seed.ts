export interface Article {
  id: number;
  title: string;
  topic: string;
  summary: string;
  body: string;
}

export interface Step {
  id: number;
  title: string;
  body: string;
}

export interface WeatherSeason {
  season: string;
  emoji: string;
  temp: string;
  description: string;
  tip: string;
}

// IDs mirror server.js articles array so saves link up correctly
export const festivals: Article[] = [
  { id: 1,  title: "Gothenburg Film Festival — January",   topic: "Festivals", summary: "One of the world's largest winter film festivals with free open-air screenings at Bergsjön lake.", body: "Every January, Gothenburg hosts its legendary Film Festival. The outdoor screening on frozen Bergsjön is unmissable — wrap up warm and bring a thermos of glögg. Tickets to indoor screenings often sell out fast, so register at goteborgfilmfestival.se early. Most venues are around Götaplatsen and easily reached by tram." },
  { id: 2,  title: "Liseberg Amusement Park Opens — April", topic: "Festivals", summary: "Scandinavia's largest amusement park kicks off its season — a 3-minute tram ride from Korsvägen.", body: "Liseberg is practically a Gothenburg institution. The spring opening in April draws huge crowds for the first rides and outdoor concerts. Take tram 5 or 6 to Korsvägen. The park is free to enter — you pay per ride or buy a wristband. In summer, the garden concerts run until late." },
  { id: 3,  title: "Göteborg Culture Festival — August",    topic: "Festivals", summary: "Ten days of free street performances, world music, and food on Avenyn and Götaplatsen.", body: "The Culture Festival takes over the city centre every August. All performances are free and the main stage on Avenyn hosts acts from dozens of countries. It's a wonderful way to meet neighbours and try international street food. Check kulturkalaset.se for the programme closer to the date." },
  { id: 4,  title: "Lucia Parade — 13 December",            topic: "Festivals", summary: "Candlelit procession through Domkyrkan cathedral — a deeply moving Swedish tradition.", body: "Lucia is one of Sweden's most beautiful traditions. A procession of singers in white gowns carrying candles winds through Domkyrkan on the morning of 13 December. It's very family-friendly and deeply moving even if you don't speak Swedish. Arrive early — the church fills up quickly." },
  { id: 5,  title: "Hammarkullen Carnival — July",          topic: "Festivals", summary: "Scandinavia's largest multicultural street carnival, born in Gothenburg's most diverse neighbourhood.", body: "Hammarkullen Carnival is one of the most joyful events in the city and a true celebration of Gothenburg's diversity. Samba schools, steel drum bands, and dancers from dozens of cultures fill the streets. It starts at Hammarkulletorget — take tram 6 to Hammarkullen." },
  { id: 6,  title: "Surströmming Day at Haga — September",  topic: "Festivals", summary: "Traditional Swedish fermented herring tasting in the charming cobblestone district of Haga.", body: "Surströmming (fermented herring) is famously pungent but trying it is a genuine rite of passage. The September tasting event in Haga Nygata is good-humoured and welcoming to curious newcomers. Pair it with flatbread, red onion, and sour cream — and maybe hold your nose for the first sniff." },
];

export const marketplace: Article[] = [
  { id: 7,  title: "IKEA Hemnes bed frame — 500 SEK, Majorna",       topic: "Marketplace", summary: "140 cm bed frame in good condition, disassembled and ready for collection in Majorna.", body: "Moving out after two years in Gothenburg. IKEA Hemnes bed frame, 140 cm, white stain. Solid wood, a few small scuffs but structurally perfect. All screws and fixings included. Collection only from Majorna — I can help carry it down to a car. 500 SEK firm." },
  { id: 8,  title: "Community Bike Swap — Frölunda Torg, Saturdays", topic: "Marketplace", summary: "Free weekly bike exchange event at Frölunda Torg shopping centre car park.", body: "Every Saturday morning from 10:00–13:00, a volunteer-run bike swap happens in the Frölunda Torg car park. Bring a bike you no longer use and swap it for one that suits you better, or pick one up for free if you're just arriving. Bring ID. Helmets also available." },
  { id: 9,  title: "Swedish language books — SFI levels A1–B1",      topic: "Marketplace", summary: "Free to take — a box of Swedish textbooks left at the Lindholmen library community shelf.", body: "Finished my SFI course and leaving a box of A1–B1 Swedish workbooks at the community shelf in Lindholmen library. Includes Rivstart A1+A2, Mål 1, and a Swedish–English dictionary. First come, first served." },
  { id: 10, title: "Kitchen starter pack — pots, plates, cutlery",   topic: "Marketplace", summary: "8-piece kitchen set for 300 SEK — perfect for newly arrived students in Hisingen.", body: "Selling a kitchen starter pack: 2 pots, 1 frying pan, 4 plates, 4 bowls, cutlery for 4. All clean and functional. Collection from Hisingen near Backaplan. 300 SEK for the full set." },
  { id: 11, title: "Donated winter coats — Räddningsmissionen",       topic: "Marketplace", summary: "Free donated winter coats sizes S–L available weekdays at Räddningsmissionen charity shop.", body: "Räddningsmissionen runs a free coat donation scheme each autumn. Sizes S to L available most weekdays. Located near Järntorget. They also occasionally have boots and warm accessories. No appointment needed, just bring ID." },
  { id: 12, title: "Winter tires 195/65 R15 — 800 SEK, Angered",     topic: "Marketplace", summary: "Set of 4 Nokian winter tires in good condition. Bring a car with matching rims.", body: "Selling four Nokian Hakkapeliitta winter tires, 195/65 R15, about 60% tread left. Perfectly legal for Swedish winters. 800 SEK for all four. Collection from Angered. Available weekends only." },
];

export const activities: Article[] = [
  { id: 13, title: "Swedish for Immigrants (SFI) — Free Classes",          topic: "Community", summary: "Enrol in free Swedish language classes via Göteborgs Stad — starts any Monday.", body: "SFI is a free government-funded Swedish language course available to all registered residents. Courses run at multiple sites across Gothenburg and you can start on any Monday after registration. Enrol online at goteborg.se/sfi." },
  { id: 14, title: "Newcomers Running Club — Sundays, Slottsskogen",        topic: "Community", summary: "Friendly group run every Sunday at 10:00 from the main entrance to Slottsskogen park.", body: "All paces welcome — this is a social run, not a race. Meet at the main Slottsskogen entrance at 10:00 on Sundays. Routes are 5 or 8 km. Afterwards the group usually heads to a nearby café. No registration needed." },
  { id: 15, title: "Language Café at Stadsmissionen — Wednesdays",          topic: "Community", summary: "Practice Swedish or English in a relaxed setting with free fika every Wednesday at 18:00.", body: "Stadsmissionen runs a weekly Language Café where newcomers and locals chat over coffee and cake. It's completely informal — no classes, no pressure. Tables arranged by language level. Free to attend at Södra Allégatan 4." },
  { id: 16, title: "Padel for Beginners — Frölundaborg Saturdays",          topic: "Community", summary: "Group padel sessions for beginners, 150 SEK per person, all equipment provided.", body: "Frölundaborg sports centre runs newcomer-friendly padel sessions every Saturday afternoon. 150 SEK covers 90 minutes of court time and racket hire. No experience needed. Tram 2 to Frölunda Torg, then a 5-minute walk." },
  { id: 17, title: "Knitting & Crafts Circle — Gamlestaden",                topic: "Community", summary: "Monthly crafts meetup in Gamlestaden — free to join, all skill levels warmly welcomed.", body: "The Gamlestaden crafts circle meets on the first Thursday of each month at the local library. Bring whatever you're working on — knitting, embroidery, crochet — or come with nothing and just meet people. Tea and biscuits provided. Free entry." },
  { id: 18, title: "Volunteer at Hammarkullen Carnival",                    topic: "Community", summary: "Help organise Scandinavia's largest multicultural carnival — sign up at hammarkullenkarnevalen.se.", body: "The Hammarkullen Carnival relies on hundreds of volunteers each year. Roles range from costume making and route stewarding to technical support and children's activities. One of the best ways to make friends quickly. Sign up early at hammarkullenkarnevalen.se." },
];

export const movingSteps: Step[] = [
  { id: 1,  title: "Register at Skatteverket — get your personnummer",      body: "The personnummer (personal ID number) is the key to almost everything in Sweden — bank accounts, healthcare, internet subscriptions. Register at your local Skatteverket office in Gothenburg (Stampgatan 14). Bring passport and proof of address. Processing takes 1–4 weeks." },
  { id: 2,  title: "Open a Swedish bank account",                            body: "Swedbank and Handelsbanken both accept newcomers once you have your personnummer. Bring ID and your personnummer slip. Handelsbanken on Avenyn is especially helpful for new arrivals. Once you have an account you can get a Swish number (Sweden's mobile payment app — used everywhere)." },
  { id: 3,  title: "Register on Boplats — official housing queue",           body: "Boplats is Gothenburg's official housing queue for rental apartments. Registration is free and your queue time starts the moment you sign up. Most popular areas have waiting times of 3–7 years, but smaller apartments on Hisingen or in Angered move faster. Register at boplats.se immediately." },
  { id: 4,  title: "Get a Västtrafik travel card",                           body: "Västtrafik runs all trams, buses, and ferries in Gothenburg. A 30-day unlimited Zone A card costs around 850 SEK per month and covers the whole city. Buy at Pressbyrån kiosks or the Västtrafik app. The tram network is excellent — most people don't need a car within the city." },
  { id: 5,  title: "Register at a Vårdcentral (GP clinic)",                  body: "Register at a GP clinic close to your home via 1177.se — this becomes your primary healthcare contact. The 1177 number also has a nurse helpline available 24/7 in multiple languages. Emergency walk-in care is available at Närhälsan drop-in clinics across the city." },
  { id: 6,  title: "Sort out broadband (Stadsnät)",                          body: "Gothenburg has excellent fibre broadband infrastructure. Stadsnät is the main provider with the fastest speeds in the city centre. Bahnhof and Telia also operate on the same network. Most rental apartments already have a connection — check with your landlord before ordering separately." },
  { id: 7,  title: "Apply for CSN student funding if studying",              body: "If you're attending a Swedish university, apply for CSN (the Swedish student finance authority) immediately. Grants and low-interest loans are available regardless of nationality once you're a registered resident. Apply at csn.se — payments are monthly and can cover both fees and living costs." },
  { id: 8,  title: "Buy a bicycle — essential for city life",                body: "Gothenburg has over 800 km of dedicated bike lanes and cycling is genuinely the fastest way to get around the flat city centre. Buy second-hand at the Frölunda Torg bike swap or new at Cykelkungen on Avenyn. A decent lock (Kryptonite brand is popular here) is essential — register your bike at cykelregistret.se." },
];

export const visaSteps: Step[] = [
  { id: 1,  title: "EU/EEA citizens — just register at Skatteverket",       body: "If you're from an EU or EEA country, you have the right to live and work in Sweden without a visa. You only need to register at Skatteverket within 3 months of arrival to get your personnummer. No visa application required." },
  { id: 2,  title: "Work permit — apply via Migrationsverket",              body: "Non-EU citizens need a work permit before arriving. Your Swedish employer must advertise the role on the Swedish jobs board for 10 days. Once offered, apply at migrationsverket.se. Processing is currently around 3 months. Bring: job offer letter, passport, evidence of qualifications." },
  { id: 3,  title: "Self-employment permit",                                 body: "If you're starting your own business, apply for a self-employed work permit. You'll need a detailed business plan, proof of prior income in the same field, and evidence that you can support yourself (typically 200,000 SEK savings). Processing takes 4–6 months." },
  { id: 4,  title: "Family reunification",                                   body: "If your partner or parent is already a Swedish resident, apply for family reunification using Migrationsverket form 161011. You must both demonstrate stable income and adequate housing. Processing times are 6–18 months. Apply as early as possible." },
  { id: 5,  title: "Student visa",                                           body: "To study in Sweden you need a residence permit (not a visa in the traditional sense). You'll need an unconditional acceptance letter from a Swedish university, proof of sufficient funds (roughly 8,514 SEK per month), and valid health insurance. Apply at migrationsverket.se." },
  { id: 6,  title: "Permanent residence — after 4 years",                   body: "You can apply for permanent residence (permanent uppehållstillstånd) after 4 years of continuous legal residence in Sweden. You'll need to demonstrate employment or study throughout that period and have no criminal record. Permanent residents have almost the same rights as citizens." },
  { id: 7,  title: "Swedish citizenship — after 5 years",                   body: "Apply for citizenship after 5 years as a permanent resident. Requirements include basic Swedish language skills (though no formal test is currently required), proof of identity, and a clean record. Sweden allows dual citizenship, so you don't need to give up your original passport." },
];

export const foodGuide: Article[] = [
  { id: 101, title: "Saluhallen — Gothenburg's Indoor Market",    topic: "Food", summary: "Historic covered market since 1889 — try the meatballs, gravlax, and artisan cheese stalls.", body: "Saluhallen on Kungstorget has been feeding Gothenburgers since 1889. Inside you'll find butchers, fishmongers, delicatessens, and a wonderful kanelbulle bakery. The meatball lunch counter is legendary. Open Mon–Sat, closes 18:00. Tram 3, 9, or 11 to Grönsakstorget." },
  { id: 102, title: "Feskekôrka — the Fish Church",               topic: "Food", summary: "Iconic church-shaped fish market with the freshest West Coast seafood in the city.", body: "Feskekôrka (literally 'Fish Church') is Gothenburg's famous fish market, shaped like a gothic church on the Rosenlund canal. Buy fresh shrimp, oysters, and West Coast fish directly from the fishmonger. The restaurant upstairs serves excellent fish soup. Open Tue–Sat." },
  { id: 103, title: "Lykke Café, Haga — best kanelbulle in town", topic: "Food", summary: "Classic Swedish cinnamon bun experience in the cobblestone district of Haga.", body: "Haga Nygata is lined with cafés but Lykke stands out for its enormous, freshly baked kanelbullar (cinnamon buns). A Swedish institution — eat one with a black coffee and you'll feel immediately at home. The street itself is one of the most charming in the city. Tram 3 to Järntorget." },
  { id: 104, title: "Smaka — the best lunch deal on Vasaplatsen", topic: "Food", summary: "New Nordic lunch restaurant with a three-course deal at 130 SEK on Vasaplatsen.", body: "Smaka is beloved by locals for its rotating New Nordic lunch menu at remarkably low prices. The 130 SEK lunch includes a starter, main, and coffee. Book a table or arrive before 12:00 to get a spot. Located at Vasaplatsen — tram 2 or 13." },
  { id: 105, title: "Pho House — Vietnamese comfort food",         topic: "Food", summary: "Beloved Vietnamese restaurant in the city centre, open 7 days a week.", body: "Pho House near Brunnsparken is a go-to for pho, banh mi, and summer rolls. Popular with students and newcomers looking for a taste of home. The broths are made fresh daily. Reasonably priced, generous portions. A good first choice if you're new and need something familiar and comforting." },
  { id: 106, title: "Avenyn's Falafel Strip",                     topic: "Food", summary: "Late-night falafel spots between Kungsportsplatsen and Engelbrektsgatan — cheap and reliably good.", body: "After midnight on Avenyn, several falafel stands do a roaring trade. Portions are large, prices are fair (around 60–80 SEK), and they're open until 3am on weekends. Great for a first cheap meal when you've just arrived and haven't had time to shop yet." },
  { id: 107, title: "Döner på Hjul — Turkish food truck",          topic: "Food", summary: "Popular food truck near Brunnsparken, Mon–Fri 11:00–15:00.", body: "This Turkish food truck parks near Brunnsparken on weekdays and has a loyal following for its döner wraps and rice plates. Around 90 SEK for a filling meal. Cash or Swish only. Gets a queue by 12:15 so arrive early or go at 11:00." },
  { id: 108, title: "ICA Maxi Backaplan — global grocery aisles",  topic: "Food", summary: "Gothenburg's largest supermarket with dedicated halal, Asian, and Middle Eastern food sections.", body: "ICA Maxi at Backaplan is the place to stock up. It has the widest international food range in the city — halal meats, Japanese ingredients, South Asian spices, African produce, and more. It's also one of the cheapest options for staples. Tram 6 to Backaplan." },
];

export const weatherSeasons: WeatherSeason[] = [
  { season: "Winter", emoji: "❄️", temp: "−2°C to +5°C", description: "Grey, frequently rainy, only 7 hours of daylight in December. The cold feels damp rather than crisp. Snow arrives occasionally in January and February but rarely settles for long.", tip: "Buy waterproof boots immediately — this is non-negotiable. A good Gore-Tex jacket will serve you better than a thick down coat." },
  { season: "Spring", emoji: "🌸", temp: "6°C to 16°C", description: "Gothenburg wakes up dramatically in April. Outdoor café season begins in May when Swedes rush outside the moment it hits 15°C. Long bright evenings arrive fast.", tip: "Pack a light waterproof layer for April — showers are common. By May you can leave the heavy coat at home most days." },
  { season: "Summer", emoji: "☀️", temp: "18°C to 24°C", description: "Genuinely warm and sunny. Daylight until 22:30 at midsummer in late June. Swedes take this season very seriously — most of the city empties in July as people head to their summer cottages.", tip: "Sun protection is important even though it doesn't feel scorching. The long evening light can be disorienting — blackout curtains are a worthwhile investment." },
  { season: "Autumn", emoji: "🍂", temp: "5°C to 14°C", description: "September is golden and beautiful. October sees a rapid descent into darkness. First frost usually hits in late October; first snow possible in November.", tip: "Start layering in September. By November you'll want thermal base layers, wool socks (Ullmax or Woolpower are local favourites), and a good headlamp for the very dark evenings." },
];

export const packingTips = [
  { emoji: "🧥", item: "Gore-Tex waterproof jacket", reason: "Gothenburg is one of Sweden's wettest cities — you will need this year-round." },
  { emoji: "🧦", item: "Wool socks (Ullmax brand)", reason: "Swedish wool socks are world-class. Your feet will thank you between October and April." },
  { emoji: "👢", item: "Waterproof ankle boots", reason: "Cobblestones + rain = wet feet. Invest before your first week is over." },
  { emoji: "🌡️", item: "Thermal base layers", reason: "Layering is the Swedish strategy for coping with weather that changes three times a day." },
  { emoji: "💡", item: "Daylight lamp (SAD lamp)", reason: "Winters are genuinely dark. Many newcomers find a light therapy lamp makes a huge difference to mood." },
  { emoji: "🚲", item: "Bicycle + good lock", reason: "800 km of bike lanes make cycling the fastest and most enjoyable way to get around." },
];

export const news: Article[] = [
  { id: 19, title: "City Council Approves 2,000 New Affordable Homes",         topic: "News", summary: "Göteborgs Stad approved funding for 2,000 new social and affordable housing units across Hisingen and Angered.", body: "The city council announced this week that 2,000 new homes will be built over the next three years, prioritising Hisingen and Angered. Around 40% will be accessible through the Boplats queue. Part of the city's 2026–2030 housing strategy." },
  { id: 20, title: "Gothenburg–Malmö Express Train Cuts Journey to 2h 20min", topic: "News", summary: "A new high-speed rail connection makes same-day travel between Sweden's two largest cities practical.", body: "SJ launched the new express service this month. The Gothenburg–Malmö journey is now 2 hours 20 minutes. Prices start at 149 SEK booked in advance. The train stops at Varberg and Halmstad." },
  { id: 21, title: "SFI Enrolment Reaches Record 12,000 Students",             topic: "News", summary: "Free Swedish language courses in Västra Götaland are at record demand — some waiting lists apply.", body: "Vuxenutbildning Gothenburg reports record demand for SFI courses. While courses remain free, some popular time slots have 2–4 week waiting lists. Online evening courses have opened additional capacity. Register early at goteborg.se." },
  { id: 22, title: "Migrationsverket Cuts Work Permit Processing to 3 Months", topic: "News", summary: "Average processing time for new work permits has dropped from 8 months to approximately 3 months.", body: "The Swedish Migration Agency announced processing times for work permit applications have dropped after recruiting 200 new case officers. Straightforward applications submitted online are being processed fastest. Check your case status at migrationsverket.se." },
  { id: 23, title: "Gothenburg Named European Green Capital 2027",              topic: "News", summary: "The European Commission selected Gothenburg recognising its cycling infrastructure and clean energy transition.", body: "Gothenburg beat 14 other finalists to win the European Green Capital Award for 2027. Recognised for 800 km of bike lanes, 100% renewable electricity, and a zero-emission tram network. Comes with €600,000 in EU funding." },
  { id: 24, title: "New Community Health Centre Opens in Biskopsgården",        topic: "News", summary: "A new drop-in GP clinic has opened in Biskopsgården, offering appointments in Swedish, Arabic, and Somali.", body: "Västra Götalandsregionen opened a new vårdcentral in Biskopsgården this month. The clinic also provides mental health support and translation services. Register at 1177.se to make it your listed GP clinic." },
];

export const allArticles: Article[] = [
  ...festivals, ...marketplace, ...activities, ...foodGuide, ...news,
];

const TOPIC_ROUTES: Record<string, string> = {
  Festivals: "/festivals",
  Marketplace: "/marketplace",
  Community: "/activities",
  Food: "/food-guide",
  News: "/news",
};
export function topicRoute(topic: string): string {
  return TOPIC_ROUTES[topic] ?? "/";
}
