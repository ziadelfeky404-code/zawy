export type ProductStatus = 'concept' | 'prototype' | 'pilot' | 'coming_soon' | 'published';
export type MessageStatus = 'new' | 'read' | 'archived';
export type PilotStatus = 'new' | 'contacted' | 'approved' | 'rejected' | 'completed';

export interface SiteSettings {
  id: string;
  key: string;
  value: string | null;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface HomepageSection {
  id: string;
  section_key: string;
  title: string | null;
  subtitle: string | null;
  content: Record<string, unknown> | null;
  is_published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  image_url: string | null;
  icon_name: string | null;
  details: string[] | null;
  note: string | null;
  status: ProductStatus;
  cta_text: string | null;
  cta_link: string | null;
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface VisionMission {
  id: string;
  type: 'vision' | 'mission' | 'values';
  title: string;
  content: string;
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface WhyUsItem {
  id: string;
  title: string;
  description: string;
  icon_name: string | null;
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface WhoWeServeItem {
  id: string;
  title: string;
  description: string;
  icon_name: string | null;
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface PilotProgram {
  id: string;
  title: string | null;
  subtitle: string | null;
  description: string | null;
  cta_text: string | null;
  cta_link: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface ContactInfo {
  id: string;
  type: string;
  value: string;
  label: string | null;
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface ContactMessage {
  id: string;
  full_name: string;
  email: string;
  inquiry_type: string | null;
  message: string;
  status: MessageStatus;
  created_at: string;
  updated_at: string;
}

export interface PilotRequest {
  id: string;
  organization_name: string;
  contact_person: string;
  email: string;
  phone: string | null;
  description: string | null;
  status: PilotStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface AdminProfile {
  id: string;
  full_name: string | null;
  role: string;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}