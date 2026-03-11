import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

serve(async (req) => {
  try {
    // 1. Connect to your Supabase database using the master admin key
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // 2. Read the message Paystack just sent us
    const payload = await req.json()

    // 3. Extract the user_id we hid inside the metadata earlier
    const userId = payload.data?.metadata?.user_id

    if (!userId) {
      // If there is no user ID, ignore the webhook so it doesn't crash
      return new Response("No user ID found in metadata, ignoring.", { status: 200 })
    }

    // 4. If the monthly charge was SUCCESSFUL
    if (payload.event === 'charge.success') {
      await supabaseAdmin
        .from('subscriptions')
        .update({ status: 'active' })
        .eq('user_id', userId)
    }

    // 5. If the charge FAILED or they cancelled their subscription
    if (payload.event === 'invoice.payment_failed' || payload.event === 'subscription.disable') {
      await supabaseAdmin
        .from('subscriptions')
        .update({ status: 'inactive' })
        .eq('user_id', userId)
    }

    // 6. Tell Paystack we received the message successfully
    return new Response("Webhook processed perfectly!", { status: 200 })
    
  } catch (error) {
    console.error("Webhook error:", error)
    return new Response("Server Error", { status: 500 })
  }
})