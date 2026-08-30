// Supabase Edge Function: invite-member
// Contract expected by src/lib/supabase.js -> inviteProgrammeMember():
//   request:  { email: string, programme_id: string, role: string }
//   response: { user_id: string }
//
// Looks up an existing auth user by email. If none exists, sends a Supabase
// invite email (creates the auth user in "invited" state) and returns their
// new user_id. Requires the SUPABASE_SERVICE_ROLE_KEY secret (never expose
// this key client-side) — set automatically for you inside edge functions
// as SUPABASE_SERVICE_ROLE_KEY, or set it explicitly via
// `supabase secrets set`.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const { email, programme_id, role } = await req.json()
    if (!email || !programme_id || !role) {
      return new Response(JSON.stringify({ error: 'email, programme_id, and role are required' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    // Look for an existing auth user with this email (paginate — admin API
    // has no direct filter-by-email in older SDK versions).
    let existingUserId: string | null = null
    let page = 1
    while (!existingUserId) {
      const { data, error } = await supabaseAdmin.auth.admin.listUsers({ page, perPage: 200 })
      if (error) throw error
      const match = data.users.find(u => u.email?.toLowerCase() === email.toLowerCase())
      if (match) existingUserId = match.id
      if (data.users.length < 200) break
      page++
    }

    if (existingUserId) {
      return new Response(JSON.stringify({ user_id: existingUserId }), {
        status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // No existing account — invite by email (creates the auth user now, in
    // "invited" state; they set a password via the emailed link).
    const { data: invited, error: inviteError } = await supabaseAdmin.auth.admin.inviteUserByEmail(email, {
      data: { invited_role: role, invited_programme_id: programme_id },
    })
    if (inviteError) throw inviteError

    return new Response(JSON.stringify({ user_id: invited.user.id }), {
      status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message ?? String(e) }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
