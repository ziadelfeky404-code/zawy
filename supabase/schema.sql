-- ==============================================================================
-- Database Schema for ذوي Startup Website
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- ENUMS
-- ==============================================================================

-- Product status enum
CREATE TYPE product_status AS ENUM ('concept', 'prototype', 'pilot', 'coming_soon', 'published');

-- Message status enum
CREATE TYPE message_status AS ENUM ('new', 'read', 'archived');

-- Pilot request status enum
CREATE TYPE pilot_status AS ENUM ('new', 'contacted', 'approved', 'rejected', 'completed');

-- ==============================================================================
-- SITE SETTINGS
-- ==============================================================================

CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key VARCHAR(255) UNIQUE NOT NULL,
  value TEXT,
  description VARCHAR(500),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- HOMEPAGE SECTIONS
-- ==============================================================================

CREATE TABLE homepage_sections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  section_key VARCHAR(100) UNIQUE NOT NULL,
  title VARCHAR(500),
  subtitle TEXT,
  content JSONB,
  is_published BOOLEAN DEFAULT true,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- PRODUCTS
-- ==============================================================================

CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  short_description TEXT,
  description TEXT,
  image_url TEXT,
  icon_name VARCHAR(100),
  details JSONB,
  note TEXT,
  status product_status DEFAULT 'coming_soon',
  cta_text VARCHAR(255),
  cta_link VARCHAR(500),
  display_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- VISION & MISSION
-- ==============================================================================

CREATE TABLE vision_mission (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type VARCHAR(50) CHECK (type IN ('vision', 'mission', 'values')),
  title VARCHAR(500) NOT NULL,
  content TEXT NOT NULL,
  display_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- WHY US ITEMS
-- ==============================================================================

CREATE TABLE why_us_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  icon_name VARCHAR(100),
  display_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- WHO WE SERVE
-- ==============================================================================

CREATE TABLE who_we_serve (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  icon_name VARCHAR(100),
  display_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- PILOT PROGRAM
-- ==============================================================================

CREATE TABLE pilot_program (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(500),
  subtitle TEXT,
  description TEXT,
  cta_text VARCHAR(255),
  cta_link VARCHAR(500),
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- CONTACT INFO
-- ==============================================================================

CREATE TABLE contact_info (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type VARCHAR(100) NOT NULL,
  value VARCHAR(500) NOT NULL,
  label VARCHAR(255),
  display_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- CONTACT MESSAGES (from public form)
-- ==============================================================================

CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  inquiry_type VARCHAR(100),
  message TEXT NOT NULL,
  status message_status DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- PILOT REQUESTS
-- ==============================================================================

CREATE TABLE pilot_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_name VARCHAR(255) NOT NULL,
  contact_person VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  description TEXT,
  status pilot_status DEFAULT 'new',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- MEDIA ASSETS
-- ==============================================================================

CREATE TABLE media_assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  file_name VARCHAR(255) NOT NULL,
  file_path TEXT NOT NULL,
  file_type VARCHAR(100),
  file_size BIGINT,
  mime_type VARCHAR(100),
  alt_text VARCHAR(500),
  caption VARCHAR(500),
  is_public BOOLEAN DEFAULT false,
  created_by UUID,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- ADMIN PROFILES (extends Supabase Auth)
-- ==============================================================================

CREATE TABLE admin_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'admin',
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- RLS POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE vision_mission ENABLE ROW LEVEL SECURITY;
ALTER TABLE why_us_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE who_we_serve ENABLE ROW LEVEL SECURITY;
ALTER TABLE pilot_program ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE pilot_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;

-- Public read policies for website content
CREATE POLICY "Public can read site_settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Public can read homepage_sections" ON homepage_sections FOR SELECT USING (is_published = true);
CREATE POLICY "Public can read products" ON products FOR SELECT USING (is_published = true);
CREATE POLICY "Public can read vision_mission" ON vision_mission FOR SELECT USING (is_published = true);
CREATE POLICY "Public can read who_we_serve" ON who_we_serve FOR SELECT USING (is_published = true);
CREATE POLICY "Public can read pilot_program" ON pilot_program FOR SELECT USING (is_published = true);
CREATE POLICY "Public can read contact_info" ON contact_info FOR SELECT USING (is_published = true);

-- Insert policies (admin only - handled by API routes)
CREATE POLICY "Admin can insert site_settings" ON site_settings FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Admin can update site_settings" ON site_settings FOR UPDATE USING (auth.uid() IS NOT NULL);

-- Contact messages - anyone can insert, only admin can read/update
CREATE POLICY "Anyone can create contact_messages" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin can read contact_messages" ON contact_messages FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Admin can update contact_messages" ON contact_messages FOR UPDATE USING (auth.uid() IS NOT NULL);

-- Pilot requests - anyone can insert, only admin can read/update
CREATE POLICY "Anyone can create pilot_requests" ON pilot_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin can read pilot_requests" ON pilot_requests FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Admin can update pilot_requests" ON pilot_requests FOR UPDATE USING (auth.uid() IS NOT NULL);

-- Admin profiles
CREATE POLICY "Users can read own profile" ON admin_profiles FOR SELECT USING (id = auth.uid());
CREATE POLICY "Users can update own profile" ON admin_profiles FOR UPDATE USING (id = auth.uid());

-- ==============================================================================
-- SEED DATA
-- ==============================================================================

-- Site settings
INSERT INTO site_settings (key, value, description) VALUES
  ('site_name', 'ذوي', 'اسم الموقع'),
  ('site_description', 'تقنيات تعليمية ومساندة مبتكرة لذوي الاحتياجات الخاصة', 'وصف الموقع'),
  ('site_email', 'hello@thawi.tech', 'البريد الإلكتروني'),
  ('site_phone', '+966 12 345 6789', 'رقم الهاتف'),
  ('site_address', 'المملكة العربية السعودية، الرياض', 'العنوان');

-- Homepage sections - Hero
INSERT INTO homepage_sections (section_key, title, subtitle, content, is_published, display_order) VALUES
('hero', 'تقنيات تعليمية ومساندة لذوي الاحتياجات الخاصة', 'نبني أدوات ذكية ومبتكرة تساعد على القراءة والكتابة والتقييم بدقة أكبر، لتمكين كل طفل من الوصول إلى كامل إمكاناته التعليمية.', '{"cta_primary": "تعرّف على حلولنا", "cta_secondary": "تواصل معنا"}', true, 1);

-- About section
INSERT INTO homepage_sections (section_key, title, subtitle, content, is_published, display_order) VALUES
('about', 'نحن شركة تقنية ناشئة تركز على سد الفجوة في الأدوات التعليمية المساندة باللغة العربية.', 'عن ذوي', '{"description": "تأسست \"ذوي\" برؤية واضحة: تطوير أدوات عملية ومتاحة للمستخدمين والمؤسسات في العالم العربي، بعيداً عن الحلول التقليدية أو المستوردة التي لا تلبي احتياجاتنا المحلية بشكل كامل.\n\nنحن نؤمن بأن التكنولوجيا يجب أن تكون جسراً نحو التمكين، لذا نعمل على دمج الابتكار الهندسي مع الخبرة التربوية لتقديم حلول تغير حياة الأطفال وعائلاتهم."}', true, 2);

-- Products
INSERT INTO products (title, slug, short_description, description, details, note, status, cta_text, cta_link, display_order, is_published) VALUES
('ذوي Read', 'zowi-read', 'جهاز تعليمي تفاعلي يعتمد على لغة برايل وتقنية RFID لتعليم القراءة للأطفال المكفوفين.', 'جهاز تعليمي تفاعلي يعتمد على لغة برايل وتقنية RFID لتعليم القراءة للأطفال المكفوفين.', '["تعلم باللمس والصوت", "قراءة برайл في المراحل المبكرة", "مناسب للمنازل والمدارس والمراكز"]', NULL, 'prototype', 'اكتشف المزيد', '#products', 1, true),
('ذوي Write', 'zowi-write', 'لوحة تدريب على كتابة برايل تساعد الأطفال على إتقان مهارات الكتابة بدقة وسرعة.', 'لوحة تدريب على كتابة برايل تساعد الأطفال على إتقان مهارات الكتابة بدقة وسرعة.', '["تدريب مكثف على الكتابة", "دقة وسرعة عالية", "أداة اقتصادية وسهلة الوصول"]', NULL, 'prototype', 'اكتشف المزيد', '#products', 2, true),
('ذوي Assess', 'zowi-assess', 'أداة مساندة للأخصائيين تستخدم الأنشطة التفاعلية وتحليل الذكاء الاصطناعي لإجراء تقييمات أولية.', 'أداة مساندة للأخصائيين تستخدم الأنشطة التفاعلية وتحليل الذكاء الاصطناعي لإجراء تقييمات أولية.', '["دعم الأخصائي بالذكاء الاصطناعي", "تقييمات أولية فعالة", "تقارير تحليلية دقيقة"]', 'ملاحظة: الذكاء الاصطناعي يساند الأخصائي ولا يشخص بشكل مستقل.', 'pilot', 'اكتشف المزيد', '#products', 3, true);

-- Vision & Mission
INSERT INTO vision_mission (type, title, content, display_order, is_published) VALUES
('vision', 'رؤيتنا', '"أن نصبح الشركة العربية الرائدة في مجال التقنيات المساندة لتحقيق الدمج التعليمي والتعلم الميسر للجميع."', 1, true),
('mission', 'رسالتنا', 'تطوير أدوات تقنية مبتكرة ومساعدة للأشخاص ذوي الاحتياجات الخاصة في العالم العربي، مع التركيز على الجودة والإتاحة.', 2, true);

-- Why Us
INSERT INTO why_us_items (title, description, icon_name, display_order, is_published) VALUES
('نقص الأدوات العربية', 'نعالج الفجوة الكبيرة في توفر الأدوات المساندة المصممة خصيصاً للغة العربية.', 'heart', 1, true),
('تكلفة اقتصادية', 'نوفر بدائل محلية عالية الجودة بتكلفة أقل بكثير من المنتجات المستوردة.', 'dollar-sign', 2, true),
('دعم تعليمي متكامل', 'حلولنا تغطي جوانب القراءة والكتابة والتقييم في حزمة تقنية واحدة.', 'layers', 3, true),
('سهولة الاستخدام', 'تصاميمنا تركز على المستخدم النهائي لتكون سهلة الاستخدام في البيت والمدرسة.', 'smile', 4, true);

-- Who We Serve
INSERT INTO who_we_serve (title, description, icon_name, display_order, is_published) VALUES
('الأطفال', 'الأطفال ذوو الاحتياجات التعليمية الخاصة', 'child', 1, true),
('العائلات', 'أسر الأطفال الذين يحتاجون دعماً تعليمياً', 'users', 2, true),
('المدارس', 'المدارس العامة والخاصة', 'school', 3, true),
('مراكز التربية الخاصة', 'مراكز التأهيل والتدريب المتخصصة', 'building', 4, true),
('الأخصائيين النفسيين', 'الأخصائيين والتربويين المتخصصين', 'stethoscope', 5, true);

-- Pilot Program
INSERT INTO pilot_program (title, subtitle, description, cta_text, cta_link, is_published) VALUES
('البرامج التجريبية', 'ساهم في تشكيل مستقبل التعليم المساند', 'نفتح المجال حالياً للمدارس والمراكز المتخصصة للانضمام إلى برامجنا التجريبية. كونوا من الأوائل الذين يختبرون حلولنا ويساهمون في تطويرها لتناسب احتياجات طلابهم.', 'قدم طلب الانضمام', '#pilot', true);

-- Contact Info
INSERT INTO contact_info (type, value, label, display_order, is_published) VALUES
('email', 'hello@thawi.tech', 'البريد الإلكتروني', 1, true),
('phone', '+966 12 345 6789', 'رقم الهاتف', 2, true),
('address', 'المملكة العربية السعودية، الرياض', 'الموقع', 3, true);