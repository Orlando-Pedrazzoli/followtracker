import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { clerkClient } from '@clerk/nextjs/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing signature' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  const clerk = await clerkClient();

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const clerkUserId = session.metadata?.clerkUserId;
        const tierId = session.metadata?.tierId;

        if (clerkUserId && tierId) {
          // Atualizar metadata do usuário no Clerk
          await clerk.users.updateUser(clerkUserId, {
            publicMetadata: {
              subscriptionTier: tierId,
              stripeCustomerId: session.customer as string,
              stripeSubscriptionId: session.subscription as string,
              subscriptionStatus: 'active',
              usedAnalyses: 0,
            },
          });
          
          console.log(`✅ Subscription ativada para ${clerkUserId}: ${tierId}`);
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const clerkUserId = subscription.metadata?.clerkUserId;

        if (clerkUserId) {
          const status = subscription.status;
          const periodEnd = new Date(subscription.current_period_end * 1000).toISOString();

          // Buscar usuário atual para manter dados existentes
          const user = await clerk.users.getUser(clerkUserId);
          const currentMetadata = user.publicMetadata as Record<string, any>;

          await clerk.users.updateUser(clerkUserId, {
            publicMetadata: {
              ...currentMetadata,
              subscriptionStatus: status,
              subscriptionPeriodEnd: periodEnd,
              // Reset usage no início de novo período
              usedAnalyses: subscription.current_period_start > (Date.now() / 1000 - 86400) 
                ? 0 
                : currentMetadata.usedAnalyses || 0,
            },
          });

          console.log(`✅ Subscription atualizada para ${clerkUserId}: ${status}`);
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const clerkUserId = subscription.metadata?.clerkUserId;

        if (clerkUserId) {
          // Downgrade para free
          await clerk.users.updateUser(clerkUserId, {
            publicMetadata: {
              subscriptionTier: 'free',
              subscriptionStatus: 'canceled',
              stripeSubscriptionId: null,
              subscriptionPeriodEnd: null,
            },
          });

          console.log(`✅ Subscription cancelada para ${clerkUserId}`);
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        const subscriptionId = invoice.subscription as string;
        
        if (subscriptionId) {
          const subscription = await stripe.subscriptions.retrieve(subscriptionId);
          const clerkUserId = subscription.metadata?.clerkUserId;

          if (clerkUserId) {
            const user = await clerk.users.getUser(clerkUserId);
            const currentMetadata = user.publicMetadata as Record<string, any>;

            await clerk.users.updateUser(clerkUserId, {
              publicMetadata: {
                ...currentMetadata,
                subscriptionStatus: 'past_due',
              },
            });

            console.log(`⚠️ Pagamento falhou para ${clerkUserId}`);
          }
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Erro ao processar webhook:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}