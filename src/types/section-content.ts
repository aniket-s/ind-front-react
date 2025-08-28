// Section content type definitions
export interface ProductFeature {
    icon: string;
    title: string;
    description: string;
}

export interface ProductCategory {
    icon?: string;
    name: string;
    active?: boolean;
    isText?: boolean;
    isImage?: boolean;
    imageUrl?: string;
}

export interface ProductDetails {
    category?: string;
    name?: string;
    description?: string;
    warranty?: string;
    image?: string;
}

export interface ProductsSectionContent {
    features?: string[];
    product?: ProductDetails;
    categories?: ProductCategory[];
}

export interface WhyIndpowerFeature {
    icon: string;
    title: string;
    description: string;
    bgColor?: string;
    iconColor?: string;
}

export interface WhyIndpowerSectionContent {
    features?: WhyIndpowerFeature[];
}

export interface AboutFeature {
    icon: string;
    title: string;
    description: string;
}

export interface AboutSectionContent {
    features?: AboutFeature[];
    image?: string;
    buttonText?: string;
    description?: string;
}

export interface FAQCategory {
    id: string;
    label: string;
}

export interface FAQItem {
    category: string;
    question: string;
    answer: string;
}

export interface FAQSectionContent {
    categories?: FAQCategory[];
    faqs?: FAQItem[];
}

export interface ConnectTab {
    id: string;
    label: string;
    icon: string;
}

export interface ConnectEngagement {
    likes: number;
    comments: number;
    shares?: number;
    saves?: number;
}

export interface ConnectPost {
    platform: string;
    icon: string;
    iconColor: string;
    author: string;
    date: string;
    content: string;
    engagement: ConnectEngagement;
}

export interface ConnectSectionContent {
    tabs?: ConnectTab[];
    posts?: ConnectPost[];
    viewMoreText?: string;
}

export interface DealerStat {
    icon: string;
    value: string;
    label: string;
}

export interface DealerLocatorSectionContent {
    stats?: DealerStat[];
    placeholder?: string;
    buttonText?: string;
}

export interface ViewDetailsButton {
    link: string;
    text: string;
    style: string;
    icon?: string;
}

export interface ViewDetailsIcon {
    icon: string;
    position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export interface ViewDetailsSectionContent {
    buttons?: ViewDetailsButton[];
    floatingIcons?: ViewDetailsIcon[];
}

export interface JoinDealerSectionContent {
    buttonLink?: string;
    buttonText?: string;
}

export interface ContactOption {
    icon: string;
    text: string;
    style: 'primary' | 'outline' | 'accent';
}

export interface StillHaveQuestionsSectionContent {
    contactOptions?: ContactOption[];
}

export type SectionContent =
    | ProductsSectionContent
    | WhyIndpowerSectionContent
    | AboutSectionContent
    | FAQSectionContent
    | ConnectSectionContent
    | DealerLocatorSectionContent
    | ViewDetailsSectionContent
    | JoinDealerSectionContent
    | StillHaveQuestionsSectionContent
    | Record<string, unknown>;