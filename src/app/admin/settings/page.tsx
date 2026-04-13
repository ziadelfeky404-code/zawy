'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Save, Loader2 } from 'lucide-react';

interface SiteSetting {
  key: string;
  value: string | null;
  description: string | null;
}

export default function SettingsPage() {
  const supabase = createClient();
  const [settings, setSettings] = useState<SiteSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('site_settings')
      .select('*')
      .order('key');
    setSettings(data || []);
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    for (const setting of settings) {
      if (setting.value !== null) {
        await supabase
          .from('site_settings')
          .update({ value: setting.value, updated_at: new Date().toISOString() })
          .eq('key', setting.key);
      }
    }
    setSaving(false);
    alert('تم حفظ الإعدادات بنجاح');
  };

  const updateSetting = (key: string, value: string) => {
    setSettings(settings.map(s => s.key === key ? { ...s, value } : s));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">إعدادات الموقع</h1>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? <Loader2 className="w-4 h-4 ml-2 animate-spin" /> : <Save className="w-4 h-4 ml-2" />}
          حفظ التغييرات
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {settings.map((setting) => (
          <Card key={setting.key}>
            <CardHeader>
              <CardTitle className="text-lg">{setting.description || setting.key}</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                value={setting.value || ''}
                onChange={(e) => updateSetting(setting.key, e.target.value)}
                placeholder={`أدخل ${setting.description || setting.key}`}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}