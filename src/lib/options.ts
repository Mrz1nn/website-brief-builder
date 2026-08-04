import type {
  BudgetTier,
  FeatureOption,
  FeaturePriority,
  LogoStatus,
  PageOption,
  PrimaryGoal,
  SecondaryGoal,
  StepId,
  StyleTag,
  UrgencyLevel,
} from "./types";

export interface Option<T extends string> {
  value: T;
  label: string;
  description?: string;
}

export const STEP_ORDER: StepId[] = [
  "business",
  "goal",
  "audience",
  "pages",
  "identity",
  "features",
  "references",
  "timeline",
];

export const STEP_META: Record<StepId, { title: string; shortTitle: string; description: string }> = {
  business: {
    title: "The business",
    shortTitle: "Business",
    description: "Tell us who this website is for.",
  },
  goal: {
    title: "Website goal",
    shortTitle: "Goal",
    description: "What should this site accomplish?",
  },
  audience: {
    title: "Target audience",
    shortTitle: "Audience",
    description: "Who will be visiting the site?",
  },
  pages: {
    title: "Pages needed",
    shortTitle: "Pages",
    description: "Choose the pages the site should include.",
  },
  identity: {
    title: "Visual identity",
    shortTitle: "Identity",
    description: "Share the look and feel you're aiming for.",
  },
  features: {
    title: "Required features",
    shortTitle: "Features",
    description: "Pick the functionality this site needs, and rank what matters most.",
  },
  references: {
    title: "References",
    shortTitle: "References",
    description: "Sites or styles you like (and ones you don't).",
  },
  timeline: {
    title: "Timeline",
    shortTitle: "Timeline",
    description: "When should this project launch?",
  },
};

export const PRIMARY_GOAL_OPTIONS: Option<PrimaryGoal>[] = [
  { value: "generate-leads", label: "Generate leads", description: "Collect inquiries and contact requests" },
  { value: "sell-products", label: "Sell products", description: "Run an online store" },
  { value: "showcase-portfolio", label: "Showcase portfolio", description: "Display past work and case studies" },
  { value: "provide-information", label: "Provide information", description: "Explain services, hours, and policies" },
  { value: "build-community", label: "Build a community", description: "Bring people together around a topic" },
  { value: "support-customers", label: "Support customers", description: "Offer self-service help and resources" },
];

export const SECONDARY_GOAL_OPTIONS: Option<SecondaryGoal>[] = [
  { value: "improve-branding", label: "Improve branding" },
  { value: "increase-seo", label: "Increase search visibility" },
  { value: "reduce-support-time", label: "Reduce support workload" },
  { value: "collect-signups", label: "Collect newsletter signups" },
  { value: "showcase-testimonials", label: "Showcase testimonials" },
];

export const PAGE_OPTIONS: Option<PageOption>[] = [
  { value: "home", label: "Home" },
  { value: "about", label: "About" },
  { value: "services", label: "Services" },
  { value: "products", label: "Products" },
  { value: "portfolio", label: "Portfolio" },
  { value: "blog", label: "Blog" },
  { value: "contact", label: "Contact" },
  { value: "faq", label: "FAQ" },
  { value: "pricing", label: "Pricing" },
  { value: "testimonials", label: "Testimonials" },
  { value: "team", label: "Team" },
  { value: "careers", label: "Careers" },
];

export const STYLE_TAG_OPTIONS: Option<StyleTag>[] = [
  { value: "minimalist", label: "Minimalist" },
  { value: "bold", label: "Bold" },
  { value: "elegant", label: "Elegant" },
  { value: "playful", label: "Playful" },
  { value: "corporate", label: "Corporate" },
  { value: "handcrafted", label: "Handcrafted" },
  { value: "futuristic", label: "Futuristic" },
  { value: "warm", label: "Warm" },
  { value: "editorial", label: "Editorial" },
  { value: "luxury", label: "Luxury" },
];

export const LOGO_STATUS_OPTIONS: Option<LogoStatus>[] = [
  { value: "ready", label: "Logo ready", description: "A final logo file is available" },
  { value: "in-progress", label: "Logo in progress", description: "Being designed elsewhere" },
  { value: "needs-design", label: "Needs a logo", description: "Should be designed from scratch" },
];

export const FEATURE_OPTIONS: Option<FeatureOption>[] = [
  { value: "contact-form", label: "Contact form" },
  { value: "online-store", label: "Online store" },
  { value: "blog-cms", label: "Blog / CMS" },
  { value: "newsletter", label: "Newsletter signup" },
  { value: "live-chat", label: "Live chat" },
  { value: "multi-language", label: "Multi-language support" },
  { value: "booking", label: "Booking / scheduling" },
  { value: "client-portal", label: "Client portal / login area" },
  { value: "gallery", label: "Gallery / portfolio grid" },
  { value: "search", label: "Site search" },
  { value: "social-integration", label: "Social media integration" },
  { value: "analytics-dashboard", label: "Analytics dashboard" },
];

export const FEATURE_PRIORITY_OPTIONS: Option<FeaturePriority>[] = [
  { value: "nice-to-have", label: "Nice to have" },
  { value: "important", label: "Important" },
  { value: "must-have", label: "Must have" },
];

export const BUDGET_OPTIONS: Option<BudgetTier>[] = [
  { value: "starter", label: "Starter", description: "Small single-purpose site, demo range" },
  { value: "growth", label: "Growth", description: "Multi-page site with a few features, demo range" },
  { value: "professional", label: "Professional", description: "Custom design and integrations, demo range" },
  { value: "enterprise", label: "Enterprise", description: "Large scope, ongoing work, demo range" },
];

export const URGENCY_OPTIONS: Option<UrgencyLevel>[] = [
  { value: "flexible", label: "Flexible", description: "No fixed deadline" },
  { value: "moderate", label: "Moderate", description: "A target date, some room to move" },
  { value: "urgent", label: "Urgent", description: "Hard deadline, limited flexibility" },
];
