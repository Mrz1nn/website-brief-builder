import type { BriefData } from "./types";

/** Fictional demo data used only to preview the flow quickly. Not a real business. */
export function createSampleBriefData(): BriefData {
  return {
    business: {
      name: "Northbound Coffee Roasters",
      segment: "Specialty coffee roaster and café",
      description:
        "A small-batch coffee roastery with one café location, selling roasted beans online and hosting weekend tasting events.",
    },
    goal: {
      primary: "sell-products",
      secondary: ["improve-branding", "increase-seo", "collect-signups"],
      successMetric: "Grow online bean subscriptions and reduce walk-in-only sales dependency.",
    },
    audience: {
      description: "Coffee enthusiasts aged 25-45 who care about sourcing and roast quality.",
      ageRange: "25-45",
      painPoints: "Hard to find fresh, ethically sourced beans with clear roast dates nearby.",
    },
    pages: {
      selected: ["home", "about", "products", "blog", "contact", "faq"],
      otherPages: "Wholesale inquiries page",
    },
    identity: {
      logoStatus: "in-progress",
      colorPreference: "Warm neutrals with a deep forest green accent",
      styleTags: ["handcrafted", "warm", "editorial"],
      inspirationNotes: "Likes textured paper backgrounds and hand-drawn illustration accents.",
    },
    features: {
      selected: ["online-store", "blog-cms", "newsletter", "booking"],
      priorities: {
        "online-store": "must-have",
        "blog-cms": "important",
        newsletter: "important",
        booking: "nice-to-have",
      },
      budget: "growth",
    },
    references: {
      liked: "Clean product photography, big typography, subtle scroll animations.",
      disliked: "Auto-playing video backgrounds and pop-ups on page load.",
    },
    timeline: {
      launchTarget: "In 3 months",
      urgency: "moderate",
      notes: "Would like a soft launch before the holiday season.",
    },
  };
}
