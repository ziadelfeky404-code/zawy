import { createClient } from '@/lib/supabase/server';
import type { 
  SiteSettings, 
  HomepageSection, 
  Product, 
  VisionMission, 
  WhyUsItem, 
  WhoWeServeItem,
  PilotProgram,
  ContactInfo
} from '@/types/supabase';

function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return !!(url && key && !url.includes('placeholder') && !key.includes('placeholder'));
}

export async function getSiteSettings(): Promise<Record<string, string>> {
  if (!isSupabaseConfigured()) {
    return {};
  }
  
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('site_settings')
    .select('key, value');
  
  if (error) {
    console.error('Error fetching site settings:', error);
    return {};
  }
  
  return (data || []).reduce((acc, item) => {
    if (item.value) acc[item.key] = item.value;
    return acc;
  }, {} as Record<string, string>);
}

export async function getHomepageSection(key: string): Promise<HomepageSection | null> {
  if (!isSupabaseConfigured()) {
    return null;
  }
  
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('homepage_sections')
    .select('*')
    .eq('section_key', key)
    .eq('is_published', true)
    .single();
  
  if (error) {
    console.error(`Error fetching homepage section ${key}:`, error);
    return null;
  }

  return data;
}

export async function getAllProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured()) {
    return [];
  }
  
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_published', true)
    .order('display_order');
  
  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return data || [];
}

export async function getVisionMission(): Promise<VisionMission[]> {
  if (!isSupabaseConfigured()) {
    return [];
  }
  
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('vision_mission')
    .select('*')
    .eq('is_published', true)
    .order('display_order');
  
  if (error) {
    console.error('Error fetching vision/mission:', error);
    return [];
  }

  return data || [];
}

export async function getWhyUsItems(): Promise<WhyUsItem[]> {
  if (!isSupabaseConfigured()) {
    return [];
  }
  
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('why_us_items')
    .select('*')
    .eq('is_published', true)
    .order('display_order');
  
  if (error) {
    console.error('Error fetching why us items:', error);
    return [];
  }

  return data || [];
}

export async function getWhoWeServe(): Promise<WhoWeServeItem[]> {
  if (!isSupabaseConfigured()) {
    return [];
  }
  
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('who_we_serve')
    .select('*')
    .eq('is_published', true)
    .order('display_order');
  
  if (error) {
    console.error('Error fetching who we serve:', error);
    return [];
  }

  return data || [];
}

export async function getPilotProgram(): Promise<PilotProgram | null> {
  if (!isSupabaseConfigured()) {
    return null;
  }
  
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('pilot_program')
    .select('*')
    .eq('is_published', true)
    .single();
  
  if (error) {
    console.error('Error fetching pilot program:', error);
    return null;
  }

  return data;
}

export async function getContactInfo(): Promise<ContactInfo[]> {
  if (!isSupabaseConfigured()) {
    return [];
  }
  
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('contact_info')
    .select('*')
    .eq('is_published', true)
    .order('display_order');
  
  if (error) {
    console.error('Error fetching contact info:', error);
    return [];
  }

  return data || [];
}