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
  if (!url || !key || !url.startsWith('https://')) return false;
  if (!url.includes('.supabase.co')) return false;
  return true;
}

export async function getSiteSettings(): Promise<Record<string, string>> {
  if (!isSupabaseConfigured()) return {};
  try {
    const supabase = await createClient();
    if (!supabase) return {};
    const { data } = await supabase.from('site_settings').select('key, value');
    return (data || []).reduce((acc, item) => {
      if (item.value) acc[item.key] = item.value;
      return acc;
    }, {} as Record<string, string>);
  } catch { return {}; }
}

export async function getHomepageSection(key: string): Promise<HomepageSection | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const supabase = await createClient();
    if (!supabase) return null;
    const { data } = await supabase.from('homepage_sections').select('*').eq('section_key', key).eq('is_published', true).single();
    return data;
  } catch { return null; }
}

export async function getAllProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const supabase = await createClient();
    if (!supabase) return [];
    const { data } = await supabase.from('products').select('*').eq('is_published', true).order('display_order');
    return data || [];
  } catch { return []; }
}

export async function getVisionMission(): Promise<VisionMission[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const supabase = await createClient();
    if (!supabase) return [];
    const { data } = await supabase.from('vision_mission').select('*').eq('is_published', true).order('display_order');
    return data || [];
  } catch { return []; }
}

export async function getWhyUsItems(): Promise<WhyUsItem[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const supabase = await createClient();
    if (!supabase) return [];
    const { data } = await supabase.from('why_us_items').select('*').eq('is_published', true).order('display_order');
    return data || [];
  } catch { return []; }
}

export async function getWhoWeServe(): Promise<WhoWeServeItem[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const supabase = await createClient();
    if (!supabase) return [];
    const { data } = await supabase.from('who_we_serve').select('*').eq('is_published', true).order('display_order');
    return data || [];
  } catch { return []; }
}

export async function getPilotProgram(): Promise<PilotProgram | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const supabase = await createClient();
    if (!supabase) return null;
    const { data } = await supabase.from('pilot_program').select('*').eq('is_published', true).single();
    return data;
  } catch { return null; }
}

export async function getContactInfo(): Promise<ContactInfo[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const supabase = await createClient();
    if (!supabase) return [];
    const { data } = await supabase.from('contact_info').select('*').eq('is_published', true).order('display_order');
    return data || [];
  } catch { return []; }
}