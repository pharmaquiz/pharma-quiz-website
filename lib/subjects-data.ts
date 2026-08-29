export interface SubjectData {
  id: string;
  name: string;
  slug: string;
  shortDesc: string;
  longDesc: string;
  iconName: string;
  topics: string[];
  sampleQuestions: {
    question: string;
    options: string[];
    answerIndex: number;
    explanation: string;
  }[];
  colorGradient: string;
  accentColor: string;
}

export const PHARMACY_SUBJECTS: SubjectData[] = [
  {
    id: "pharmacology",
    name: "Pharmacology",
    slug: "pharmacology",
    shortDesc: "Drug mechanisms, pharmacokinetics, therapeutic uses, and adverse effects across major organ systems.",
    longDesc: "Deepen your understanding of how drugs interact with biological systems. Master pharmacodynamics, receptor theory, autonomic pharmacology, cardiovascular therapeutics, antimicrobial agents, and toxicology through targeted practice.",
    iconName: "Pill",
    topics: [
      "General Pharmacology & Pharmacokinetics",
      "Autonomic Nervous System (ANS)",
      "Cardiovascular & Renal System Drugs",
      "Central Nervous System (CNS) Agents",
      "Chemotherapy & Antimicrobial Agents",
      "Endocrine & Autacoid Pharmacology"
    ],
    sampleQuestions: [
      {
        question: "Which of the following is a selective beta-1 adrenergic receptor antagonist?",
        options: ["Propranolol", "Atenolol", "Salbutamol", "Prazosin"],
        answerIndex: 1,
        explanation: "Atenolol is a cardioselective beta-1 adrenergic receptor blocker commonly used in hypertension and angina management."
      }
    ],
    colorGradient: "from-teal-500 to-emerald-700",
    accentColor: "teal"
  },
  {
    id: "pharmaceutics",
    name: "Pharmaceutics",
    slug: "pharmaceutics",
    shortDesc: "Dosage form design, formulation science, biopharmaceutics, and pharmaceutical manufacturing.",
    longDesc: "Explore the science of transforming a new chemical entity into a safe and effective medication. Master formulation techniques, kinetics, novel drug delivery systems, sterilization, and solid/liquid dosage forms.",
    iconName: "FlaskConical",
    topics: [
      "Solid Dosage Forms (Tablets & Capsules)",
      "Liquid & Semisolid Formulations",
      "Biopharmaceutics & Pharmacokinetics",
      "Novel Drug Delivery Systems (NDDS)",
      "Sterilization & Aseptic Processing",
      "Pharmaceutical Calculations & Posology"
    ],
    sampleQuestions: [
      {
        question: "Which excipient is commonly employed as a superdisintegrant in fast-dissolving tablet formulations?",
        options: ["Croscarmellose sodium", "Magnesium stearate", "Talc", "Methylcellulose"],
        answerIndex: 0,
        explanation: "Croscarmellose sodium is an internally cross-linked sodium carboxymethylcellulose used as a superdisintegrant."
      }
    ],
    colorGradient: "from-cyan-500 to-blue-700",
    accentColor: "cyan"
  },
  {
    id: "pharmaceutical-chemistry",
    name: "Pharmaceutical Chemistry",
    slug: "pharmaceutical-chemistry",
    shortDesc: "Medicinal chemistry, structure-activity relationships (SAR), synthesis, and organic drug chemistry.",
    longDesc: "Analyze chemical structures, medicinal properties, stereochemistry, and analytical methods. Practice identifying functional groups, pharmacophores, metabolic pathways, and spectroscopic interpretations.",
    iconName: "Atom",
    topics: [
      "Structure-Activity Relationships (SAR)",
      "Drug Design & Computational Chemistry",
      "Heterocyclic Chemistry & Drug Synthesis",
      "Pharmaceutical Analysis (HPLC, UV, NMR, Mass)",
      "Drug Metabolism & Prodrug Concepts",
      "Inorganic Pharmaceutical Chemistry"
    ],
    sampleQuestions: [
      {
        question: "The core nucleus present in the Penicillin class of antibacterial antibiotics is:",
        options: ["Thiazolidine and beta-lactam ring (Penam)", "Dihydrothiazine ring (Cephem)", "Benzodiazepine ring", "Isoquinoline ring"],
        answerIndex: 0,
        explanation: "Penicillins possess a fused 6-aminopenicillanic acid nucleus comprising a beta-lactam ring fused with a thiazolidine ring."
      }
    ],
    colorGradient: "from-blue-600 to-indigo-800",
    accentColor: "blue"
  },
  {
    id: "pharmacognosy",
    name: "Pharmacognosy",
    slug: "pharmacognosy",
    shortDesc: "Natural drugs, medicinal plants, phytochemistry, extraction, and standardization of herbal remedies.",
    longDesc: "Learn the classification, morphological evaluation, chemical constituents, and therapeutic applications of crude drugs derived from plants, animals, and mineral sources.",
    iconName: "Leaf",
    topics: [
      "Alkaloids, Glycosides, Tannins & Terpenoids",
      "Herbal Drug Standardization & Quality Control",
      "Phytochemical Screening & Extraction Methods",
      "Plant Tissue Culture & Biotechnology",
      "Traditional Systems of Medicine (Ayurveda, Siddha, Unani)",
      "Nutraceuticals & Cosmeceuticals"
    ],
    sampleQuestions: [
      {
        question: "Which chemical test is used for the qualitative identification of anthraquinone glycosides?",
        options: ["Borntrager's test", "Keller-Kiliani test", "Dragendorff's test", "Shinoda test"],
        answerIndex: 0,
        explanation: "Borntrager's and Modified Borntrager's tests are standard identification tests for anthraquinone glycosides (e.g., Senna, Aloe)."
      }
    ],
    colorGradient: "from-emerald-500 to-green-700",
    accentColor: "emerald"
  },
  {
    id: "human-anatomy-physiology",
    name: "Human Anatomy & Physiology",
    slug: "human-anatomy-physiology",
    shortDesc: "Body systems, tissue histology, organ functions, and biological homeostasis essential for pharmacy.",
    longDesc: "Build the physiological foundation required for understanding pathology and pharmacology. Review cardiovascular dynamics, nervous pathways, renal excretion, endocrine control, and gastrointestinal mechanics.",
    iconName: "Activity",
    topics: [
      "Cellular Physiology & Homeostasis",
      "Cardiovascular & Respiratory Systems",
      "Central & Peripheral Nervous Systems",
      "Renal & Urinary System Mechanisms",
      "Endocrine System & Hormonal Regulation",
      "Gastrointestinal & Immune Physiology"
    ],
    sampleQuestions: [
      {
        question: "The primary functional and filtration unit of the human kidney is known as the:",
        options: ["Nephron", "Glomerulus", "Loop of Henle", "Collecting duct"],
        answerIndex: 0,
        explanation: "The nephron is the microscopic structural and functional unit responsible for filtering blood and producing urine."
      }
    ],
    colorGradient: "from-rose-500 to-red-700",
    accentColor: "rose"
  },
  {
    id: "biochemistry",
    name: "Biochemistry",
    slug: "biochemistry",
    shortDesc: "Enzymes, metabolic pathways, molecular biology, bioenergetics, and clinical biomarkers.",
    longDesc: "Understand cellular metabolism and biochemical processes. Practice questions on glycolysis, TCA cycle, lipid metabolism, nucleic acid synthesis, enzyme kinetics, and clinical clinical diagnostic indicators.",
    iconName: "Dna",
    topics: [
      "Carbohydrate & Lipid Metabolism Pathways",
      "Enzyme Kinetics, Inhibition & Regulation",
      "Protein Structure & Amino Acid Metabolism",
      "Nucleic Acids, DNA Replication & Transcription",
      "Vitamins, Coenzymes & Minerals",
      "Clinical Chemistry & Liver/Kidney Function Tests"
    ],
    sampleQuestions: [
      {
        question: "Which enzyme catalyzes the rate-limiting regulatory step in cholesterol biosynthesis?",
        options: ["HMG-CoA Reductase", "Fatty Acid Synthase", "Acetyl-CoA Carboxylase", "Lipoprotein Lipase"],
        answerIndex: 0,
        explanation: "HMG-CoA reductase is the rate-limiting enzyme in cholesterol biosynthesis and the target of statin medications."
      }
    ],
    colorGradient: "from-violet-500 to-purple-700",
    accentColor: "purple"
  },
  {
    id: "microbiology",
    name: "Microbiology",
    slug: "microbiology",
    shortDesc: "Pathogenic bacteria, viruses, fungi, immunology, sterilization validation, and antimicrobial testing.",
    longDesc: "Master pharmaceutical microbiology concepts including microbial culture techniques, staining methods, antibiotic assay methods, sterility testing, resistance mechanisms, and vaccines.",
    iconName: "Bug",
    topics: [
      "Bacterial Morphology, Growth & Staining",
      "Sterility Testing & Antimicrobial Assays",
      "Immunology, Antibodies & Vaccines",
      "Virology, Mycology & Parasitology",
      "Microbial Spoilage & Preservation in Pharmaceuticals",
      "Disinfection, Antiseptics & Cleanroom Standards"
    ],
    sampleQuestions: [
      {
        question: "The Gram stain differentiates bacteria based on the chemical and physical properties of their:",
        options: ["Cell wall peptidoglycan thickness", "Cell membrane phospholipids", "Ribosomal subunit structure", "Capsular polysaccharides"],
        answerIndex: 0,
        explanation: "Gram staining differentiates Gram-positive (thick peptidoglycan layer) and Gram-negative (thin peptidoglycan with outer membrane) bacteria."
      }
    ],
    colorGradient: "from-amber-500 to-orange-700",
    accentColor: "amber"
  },
  {
    id: "hospital-clinical-pharmacy",
    name: "Hospital & Clinical Pharmacy",
    slug: "hospital-clinical-pharmacy",
    shortDesc: "Clinical drug interactions, patient counseling, hospital formulary, drug monitoring, and pharmacy practice.",
    longDesc: "Prepare for patient-oriented clinical roles and hospital operations. Review therapeutic drug monitoring (TDM), adverse drug reaction reporting, medication safety, prescription auditing, and clinical case interpretations.",
    iconName: "Building2",
    topics: [
      "Hospital Formulary & Drug Distribution Systems",
      "Therapeutic Drug Monitoring (TDM) & Dose Adjustments",
      "Adverse Drug Reaction (ADR) Monitoring & Pharmacovigilance",
      "Drug-Drug & Drug-Food Interactions",
      "Patient Counseling & Medication Therapy Management",
      "Critical Care & Intravenous Admixture Services"
    ],
    sampleQuestions: [
      {
        question: "Which of the following parameters requires routine Therapeutic Drug Monitoring (TDM) due to its narrow therapeutic index?",
        options: ["Digoxin", "Paracetamol", "Amoxicillin", "Cetirizine"],
        answerIndex: 0,
        explanation: "Digoxin has a narrow therapeutic window (typically 0.5 - 2.0 ng/mL) requiring regular serum concentration monitoring."
      }
    ],
    colorGradient: "from-sky-500 to-teal-700",
    accentColor: "sky"
  }
];
