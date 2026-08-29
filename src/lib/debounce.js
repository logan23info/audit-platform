// Shared debounce utility — used to avoid firing a Supabase upsert on every keystroke
// in free-text fields (SoA justification/notes, ISMS Implement policy_ref/owner/notes).
export function debounce(fn, delay = 500) {
  let timers = {}
  return (key, ...args) => {
    clearTimeout(timers[key])
    timers[key] = setTimeout(() => fn(...args), delay)
  }
}
