export type AboutNabilContent = {
  heading: string;
  facts: {
    label: string;
    lines: string[];
  }[];
};

export type BigPictureContent = {
  heading: string;
  facts: {
    label: string;
    answer: string;
    decoration: "underline" | "dotted" | "oval" | "none";
  }[];
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};

// Hardcoded homepage content. Replace these objects with API responses later.
export const aboutNabilContent: AboutNabilContent = {
  heading: "About Nabil Hossain",
  facts: [
    {
      label: "Work Experience",
      lines: ["Workshop Engineering", "Marine Engine Repair & Maintenance", "Everllence Singapore"],
    },
    {
      label: "Leadership Experience",
      lines: ["President & Founder", "SIT Public Speaking Club"],
    },
    {
      label: "Research Experience",
      lines: ["Research Assistant", "AI’s Impact On Education & Social Innovation At: SIT Teaching & Learning Academy"],
    },
    {
      label: "Education",
      lines: [
        "Marine Engineering (Hons) At: Singapore Institute Of Technology",
        "Marine Electrical Engineering At: Lloyd’s Maritime Institute",
      ],
    },
    {
      label: "Teaching Experience",
      lines: ["Academic Peer Tutor", "Engineering & Health Sciences", "At: SIT Centre for Communication Skills"],
    },
    {
      label: "Technical Skills",
      lines: ["Field Service, Lean Six Sigma & Turbomachinery Quality Control, QHSE & Fuel Pump Systems"],
    },
  ],
};

export const bigPictureContent: BigPictureContent = {
  heading: "THE BIG PICTURE",
  facts: [
    { label: "WHAT’S MY MISSION?", answer: "Maximize Impact &\nBenefit to Others", decoration: "underline" },
    { label: "WHAT’S MY EXPERTISE?", answer: "Marine Engines &\nWorkshop Processes", decoration: "dotted" },
    { label: "WHAT AM I KNOWN FOR?", answer: "Building Public\nSpeaking Club", decoration: "oval" },
    { label: "WHAT’S MY PASSION?", answer: "Debating", decoration: "underline" },
    { label: "WHAT’S MY INSIGHT?", answer: "Leadership", decoration: "dotted" },
    { label: "WHAT’S MY NEWEST SKILL?", answer: "Publicity & Marketing", decoration: "none" },
  ],
  image: {
    src: "/images/home/nabil-hossain-discussion.png",
    alt: "Nabil Hossain seated at a table, gesturing with both hands",
    width: 528,
    height: 512,
  },
};
