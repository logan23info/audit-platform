export const navSections = [
  {
    id: 'core', label: 'Platform',
    items: [
      { id: 'dashboard', label: 'Dashboard', path: '/', icon: 'LayoutDashboard' },
      { id: 'wiki', label: 'How to Use (Wiki)', path: '/wiki', icon: 'BookOpen' },
      { id: 'faq', label: 'FAQ', path: '/faq', icon: 'HelpCircle' },
      { id: 'profile', label: 'My Profile', path: '/profile', icon: 'User' },
    ]
  },
  {
    id: 'iso19011', label: 'ISO 19011 — Audit Methodology',
    items: [
      { id: '19011-cl4', label: 'Clause 4 — Principles', path: '/iso19011/clause4', icon: 'Shield' },
      { id: '19011-cl5', label: 'Clause 5 — Programme Mgmt', path: '/iso19011/clause5', icon: 'CalendarDays' },
      { id: '19011-cl6-init', label: 'Clause 6.2 — Initiation', path: '/iso19011/clause6-initiation', icon: 'PlayCircle' },
      { id: '19011-cl6-prep', label: 'Clause 6.3 — Preparation', path: '/iso19011/clause6-preparation', icon: 'ClipboardList' },
      { id: '19011-tod', label: 'TOD — Test of Design', path: '/iso19011/tod', icon: 'PenTool' },
      { id: '19011-toi', label: 'TOI — Test of Implementation', path: '/iso19011/toi', icon: 'Eye' },
      { id: '19011-toe', label: 'TOE — Test of Effectiveness', path: '/iso19011/toe', icon: 'BarChart3' },
      { id: '19011-findings', label: 'Finding Development (4Cs)', path: '/iso19011/findings', icon: 'AlertTriangle' },
      { id: '19011-meetings', label: 'Meetings — Open & Close', path: '/iso19011/meetings', icon: 'Users' },
      { id: '19011-reporting', label: 'Clause 6.5 — Reporting', path: '/iso19011/reporting', icon: 'FileText' },
      { id: '19011-cl7', label: 'Clause 7 — Auditor Competence', path: '/iso19011/clause7', icon: 'GraduationCap' },
      { id: '19011-annexa', label: 'Annex A — Guidance', path: '/iso19011/annexa', icon: 'BookOpen' },
    ]
  },
  {
    id: 'iso27000', label: 'ISO 27000 — Terminology',
    items: [{ id: '27000', label: 'Audit Taxonomy Dictionary', path: '/iso27000', icon: 'BookMarked' }]
  },
  {
    id: 'iso27001', label: 'ISO 27001 — ISMS',
    items: [
      { id: '27001-cl4', label: 'Clause 4 — Context & Scope', path: '/iso27001/clause4', icon: 'Map' },
      { id: '27001-cl5', label: 'Clause 5 — Leadership', path: '/iso27001/clause5', icon: 'Crown' },
      { id: '27001-cl6', label: 'Clause 6 — Planning & SoA', path: '/iso27001/clause6', icon: 'Target' },
      { id: '27001-cl7', label: 'Clause 7 — Support', path: '/iso27001/clause7', icon: 'Wrench' },
      { id: '27001-soa', label: 'SoA Builder ⭐ — All 93 Controls', path: '/iso27001/soa', icon: 'CheckSquare' },
      { id: '27001-cl8', label: 'Clause 8 — Operation', path: '/iso27001/clause8', icon: 'Settings' },
      { id: '27001-cl9', label: 'Clause 9 — Performance', path: '/iso27001/clause9', icon: 'TrendingUp' },
      { id: '27001-cl10', label: 'Clause 10 — Improvement', path: '/iso27001/clause10', icon: 'RefreshCw' },
    ]
  },
  {
    id: 'isms', label: 'ISMS Implementation',
    items: [
      { id: 'isms-landing', label: 'ISMS Overview', path: '/isms', icon: 'ShieldCheck' },
      { id: 'isms-implement', label: 'Layer 2 — Implement Controls', path: '/isms/implement', icon: 'ClipboardList' },
      { id: 'isms-scope', label: 'Multi-site Scope Register', path: '/isms/scope', icon: 'Map' },
      { id: 'isms-history', label: 'Control History', path: '/isms/history', icon: 'History' },
    ]
  },
  {
    id: 'iso27002', label: 'ISO 27002 — Controls',
    items: [
      { id: '27002-org', label: 'Organizational (5.1–5.37)', path: '/iso27002/organizational', icon: 'Building2' },
      { id: '27002-people', label: 'People (6.1–6.8)', path: '/iso27002/people', icon: 'UserCheck' },
      { id: '27002-physical', label: 'Physical (7.1–7.14)', path: '/iso27002/physical', icon: 'Lock' },
      { id: '27002-tech', label: 'Technological (8.1–8.34)', path: '/iso27002/technological', icon: 'Cpu' },
      { id: '27002-netnew', label: 'Net-New 11 Controls', path: '/iso27002/netnew', icon: 'Sparkles' },
    ]
  },
  {
    id: 'iso27005', label: 'ISO 27005 — Risk',
    items: [
      { id: '27005-assets', label: 'Asset Register', path: '/iso27005/assets', icon: 'Database' },
      { id: '27005-register', label: 'Risk Register ⭐ Live', path: '/iso27005/live-register', icon: 'AlertOctagon' },
      { id: '27005-rtp', label: 'Risk Treatment Plan', path: '/iso27005/rtp', icon: 'ShieldCheck' },
      { id: '27005-scenarios', label: 'Scenario Generator', path: '/iso27005/scenarios', icon: 'Zap' },
    ]
  },
  {
    id: 'fieldwork', label: 'Fieldwork Operations',
    items: [
      { id: 'pbc', label: 'PBC Master List ⭐ Live', path: '/fieldwork/pbc', icon: 'List' },
      { id: 'tracker', label: 'Fieldwork Tracker ⭐ Live', path: '/fieldwork/tracker', icon: 'CheckSquare' },
      { id: 'findings', label: 'Finding Register ⭐ Live', path: '/fieldwork/findings', icon: 'AlertTriangle' },
      { id: 'workpapers', label: 'Workpaper Index', path: '/fieldwork/workpapers', icon: 'FolderOpen' },
      { id: 'library', label: 'Workpaper Library ☁️', path: '/fieldwork/library', icon: 'CloudUpload' },
      { id: 'isms-audit', label: 'ISMS Certification Audit', path: '/fieldwork/isms-audit', icon: 'ShieldCheck' },
    ]
  },
  {
    id: 'reporting', label: 'Reporting & Governance',
    items: [
      { id: 'report-builder', label: 'Audit Report Builder', path: '/reporting/builder', icon: 'FileText' },
      { id: 'mgmt-review', label: 'Management Review Pack', path: '/reporting/management-review', icon: 'BarChart2' },
      { id: 'kpi', label: 'KPI Dashboard ⭐ Live', path: '/reporting/kpi', icon: 'Activity' },
      { id: 'capa', label: 'CAPA Tracker ⭐ Live', path: '/reporting/capa', icon: 'CheckCircle' },
      { id: 'audit-universe', label: 'Audit Universe ⭐ Live', path: '/reporting/universe', icon: 'Globe' },
    ]
  },
]
