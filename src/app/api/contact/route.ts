import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';

const contactSchema = z.object({
  full_name: z.string().min(2, 'الاسم يجب أن يكون على الأقل حرفين'),
  email: z.string().email('البريد الإلكتروني غير صحيح'),
  inquiry_type: z.string().optional(),
  message: z.string().min(10, 'الرسالة يجب أن تكون على الأقل 10 أحرف'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validation = contactSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    
    const { error } = await supabase
      .from('contact_messages')
      .insert({
        full_name: body.full_name,
        email: body.email,
        inquiry_type: body.inquiry_type || null,
        message: body.message,
      });

    if (error) {
      console.error('Error inserting contact message:', error);
      return NextResponse.json(
        { error: 'حدث خطأ في إرسال الرسالة، يرجى المحاولة مرة أخرى' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'تم إرسال رسالتك بنجاح، سنتواصل معك قريباً' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'حدث خطأ غير متوقع' },
      { status: 500 }
    );
  }
}