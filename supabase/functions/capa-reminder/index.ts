// Supabase Edge Function: capa-reminder
// Sends an email nudge for CAPAs (findings with an agreed action + due date)
// due within the next 7 days. Adapted from QMSiQ's capa-reminder — same
// pattern (Resend if RESEND_API_KEY is set, else a Supabase magic-link
// email as fallback), but matched to AuditIQ's actual schema:
//   - AuditIQ has no `profiles` table, so the match is against
//     auth.users directly (email local-part or user_metadata.full_name
//     ilike action_owner) rather than a profiles.full_name lookup.
//   - AuditIQ's findings.status values are Open / In Progress / Closed
//     (no QMSiQ-style 'CAPA Raised' state) — reminder fires for any
//     non-Closed finding with a due_date in range.
// Not on a schedule by default — trigger it with Supabase's pg_cron
// (`select cron.schedule(...)` calling this function's URL) or an
// external scheduler once you're ready for it to run automatically.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { autoRefreshToken: false, persistSession: false } },
    )

    const siteUrl = Deno.env.get('SITE_URL') ?? 'https://auditiq-it.vercel.app'
    const resendKey = Deno.env.get('RESEND_API_KEY')

    const sevenDaysFromNow = new Date()
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7)
    const today = new Date().toISOString().split('T')[0]
    const dueDate = sevenDaysFromNow.toISOString().split('T')[0]

    const { data: capas, error } = await supabaseAdmin
      .from('findings')
      .select('id, finding_ref, title, due_date, action_owner, programme_id, audit_programmes(name, programme_id)')
      .neq('status', 'Closed')
      .not('due_date', 'is', null)
      .lte('due_date', dueDate)
      .gte('due_date', today)

    if (error) throw error
    if (!capas || capas.length === 0) {
      return new Response(JSON.stringify({ sent: 0, message: 'No CAPAs due in 7 days' }), {
        status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // One admin.listUsers call, reused for every finding's action_owner
    // match — cheaper than one lookup per finding.
    let allUsers: any[] = []
    let page = 1
    while (true) {
      const { data, error: listErr } = await supabaseAdmin.auth.admin.listUsers({ page, perPage: 200 })
      if (listErr) throw listErr
      allUsers = allUsers.concat(data.users)
      if (data.users.length < 200) break
      page++
    }

    let sent = 0
    const errors: string[] = []

    for (const capa of capas) {
      if (!capa.action_owner) continue

      const owner = capa.action_owner.toLowerCase()
      const match = allUsers.find(u =>
        (u.user_metadata?.full_name && u.user_metadata.full_name.toLowerCase().includes(owner)) ||
        (u.email && u.email.toLowerCase().split('@')[0].includes(owner.replace(/\s+/g, '')))
      )
      if (!match?.email) continue

      const daysUntilDue = Math.max(0, Math.ceil((new Date(capa.due_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
      const programmeName = (capa.audit_programmes as { name?: string })?.name || 'your audit programme'
      const capaUrl = `${siteUrl}/reporting/capa`

      if (resendKey) {
        const emailBody = {
          from: 'AuditIQ <noreply@auditiq-it.vercel.app>',
          to: [match.email],
          subject: `CAPA Reminder — ${capa.finding_ref} due in ${daysUntilDue} day${daysUntilDue === 1 ? '' : 's'}`,
          html: `
            <p>Hi ${match.user_metadata?.full_name || capa.action_owner},</p>
            <p>This is a reminder that the following CAPA is due in <strong>${daysUntilDue} day${daysUntilDue === 1 ? '' : 's'}</strong>.</p>
            <table style="border-collapse:collapse;width:100%;max-width:500px">
              <tr><td style="padding:8px;background:#f5f5f5;font-weight:bold">Reference</td><td style="padding:8px">${capa.finding_ref}</td></tr>
              <tr><td style="padding:8px;background:#f5f5f5;font-weight:bold">Title</td><td style="padding:8px">${capa.title}</td></tr>
              <tr><td style="padding:8px;background:#f5f5f5;font-weight:bold">Programme</td><td style="padding:8px">${programmeName}</td></tr>
              <tr><td style="padding:8px;background:#f5f5f5;font-weight:bold">Due date</td><td style="padding:8px">${capa.due_date}</td></tr>
            </table>
            <p><a href="${capaUrl}" style="background:#d97706;color:white;padding:10px 20px;border-radius:6px;text-decoration:none;display:inline-block;margin-top:12px">View CAPA Tracker</a></p>
            <p style="color:#888;font-size:12px;margin-top:24px">AuditIQ · ISMS Audit Platform</p>
          `,
        }
        const r = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
          body: JSON.stringify(emailBody),
        })
        if (r.ok) sent++
        else errors.push(`Resend failed for ${match.email}: ${r.status}`)
      } else {
        const { error: linkErr } = await supabaseAdmin.auth.admin.generateLink({ type: 'magiclink', email: match.email, options: { redirectTo: capaUrl } })
        if (!linkErr) sent++
        else errors.push(`Magic link failed for ${match.email}`)
      }
    }

    return new Response(JSON.stringify({ sent, total: capas.length, errors }), {
      status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message ?? String(e) }), {
      status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
