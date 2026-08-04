export type Theme = "light" | "dark";

export type PrimaryGoal =
  | "generate-leads"
  | "sell-products"
  | "showcase-portfolio"
  | "provide-information"
  | "build-community"
  | "support-customers";

export type SecondaryGoal =
  | "improve-branding"
  | "increase-seo"
  | "reduce-support-time"
  | "collect-signups"
  | "showcase-testimonials";

export type PageOption =
  | "home"
  | "about"
  | "services"
  | "products"
  | "portfolio"
  | "blog"
  | "contact"
  | "faq"
  | "pricing"
  | "testimonials"
  | "team"
  | "careers";

export type StyleTag =
  | "minimalist"
  | "bold"
  | "elegant"
  | "playful"
  | "corporate"
  | "handcrafted"
  | "futuristic"
  | "warm"
  | "editorial"
  | "luxury";

export type LogoStatus = "ready" | "in-progress" | "needs-design";

export type FeatureOption =
  | "contact-form"
  | "online-store"
  | "blog-cms"
  | "newsletter"
  | "live-chat"
  | "multi-language"
  | "booking"
  | "client-portal"
  | "gallery"
  | "search"
  | "social-integration"
  | "analytics-dashboard";

export type FeaturePriority = "nice-to-have" | "important" | "must-have";

export type BudgetTier = "starter" | "growth" | "professional" | "enterprise";

export type UrgencyLevel = "flexible" | "moderate" | "urgent";

export interface BusinessSection {
  name: string;
  segment: string;
  description: string;
}

export interface GoalSection {
  primary: PrimaryGoal | null;
  secondary: SecondaryGoal[];
  successMetric: string;
}

export interface AudienceSection {
  description: string;
  ageRange: string;
  painPoints: string;
}

export interface PagesSection {
  selected: PageOption[];
  otherPages: string;
}

export interface IdentitySection {
  logoStatus: LogoStatus | null;
  colorPreference: string;
  styleTags: StyleTag[];
  inspirationNotes: string;
}

export interface FeaturesSection {
  selected: FeatureOption[];
  priorities: Partial<Record<FeatureOption, FeaturePriority>>;
  budget: BudgetTier | null;
}

export interface ReferencesSection {
  liked: string;
  disliked: string;
}

export interface TimelineSection {
  launchTarget: string;
  urgency: UrgencyLevel | null;
  notes: string;
}

export interface BriefData {
  business: BusinessSection;
  goal: GoalSection;
  audience: AudienceSection;
  pages: PagesSection;
  identity: IdentitySection;
  features: FeaturesSection;
  references: ReferencesSection;
  timeline: TimelineSection;
}

export type StepId =
  | "business"
  | "goal"
  | "audience"
  | "pages"
  | "identity"
  | "features"
  | "references"
  | "timeline";

export interface BriefDraft {
  data: BriefData;
  stepIndex: number;
  updatedAt: string;
}
