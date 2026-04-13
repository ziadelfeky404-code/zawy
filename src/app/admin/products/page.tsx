'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react';
import type { Product } from '@/types/supabase';

const statusLabels: Record<string, string> = {
  concept: 'مفهوم',
  prototype: 'نموذج أولي',
  pilot: 'تجريبي',
  coming_soon: 'قريباً',
  published: 'منشور',
};

export default function ProductsPage() {
  const supabase = createClient();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    short_description: '',
    description: '',
    status: 'coming_soon' as string,
    cta_text: '',
    cta_link: '',
    display_order: 0,
    is_published: true,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('products')
      .select('*')
      .order('display_order');
    setProducts(data || []);
    setLoading(false);
  };

  const handleSubmit = async () => {
    setSaving(true);
    try {
      if (editingProduct) {
        await supabase
          .from('products')
          .update({
            title: formData.title,
            slug: formData.slug,
            short_description: formData.short_description,
            description: formData.description,
            status: formData.status,
            cta_text: formData.cta_text,
            cta_link: formData.cta_link,
            display_order: formData.display_order,
            is_published: formData.is_published,
          })
          .eq('id', editingProduct.id);
      } else {
        await supabase
          .from('products')
          .insert([formData]);
      }
      setIsOpen(false);
      setEditingProduct(null);
      resetForm();
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      slug: product.slug,
      short_description: product.short_description || '',
      description: product.description || '',
      status: product.status,
      cta_text: product.cta_text || '',
      cta_link: product.cta_link || '',
      display_order: product.display_order,
      is_published: product.is_published,
    });
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      await supabase.from('products').delete().eq('id', id);
      fetchProducts();
    }
  };

  const handleTogglePublish = async (product: Product) => {
    await supabase
      .from('products')
      .update({ is_published: !product.is_published })
      .eq('id', product.id);
    fetchProducts();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      short_description: '',
      description: '',
      status: 'coming_soon',
      cta_text: '',
      cta_link: '',
      display_order: 0,
      is_published: true,
    });
  };

  const openNewDialog = () => {
    setEditingProduct(null);
    resetForm();
    setIsOpen(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">المنتجات</h1>
        <Button onClick={openNewDialog}>
          <Plus className="w-4 h-4 ml-2" />
          إضافة منتج
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 text-center">جاري التحميل...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>الترتيب</TableHead>
                  <TableHead>العنوان</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>منشور</TableHead>
                  <TableHead>إجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.display_order}</TableCell>
                    <TableCell className="font-medium">{product.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{statusLabels[product.status] || product.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <button onClick={() => handleTogglePublish(product)}>
                        {product.is_published ? (
                          <Eye className="w-5 h-5 text-green-500" />
                        ) : (
                          <EyeOff className="w-5 h-5 text-gray-400" />
                        )}
                      </button>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(product)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(product.id)}>
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingProduct ? 'تعديل منتج' : 'إضافة منتج جديد'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">العنوان</label>
                <Input 
                  value={formData.title} 
                  onChange={(e) => setFormData({...formData, title: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-')})}
                  placeholder="اسم المنتج"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Slug</label>
                <Input 
                  value={formData.slug} 
                  onChange={(e) => setFormData({...formData, slug: e.target.value})}
                  placeholder="product-slug"
                  dir="ltr"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">الوصف المختصر</label>
              <Textarea 
                value={formData.short_description} 
                onChange={(e) => setFormData({...formData, short_description: e.target.value})}
                placeholder="وصف مختصر للمنتج"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">الوصف الكامل</label>
              <Textarea 
                value={formData.description} 
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="الوصف الكامل للمنتج"
                rows={4}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">الحالة</label>
                <Select value={formData.status} onValueChange={(v) => setFormData({...formData, status: v})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="concept">مفهوم</SelectItem>
                    <SelectItem value="prototype">نموذج أولي</SelectItem>
                    <SelectItem value="pilot">تجريبي</SelectItem>
                    <SelectItem value="coming_soon">قريباً</SelectItem>
                    <SelectItem value="published">منشور</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">الترتيب</label>
                <Input 
                  type="number" 
                  value={formData.display_order} 
                  onChange={(e) => setFormData({...formData, display_order: parseInt(e.target.value) || 0})}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">نص الزر</label>
                <Input 
                  value={formData.cta_text} 
                  onChange={(e) => setFormData({...formData, cta_text: e.target.value})}
                  placeholder="اكتشف المزيد"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">رابط الزر</label>
                <Input 
                  value={formData.cta_link} 
                  onChange={(e) => setFormData({...formData, cta_link: e.target.value})}
                  placeholder="#products"
                  dir="ltr"
                />
              </div>
            </div>
            <div className="flex justify-end gap-4 pt-4">
              <Button variant="outline" onClick={() => setIsOpen(false)}>إلغاء</Button>
              <Button onClick={handleSubmit} disabled={saving}>
                {saving ? 'جاري الحفظ...' : 'حفظ'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}