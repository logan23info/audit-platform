// Supabase Edge Function: ai-generate
// Server-side proxy for AI calls — keeps the Groq/OpenAI/Anthropic API key
// out of the browser bundle entirely. AIPanel.jsx calls this function
// instead of hitting api.groq.com directly.
//
// Request:  { systemPrompt: string, userMessage: string }
// Response: { text: string, provider: 'groq' | 'openai' | 'anthropic' }
//
// Requires ONE of these secrets set on this Supabase project (fallback
// order matches the prior client-side logic — Groq, then OpenAI, then
// Anthropic):
//   supabase secrets set GROQ_API_KEY=... --project-ref eyqmetbecpuobmdzqayn
//   supabase secrets set OPENAI_API_KEY=... --project-ref eyqmetbecpuobmdzqayn
//   supabase secrets set ANTHROPIC_API_KEY=... --project-ref eyqmetbecpuobmdzqayn
// Use a key dedicated to AuditIQ, separate from any key used by QMSiQ or
// shipped client-side previously — those client-side keys were exposed in
// the browser bundle and should be revoked on the Groq console regardless
// of this change.

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const { systemPrompt, userMessage } = await req.json()
    if (!systemPrompt || !userMessage) {
      return new Response(JSON.stringify({ error: 'systemPrompt and userMessage are required' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const groqKey = Deno.env.get('GROQ_API_KEY')
    const openaiKey = Deno.env.get('OPENAI_API_KEY')
    const anthropicKey = Deno.env.get('ANTHROPIC_API_KEY')

    if (groqKey) {
      const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${groqKey}` },
        body: JSON.stringify({ model: 'openai/gpt-oss-20b', max_tokens: 1500, messages: [{ role: 'system', content: systemPrompt }, { role: 'user', content: userMessage }] }),
      })
      if (!r.ok) { const err = await r.json().catch(() => ({})); throw new Error(err?.error?.message || `Groq error ${r.status}`) }
      const data = await r.json()
      return new Response(JSON.stringify({ text: data.choices?.[0]?.message?.content || '', provider: 'groq' }), {
        status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    if (openaiKey) {
      const r = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${openaiKey}` },
        body: JSON.stringify({ model: 'gpt-4o-mini', max_tokens: 1500, messages: [{ role: 'system', content: systemPrompt }, { role: 'user', content: userMessage }] }),
      })
      if (!r.ok) { const err = await r.json().catch(() => ({})); throw new Error(err?.error?.message || `OpenAI error ${r.status}`) }
      const data = await r.json()
      return new Response(JSON.stringify({ text: data.choices?.[0]?.message?.content || '', provider: 'openai' }), {
        status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    if (anthropicKey) {
      const r = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': anthropicKey, 'anthropic-version': '2023-06-01' },
        body: JSON.stringify({ model: 'claude-sonnet-4-6', max_tokens: 1000, system: systemPrompt, messages: [{ role: 'user', content: userMessage }] }),
      })
      if (!r.ok) { const err = await r.json().catch(() => ({})); throw new Error(err?.error?.message || `Anthropic error ${r.status}`) }
      const data = await r.json()
      return new Response(JSON.stringify({ text: data.content?.map((b: any) => b.text || '').join('\n') || '', provider: 'anthropic' }), {
        status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ error: 'NO_KEY' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message ?? String(e) }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
