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
import { Check, X, Phone, Mail } from 'lucide-react';
import type { PilotRequest } from '@/types/supabase';

const statusLabels: Record<string, string> = {
  new: 'جديد',
  contacted: 'تم التواصل',
  approved: 'موافق',
  rejected: 'مرفوض',
  completed: 'مكتمل',
};

export default function PilotRequestsPage() {
  const supabase = createClient();
  const [requests, setRequests] = useState<PilotRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('pilot_requests')
      .select('*')
      .order('created_at', { ascending: false });
    setRequests(data || []);
    setLoading(false);
  };

  const handleStatusChange = async (id: string, status: string) => {
    await supabase
      .from('pilot_requests')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id);
    fetchRequests();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">طلبات البرنامج التجريبي</h1>
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 text-center">جاري التحميل...</div>
          ) : requests.length === 0 ? (
            <div className="p-8 text-center text-gray-500">لا توجد طلبات</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>الحالة</TableHead>
                  <TableHead>المؤسسة</TableHead>
                  <TableHead>جهة الاتصال</TableHead>
                  <TableHead>البريد الإلكتروني</TableHead>
                  <TableHead>الهاتف</TableHead>
                  <TableHead>التاريخ</TableHead>
                  <TableHead>إجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>
                      <Badge variant={
                        request.status === 'new' ? 'default' :
                        request.status === 'approved' ? 'default' :
                        request.status === 'rejected' ? 'destructive' : 'secondary'
                      }>
                        {statusLabels[request.status]}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{request.organization_name}</TableCell>
                    <TableCell>{request.contact_person}</TableCell>
                    <TableCell>
                      <a href={`mailto:${request.email}`} className="flex items-center gap-1 text-primary hover:underline">
                        <Mail className="w-4 h-4" />
                        {request.email}
                      </a>
                    </TableCell>
                    <TableCell>
                      {request.phone ? (
                        <a href={`tel:${request.phone}`} className="flex items-center gap-1 text-primary hover:underline">
                          <Phone className="w-4 h-4" />
                          {request.phone}
                        </a>
                      ) : '-'}
                    </TableCell>
                    <TableCell>{new Date(request.created_at).toLocaleDateString('ar-SA')}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {request.status === 'new' && (
                          <>
                            <Button variant="ghost" size="icon" onClick={() => handleStatusChange(request.id, 'contacted')}>
                              <Check className="w-4 h-4 text-green-500" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleStatusChange(request.id, 'rejected')}>
                              <X className="w-4 h-4 text-red-500" />
                            </Button>
                          </>
                        )}
                        {request.status === 'contacted' && (
                          <>
                            <Button variant="ghost" size="icon" onClick={() => handleStatusChange(request.id, 'approved')}>
                              <Check className="w-4 h-4 text-green-500" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleStatusChange(request.id, 'rejected')}>
                              <X className="w-4 h-4 text-red-500" />
                            </Button>
                          </>
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