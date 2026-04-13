'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, MessageSquare, Users, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    products: 0,
    messages: 0,
    pilotRequests: 0,
    unreadMessages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        console.log('Creating supabase client...');
        const supabase = createClient();
        console.log('Client created, fetching data...');
        
        const [productsRes, messagesRes, pilotRes] = await Promise.all([
          supabase.from('products').select('id', { count: 'exact', head: true }),
          supabase.from('contact_messages').select('id', { count: 'exact', head: true }).eq('status', 'new'),
          supabase.from('pilot_requests').select('id', { count: 'exact', head: true }),
        ]);

        console.log('Products response:', productsRes);
        console.log('Messages response:', messagesRes);
        console.log('Pilot response:', pilotRes);

        setStats({
          products: productsRes.count || 0,
          messages: (messagesRes.data?.length || 0),
          pilotRequests: pilotRes.count || 0,
          unreadMessages: messagesRes.count || 0,
        });
      } catch (err) {
        console.error('Error fetching stats:', err);
        setError('Error loading data: ' + err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    {
      title: 'المنتجات',
      value: stats.products,
      icon: Package,
      href: '/admin/products',
      color: 'bg-blue-500',
    },
    {
      title: 'رسائل جديدة',
      value: stats.unreadMessages,
      icon: MessageSquare,
      href: '/admin/messages',
      color: 'bg-green-500',
    },
    {
      title: 'طلبات البرنامج',
      value: stats.pilotRequests,
      icon: Users,
      href: '/admin/pilot-requests',
      color: 'bg-purple-500',
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">لوحة التحكم</h1>
      
      {error && (
        <div className="p-4 mb-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      
      {loading ? (
        <div className="text-center py-8">جاري التحميل...</div>
      ) : (
        {cards.map((card) => (
          <Link key={card.title} href={card.href}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">{card.title}</p>
                    <p className="text-3xl font-bold">{card.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-full ${card.color} flex items-center justify-center`}>
                    <card.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
          ))}
      </div>)}

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">آخر الرسائل</CardTitle>
          </CardHeader>
          <CardContent>
            <Link href="/admin/messages" className="flex items-center justify-between text-primary hover:underline">
              عرض جميع الرسائل <ArrowUpRight className="w-4 h-4" />
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">آخر طلبات البرنامج</CardTitle>
          </CardHeader>
          <CardContent>
            <Link href="/admin/pilot-requests" className="flex items-center justify-between text-primary hover:underline">
              عرض جميع الطلبات <ArrowUpRight className="w-4 h-4" />
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}