import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ─── FILE PATH BUILDER ────────────────────────────────────────
// Structure: {userId}/{programmeId}/{standard}/{phase}/{prefix}_{filename}
export function buildFilePath({ userId, programmeId, programmeRef, standard, phase, wpRef, originalName }) {
  const safeStandard = standard.replace(/[^a-zA-Z0-9]/g, '_')
  const safePhase = phase.replace(/[^a-zA-Z0-9]/g, '_')
  const ext = originalName.split('.').pop()
  const baseName = originalName.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9]/g, '_').slice(0, 40)
  const date = new Date().toISOString().split('T')[0]
  const fileName = `${wpRef}_${safeStandard}_${safePhase}_${baseName}_${date}.${ext}`
  return `${userId}/${programmeId}/${safeStandard}/${safePhase}/${fileName}`
}

// ─── UPLOAD FILE ─────────────────────────────────────────────
export async function uploadFile({ file, filePath }) {
  const { data, error } = await supabase.storage
    .from('workpapers')
    .upload(filePath, file, { upsert: false })
  if (error) throw error
  return data
}

// ─── GET SIGNED URL ──────────────────────────────────────────
export async function getSignedUrl(filePath) {
  const { data, error } = await supabase.storage
    .from('workpapers')
    .createSignedUrl(filePath, 3600) // 1 hour expiry
  if (error) throw error
  return data.signedUrl
}

// ─── DELETE FILE ─────────────────────────────────────────────
export async function deleteFile(filePath) {
  const { error } = await supabase.storage
    .from('workpapers')
    .remove([filePath])
  if (error) throw error
}

// ─── AUDIT PROGRAMMES ────────────────────────────────────────
export async function getProgrammes(userId) {
  const { data, error } = await supabase
    .from('audit_programmes')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function createProgramme(programme) {
  const { data, error } = await supabase
    .from('audit_programmes')
    .insert(programme)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateProgramme(id, updates) {
  const { data, error } = await supabase
    .from('audit_programmes')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

// ─── WORKPAPERS ──────────────────────────────────────────────
export async function getWorkpapers(programmeId) {
  const { data, error } = await supabase
    .from('workpapers')
    .select('*')
    .eq('programme_id', programmeId)
    .order('workpaper_ref', { ascending: true })
  if (error) throw error
  return data
}

export async function createWorkpaper(workpaper) {
  const { data, error } = await supabase
    .from('workpapers')
    .insert(workpaper)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateWorkpaper(id, updates) {
  const { data, error } = await supabase
    .from('workpapers')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteWorkpaper(id, filePath) {
  if (filePath) await deleteFile(filePath)
  const { error } = await supabase
    .from('workpapers')
    .delete()
    .eq('id', id)
  if (error) throw error
}

// ─── FINDINGS ────────────────────────────────────────────────
export async function getFindings(programmeId) {
  const { data, error } = await supabase
    .from('findings')
    .select('*')
    .eq('programme_id', programmeId)
    .order('finding_ref', { ascending: true })
  if (error) throw error
  return data
}

export async function createFinding(finding) {
  const { data, error } = await supabase
    .from('findings')
    .insert(finding)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateFinding(id, updates) {
  const { data, error } = await supabase
    .from('findings')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

// ─── RISK REGISTER ───────────────────────────────────────────
export async function getRisks(programmeId) {
  const { data, error } = await supabase
    .from('risk_register')
    .select('*')
    .eq('programme_id', programmeId)
    .order('risk_ref', { ascending: true })
  if (error) throw error
  return data
}

export async function createRisk(risk) {
  const { data, error } = await supabase
    .from('risk_register')
    .insert(risk)
    .select()
    .single()
  if (error) throw error
  return data
}

// ─── PBC ITEMS ───────────────────────────────────────────────
export async function getPBCItems(programmeId) {
  const { data, error } = await supabase
    .from('pbc_items')
    .select('*')
    .eq('programme_id', programmeId)
    .order('pbc_ref', { ascending: true })
  if (error) throw error
  return data
}

export async function createPBCItem(item) {
  const { data, error } = await supabase
    .from('pbc_items')
    .insert(item)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updatePBCItem(id, updates) {
  const { data, error } = await supabase
    .from('pbc_items')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

// ── Delete & Update functions ─────────────────────────
export async function updateRisk(id, updates) {
  const { data, error } = await supabase.from('risk_register').update(updates).eq('id', id).select().single()
  if (error) throw error
  return data
}

export async function deleteRisk(id) {
  const { error } = await supabase.from('risk_register').delete().eq('id', id)
  if (error) throw error
}

export async function deleteFinding(id) {
  const { error } = await supabase.from('findings').delete().eq('id', id)
  if (error) throw error
}

export async function deletePBCItem(id) {
  const { error } = await supabase.from('pbc_items').delete().eq('id', id)
  if (error) throw error
}

export async function deleteWorkpaperRecord(id) {
  const { error } = await supabase.from('workpapers').delete().eq('id', id)
  if (error) throw error
}

// ─── ISMS — SoA (Layer 1) ──────────────────────────────────────
export async function getSoA(programmeId) {
  const { data, error } = await supabase
    .from('isms_soa')
    .select('*')
    .eq('programme_id', programmeId)
  if (error) throw error
  return data
}

export async function upsertSoAControl(row) {
  const { data, error } = await supabase
    .from('isms_soa')
    .upsert(row, { onConflict: 'programme_id,control_id' })
    .select()
    .single()
  if (error) throw error
  return data
}

// ─── ISMS — Implementation (Layer 2) ────────────────────────────
// includeArchived=false (default) hides rows archived by control retirement — Sprint 5 cascade
export async function getISMSImplementation(programmeId, includeArchived = false) {
  let q = supabase.from('isms_implementation').select('*').eq('programme_id', programmeId)
  if (!includeArchived) q = q.eq('archived', false)
  const { data, error } = await q
  if (error) throw error
  return data
}

// Retirement cascade: archive (never delete) Layer 2 + risk-control-map rows for a control
export async function archiveControl(programmeId, controlId, archived = true) {
  const { error: e1 } = await supabase.from('isms_implementation').update({ archived }).eq('programme_id', programmeId).eq('control_id', controlId)
  if (e1) throw e1
  const { error: e2 } = await supabase.from('isms_risk_control_map').update({ archived }).eq('programme_id', programmeId).eq('control_id', controlId)
  if (e2) throw e2
}

export async function upsertISMSControl(row) {
  const { data, error } = await supabase
    .from('isms_implementation')
    .upsert(row, { onConflict: 'programme_id,control_id' })
    .select()
    .single()
  if (error) throw error
  return data
}

// ─── ISMS — Risk ↔ Control Map (Cl. 6.1.3) ─────────────────────
export async function getRiskControlLinks(programmeId, includeArchived = false) {
  let q = supabase.from('isms_risk_control_map').select('*').eq('programme_id', programmeId)
  if (!includeArchived) q = q.eq('archived', false)
  const { data, error } = await q
  if (error) throw error
  return data
}

export async function createRiskControlLink(row) {
  const { data, error } = await supabase
    .from('isms_risk_control_map')
    .insert(row)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteRiskControlLink(id) {
  const { error } = await supabase.from('isms_risk_control_map').delete().eq('id', id)
  if (error) throw error
}

// ─── ISMS — Control History (retirement / versioning trail) ───
export async function getControlHistory(programmeId, controlId) {
  let q = supabase.from('isms_control_history').select('*').eq('programme_id', programmeId)
  if (controlId) q = q.eq('control_id', controlId)
  const { data, error } = await q.order('changed_at', { ascending: false })
  if (error) throw error
  return data
}

export async function logControlHistory(row) {
  const { error } = await supabase.from('isms_control_history').insert(row)
  if (error) throw error
}

// ─── Sign-offs (Sprint 11, approval stamps) ─────────────────────────────
export async function getSignoffs(programmeId, scopeType, scopeRef = null) {
  let q = supabase.from('isms_signoffs').select('*').eq('programme_id', programmeId).eq('scope_type', scopeType)
  q = scopeRef == null ? q.is('scope_ref', null) : q.eq('scope_ref', scopeRef)
  const { data, error } = await q.order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function addSignoff(row) {
  const { data, error } = await supabase.from('isms_signoffs').insert(row).select().single()
  if (error) throw error
  return data
}

export async function deleteSignoff(id) {
  const { error } = await supabase.from('isms_signoffs').delete().eq('id', id)
  if (error) throw error
}

// ─── Evidence file upload (Sprint 11) — reuses the 'workpapers' bucket ──
export function buildEvidenceFilePath({ userId, programmeId, controlId, originalName }) {
  const ext = originalName.split('.').pop()
  const baseName = originalName.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9]/g, '_').slice(0, 40)
  const date = new Date().toISOString().split('T')[0]
  return `${userId}/${programmeId}/isms-evidence/${controlId}/${date}_${baseName}.${ext}`
}

// ─── Team Members (Sprint 10, multi-auditor access) ────────────────────
export async function getMyRole(programmeId, userId) {
  const { data, error } = await supabase.from('programme_members').select('role').eq('programme_id', programmeId).eq('user_id', userId).maybeSingle()
  if (error) throw error
  return data?.role || null
}

export async function getProgrammeMembers(programmeId) {
  const { data, error } = await supabase
    .from('programme_members')
    .select('*')
    .eq('programme_id', programmeId)
    .order('created_at')
  if (error) throw error
  return data
}

// Invites a user by email and adds them to the programme with the given role.
// ASSUMPTION — adjust to match your actual edge function's name/payload if different:
// expects an edge function named 'invite-member' that takes
// { email, programme_id, role } and returns { user_id } for the invited/matched user.
// If your function's contract differs, only this one function needs to change.
export async function inviteProgrammeMember({ programmeId, email, role, invitedBy }) {
  const { data: fnData, error: fnError } = await supabase.functions.invoke('invite-member', {
    body: { email, programme_id: programmeId, role },
  })
  if (fnError) throw fnError
  if (!fnData?.user_id) throw new Error('Invite function did not return a user_id')

  const { data, error } = await supabase
    .from('programme_members')
    .insert({ programme_id: programmeId, user_id: fnData.user_id, role, invited_by: invitedBy })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateMemberRole(id, role) {
  const { data, error } = await supabase.from('programme_members').update({ role }).eq('id', id).select().single()
  if (error) throw error
  return data
}

export async function removeMember(id) {
  const { error } = await supabase.from('programme_members').delete().eq('id', id)
  if (error) throw error
}

// ─── ISMS — RCM Sample Items (Sprint 8, audit-defensible testing detail) ───
export async function getRCMSamples(programmeId, controlId) {
  let q = supabase.from('isms_rcm_samples').select('*').eq('programme_id', programmeId)
  if (controlId) q = q.eq('control_id', controlId)
  const { data, error } = await q.order('created_at')
  if (error) throw error
  return data
}

export async function addRCMSample(row) {
  const { data, error } = await supabase.from('isms_rcm_samples').insert(row).select().single()
  if (error) throw error
  return data
}

export async function deleteRCMSample(id) {
  const { error } = await supabase.from('isms_rcm_samples').delete().eq('id', id)
  if (error) throw error
}

// ─── ISMS — Multi-site Scope Register ───────────────────────────
export async function getSites(programmeId) {
  const { data, error } = await supabase
    .from('isms_sites')
    .select('*')
    .eq('programme_id', programmeId)
    .order('created_at')
  if (error) throw error
  return data
}

export async function createSite(site) {
  const { data, error } = await supabase.from('isms_sites').insert(site).select().single()
  if (error) throw error
  return data
}

export async function updateSite(id, updates) {
  const { data, error } = await supabase.from('isms_sites').update(updates).eq('id', id).select().single()
  if (error) throw error
  return data
}

export async function deleteSite(id) {
  const { error } = await supabase.from('isms_sites').delete().eq('id', id)
  if (error) throw error
}

// ─── ISMS — Supplier Audit register (Sprint 15, Annex A.5.19–23) ───
export async function getSupplierAudits(programmeId) {
  const { data, error } = await supabase.from('isms_supplier_audits').select('*').eq('programme_id', programmeId).order('created_at')
  if (error) throw error
  return data
}

export async function createSupplierAudit(row) {
  const { data, error } = await supabase.from('isms_supplier_audits').insert(row).select().single()
  if (error) throw error
  return data
}

export async function updateSupplierAudit(id, updates) {
  const { data, error } = await supabase.from('isms_supplier_audits').update({ ...updates, updated_at: new Date().toISOString() }).eq('id', id).select().single()
  if (error) throw error
  return data
}

export async function deleteSupplierAudit(id) {
  const { error } = await supabase.from('isms_supplier_audits').delete().eq('id', id)
  if (error) throw error
}

// ─── ISMS — Control ↔ Site cross-reference (Cl. 4.3) ────────────
export async function getControlSites(programmeId) {
  const { data, error } = await supabase.from('isms_control_sites').select('*').eq('programme_id', programmeId)
  if (error) throw error
  return data
}

export async function linkControlSite(row) {
  const { data, error } = await supabase.from('isms_control_sites').insert(row).select().single()
  if (error) throw error
  return data
}

export async function unlinkControlSite(id) {
  const { error } = await supabase.from('isms_control_sites').delete().eq('id', id)
  if (error) throw error
}
