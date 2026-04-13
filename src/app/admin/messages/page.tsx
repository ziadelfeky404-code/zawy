'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Archive, Check } from 'lucide-react';
import type { ContactMessage } from '@/types/supabase';

export const dynamic = 'force-dynamic';

const statusLabels: Record<string, string> = {
  new: 'جديد',
  read: 'مقروء',
  archived: 'مؤرشف',
};

export default function MessagesPage() {
  const supabase = createClient();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    fetchMessages();
  }, [filter]);

  const fetchMessages = async () => {
    setLoading(true);
    let query = supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
    
    if (filter !== 'all') {
      query = query.eq('status', filter);
    }
    
    const { data } = await query;
    setMessages(data || []);
    setLoading(false);
  };

  const handleStatusChange = async (id: string, status: string) => {
    await supabase
      .from('contact_messages')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id);
    fetchMessages();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">الرسائل</h1>
        <div className="flex gap-2">
          <Button variant={filter === 'all' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('all')}>
            الكل
          </Button>
          <Button variant={filter === 'new' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('new')}>
            جديدة
          </Button>
          <Button variant={filter === 'read' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('read')}>
            مقروءة
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 text-center">جاري التحميل...</div>
          ) : messages.length === 0 ? (
            <div className="p-8 text-center text-gray-500">لا توجد رسائل</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>الحالة</TableHead>
                  <TableHead>الاسم</TableHead>
                  <TableHead>البريد الإلكتروني</TableHead>
                  <TableHead>نوع الاستفسار</TableHead>
                  <TableHead>التاريخ</TableHead>
                  <TableHead>إجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messages.map((message) => (
                  <TableRow key={message.id}>
                    <TableCell>
                      <Badge variant={message.status === 'new' ? 'default' : 'secondary'}>
                        {statusLabels[message.status]}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{message.full_name}</TableCell>
                    <TableCell dir="ltr">{message.email}</TableCell>
                    <TableCell>{message.inquiry_type || '-'}</TableCell>
                    <TableCell>{new Date(message.created_at).toLocaleDateString('ar-SA')}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {message.status === 'new' && (
                          <Button variant="ghost" size="icon" onClick={() => handleStatusChange(message.id, 'read')}>
                            <Check className="w-4 h-4 text-green-500" />
                          </Button>
                        )}
                        {message.status !== 'archived' && (
                          <Button variant="ghost" size="icon" onClick={() => handleStatusChange(message.id, 'archived')}>
                            <Archive className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}