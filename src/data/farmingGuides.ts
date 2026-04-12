export type FarmingGuide = {
  soilPreparation: string[];
  sowing: string[];
  irrigation: string[];
  fertilizers: string[];
  pestControl: string[];
  harvesting: string[];
};

const farmingGuides: Record<string, FarmingGuide> = {
  // 🌾 CEREALS
  paddy: {
    soilPreparation: [
      "Plough the field and level properly",
      "Maintain water level before planting",
      "Add organic manure"
    ],
    sowing: [
      "Use nursery method",
      "Transplant seedlings after 20–25 days"
    ],
    irrigation: [
      "Maintain standing water (2–5 cm)",
      "Ensure continuous water supply"
    ],
    fertilizers: [
      "Apply urea, DAP, potash in split doses"
    ],
    pestControl: [
      "Control stem borer using recommended pesticide",
      "Monitor for brown plant hopper"
    ],
    harvesting: [
      "Harvest when grains turn golden yellow",
      "Drain water 10 days before harvest"
    ]
  },
  maize: {
    soilPreparation: [
      "Deep ploughing followed by harrowing",
      "Prepare ridges and furrows"
    ],
    sowing: [
      "Sow seeds 3-5 cm deep",
      "Maintain spacing 60x20 cm"
    ],
    irrigation: [
      "Irrigate immediately after sowing",
      "Critical during tasseling and silking"
    ],
    fertilizers: [
      "Apply nitrogen in 3 split doses",
      "Use zinc sulphate if soil is deficient"
    ],
    pestControl: [
      "Control fall armyworm with integrated pests management"
    ],
    harvesting: [
      "Harvest when cobs dry and turn brown"
    ]
  },
  jowar: {
    soilPreparation: [
      "Plough field and remove weeds",
      "Ensure good drainage"
    ],
    sowing: [
      "Direct seed sowing",
      "Maintain row spacing of 45 cm"
    ],
    irrigation: [
      "Minimal water required",
      "Irrigate during prolonged dry spells"
    ],
    fertilizers: [
      "Apply nitrogen-based fertilizers",
      "Use compost during field preparation"
    ],
    pestControl: [
      "Control shoot fly using pesticides",
      "Monitor for stem borer"
    ],
    harvesting: [
      "Harvest when grains harden and moisture is low"
    ]
  },
  bajra: {
    soilPreparation: [
      "Prepare a fine tilth bed",
      "Clear previous crop residues"
    ],
    sowing: [
      "Sow shallow at 2-3 cm depth",
      "Maintain 45x15 cm spacing"
    ],
    irrigation: [
      "Highly drought-tolerant, primarily rainfed",
      "Irrigate during flowering if absolutely dry"
    ],
    fertilizers: [
      "Apply basal dose of NPK",
      "Side-dress nitrogen after 30 days"
    ],
    pestControl: [
      "Watch out for downy mildew",
      "Remove infected plants immediately"
    ],
    harvesting: [
      "Harvest earheads when grains are hard"
    ]
  },
  ragi: {
    soilPreparation: [
      "Plough 2-3 times for extremely fine soil tilth",
      "Mix well-decomposed farm yard manure"
    ],
    sowing: [
      "Sow via broadcasting or line sowing",
      "Nursery raising is best for high yield"
    ],
    irrigation: [
      "Irrigate once every 10-12 days",
      "Avoid waterlogging at all costs"
    ],
    fertilizers: [
      "Respond well to organic compost",
      "Apply moderate nitrogen"
    ],
    pestControl: [
      "Monitor for blast disease",
      "Spray recommended fungicide if spotted"
    ],
    harvesting: [
      "Harvest earheads when they turn brown"
    ]
  },

  // 🌱 PULSES
  redgram: {
    soilPreparation: [
      "Ensure deep ploughing to break hardpans",
      "Level field to avoid water stagnation"
    ],
    sowing: [
      "Line sowing with seed drill",
      "Spacing of 60x20 cm is crucial"
    ],
    irrigation: [
      "Irrigate at branching and pod formation",
      "Do not over-irrigate"
    ],
    fertilizers: [
      "Requires less nitrogen, more phosphorus",
      "Apply sulfur for better yield"
    ],
    pestControl: [
      "Strict control of pod borer during flowering",
      "Use pheromone traps"
    ],
    harvesting: [
      "Harvest when 80% pods turn brown"
    ]
  },
  greengram: {
    soilPreparation: [
      "Requires medium fine tilth",
      "Remove all weed residues"
    ],
    sowing: [
      "Treat seeds with Rhizobium culture",
      "Sow at 3-4 cm depth"
    ],
    irrigation: [
      "Usually grown on residual moisture",
      "Pre-sowing irrigation is beneficial"
    ],
    fertilizers: [
      "Apply basal DAP",
      "Avoid heavy nitrogen application"
    ],
    pestControl: [
      "Monitor for whitefly and yellow mosaic virus",
      "Use yellow sticky traps"
    ],
    harvesting: [
      "Pick pods when they turn black"
    ]
  },
  blackgram: {
    soilPreparation: [
      "Prepare a well-drained seedbed",
      "Plough twice to aerate soil"
    ],
    sowing: [
      "Sow in rows 30 cm apart",
      "Use seed treatment before sowing"
    ],
    irrigation: [
      "Irrigate at flowering and pod filling stages",
      "Cannot tolerate waterlogging"
    ],
    fertilizers: [
      "Apply phosphorus and minimal nitrogen",
      "Use bio-fertilizers"
    ],
    pestControl: [
      "Protect against aphids and pod borers"
    ],
    harvesting: [
      "Harvest when pods are dry and black"
    ]
  },
  bengalgram: {
    soilPreparation: [
      "Deep ploughing during summer",
      "Conserve moisture in soil"
    ],
    sowing: [
      "Delay sowing until temperature drops slightly",
      "Maintain deep sowing 8-10 cm"
    ],
    irrigation: [
      "Mostly rainfed",
      "Provide light irrigation before flowering"
    ],
    fertilizers: [
      "Give starter dose of nitrogen",
      "Focus on phosphorus"
    ],
    pestControl: [
      "Gram pod borer is major threat; monitor closely"
    ],
    harvesting: [
      "Harvest when plant turns yellow and dry"
    ]
  },
  horsegram: {
    soilPreparation: [
      "Prepare loose and well-drained soil",
      "Tolerant to poor soils"
    ],
    sowing: [
      "Broadcast or line sow",
      "Shallow sowing is sufficient"
    ],
    irrigation: [
      "Highly drought resistant",
      "Barely requires irrigation"
    ],
    fertilizers: [
      "Can grow without external fertilizers",
      "Organic compost improves yield"
    ],
    pestControl: [
      "Generally pest resistant",
      "Watch for leaf-eating caterpillars"
    ],
    harvesting: [
      "Harvest when plants completely dry out"
    ]
  },
  cowpea: {
    soilPreparation: [
      "Thorough ploughing to remove weeds",
      "Well drained soil required"
    ],
    sowing: [
      "Sow 3-4 cm deep",
      "Ensure robust spacing for trailing varieties"
    ],
    irrigation: [
      "Drought-hardy but needs water during blooming",
      "Do not waterlog"
    ],
    fertilizers: [
      "Apply potassium and phosphorus",
      "Low nitrogen needed"
    ],
    pestControl: [
      "Control aphids and thrips early on"
    ],
    harvesting: [
      "Harvest tender pods for vegetables, dry pods for seeds"
    ]
  },

  // 🌻 OILSEEDS
  groundnut: {
    soilPreparation: [
      "Prepare loose and well-drained soil",
      "Avoid waterlogging to prevent root rot"
    ],
    sowing: [
      "Sow seeds 5 cm deep",
      "Maintain proper spacing (30x10 cm)"
    ],
    irrigation: [
      "Light irrigation during flowering and pegging",
      "Avoid excess water"
    ],
    fertilizers: [
      "Apply gypsum at flowering stage",
      "Use phosphorus for better pod formation"
    ],
    pestControl: [
      "Control leaf spot (tikka disease) using fungicide",
      "Monitor for white grubs"
    ],
    harvesting: [
      "Harvest when leaves turn yellow and pods harden"
    ]
  },
  sunflower: {
    soilPreparation: [
      "Deep ploughing to break soil clods",
      "Ensure excellent drainage"
    ],
    sowing: [
      "Sow at 4-5 cm depth",
      "Keep 60 cm distance between rows"
    ],
    irrigation: [
      "Irrigate heavily during bud initiation and flowering",
      "Avoid water stress during seed filling"
    ],
    fertilizers: [
      "Apply NPK balanced dose",
      "Use sulfur for higher oil content"
    ],
    pestControl: [
      "Protect against head borer",
      "Avoid spraying during bee foraging hours"
    ],
    harvesting: [
      "Harvest when back of the head turns lemon yellow"
    ]
  },
  sesame: {
    soilPreparation: [
      "Prepare exceptionally fine seedbed",
      "Level securely to prevent water stagnation"
    ],
    sowing: [
      "Mix small seeds with sand for even broadcasting",
      "Maintain shallow depth (1-2 cm)"
    ],
    irrigation: [
      "Extremely sensitive to waterlogging",
      "Light irrigation during capsule formation"
    ],
    fertilizers: [
      "Apply moderate nitrogen and phosphorus",
      "Organic manure gives stable yields"
    ],
    pestControl: [
      "Control phyllody disease by managing leafhoppers"
    ],
    harvesting: [
      "Harvest when bottom capsules turn yellow to avoid shattering"
    ]
  },
  whitesesame: {
    soilPreparation: [
      "Prepare an ultra-fine seedbed",
      "Ensure completely leveled field"
    ],
    sowing: [
      "Mix seeds with sand for uniform sowing",
      "Sow very shallow (1-1.5 cm)"
    ],
    irrigation: [
      "Requires dry conditions",
      "Water barely around flowering stage only"
    ],
    fertilizers: [
      "Use potassium to boost grain weight",
      "Apply urea post 30 days"
    ],
    pestControl: [
      "Monitor leaf webber closely",
      "Remove infected plants immediately"
    ],
    harvesting: [
      "Harvest right when leaves shed to prevent seed drop"
    ]
  },
  blacksesame: {
    soilPreparation: [
      "Same fine tilth requirement as white sesame",
      "Requires slightly more robust drainage"
    ],
    sowing: [
      "Line sowing is preferred over broadcasting",
      "Maintain precise spacing"
    ],
    irrigation: [
      "Do not irrigate during vegetative growth",
      "Give light irrigation at capsule filling"
    ],
    fertilizers: [
      "High phosphorus requirement for dark rich seeds",
      "Use sulfur"
    ],
    pestControl: [
      "Control gall midge and leaf roller"
    ],
    harvesting: [
      "Harvest when stems and pods turn yellowish"
    ]
  },
  castor: {
    soilPreparation: [
      "Deep ploughing is essential as castor has a deep taproot",
      "Break hardpans"
    ],
    sowing: [
      "Sow 2-3 seeds per hill",
      "Maintain very wide spacing (90x60 cm)"
    ],
    irrigation: [
      "Drought hardy, thrives on rare irrigation",
      "Irrigate every 20-25 days during dry periods"
    ],
    fertilizers: [
      "Heavy feeder of nitrogen",
      "Apply split doses every 40 days"
    ],
    pestControl: [
      "Castor semilooper is the prominent pest; spray aggressively"
    ],
    harvesting: [
      "Harvest capsules as they dry out periodically"
    ]
  },

  // 🌿 COMMERCIAL
  cotton: {
    soilPreparation: [
      "Extremely deep ploughing (20+ cm)",
      "Prepare ridges and furrows"
    ],
    sowing: [
      "Sowing primarily done by dibbling",
      "Treat seeds for pests before sowing"
    ],
    irrigation: [
      "Irrigate based on soil moisture depletion",
      "Critical during flowering and boll formation"
    ],
    fertilizers: [
      "Requires high NPK levels",
      "Foliar spray of micronutrients boosts boll size"
    ],
    pestControl: [
      "Intense monitoring for pink bollworm and whitefly",
      "Implement Bt cotton or strict IPM schedules"
    ],
    harvesting: [
      "Pick completely open, dry, fluffy bolls in morning"
    ]
  },
  sugarcane: {
    soilPreparation: [
      "Deepest ploughing necessary with tractor",
      "Form rigorous ridges and furrows at 90cm spacing"
    ],
    sowing: [
      "Plant healthy two-bud setts end-to-end",
      "Treat setts with fungicide before planting"
    ],
    irrigation: [
      "Requires copious and continuous irrigation",
      "Irrigate every 7-10 days depending on soil"
    ],
    fertilizers: [
      "Extremely heavy feeder of Nitrogen and Potassium",
      "Apply compost heavily during field prep"
    ],
    pestControl: [
      "Manage early shoot borer using trash mulching",
      "Use biological control where possible"
    ],
    harvesting: [
      "Harvest after 10-14 months at peak sucrose maturity"
    ]
  },
  tobacco: {
    soilPreparation: [
      "Requires light, well-aerated sandy loam",
      "Ensure absolute field sanitation"
    ],
    sowing: [
      "Raise seedlings in a strict nursery",
      "Transplant robust 6-week-old seedlings"
    ],
    irrigation: [
      "Avoid excess moisture which causes large, poor-quality leaves",
      "Light supplemental irrigation only"
    ],
    fertilizers: [
      "Potassium is incredibly critical for leaf burn-quality",
      "Limit nitrogen to avoid thick leaves"
    ],
    pestControl: [
      "Tobacco caterpillar requires aggressive monitoring",
      "Watch for mosaic virus and uproot infected plants"
    ],
    harvesting: [
      "Harvest leaves by priming (bottom-up as they mature)"
    ]
  },
  oilpalm: {
    soilPreparation: [
      "Clear forest/land thoroughly",
      "Dig massive planting holes (90x90x90 cm)"
    ],
    sowing: [
      "Plant 1-year-old certified nursery seedlings",
      "Maintain triangular spacing (9m x 9m x 9m)"
    ],
    irrigation: [
      "Requires continuous high moisture/rainfall",
      "Set up strict drip irrigation systems"
    ],
    fertilizers: [
      "Apply heavy potassium and magnesium annually",
      "Add large circles of organic mulch"
    ],
    pestControl: [
      "Control rhinoceros beetle and red palm weevil",
      "Use pheromone traps strategically"
    ],
    harvesting: [
      "Harvest ripe Fresh Fruit Bunches (FFB) every 10-15 days"
    ]
  },

  // 🍎 FRUITS
  mango: {
    soilPreparation: [
      "Dig 1x1x1m pits spaced 10m apart",
      "Fill with topsoil and 20kg organic compost"
    ],
    sowing: [
      "Plant grafted saplings during monsoon",
      "Stake young plants for support"
    ],
    irrigation: [
      "Water every 3-4 days for young plants",
      "Mature trees need irrigation only during fruit development"
    ],
    fertilizers: [
      "Apply NPK before monsoon and post-harvest",
      "Spray zinc/boron during flowering if deficient"
    ],
    pestControl: [
      "Manage mango hoppers and mealy bugs before flowering",
      "Prune affected branches"
    ],
    harvesting: [
      "Harvest mature green fruits using a net/pole"
    ]
  },
  banana: {
    soilPreparation: [
      "Plough crosswise heavily",
      "Prepare deep pits or trenches"
    ],
    sowing: [
      "Plant disease-free suckers or tissue-culture plants",
      "Apply nematicide at planting"
    ],
    irrigation: [
      "Requires massive, consistent hydration",
      "Drip irrigation yields the best results"
    ],
    fertilizers: [
      "Demands incredibly high potassium (Potash)",
      "Apply fertilizers in 4-6 split doses"
    ],
    pestControl: [
      "Protect against banana weevil and sigatoka leaf spot",
      "Remove dead leaves regularly"
    ],
    harvesting: [
      "Harvest bunch when fingers are fully rounded"
    ]
  },
  coconut: {
    soilPreparation: [
      "Dig 1x1x1m pits filled with coconut husk and compost",
      "Ensure no hardpan beneath"
    ],
    sowing: [
      "Plant 9-12 month old robust seedlings",
      "Maintain 7.5x7.5m spacing"
    ],
    irrigation: [
      "Provide 50-80 liters of water per tree every 3-4 days in summer",
      "Drip irrigation is highly recommended"
    ],
    fertilizers: [
      "Apply organic manure, nitrogen, and heavy potash annually",
      "Add common salt/magnesium if yellowing occurs"
    ],
    pestControl: [
      "Rhinoceros beetle and red palm weevil are lethal threats",
      "Use prophylactic treatments in leaf axils"
    ],
    harvesting: [
      "Harvest mature nuts every 45 days"
    ]
  },
  guava: {
    soilPreparation: [
      "Deep ploughing and leveling",
      "Prepare 60x60x60cm pits"
    ],
    sowing: [
      "Plant air-layered or grafted plants",
      "High-density planting is newly recommended"
    ],
    irrigation: [
      "Water immediately after planting",
      "Irrigate deeply once every 10 days in dry seasons"
    ],
    fertilizers: [
      "Apply farmyard manure 20kg per tree heavily",
      "Provide NPK in split doses"
    ],
    pestControl: [
      "Bag fruits early to prevent fruit fly infestation",
      "Control mealy bugs"
    ],
    harvesting: [
      "Harvest when dark green turns to light yellow-green"
    ]
  },
  papaya: {
    soilPreparation: [
      "Requires exceptional drainage; highly susceptible to water stagnation",
      "Use raised beds"
    ],
    sowing: [
      "Transplant 45-day old nursery seedlings",
      "Keep 2-3 seedlings per pit, thin males later"
    ],
    irrigation: [
      "Needs light but strictly regular irrigation",
      "Stem rot occurs instantly if water touches the stem"
    ],
    fertilizers: [
      "Heavy feeder; requires bi-monthly fertilizer application",
      "High nitrogen and potassium"
    ],
    pestControl: [
      "Papaya ringspot virus requires destroying infected plants immediately",
      "Control vectors like aphids"
    ],
    harvesting: [
      "Harvest when yellow streaks appear on fruit"
    ]
  },
  sapota: {
    soilPreparation: [
      "Dig 90x90x90cm pits",
      "Mix soil with neem cake and compost"
    ],
    sowing: [
      "Plant approach-grafted saplings",
      "Space adequately (8-10m)"
    ],
    irrigation: [
      "Requires steady moisture during early years",
      "Mature trees are somewhat drought hardy"
    ],
    fertilizers: [
      "Apply organic manure and NPK twice a year",
      "Foliar sprays increase fruit set"
    ],
    pestControl: [
      "Control chiku moth and fruit borer",
      "Remove webbed leaves"
    ],
    harvesting: [
      "Harvest when skin color turns light brown/orange and scurf easily falls"
    ]
  },
  cashew: {
    soilPreparation: [
      "Thrives in laterite soils; dig pits during summer",
      "Clear weed competition"
    ],
    sowing: [
      "Plant softwood grafts for reliable yield",
      "Provide staking against wind"
    ],
    irrigation: [
      "Rainfed generally, but 200L/tree during flowering triples yield",
      "Do not waterlog"
    ],
    fertilizers: [
      "Apply NPK in a circular trench 1.5m away from trunk",
      "Needs zinc foliar sprays"
    ],
    pestControl: [
      "Tea mosquito bug is the biggest threat; spray during flushing and flowering",
      "Control stem borer mechanically"
    ],
    harvesting: [
      "Collect fallen nuts or pluck fully developed mature nuts"
    ]
  },
  arecanut: {
    soilPreparation: [
      "Dig deep trenches or pits and provide 50% shade initially",
      "Requires excellent drainage"
    ],
    sowing: [
      "Plant 1-2 year old certified seedlings",
      "Space 2.7m x 2.7m"
    ],
    irrigation: [
      "Extremely sensitive to drought, requires highly frequent watering",
      "Use sprinklers or drip"
    ],
    fertilizers: [
      "Apply organic manure, compost, and chemical inputs annually",
      "Use green manure"
    ],
    pestControl: [
      "Protect against Koleroga (Fruit rot) with Bordeaux mixture before monsoon",
      "Monitor root grubs"
    ],
    harvesting: [
      "Harvest ripe yellowish-orange nuts or green nuts based on market demand"
    ]
  },

  // 🌶 VEGETABLES
  tomato: {
    soilPreparation: [
      "Prepare fine tilth raised beds",
      "Incorporate massive organic compost"
    ],
    sowing: [
      "Raise seedlings in pro-trays in a shade net",
      "Transplant after 25 days"
    ],
    irrigation: [
      "Drip irrigation yields the highest efficiency",
      "Maintain consistent moisture to prevent blossom end rot"
    ],
    fertilizers: [
      "Apply starter phosphorus, heavy fruiting potassium",
      "Add calcium"
    ],
    pestControl: [
      "Monitor extreme threat of fruit borer; use pheromones",
      "Control whitefly to block leaf curl virus"
    ],
    harvesting: [
      "Harvest at breaker to red-ripe stage depending on distance to market"
    ]
  },
  chilli: {
    soilPreparation: [
      "Requires loose, exceptionally well-drained loam",
      "Deep plough thoroughly"
    ],
    sowing: [
      "Transplant vigorous 30-day seedlings",
      "Dip roots in biocontrol agents"
    ],
    irrigation: [
      "Do not over-water; chilli hates wet feet",
      "Water immediately when leaves droop slightly"
    ],
    fertilizers: [
      "Needs huge potassium doses for sharp color and yield",
      "Apply split nitrogen"
    ],
    pestControl: [
      "Thrips and mites destroy chilli yields rapidly; spray neem and miticides",
      "Control fruit rot"
    ],
    harvesting: [
      "Harvest green for immediate sale, or fully red for dry spice market"
    ]
  },
  brinjal: {
    soilPreparation: [
      "Prepare raised beds or ridges",
      "Infuse heavy farm compost"
    ],
    sowing: [
      "Transplant 4-5 week old seedlings",
      "Space 60x60 cm"
    ],
    irrigation: [
      "Moderate but completely regular watering",
      "Drought stress severely drops flower count"
    ],
    fertilizers: [
      "Apply basal NPK and top-dress nitrogen every 3 weeks",
      "Zinc boosts production"
    ],
    pestControl: [
      "Shoot and fruit borer is the #1 enemy; use netting and strict spray schedules",
      "Rotate crops to prevent wilt"
    ],
    harvesting: [
      "Harvest when glossy and tender, before seeds harden"
    ]
  },
  onion: {
    soilPreparation: [
      "Requires ultra-fine, weed-free soil texture",
      "Use broad bed furrows"
    ],
    sowing: [
      "Transplant seedlings or use bulb sets",
      "Plant shallow (2-3 cm)"
    ],
    irrigation: [
      "Consistent light watering required",
      "Must completely stop irrigation 15 days before harvest"
    ],
    fertilizers: [
      "Apply sulfur rich fertilizers for sharp pungent smell",
      "Use phosphorus heavily"
    ],
    pestControl: [
      "Control thrips quickly to prevent leaf damage",
      "Watch for purple blotch fungus"
    ],
    harvesting: [
      "Harvest when 50-70% of neck tops fall over and dry"
    ]
  },
  okra: {
    soilPreparation: [
      "Prepare well-aerated soil",
      "Level properly"
    ],
    sowing: [
      "Soak seeds for 12 hours before sowing",
      "Dibble seeds directly onto ridges"
    ],
    irrigation: [
      "Water immediately after sowing",
      "Irrigate every 4-5 days"
    ],
    fertilizers: [
      "Apply basal dose followed by nitrogen side-dressing",
      "Avoid excess nitrogen to prevent pure vegetative, non-fruiting growth"
    ],
    pestControl: [
      "Yellow Vein Mosaic Virus is catastrophic; use resistant seeds and kill whiteflies",
      "Monitor fruit and shoot borer"
    ],
    harvesting: [
      "Harvest every 2-3 days when pods are aggressively tender and snap easily"
    ]
  },
  drumstick: {
    soilPreparation: [
      "Dig 45x45x45cm pits",
      "Add neem cake and manure"
    ],
    sowing: [
      "Sow seeds directly or plant cuttings",
      "Space 3m apart"
    ],
    irrigation: [
      "Highly drought resistant; water only slightly during early stages",
      "Hates waterlogging entirely"
    ],
    fertilizers: [
      "Extremely robust; grows well even natively without heavy fertilizing",
      "Organic compost boosts yield"
    ],
    pestControl: [
      "Hairy caterpillars defoliate leaves fast; burn congregations or spray chemically",
      "Prune regularly"
    ],
    harvesting: [
      "Harvest tender green pods; wait for dry pods if collecting seeds"
    ]
  },

  // 🌿 SPICES & BEVERAGES
  turmeric: {
    soilPreparation: [
      "Deep ploughing till fine tilth",
      "Form strict raised beds or ridges to avoid any rotting"
    ],
    sowing: [
      "Plant mother or finger rhizomes treated with fungicide",
      "Mulch immediately after planting"
    ],
    irrigation: [
      "Requires frequent moisture but strict zero-waterlogging policy",
      "Irrigate every week depending on climate"
    ],
    fertilizers: [
      "Heavy feeder. Apply 40 tons compost/ha plus high potassium/phosphorus doses"
    ],
    pestControl: [
      "Shoot borer destroys stems; apply neem formulations",
      "Rhizome rot requires strict drenching protocols"
    ],
    harvesting: [
      "Harvest when leaves turn fully yellow and begin drying up (7-9 months)"
    ]
  },
  coriander: {
    soilPreparation: [
      "Use well-drained loamy soil",
      "Add compost"
    ],
    sowing: [
      "Rub seeds lightly to split into two halves before sowing",
      "Broadcast or line sow"
    ],
    irrigation: [
      "Light watering regularly",
      "Avoid water stress during seed formation"
    ],
    fertilizers: [
      "Needs low nitrogen and high phosphorus",
      "Use organic manure"
    ],
    pestControl: [
      "Control aphids with neem spray",
      "Watch for powdery mildew"
    ],
    harvesting: [
      "Harvest leaves early for better quality, or wait for seeds to turn golden brown"
    ]
  },
  fenugreek: {
    soilPreparation: [
      "Prepare fine tilth soil",
      "Prepare flat beds"
    ],
    sowing: [
      "Sow seeds directly",
      "High density line sowing is effective"
    ],
    irrigation: [
      "Light irrigation only",
      "Do not water heavily; root rot sets in fast"
    ],
    fertilizers: [
      "Use organic compost heavily",
      "Requires minimal chemical inputs"
    ],
    pestControl: [
      "Avoid water stagnation to prevent disease",
      "Monitor mild aphid populations"
    ],
    harvesting: [
      "Harvest leaves in 25–30 days or wait for dry seeds"
    ]
  },
  mustard: {
    soilPreparation: [
      "Well-drained soil required",
      "Prepare a firm, fine seedbed"
    ],
    sowing: [
      "Sow purely in rows",
      "Maintain shallow depth of 2cm"
    ],
    irrigation: [
      "Limited irrigation required",
      "Pre-flowering and pod-filling are critical water stages"
    ],
    fertilizers: [
      "Apply massive sulfur-based fertilizers to boost mustard oil content",
      "Apply nitrogen and phosphorus"
    ],
    pestControl: [
      "Monitor closely for mustard aphid; spray azadirachtin/neem oil",
      "Manage white rust"
    ],
    harvesting: [
      "Harvest when pods turn distinct yellow to avoid scattering"
    ]
  },
  cumin: {
    soilPreparation: [
      "Extreme fine tilth required",
      "Remove all organic debris from previous crops"
    ],
    sowing: [
      "Broadcast seeds uniformly",
      "Rake soil lightly to cover seeds thinly"
    ],
    irrigation: [
      "First irrigation immediately after sowing",
      "Second irrigation 8-10 days later to guarantee germination"
    ],
    fertilizers: [
      "Apply moderate NPK",
      "Do not over-fertilize"
    ],
    pestControl: [
      "Wilt disease is catastrophic; use strict crop rotation and treat seeds",
      "Watch for aphids"
    ],
    harvesting: [
      "Harvest when plants turn yellowish-brown entirely"
    ]
  },
  coffee: {
    soilPreparation: [
      "Clear forest selectively to retain partial shade",
      "Dig large 45x45x45cm pits on contours"
    ],
    sowing: [
      "Plant polybag nursery seedlings",
      "Ensure proper planting of shade trees (silver oak) simultaneously"
    ],
    irrigation: [
      "Requires sprinkler irrigation (blossom showers) in February/March to induce flowering",
      "Rainfed rest of the year"
    ],
    fertilizers: [
      "Apply massive NPK amounts in split doses after monsoon",
      "Incorporate heavy leaf litter mulch"
    ],
    pestControl: [
      "White stem borer is the ultimate enemy; scrub stems and spray",
      "Manage coffee berry borer"
    ],
    harvesting: [
      "Carefully cherry-pick only ripe red berries continuously over weeks"
    ]
  },
  pepper: {
    soilPreparation: [
      "Pepper is a vine; ensure live support trees (silver oak, erythrina) are well established",
      "Ensure rich organic forest-like soil base"
    ],
    sowing: [
      "Plant rooted cuttings near the support tree",
      "Tie vines loosely to encourage vertical growth"
    ],
    irrigation: [
      "Needs heavy monsoon rain but zero stagnation",
      "Provide light irrigation in summer for high yields"
    ],
    fertilizers: [
      "Heavy organic manure application is non-negotiable",
      "Apply NPK split twice a year"
    ],
    pestControl: [
      "Quick wilt (Phytophthora) is deadly; drench root zone securely with Bordeaux mixture",
      "Watch for poll beetle"
    ],
    harvesting: [
      "Harvest spikes when 1-2 berries turn red or yellow"
    ]
  }
};

export default farmingGuides;
