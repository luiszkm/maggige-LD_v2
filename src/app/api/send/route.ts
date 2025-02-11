import { EmailTemplate } from '../../../components/EmailTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.json();
  if (!body.email) {
    return Response.json({ error: 'Missing email' }, { status: 400 });
  }
  const { email, guests, presents } = body
  const emailTemplate = EmailTemplate({ email, guests, presents });
  if (!emailTemplate) {
    return Response.json({ error: 'Invalid email template' }, { status: 400 });
  }
  try {
    const { data, error } = await resend.emails.send({
      from: 'Casamento <onboarding@resend.dev>',
      to: ['luiszkm@gmail.com'],
      subject: 'Confirmação de presença',
      react: emailTemplate,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
