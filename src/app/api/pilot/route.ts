import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';

const pilotSchema = z.object({
  organization_name: z.string().min(2, 'اسم المؤسسة مطلوب'),
  contact_person: z.string().min(2, 'اسم جهة الاتصال مطلوب'),
  email: z.string().email('البريد الإلكتروني غير صحيح'),
  phone: z.string().optional(),
  description: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validation = pilotSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    
    const { error } = await supabase
      .from('pilot_requests')
      .insert({
        organization_name: body.organization_name,
        contact_person: body.contact_person,
        email: body.email,
        phone: body.phone || null,
        description: body.description || null,
      });

    if (error) {
      console.error('Error inserting pilot request:', error);
      return NextResponse.json(
        { error: 'حدث خطأ في إرسال الطلب، يرجى المحاولة مرة أخرى' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'تم إرسال طلبك بنجاح، سنتواصل معك قريباً' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Pilot request form error:', error);
    return NextResponse.json(
      { error: 'حدث خطأ غير متوقع' },
      { status: 500 }
    );
  }
}