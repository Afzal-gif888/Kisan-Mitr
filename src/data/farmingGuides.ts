export type BilingualStep = {
  en: string[];
  te: string[];
};

export type FarmingGuide = {
  soilPreparation: BilingualStep;
  sowing: BilingualStep;
  irrigation: BilingualStep;
  fertilizers: BilingualStep;
  pestControl: BilingualStep;
  harvesting: BilingualStep;
};

const farmingGuides: Record<string, FarmingGuide> = {
  // 🌾 CEREALS
  paddy: {
    soilPreparation: {
      en: ["Plough the field and level properly", "Maintain water level before planting", "Add organic manure"],
      te: ["పొలాన్ని బాగా దున్ని చదును చేయాలి", "నాట్లు వేసే ముందు పొలంలో నీరు ఉంచాలి", "సేంద్రియ ఎరువులు వేయాలి"]
    },
    sowing: {
      en: ["Use nursery method", "Transplant seedlings after 20–25 days"],
      te: ["నారుమడి పద్ధతిని వాడాలి", "20-25 రొజుల తర్వాత నారు నాటాలి"]
    },
    irrigation: {
      en: ["Maintain standing water (2–5 cm)", "Ensure continuous water supply"],
      te: ["పొలంలో 2-5 సెం.మీ నీరు నిల్వ ఉంచాలి", "నిరంతరం నీటి సరఫరా ఉండేలా చూసుకోవాలి"]
    },
    fertilizers: {
      en: ["Apply urea, DAP, potash in split doses"],
      te: ["యూరియా, DAP, పొటాష్ లను దఫాలుగా వేయాలి"]
    },
    pestControl: {
      en: ["Control stem borer using recommended pesticide", "Monitor for brown plant hopper"],
      te: ["కాండం దొలుచు పురుగును నివారించడానికి మందులు వాడాలి", "సుడిదోమ ఆశించకుండా గమనించాలి"]
    },
    harvesting: {
      en: ["Harvest when grains turn golden yellow", "Drain water 10 days before harvest"],
      te: ["గింజలు బంగారు రంగులోకి మారినప్పుడు కోత కోయాలి", "కోతకు 10 రోజుల ముందు నీటిని తొలగించాలి"]
    }
  },
  maize: {
    soilPreparation: {
      en: ["Deep ploughing followed by harrowing", "Prepare ridges and furrows"],
      te: ["లోతుగా దుక్కి దున్నాలి", "బోదెలు మరియు కాలువలు సిద్ధం చేయాలి"]
    },
    sowing: {
      en: ["Sow seeds 3-5 cm deep", "Maintain spacing 60x20 cm"],
      te: ["విత్తనాలను 3-5 సెం.మీ లోతులో నాటాలి", "సాళ్ల మధ్య 60x20 సెం.మీ దూరం ఉంచాలి"]
    },
    irrigation: {
      en: ["Irrigate immediately after sowing", "Critical during tasseling and silking"],
      te: ["విత్తిన వెంటనే నీరు పెట్టాలి", "పూత దశలో నీటి అవసరం చాలా ముఖ్యం"]
    },
    fertilizers: {
      en: ["Apply nitrogen in 3 split doses", "Use zinc sulphate if soil is deficient"],
      te: ["నత్రజనిని 3 దఫాలుగా వేయాలి", "నేలలో లోపం ఉంటే జింక్ సల్ఫేట్ వాడాలి"]
    },
    pestControl: {
      en: ["Control fall armyworm with integrated pests management"],
      te: ["కత్తెర పురుగు నివారణకు సమగ్ర బదనికల నిర్వహణ చేపట్టాలి"]
    },
    harvesting: {
      en: ["Harvest when cobs dry and turn brown"],
      te: ["కంకులు ఎండి గోధుమ రంగులోకి మారినప్పుడు కోయాలి"]
    }
  },
  jowar: {
    soilPreparation: {
      en: ["Plough field and remove weeds", "Ensure good drainage"],
      te: ["పొలాన్ని దున్ని కలుపు తీయాలి", "సరైన నీటి పారుదల ఉండాలి"]
    },
    sowing: {
      en: ["Direct seed sowing", "Maintain row spacing of 45 cm"],
      te: ["నేరుగా విత్తనాలు నాటాలి", "సాళ్ల మధ్య 45 సెం.మీ దూరం ఉంచాలి"]
    },
    irrigation: {
      en: ["Minimal water required", "Irrigate during prolonged dry spells"],
      te: ["చాలా తక్కువ నీరు అవసరం", "తీవ్రమైన ఎద్దడి సమయంలో నీరు పెట్టాలి"]
    },
    fertilizers: {
      en: ["Apply nitrogen-based fertilizers", "Use compost during field preparation"],
      te: ["నత్రజని ఎరువులు వాడాలి", "దున్నే సమయంలో కంపోస్ట్ వేయాలి"]
    },
    pestControl: {
      en: ["Control shoot fly using pesticides", "Monitor for stem borer"],
      te: ["మొవ్వు ఈగను మందులతో నివారించాలి", "కాండం తొలుచు పురుగును గమనించాలి"]
    },
    harvesting: {
      en: ["Harvest when grains harden and moisture is low"],
      te: ["గింజలు గట్టిపడిన తర్వాత కోత కోయాలి"]
    }
  },
  bajra: {
    soilPreparation: {
      en: ["Prepare a fine tilth bed", "Clear previous crop residues"],
      te: ["మెత్తటి మట్టి ఉండేలా దున్నాలి", "పాత పంట అవశేషాలను తొలగించాలి"]
    },
    sowing: {
      en: ["Sow shallow at 2-3 cm depth", "Maintain 45x15 cm spacing"],
      te: ["2-3 సెం.మీ లోతులో నాటాలి", "సాళ్ల మధ్య 45x15 సెం.మీ దూరం ఉండాలి"]
    },
    irrigation: {
      en: ["Highly drought-tolerant, primarily rainfed", "Irrigate during flowering if absolutely dry"],
      te: ["వర్షాధార పంట కావడంతో ఎద్దడిని తట్టుకోగలదు", "అవసరమైతే పూత దశలో నీరు పెట్టాలి"]
    },
    fertilizers: {
      en: ["Apply basal dose of NPK", "Side-dress nitrogen after 30 days"],
      te: ["NPK ఎరువులు నాటేటపుడు వేయాలి", "30 రోజుల తర్వాత నత్రజని వేయాలి"]
    },
    pestControl: {
      en: ["Watch out for downy mildew", "Remove infected plants immediately"],
      te: ["బూజు తెగులు గమనించాలి", "రోగం ఉన్న మొక్కలను పీకేయాలి"]
    },
    harvesting: {
      en: ["Harvest earheads when grains are hard"],
      te: ["కంకులు గట్టిపడినప్పుడు కోత కోయాలి"]
    }
  },
  ragi: {
    soilPreparation: {
      en: ["Plough 2-3 times for extremely fine soil tilth", "Mix well-decomposed farm yard manure"],
      te: ["మెత్తటి పొలం కోసం 2-3 సార్లు దున్నాలి", "పశుపుల ఎరువును మట్టిలో కలపాలి"]
    },
    sowing: {
      en: ["Sow via broadcasting or line sowing", "Nursery raising is best for high yield"],
      te: ["వెదజల్లడం లేదా సాళ్లలో నాటడం చేయవచ్చు", "అధిక దిగుబడికి నారు పెంచుకోవాలి"]
    },
    irrigation: {
      en: ["Irrigate once every 10-12 days", "Avoid waterlogging at all costs"],
      te: ["ప్రతి 10-12 రోజులకొకసారి నీరు పెట్టాలి", "నీరు నిల్వ ఉండకుండా చూసుకోవాలి"]
    },
    fertilizers: {
      en: ["Respond well to organic compost", "Apply moderate nitrogen"],
      te: ["సేంద్రియ ఎరువులకు మంచి స్పందన ఉంటుంది", "కొద్దిపాటి నత్రజని వేయాలి"]
    },
    pestControl: {
      en: ["Monitor for blast disease", "Spray recommended fungicide if spotted"],
      te: ["అగ్గి తెగులును గమనించాలి", "అవసరమైతే ఫంగిసైడ్ పిచికారీ చేయాలి"]
    },
    harvesting: {
      en: ["Harvest earheads when they turn brown"],
      te: ["కంకులు గోధుమ రంగులోకి మారగానే కోయాలి"]
    }
  },

  // 🌱 PULSES
  redgram: {
    soilPreparation: {
      en: ["Ensure deep ploughing to break hardpans", "Level field to avoid water stagnation"],
      te: ["లోతుగా అంచులు దున్నాలి", "నీరు నిలవకుండా చదును చేయాలి"]
    },
    sowing: {
      en: ["Line sowing with seed drill", "Spacing of 60x20 cm is crucial"],
      te: ["సాళ్లలో నాటాలి", "60x20 సెం.మీ దూరం తప్పనిసరి"]
    },
    irrigation: {
      en: ["Irrigate at branching and pod formation", "Do not over-irrigate"],
      te: ["కొమ్మలు, కాయలు ఏర్పడే దశలో నీరు అవసరం", "మితిమీరి నీరు పెట్టకండి"]
    },
    fertilizers: {
      en: ["Requires less nitrogen, more phosphorus", "Apply sulfur for better yield"],
      te: ["నత్రజని తక్కువ, భాస్వరం ఎక్కువ వాడాలి", "దిగుబడికి సల్ఫర్ వేయాలి"]
    },
    pestControl: {
      en: ["Strict control of pod borer during flowering", "Use pheromone traps"],
      te: ["పూత సమయంలో శనగ పచ్చ పురుగును నివారించాలి", "లింగాకర్షక బుట్టలు వాడాలి"]
    },
    harvesting: {
      en: ["Harvest when 80% pods turn brown"],
      te: ["80% కాయలు ఎండిన తర్వాత కోయాలి"]
    }
  },
  greengram: {
    soilPreparation: {
      en: ["Requires medium fine tilth", "Remove all weed residues"],
      te: ["మట్టిని మామూలుగా దున్నాలి", "కలుపును పూర్తిగా అరికట్టాలి"]
    },
    sowing: {
      en: ["Treat seeds with Rhizobium culture", "Sow at 3-4 cm depth"],
      te: ["రైజోబియంతో విత్తనశుద్ధి చేయాలి", "3-4 సెం.మీ లోతులో నాటాలి"]
    },
    irrigation: {
      en: ["Usually grown on residual moisture", "Pre-sowing irrigation is beneficial"],
      te: ["నేల తేమ ఆధారంగానే పెరుగుతుంది", "విత్తే ముందు ఒకసారి నీరు పెట్టాలి"]
    },
    fertilizers: {
      en: ["Apply basal DAP", "Avoid heavy nitrogen application"],
      te: ["నాటే ముందు DAP వేయాలి", "అధిక నత్రజని వేయకూడదు"]
    },
    pestControl: {
      en: ["Monitor for whitefly and yellow mosaic virus", "Use yellow sticky traps"],
      te: ["తెల్ల దోమను నివారించాలి", "పసుపు రంగు అట్టలు వాడాలి"]
    },
    harvesting: {
      en: ["Pick pods when they turn black"],
      te: ["కాయలు నలుపు రంగుకు రాగానే కోయాలి"]
    }
  },
  blackgram: {
    soilPreparation: {
      en: ["Prepare a well-drained seedbed", "Plough twice to aerate soil"],
      te: ["నీరు పారుదల ఉన్న పొలాన్ని సిద్ధం చేయాలి", "గాలి కోసం రెండుసార్లు దున్నాలి"]
    },
    sowing: {
      en: ["Sow in rows 30 cm apart", "Use seed treatment before sowing"],
      te: ["లైన్ల మధ్య 30 సెం.మీ దూరం ఉంచాలి", "విత్తనశుద్ధి చేయాలి"]
    },
    irrigation: {
      en: ["Irrigate at flowering and pod filling stages", "Cannot tolerate waterlogging"],
      te: ["పూత మరియు కాయ దశలో నీరు తప్పనిసరి", "నీరు నిల్వ ఉంటె తట్టుకోలేదు"]
    },
    fertilizers: {
      en: ["Apply phosphorus and minimal nitrogen", "Use bio-fertilizers"],
      te: ["భాస్వరం ఎక్కువ, నత్రజని తక్కువ వేయాలి", "జీవ ఎరువులు వాడాలి"]
    },
    pestControl: {
      en: ["Protect against aphids and pod borers"],
      te: ["కాయ తొలిచే పురుగులను నివారించాలి"]
    },
    harvesting: {
      en: ["Harvest when pods are dry and black"],
      te: ["కాయలు ఎండి నల్లబడగానే కోయాలి"]
    }
  },
  bengalgram: {
    soilPreparation: {
      en: ["Deep ploughing during summer", "Conserve moisture in soil"],
      te: ["వేసవిలో లోతుగా దున్నాలి", "నేలలో తేమను సంరక్షించాలి"]
    },
    sowing: {
      en: ["Delay sowing until temperature drops slightly", "Maintain deep sowing 8-10 cm"],
      te: ["చలి మొదలయ్యే సమయంలో నాటాలి", "8-10 సెం.మీ లోతులో విత్తాలి"]
    },
    irrigation: {
      en: ["Mostly rainfed", "Provide light irrigation before flowering"],
      te: ["వర్షాధార పంట పంట రకం", "పూతకు ముందు తేలికపాటి తడి ఇవ్వాలి"]
    },
    fertilizers: {
      en: ["Give starter dose of nitrogen", "Focus on phosphorus"],
      te: ["చిన్నమొత్తంలో నత్రజని వేయాలి", "భాస్వరం పై దృష్టి పెట్టాలి"]
    },
    pestControl: {
      en: ["Gram pod borer is major threat; monitor closely"],
      te: ["శనగ పచ్చ పురుగు నియంత్రణ పై శ్రద్ధ వహించాలి"]
    },
    harvesting: {
      en: ["Harvest when plant turns yellow and dry"],
      te: ["మొక్క పసుపు రంగులోకి మారి ఎండినప్పుడు కోయాలి"]
    }
  },
  horsegram: {
    soilPreparation: {
      en: ["Prepare loose and well-drained soil", "Tolerant to poor soils"],
      te: ["తేలికపాటి పొలాన్ని సిద్ధం చేయాలి", "పేద నేలలను తట్టుకొంటుంది"]
    },
    sowing: {
      en: ["Broadcast or line sow", "Shallow sowing is sufficient"],
      te: ["వెదజల్లడం లేదా సాళ్లలో నాటాలి", "పైపైన నాటవచ్చు"]
    },
    irrigation: {
      en: ["Highly drought resistant", "Barely requires irrigation"],
      te: ["ఎద్దడిని బాగా తట్టుకుంటుంది", "నీటి అవసరం చాలా తక్కువ"]
    },
    fertilizers: {
      en: ["Can grow without external fertilizers", "Organic compost improves yield"],
      te: ["ఎరువులు లేకుండానే పెరుగుతుంది", "కంపోస్ట్ వాడితే దిగుబడి పెరుగుతుంది"]
    },
    pestControl: {
      en: ["Generally pest resistant", "Watch for leaf-eating caterpillars"],
      te: ["సాధారణంగా పురుగులు తక్కువగా ఆశిస్తాయి", "ఆకు తినే గొంగళి పురుగులను గమనించాలి"]
    },
    harvesting: {
      en: ["Harvest when plants completely dry out"],
      te: ["మొక్కలు పూర్తిగా ఎండిపోయిన తరువాత కోయాలి"]
    }
  },

  // 🌻 OILSEEDS
  groundnut: {
    soilPreparation: {
      en: ["Prepare loose and well-drained soil", "Avoid waterlogging to prevent root rot"],
      te: ["వదులైన, మురుగునీరు పోయే నేలను సిద్ధం చేయాలి", "వేరుకుళ్ళు నివారించడానికి నీరు నిలవకుండా చూడాలి"]
    },
    sowing: {
      en: ["Sow seeds 5 cm deep", "Maintain proper spacing (30x10 cm)"],
      te: ["విత్తనాలను 5 సెం.మీ లోతులో నాటాలి", "30x10 సెం.మీ దూరం ఉంచాలి"]
    },
    irrigation: {
      en: ["Light irrigation during flowering and pegging", "Avoid excess water"],
      te: ["పూత మరియు ఊడలు దిగే దశలో తేలికపాటి తడి ఇవ్వాలి", "అధిక నీరు ప్రమాదకరం"]
    },
    fertilizers: {
      en: ["Apply gypsum at flowering stage", "Use phosphorus for better pod formation"],
      te: ["పూత దశలో జిప్సం వేయాలి", "కాయలు బాగా ఊరడానికి భాస్వరం వాడాలి"]
    },
    pestControl: {
      en: ["Control leaf spot (tikka disease) using fungicide", "Monitor for white grubs"],
      te: ["టిక్కా తెగులు నివారణకు మందు వాడాలి", "తెల్ల పురుగును గమనించాలి"]
    },
    harvesting: {
      en: ["Harvest when leaves turn yellow and pods harden"],
      te: ["ఆకులు పసుపు రంగుకు మారి కాయలు గట్టిపడినప్పుడు కోయాలి"]
    }
  },
  sunflower: {
    soilPreparation: {
      en: ["Deep ploughing to break soil clods", "Ensure excellent drainage"],
      te: ["మట్టి గడ్డలు పగిలేలా లోతుగా దున్నాలి", "సరైన నీటి పారుదల కల్పించాలి"]
    },
    sowing: {
      en: ["Sow at 4-5 cm depth", "Keep 60 cm distance between rows"],
      te: ["4-5 సెం.మీ లోతులో విత్తాలి", "సాళ్ల మధ్య 60 సెం.మీ దూరం ఉంచాలి"]
    },
    irrigation: {
      en: ["Irrigate heavily during bud initiation and flowering", "Avoid water stress during seed filling"],
      te: ["మొగ్గ మరియు పూత దశలో గట్టి తడి ఇవ్వాలి", "గింజ పాలు పోసుకునే దశలో నీరు తప్పనిసరి"]
    },
    fertilizers: {
      en: ["Apply NPK balanced dose", "Use sulfur for higher oil content"],
      te: ["సమతుల్య NPK ఎరువులు వేయాలి", "నూనె శాతం పెరగడానికి సల్ఫర్ వాడాలి"]
    },
    pestControl: {
      en: ["Protect against head borer", "Avoid spraying during bee foraging hours"],
      te: ["పూత తొలిచే పురుగును నిర్మూలించాలి", "తేనెటీగలు తిరిగే సమయంలో మందులు చల్లకండి"]
    },
    harvesting: {
      en: ["Harvest when back of the head turns lemon yellow"],
      te: ["పువ్వు వెనుక భాగం నిమ్మ పసుపు రంగులోకి వచ్చినప్పుడు కోయాలి"]
    }
  },
  sesame: {
    soilPreparation: {
      en: ["Prepare exceptionally fine seedbed", "Level securely to prevent water stagnation"],
      te: ["సూక్ష్మమైన మట్టి ఉండేలా పొలం సిద్ధం చేయాలి", "నీరు నిలవకుండా చదును చేయాలి"]
    },
    sowing: {
      en: ["Mix small seeds with sand for even broadcasting", "Maintain shallow depth (1-2 cm)"],
      te: ["విత్తనాలను ఇసుకతో కలిపి వెదజల్లాలి", "1-2 సెం.మీ లోతులో మాత్రమే నాటాలి"]
    },
    irrigation: {
      en: ["Extremely sensitive to waterlogging", "Light irrigation during capsule formation"],
      te: ["నీరు నిల్వ ఉంటె పంట నాశనం అవుతుంది", "కాయలు ఏర్పడేటప్పుడు తేలికపాటి తడి ఇవ్వాలి"]
    },
    fertilizers: {
      en: ["Apply moderate nitrogen and phosphorus", "Organic manure gives stable yields"],
      te: ["కొద్దిపాటి నత్రజని మరియు భాస్వరం వాడాలి", "పశుపుల ఎరువుతో దిగుబడి పెరుగుతుంది"]
    },
    pestControl: {
      en: ["Control phyllody disease by managing leafhoppers"],
      te: ["ఆకు పచ్చ తెగులు నుండి రక్షించడానికి దోమలను నివారించాలి"]
    },
    harvesting: {
      en: ["Harvest when bottom capsules turn yellow to avoid shattering"],
      te: ["క్రింది కాయలు పసుపు రంగుకు మారగానే కోయాలి, లేదంటే గింజలు రాలుతాయి"]
    }
  },

  // 🌿 COMMERCIAL
  cotton: {
    soilPreparation: {
      en: ["Extremely deep ploughing (20+ cm)", "Prepare ridges and furrows"],
      te: ["20 సెం.మీ పైగా అతి లోతుగా దున్నాలి", "బోదెలు మరియు కాలువలు చేయాలి"]
    },
    sowing: {
      en: ["Sowing primarily done by dibbling", "Treat seeds for pests before sowing"],
      te: ["చిల్లులు చేసి విత్తాలి (dibbling)", "విత్తే ముందు విత్తనశుద్ధి తప్పనిసరి"]
    },
    irrigation: {
      en: ["Irrigate based on soil moisture depletion", "Critical during flowering and boll formation"],
      te: ["నేలలో తేమను బట్టి తడులు ఇవ్వాలి", "పూత, కాయ కట్టే దశలో నీరు అత్యంత ముఖ్యం"]
    },
    fertilizers: {
      en: ["Requires high NPK levels", "Foliar spray of micronutrients boosts boll size"],
      te: ["అధిక NPK ఎరువులు అవసరం", "సూక్ష్మ పోషకాలను పిచికారీ చేస్తే కాయ సైజు పెరుగుతుంది"]
    },
    pestControl: {
      en: ["Intense monitoring for pink bollworm and whitefly", "Implement Bt cotton or strict IPM schedules"],
      te: ["గులాబీ రంగు పురుగు మరియు తెల్లదోమ పై తీక్షణ నిఘా", "కచ్చితమైన పురుగుల మందు వాడకం ఉండాలి"]
    },
    harvesting: {
      en: ["Pick completely open, dry, fluffy bolls in morning"],
      te: ["ఉదయం పూట పూర్తిగా తెరుచుకున్న మరియు ఎండిన పత్తిని ఏరాలి"]
    }
  },
  sugarcane: {
    soilPreparation: {
      en: ["Deepest ploughing necessary with tractor", "Form rigorous ridges and furrows at 90cm spacing"],
      te: ["ట్రాక్టర్‌తో అత్యంత లోతుగా దున్నాలి", "90 సెం.మీ దూరంలో పటిష్టమైన బోదెలు చేయాలి"]
    },
    sowing: {
      en: ["Plant healthy two-bud setts end-to-end", "Treat setts with fungicide before planting"],
      te: ["ఆరోగ్యవంతమైన రెండు కణుపుల ముక్కలను వాడాలి", "నాటేముందు తెగులు మందులో ముంచి తీయాలి"]
    },
    irrigation: {
      en: ["Requires copious and continuous irrigation", "Irrigate every 7-10 days depending on soil"],
      te: ["భారీగా మరియు నిరంతర నీటి సరఫరా అవసరం", "నేలను బట్టి ప్రతి 7-10 రోజులకు నీరు పెట్టాలి"]
    },
    fertilizers: {
      en: ["Extremely heavy feeder of Nitrogen and Potassium", "Apply compost heavily during field prep"],
      te: ["నత్రజని మరియు పొటాషియం చాలా ఎక్కువగా ఆశిస్తుంది", "పొలం వేసేటప్పుడు కంపోస్ట్ బాగా వేయాలి"]
    },
    pestControl: {
      en: ["Manage early shoot borer using trash mulching", "Use biological control where possible"],
      te: ["మొవ్వు తొలిచే పురుగును నివారించడానికి చెత్తతో మల్చింగ్ చేయాలి", "జీవ నియంత్రణ ఉపయోగించాలి"]
    },
    harvesting: {
      en: ["Harvest after 10-14 months at peak sucrose maturity"],
      te: ["చక్కెర శాతం గరిష్టంగా ఉండే 10-14 నెలల వయసులో కోయాలి"]
    }
  },

  // 🍎 FRUITS & VEGETABLES
  mango: {
    soilPreparation: {
      en: ["Dig 1x1x1m pits spaced 10m apart", "Fill with topsoil and 20kg organic compost"],
      te: ["10 మీటర్ల దూరంలో 1x1x1 మీటర్ల గొయ్యి తీయాలి", "మురుగు మట్టి మరియు 20 కിലോల కంపోస్ట్ నింపాలి"]
    },
    sowing: {
      en: ["Plant grafted saplings during monsoon", "Stake young plants for support"],
      te: ["వర్షాకాలంలో అంటుకట్టిన మొక్కలను నాటాలి", "చిన్న మొక్కలకు మద్దతుగా కర్ర ఉంచాలి"]
    },
    irrigation: {
      en: ["Water every 3-4 days for young plants", "Mature trees need irrigation only during fruit development"],
      te: ["చిన్న మొక్కలకు ప్రతి 3-4 రోజులకు నీరు పెట్టాలి", "పెద్ద చెట్లకు కాయలు ఏర్పడేటప్పుడు మాత్రమే తడి అవసరం"]
    },
    fertilizers: {
      en: ["Apply NPK before monsoon and post-harvest", "Spray zinc/boron during flowering if deficient"],
      te: ["వర్షాకాలం ముందు మరియు కోత తర్వాత NPK వేయాలి", "లోపం ఉంటే పూత సమయంలో జింక్/బోరాన్ చల్లాలి"]
    },
    pestControl: {
      en: ["Manage mango hoppers and mealy bugs before flowering", "Prune affected branches"],
      te: ["తేనె మంచు పురుగులను అరికట్టాలి", "రోగం ఉన్న కొమ్మలను కత్తిరించాలి"]
    },
    harvesting: {
      en: ["Harvest mature green fruits using a net/pole"],
      te: ["బలమైన ఆకుపచ్చ కాయలను వల/కర్రతో కోయాలి"]
    }
  },
  banana: {
    soilPreparation: {
      en: ["Plough crosswise heavily", "Prepare deep pits or trenches"],
      te: ["పొలాన్ని అడ్డంగా లోతుగా దున్నాలి", "లోతైన గోతులు సిద్ధం చేయాలి"]
    },
    sowing: {
      en: ["Plant disease-free suckers or tissue-culture plants", "Apply nematicide at planting"],
      te: ["తెగులు లేని పిలకలు లేదా టిష్యూ కల్చర్ మొక్కలు నాటాలి", "నాటేటప్పుడు నెమటిసైడ్ వేయాలి"]
    },
    irrigation: {
      en: ["Requires massive, consistent hydration", "Drip irrigation yields the best results"],
      te: ["భారీగా, ఎల్లప్పుడూ తేమ అవసరం", "బిందు సేద్యం (Drip) ద్వారా అద్భుత ఫలితాలు వస్తాయి"]
    },
    fertilizers: {
      en: ["Demands incredibly high potassium (Potash)", "Apply fertilizers in 4-6 split doses"],
      te: ["పొటాష్ అత్యధికంగా గల ఎరువులు వాడాలి", "4-6 దఫాలుగా ఎరువులు వేయాలి"]
    },
    pestControl: {
      en: ["Protect against banana weevil and sigatoka leaf spot", "Remove dead leaves regularly"],
      te: ["అరటి పేను మరియు ఆకు మచ్చ తెగులు నుండి రక్షించాలి", "ఎండిన ఆకులను క్రమం తప్పకుండా తీసివేయాలి"]
    },
    harvesting: {
      en: ["Harvest bunch when fingers are fully rounded"],
      te: ["గెల లావుగా గుండ్రంగా మారినప్పుడు కోయాలి"]
    }
  },
  coconut: {
    soilPreparation: {
      en: ["Dig 1x1x1m pits filled with coconut husk and compost", "Ensure no hardpan beneath"],
      te: ["1 మీటర్ గొయ్యి తీసి కొబ్బరి పీచు, ఎరువుతో నింపాలి", "క్రింద గట్టి పొర లేకుండా చూసుకోవాలి"]
    },
    sowing: {
      en: ["Plant 9-12 month old robust seedlings", "Maintain 7.5x7.5m spacing"],
      te: ["9-12 నెలల వయసుగల దృఢమైన మొక్కలు నాటాలి", "7.5x7.5 మీటర్ల దూరం పాటించాలి"]
    },
    irrigation: {
      en: ["Provide 50-80 liters of water per tree every 3-4 days in summer", "Drip irrigation is highly recommended"],
      te: ["వేసవిలో ప్రతి 3-4 రోజులకు చెట్టుకి 50-80 లీటర్ల నీరు అవసరం", "బిందు సేద్యం (Drip) తప్పనిసరి"]
    },
    fertilizers: {
      en: ["Apply organic manure, nitrogen, and heavy potash annually", "Add common salt/magnesium if yellowing occurs"],
      te: ["సేంద్రియ ఎరువు, నత్రజని, పొటాష్ ప్రతీ ఏటా వేయాలి", "ఆకులు పసుపు రంగుకు మారితే ఉప్పు/మెగ్నీషియం వేయాలి"]
    },
    pestControl: {
      en: ["Rhinoceros beetle and red palm weevil are lethal threats", "Use prophylactic treatments in leaf axils"],
      te: ["ఎర్ర ముక్కు పురుగు మరియు కొమ్ము పురుగు నుండి కాపాడాలి", "ఆకుల మధ్య ముందుజాగ్రత్త మందులు వాడాలి"]
    },
    harvesting: {
      en: ["Harvest mature nuts every 45 days"],
      te: ["కోతకు వచ్చిన కొబ్బరికాయలను ప్రతి 45 రోజులకు తీయాలి"]
    }
  },
  tomato: {
    soilPreparation: {
      en: ["Prepare fine tilth raised beds", "Incorporate massive organic compost"],
      te: ["ఎత్తైన మడులు సిద్ధం చేయాలి", "సేంద్రియ ఎరువులు బాగా కలపాలి"]
    },
    sowing: {
      en: ["Raise seedlings in pro-trays in a shade net", "Transplant after 25 days"],
      te: ["షేడ్ నెట్‌లో ప్రో-ట్రేల ద్వారా నారు పెంచాలి", "25 రోజుల తర్వాత ప్రధాన పొలంలో నాటాలి"]
    },
    irrigation: {
      en: ["Drip irrigation yields the highest efficiency", "Maintain consistent moisture to prevent blossom end rot"],
      te: ["బిందు సేద్యం అతి ఉత్తమం", "కాయ కుళ్ళు నివారించడానికి క్రమం తప్పకుండా తేమ ఉంచాలి"]
    },
    fertilizers: {
      en: ["Apply starter phosphorus, heavy fruiting potassium", "Add calcium"],
      te: ["నాటేటప్పుడు భాస్వరం, కాయ దశలో ఎక్కువ పొటాషియం వాడాలి", "కాల్షియం వేయాలి"]
    },
    pestControl: {
      en: ["Monitor extreme threat of fruit borer; use pheromones", "Control whitefly to block leaf curl virus"],
      te: ["కాయ పురుగు నివారణకు లింగాకర్షక బుట్టలు వాడాలి", "ఆకు ముడత నివారించడానికి తెల్ల దోమను అరికట్టాలి"]
    },
    harvesting: {
      en: ["Harvest at breaker to red-ripe stage depending on distance to market"],
      te: ["మార్కెట్ దూరాన్ని బట్టి సగం పండిన లేదా పూర్తి ఎర్రటి కాయలు కోయాలి"]
    }
  },
  chilli: {
    soilPreparation: {
      en: ["Requires loose, exceptionally well-drained loam", "Deep plough thoroughly"],
      te: ["వదులైన, నీరు ఇంకే నల్లరేగడి/ఎర్ర నేలలు కావాలి", "లోతుగా దున్నాలి"]
    },
    sowing: {
      en: ["Transplant vigorous 30-day seedlings", "Dip roots in biocontrol agents"],
      te: ["బలమైన 30 రోజుల నారును నాటాలి", "వేర్లను మందు ద్రావణంలో ముంచి నాటాలి"]
    },
    irrigation: {
      en: ["Do not over-water; chilli hates wet feet", "Water immediately when leaves droop slightly"],
      te: ["అధిక నీరు ప్రమాదకరం, మిర్చి నీటి నిల్వను తట్టుకోలేదు", "ఆకులు వడలిన వెంటనే నీరు పెట్టాలి"]
    },
    fertilizers: {
      en: ["Needs huge potassium doses for sharp color and yield", "Apply split nitrogen"],
      te: ["రంగు, కారం కోసం అధిక మోతాదులో పొటాషియం వాడాలి", "నత్రజని దఫాలుగా వేయాలి"]
    },
    pestControl: {
      en: ["Thrips and mites destroy chilli yields rapidly; spray neem and miticides", "Control fruit rot"],
      te: ["తామర పురుగులు, నల్లి నుండి కాపాడేందుకు మందులు వాడాలి", "కాయ కుళ్ళును సకాలంలో నివారించాలి"]
    },
    harvesting: {
      en: ["Harvest green for immediate sale, or fully red for dry spice market"],
      te: ["కూరల కోసం పచ్చి మిర్చి, ఎండు మిర్చి కోసం పూర్తి ఎరుపు రంగులో కోయాలి"]
    }
  },
  onion: {
    soilPreparation: {
      en: ["Plough multiple times to ensure completely weed-free loose soil", "Create broad bed furrows"],
      te: ["కలుపు లేకుండా మట్టి మెత్తబడే వరకు దున్నాలి", "వెడల్పాటి ఎత్తైన మడులు సిద్ధం చేయాలి"]
    },
    sowing: {
      en: ["Transplant 45 day old seedlings", "Space tightly at 15x10 cm"],
      te: ["45 రోజుల నారును ప్రధాన పొలంలో నాటాలి", "15x10 సెం.మీ తక్కువ దూరంలో నాటాలి"]
    },
    irrigation: {
      en: ["Requires frequent, light irrigation", "Stop irrigation 10-15 days prior to harvest"],
      te: ["తరచుగా, తేలికపాటి తడులు అవసరం", "కోతకు 10-15 రోజుల ముందు నీరు నిలిపివేయాలి"]
    },
    fertilizers: {
      en: ["Requires heavy sulfur for pungency", "Apply basal NPK"],
      te: ["రుచి మరియు ఘాటు కోసం సల్ఫర్ తప్పనిసరి", "నాటేటప్పుడు NPK వేయాలి"]
    },
    pestControl: {
      en: ["Protect against massive thrip infestations", "Use yellow sticky traps heavily"],
      te: ["తామర పురుగుల దాడులను ఎదుర్కోవాలి", "పసుపు అట్టలను ఎక్కువగా వాడాలి"]
    },
    harvesting: {
      en: ["Harvest when 50% of the neck falls over", "Cure in the shade for 3-5 days"],
      te: ["50% ఆకులు రాలిపోయినప్పుడు పీకాలి", "తరువాత 3-5 రోజులు నీడలో ఆరబెట్టాలి"]
    }
  },
  turmeric: {
    soilPreparation: {
      en: ["Requires exceptionally well-drained, friable soils", "Plough to 25 cm depth and form ridges"],
      te: ["మురుగు నీరు పోయే వదులైన నేలలు అవసరం", "25 సెం.మీ లోతుగా దున్ని బోదెలు చేయాలి"]
    },
    sowing: {
      en: ["Plant healthy, disease-free rhizomes", "Mulch immediately after planting"],
      te: ["ఆరోగ్యవంతమైన పసుపు కొమ్ములను నాటాలి", "నాటిన వెంటనే ఆకులతో మల్చింగ్ చేయాలి"]
    },
    irrigation: {
      en: ["Needs steady moisture but absolute zero waterlogging", "Irrigate every 5-7 days based on climate"],
      te: ["స్థిరమైన తేమ ఉంచాలి కానీ నీరు అస్సలు నిల్వ ఉండకూడదు", "5-7 రోజులకొకసారి నీరు పెట్టాలి"]
    },
    fertilizers: {
      en: ["Heavy feeder; requires massive inputs of Farm Yard Manure", "Apply NPK splits"],
      te: ["ఎక్కువ ఎరువులు అవసరం, పశుపుల ఎరువు భారీగా వేయాలి", "NPK దఫాలుగా వాడాలి"]
    },
    pestControl: {
      en: ["Protect against shoot borer and rhizome rot", "Use Trichoderma viride in soil"],
      te: ["కాండం తొలుచు పురుగు, దుంప కుళ్ళు నుండి రక్షించాలి", "ట్రైకోడెర్మా విరిడే వాడాలి"]
    },
    harvesting: {
      en: ["Harvest when plants dry completely and fall completely flat"],
      te: ["మొక్కలు పసుపు రంగులోకి మారి నేలమీద పడిపోయినపుడు తవ్వాలి"]
    }
  },
  cashew: {
    soilPreparation: {
      en: ["Thrives in laterite soils; dig pits during summer", "Clear weed competition"],
      te: ["ఎర్ర గరుప నేలల్లో పెరుగుతుంది; వేసవిలో గోతులు తీయాలి", "కలుపు లేకుండా చేయాలి"]
    },
    sowing: {
      en: ["Plant softwood grafts for reliable yield", "Provide staking against wind"],
      te: ["అంటుకట్టిన మొక్కలను నాటండి", "గాలికి పడిపోకుండా కర్ర పాతాలి"]
    },
    irrigation: {
      en: ["Rainfed generally, but 200L/tree during flowering triples yield", "Do not waterlog"],
      te: ["వర్షాకాలం తర్వాత, పూత దశలో నీరు పోస్తే దిగుబడి మూడింతలు అవుతుంది", "నీరు నిలవరాదు"]
    },
    fertilizers: {
      en: ["Apply NPK in a circular trench 1.5m away from trunk", "Needs zinc foliar sprays"],
      te: ["చెట్టుకి 1.5 మీ. దూరంలో కందకం తీసి NPK వేయాలి", "జింక్ సల్ఫేట్ పిచికారీ చేయాలి"]
    },
    pestControl: {
      en: ["Tea mosquito bug is the biggest threat; spray during flushing and flowering", "Control stem borer mechanically"],
      te: ["టీ దోమను అరికట్టడానికి పూత సమయంలో మందు కొట్టాలి", "కాండం తొలిచే పురుగును తీసేయాలి"]
    },
    harvesting: {
      en: ["Collect fallen nuts or pluck fully developed mature nuts"],
      te: ["పండి కింద రాలిన జీడిపిక్కలని సేకరించాలి"]
    }
  }
};

export default farmingGuides;
