'use client';

import { useState, useEffect, useCallback, useId } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

interface Activity {
  id: string;
  type: string;
  entityId?: string | null;
  description: string;
  metadata?: Record<string, unknown> | null;
  createdAt: string;
  enquiry?: {
    id: string;
    name: string;
    email: string;
    company?: string | null;
  } | null;
}

interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string | null;
  services: string[];
  budget: string;
  timeline: string | null;
  source: string | null;
  message: string;
  nda: boolean;
  status: 'new' | 'contacted' | 'in_discussion' | 'converted' | 'archived';
  internalNotes: string | null;
  createdAt: string;
  updatedAt: string;
  activities?: Activity[];
}

interface StatusCounts {
  all: number;
  new: number;
  contacted: number;
  in_discussion: number;
  converted: number;
  archived: number;
}

const STATUS_CONFIG: Record<
  string,
  { label: string; bg: string; text: string; border: string }
> = {
  new: { label: 'New', bg: '#eff6ff', text: '#1d4ed8', border: '#bfdbfe' },
  contacted: { label: 'Contacted', bg: '#fefce8', text: '#a16207', border: '#fef08a' },
  in_discussion: { label: 'In Discussion', bg: '#f5f3ff', text: '#6d28d9', border: '#ddd6fe' },
  converted: { label: 'Converted', bg: '#f0fdf4', text: '#15803d', border: '#bbf7d0' },
  archived: { label: 'Archived', bg: '#f3f4f6', text: '#4b5563', border: '#e5e7eb' },
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const params = useParams();
  const secretPath = params?.secretPath as string;
  const statusSelectId = useId();

  // Tab & Filter states
  const [activeTab, setActiveTab] = useState<'enquiries' | 'activities'>('enquiries');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Data states
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [statusCounts, setStatusCounts] = useState<StatusCounts>({
    all: 0,
    new: 0,
    contacted: 0,
    in_discussion: 0,
    converted: 0,
    archived: 0,
  });
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Selected Enquiry for Drawer
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [noteDraft, setNoteDraft] = useState('');
  const [savingNote, setSavingNote] = useState(false);
  const [noteSavedNotice, setNoteSavedNotice] = useState(false);

  // Fetch enquiries
  const fetchEnquiries = useCallback(async (isManualRefresh = false) => {
    try {
      if (isManualRefresh) setLoading(true);
      const params = new URLSearchParams();
      if (selectedStatus && selectedStatus !== 'all') {
        params.set('status', selectedStatus);
      }
      if (searchQuery) {
        params.set('search', searchQuery);
      }

      const res = await fetch(`/api/admin/enquiries?${params.toString()}`);
      if (res.status === 401) {
        router.push(`/${secretPath}/login`);
        return;
      }

      const data = await res.json();
      if (data.ok) {
        setEnquiries(data.enquiries || []);
        if (data.statusCounts) setStatusCounts(data.statusCounts);
      } else {
        setError(data.error || 'Failed to load enquiries');
      }
    } catch {
      setError('Connection failure while fetching enquiries');
    } finally {
      setLoading(false);
    }
  }, [selectedStatus, searchQuery, router, secretPath]);

  // Fetch activities
  const fetchActivities = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/activities?limit=50');
      const data = await res.json();
      if (data.ok) {
        setActivities(data.activities || []);
      }
    } catch {
      console.error('Failed to load activities');
    }
  }, []);

  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        const params = new URLSearchParams();
        if (selectedStatus && selectedStatus !== 'all') {
          params.set('status', selectedStatus);
        }
        if (searchQuery) {
          params.set('search', searchQuery);
        }

        const res = await fetch(`/api/admin/enquiries?${params.toString()}`);
        if (res.status === 401) {
          router.push(`/${secretPath}/login`);
          return;
        }

        const data = await res.json();
        if (!ignore) {
          if (data.ok) {
            setEnquiries(data.enquiries || []);
            if (data.statusCounts) setStatusCounts(data.statusCounts);
          } else {
            setError(data.error || 'Failed to load enquiries');
          }
          setLoading(false);
        }
      } catch {
        if (!ignore) {
          setError('Connection failure while fetching enquiries');
          setLoading(false);
        }
      }
    }
    load();
    return () => {
      ignore = true;
    };
  }, [selectedStatus, searchQuery, router, secretPath]);

  useEffect(() => {
    let ignore = false;
    if (activeTab === 'activities') {
      fetch('/api/admin/activities?limit=50')
        .then((res) => res.json())
        .then((data) => {
          if (!ignore && data.ok) {
            setActivities(data.activities || []);
          }
        })
        .catch(() => {
          // ignore
        });
    }
    return () => {
      ignore = true;
    };
  }, [activeTab]);

  // Autorefresh every 10 seconds
  useEffect(() => {
    let ignore = false;
    const interval = setInterval(async () => {
      try {
        const queryParams = new URLSearchParams();
        if (selectedStatus && selectedStatus !== 'all') {
          queryParams.set('status', selectedStatus);
        }
        if (searchQuery) {
          queryParams.set('search', searchQuery);
        }

        const res = await fetch(`/api/admin/enquiries?${queryParams.toString()}`);
        if (res.ok) {
          const data = await res.json();
          if (!ignore && data.ok && data.enquiries) {
            setEnquiries(data.enquiries);
            if (data.statusCounts) setStatusCounts(data.statusCounts);

            // Sync open drawer if enquiry was updated
            setSelectedEnquiry((current) => {
              if (!current) return null;
              const fresh = data.enquiries.find((e: Enquiry) => e.id === current.id);
              if (fresh) {
                return {
                  ...fresh,
                  // Keep user's active draft note in sync
                  internalNotes: current.internalNotes,
                };
              }
              return current;
            });
          }
        }

        if (activeTab === 'activities') {
          const actRes = await fetch('/api/admin/activities?limit=50');
          if (actRes.ok) {
            const actData = await actRes.json();
            if (!ignore && actData.ok && actData.activities) {
              setActivities(actData.activities);
            }
          }
        }
      } catch {
        // Silently skip on transient background polling error
      }
    }, 10000);

    return () => {
      ignore = true;
      clearInterval(interval);
    };
  }, [selectedStatus, searchQuery, activeTab]);

  // Handle Logout
  const handleLogout = async () => {
    await fetch('/api/admin/auth/logout', { method: 'POST' });
    router.push(`/${secretPath}/login`);
    router.refresh();
  };

  // Open Enquiry Drawer
  const handleOpenDrawer = (enquiry: Enquiry) => {
    setSelectedEnquiry(enquiry);
    setNoteDraft(enquiry.internalNotes || '');
    setNoteSavedNotice(false);
  };

  // Update Status
  const handleStatusChange = async (enquiryId: string, nextStatus: string) => {
    try {
      const res = await fetch(`/api/admin/enquiries/${enquiryId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      });
      const data = await res.json();
      if (data.ok) {
        setEnquiries((prev) =>
          prev.map((e) => (e.id === enquiryId ? { ...e, status: nextStatus as Enquiry['status'] } : e))
        );
        if (selectedEnquiry && selectedEnquiry.id === enquiryId) {
          setSelectedEnquiry((prev) => (prev ? { ...prev, status: nextStatus as Enquiry['status'] } : null));
        }
        fetchEnquiries();
      }
    } catch {
      alert('Could not update status');
    }
  };

  // Save Notes
  const handleSaveNotes = async () => {
    if (!selectedEnquiry) return;
    setSavingNote(true);
    try {
      const res = await fetch(`/api/admin/enquiries/${selectedEnquiry.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ internalNotes: noteDraft }),
      });
      const data = await res.json();
      if (data.ok) {
        setSelectedEnquiry((prev) => (prev ? { ...prev, internalNotes: noteDraft } : null));
        setEnquiries((prev) =>
          prev.map((e) => (e.id === selectedEnquiry.id ? { ...e, internalNotes: noteDraft } : e))
        );
        setNoteSavedNotice(true);
        setTimeout(() => setNoteSavedNotice(false), 3000);
      }
    } catch {
      alert('Failed to save note');
    } finally {
      setSavingNote(false);
    }
  };

  // Format phone for WhatsApp
  const cleanPhone = (phone: string) => phone.replace(/\D/g, '');

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-0)', display: 'flex', flexDirection: 'column' }}>
      {/* Top Navbar */}
      <header
        style={{
          backgroundColor: 'var(--bg-1)',
          borderBottom: '1px solid var(--border-1)',
          padding: '0.85rem 1.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 40,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <span style={{ fontWeight: 600, fontSize: '1.1rem', letterSpacing: '-0.02em', color: 'var(--text-1)' }}>
              29.tech
            </span>
            <span
              style={{
                fontFamily: 'var(--font-plex-mono), monospace',
                fontSize: '0.72rem',
                backgroundColor: 'var(--bg-3)',
                padding: '0.15rem 0.45rem',
                borderRadius: '4px',
                color: 'var(--text-2)',
                textTransform: 'uppercase',
              }}
            >
              Console
            </span>
          </div>

          {/* Tab Navigation */}
          <nav style={{ display: 'flex', gap: '0.25rem', marginLeft: '1.5rem' }}>
            <button
              onClick={() => setActiveTab('enquiries')}
              style={{
                padding: '0.45rem 0.85rem',
                fontSize: '0.85rem',
                fontWeight: activeTab === 'enquiries' ? 600 : 400,
                color: activeTab === 'enquiries' ? 'var(--text-1)' : 'var(--text-2)',
                backgroundColor: activeTab === 'enquiries' ? 'var(--bg-2)' : 'transparent',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              Enquiries ({statusCounts.all})
            </button>
            <button
              onClick={() => setActiveTab('activities')}
              style={{
                padding: '0.45rem 0.85rem',
                fontSize: '0.85rem',
                fontWeight: activeTab === 'activities' ? 600 : 400,
                color: activeTab === 'activities' ? 'var(--text-1)' : 'var(--text-2)',
                backgroundColor: activeTab === 'activities' ? 'var(--bg-2)' : 'transparent',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              Activity Stream
            </button>
          </nav>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              fontSize: '0.75rem',
              color: 'var(--text-2)',
              fontFamily: 'var(--font-plex-mono), monospace',
              backgroundColor: 'var(--bg-2)',
              padding: '0.25rem 0.6rem',
              borderRadius: '20px',
              border: '1px solid var(--border-1)',
            }}
          >
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: '#16a34a',
                display: 'inline-block',
                boxShadow: '0 0 6px rgba(22, 163, 74, 0.6)',
              }}
            />
            Auto-sync: 10s
          </div>
          <Link
            href="/"
            target="_blank"
            rel="noreferrer"
            style={{
              fontSize: '0.82rem',
              color: 'var(--text-2)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}
          >
            Live Site ↗
          </Link>
          <button
            onClick={handleLogout}
            style={{
              padding: '0.4rem 0.75rem',
              fontSize: '0.8rem',
              fontWeight: 500,
              backgroundColor: 'transparent',
              border: '1px solid var(--border-2)',
              borderRadius: '6px',
              color: 'var(--text-1)',
              cursor: 'pointer',
            }}
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ padding: '1.75rem', maxWidth: '1440px', width: '100%', margin: '0 auto', flex: 1 }}>
        {/* Metric Cards Row */}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '1.75rem',
          }}
        >
          <div
            style={{
              backgroundColor: 'var(--bg-1)',
              border: '1px solid var(--border-1)',
              padding: '1.15rem 1.25rem',
              borderRadius: '8px',
            }}
          >
            <div style={{ fontSize: '0.8rem', color: 'var(--text-3)', fontWeight: 500 }}>Total Enquiries</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 600, color: 'var(--text-1)', marginTop: '0.25rem' }}>
              {statusCounts.all}
            </div>
          </div>

          <div
            style={{
              backgroundColor: 'var(--bg-1)',
              border: '1px solid #bfdbfe',
              padding: '1.15rem 1.25rem',
              borderRadius: '8px',
            }}
          >
            <div style={{ fontSize: '0.8rem', color: '#1d4ed8', fontWeight: 500 }}>New / Unread</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 600, color: '#1d4ed8', marginTop: '0.25rem' }}>
              {statusCounts.new}
            </div>
          </div>

          <div
            style={{
              backgroundColor: 'var(--bg-1)',
              border: '1px solid var(--border-1)',
              padding: '1.15rem 1.25rem',
              borderRadius: '8px',
            }}
          >
            <div style={{ fontSize: '0.8rem', color: 'var(--text-3)', fontWeight: 500 }}>In Discussion</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 600, color: '#6d28d9', marginTop: '0.25rem' }}>
              {statusCounts.in_discussion}
            </div>
          </div>

          <div
            style={{
              backgroundColor: 'var(--bg-1)',
              border: '1px solid var(--border-1)',
              padding: '1.15rem 1.25rem',
              borderRadius: '8px',
            }}
          >
            <div style={{ fontSize: '0.8rem', color: 'var(--text-3)', fontWeight: 500 }}>Converted</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 600, color: '#15803d', marginTop: '0.25rem' }}>
              {statusCounts.converted}
            </div>
          </div>
        </section>

        {activeTab === 'enquiries' ? (
          <div>
            {/* Action Bar (Filters, Search, Export) */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                backgroundColor: 'var(--bg-1)',
                border: '1px solid var(--border-1)',
                borderRadius: '8px 8px 0 0',
                padding: '0.85rem 1.25rem',
              }}
            >
              {/* Status Filter Pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', alignItems: 'center' }}>
                {(['all', 'new', 'contacted', 'in_discussion', 'converted', 'archived'] as const).map((st) => {
                  const count = statusCounts[st] ?? 0;
                  const isSelected = selectedStatus === st;
                  return (
                    <button
                      key={st}
                      onClick={() => setSelectedStatus(st)}
                      style={{
                        padding: '0.35rem 0.75rem',
                        fontSize: '0.78rem',
                        fontWeight: isSelected ? 600 : 500,
                        backgroundColor: isSelected ? 'var(--secondary)' : 'var(--bg-2)',
                        color: isSelected ? '#ffffff' : 'var(--text-2)',
                        border: 'none',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <span>{st === 'all' ? 'All' : STATUS_CONFIG[st]?.label || st}</span>
                      <span
                        style={{
                          fontSize: '0.72rem',
                          backgroundColor: isSelected ? 'rgba(255,255,255,0.25)' : 'var(--bg-3)',
                          padding: '0.05rem 0.35rem',
                          borderRadius: '10px',
                        }}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Search & Export Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <input
                  type="text"
                  placeholder="Search name, email, company…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    padding: '0.4rem 0.75rem',
                    fontSize: '0.82rem',
                    backgroundColor: 'var(--bg-0)',
                    border: '1px solid var(--border-2)',
                    borderRadius: '6px',
                    color: 'var(--text-1)',
                    width: '230px',
                    outline: 'none',
                  }}
                />
                <button
                  onClick={() => fetchEnquiries(true)}
                  style={{
                    padding: '0.4rem 0.75rem',
                    fontSize: '0.82rem',
                    backgroundColor: 'var(--bg-2)',
                    border: '1px solid var(--border-2)',
                    borderRadius: '6px',
                    color: 'var(--text-1)',
                    cursor: 'pointer',
                  }}
                >
                  ↻ Refresh
                </button>
                <a
                  href="/api/admin/export"
                  download
                  style={{
                    padding: '0.4rem 0.85rem',
                    fontSize: '0.82rem',
                    fontWeight: 500,
                    backgroundColor: 'var(--secondary)',
                    color: '#ffffff',
                    textDecoration: 'none',
                    borderRadius: '6px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                  }}
                >
                  ↓ Export CSV
                </a>
              </div>
            </div>

            {/* Enquiries Table */}
            <div
              style={{
                backgroundColor: 'var(--bg-1)',
                border: '1px solid var(--border-1)',
                borderTop: 'none',
                borderRadius: '0 0 8px 8px',
                overflowX: 'auto',
              }}
            >
              {loading ? (
                <div style={{ padding: '3.5rem', textAlign: 'center', color: 'var(--text-3)', fontSize: '0.9rem' }}>
                  Loading enquiries…
                </div>
              ) : error ? (
                <div style={{ padding: '2.5rem', textAlign: 'center', color: '#b91c1c', fontSize: '0.9rem' }}>
                  {error}
                </div>
              ) : enquiries.length === 0 ? (
                <div style={{ padding: '3.5rem', textAlign: 'center', color: 'var(--text-3)', fontSize: '0.9rem' }}>
                  No enquiries found.
                </div>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-1)', backgroundColor: 'var(--bg-0)' }}>
                      <th style={{ padding: '0.75rem 1rem', fontWeight: 600, color: 'var(--text-2)', width: '120px' }}>
                        Date
                      </th>
                      <th style={{ padding: '0.75rem 1rem', fontWeight: 600, color: 'var(--text-2)' }}>
                        Contact
                      </th>
                      <th style={{ padding: '0.75rem 1rem', fontWeight: 600, color: 'var(--text-2)' }}>
                        Services & Budget
                      </th>
                      <th style={{ padding: '0.75rem 1rem', fontWeight: 600, color: 'var(--text-2)', width: '120px' }}>
                        Status
                      </th>
                      <th style={{ padding: '0.75rem 1rem', fontWeight: 600, color: 'var(--text-2)', width: '90px' }}>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {enquiries.map((enquiry) => {
                      const cfg = STATUS_CONFIG[enquiry.status] || STATUS_CONFIG.new;
                      const dateObj = new Date(enquiry.createdAt);
                      const formattedDate = dateObj.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      });

                      return (
                        <tr
                          key={enquiry.id}
                          onClick={() => handleOpenDrawer(enquiry)}
                          style={{
                            borderBottom: '1px solid var(--border-1)',
                            cursor: 'pointer',
                            backgroundColor: selectedEnquiry?.id === enquiry.id ? 'var(--bg-2)' : 'transparent',
                            transition: 'background-color 0.1s ease',
                          }}
                        >
                          <td style={{ padding: '0.85rem 1rem', verticalAlign: 'top', color: 'var(--text-3)', fontSize: '0.8rem' }}>
                            {formattedDate}
                          </td>
                          <td style={{ padding: '0.85rem 1rem', verticalAlign: 'top' }}>
                            <div style={{ fontWeight: 600, color: 'var(--text-1)' }}>
                              {enquiry.name}
                              {enquiry.nda && (
                                <span
                                  style={{
                                    marginLeft: '0.5rem',
                                    fontSize: '0.68rem',
                                    padding: '0.1rem 0.4rem',
                                    borderRadius: '4px',
                                    backgroundColor: '#fee2e2',
                                    color: '#991b1b',
                                    fontWeight: 600,
                                  }}
                                >
                                  NDA
                                </span>
                              )}
                            </div>
                            {enquiry.company && (
                              <div style={{ fontSize: '0.78rem', color: 'var(--text-2)' }}>
                                {enquiry.company}
                              </div>
                            )}
                            <div style={{ fontSize: '0.78rem', color: 'var(--text-3)', marginTop: '0.15rem' }}>
                              {enquiry.email} · {enquiry.phone}
                            </div>
                          </td>
                          <td style={{ padding: '0.85rem 1rem', verticalAlign: 'top' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                              <span
                                style={{
                                  fontSize: '0.75rem',
                                  fontWeight: 600,
                                  backgroundColor: 'var(--bg-3)',
                                  color: 'var(--text-1)',
                                  padding: '0.15rem 0.5rem',
                                  borderRadius: '4px',
                                }}
                              >
                                {enquiry.budget}
                              </span>
                              {enquiry.timeline && (
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-3)' }}>
                                  ({enquiry.timeline})
                                </span>
                              )}
                            </div>
                            <div
                              style={{
                                fontSize: '0.78rem',
                                color: 'var(--text-2)',
                                marginTop: '0.25rem',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                maxWidth: '350px',
                              }}
                            >
                              {enquiry.services.join(', ')}
                            </div>
                          </td>
                          <td style={{ padding: '0.85rem 1rem', verticalAlign: 'top' }}>
                            <span
                              style={{
                                display: 'inline-block',
                                fontSize: '0.75rem',
                                fontWeight: 500,
                                padding: '0.2rem 0.6rem',
                                borderRadius: '12px',
                                backgroundColor: cfg.bg,
                                color: cfg.text,
                                border: `1px solid ${cfg.border}`,
                              }}
                            >
                              {cfg.label}
                            </span>
                          </td>
                          <td style={{ padding: '0.85rem 1rem', verticalAlign: 'top' }}>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenDrawer(enquiry);
                              }}
                              style={{
                                fontSize: '0.78rem',
                                padding: '0.25rem 0.55rem',
                                backgroundColor: 'var(--bg-2)',
                                border: '1px solid var(--border-2)',
                                borderRadius: '4px',
                                color: 'var(--text-1)',
                                cursor: 'pointer',
                              }}
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        ) : (
          /* Activity Stream View */
          <div
            style={{
              backgroundColor: 'var(--bg-1)',
              border: '1px solid var(--border-1)',
              borderRadius: '8px',
              padding: '1.5rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-1)', margin: 0 }}>
                System Activity Log
              </h2>
              <button
                onClick={fetchActivities}
                style={{
                  padding: '0.35rem 0.65rem',
                  fontSize: '0.78rem',
                  backgroundColor: 'var(--bg-2)',
                  border: '1px solid var(--border-2)',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                ↻ Refresh
              </button>
            </div>

            {activities.length === 0 ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-3)', fontSize: '0.88rem' }}>
                No recorded activities yet.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {activities.map((act) => {
                  const date = new Date(act.createdAt).toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  });

                  return (
                    <div
                      key={act.id}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        padding: '0.85rem 1rem',
                        backgroundColor: 'var(--bg-0)',
                        border: '1px solid var(--border-1)',
                        borderRadius: '6px',
                        gap: '1rem',
                      }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span
                            style={{
                              fontFamily: 'var(--font-plex-mono), monospace',
                              fontSize: '0.7rem',
                              fontWeight: 600,
                              textTransform: 'uppercase',
                              padding: '0.15rem 0.4rem',
                              borderRadius: '3px',
                              backgroundColor: 'var(--bg-3)',
                              color: 'var(--text-2)',
                            }}
                          >
                            {act.type}
                          </span>
                          <span style={{ fontSize: '0.88rem', fontWeight: 500, color: 'var(--text-1)' }}>
                            {act.description}
                          </span>
                        </div>
                        {act.enquiry && (
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-3)' }}>
                            Enquiry: {act.enquiry.name} ({act.enquiry.email})
                          </div>
                        )}
                      </div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-3)', whiteSpace: 'nowrap' }}>
                        {date}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Detail Drawer (Slide-in) */}
      {selectedEnquiry && (
        <>
          {/* Backdrop overlay to close on outside click */}
          <div
            onClick={() => setSelectedEnquiry(null)}
            data-lenis-prevent
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              zIndex: 55,
              backdropFilter: 'blur(1px)',
            }}
          />

          <div
            role="dialog"
            aria-modal="true"
            data-lenis-prevent
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              height: '100vh',
              maxHeight: '100vh',
              width: '100%',
              maxWidth: '560px',
              backgroundColor: 'var(--bg-1)',
              boxShadow: '-4px 0 24px rgba(0,0,0,0.12)',
              zIndex: 60,
              display: 'flex',
              flexDirection: 'column',
              borderLeft: '1px solid var(--border-1)',
              overscrollBehavior: 'contain',
            }}
          >
            {/* Drawer Header */}
            <div
              style={{
                padding: '1.25rem 1.5rem',
                borderBottom: '1px solid var(--border-1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexShrink: 0,
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 600, color: 'var(--text-1)' }}>
                    {selectedEnquiry.name}
                  </h3>
                  {selectedEnquiry.nda && (
                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        backgroundColor: '#fee2e2',
                        color: '#991b1b',
                        padding: '0.1rem 0.4rem',
                        borderRadius: '4px',
                      }}
                    >
                      NDA Requested
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-3)', marginTop: '0.2rem' }}>
                  Received {new Date(selectedEnquiry.createdAt).toLocaleString()}
                </div>
              </div>

              <button
                onClick={() => setSelectedEnquiry(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.25rem',
                  color: 'var(--text-3)',
                  cursor: 'pointer',
                  padding: '0.25rem 0.5rem',
                }}
              >
                ✕
              </button>
            </div>

            {/* Drawer Body - scrollable */}
            <div
              data-lenis-prevent
              style={{
                padding: '1.5rem',
                overflowY: 'auto',
                overflowX: 'hidden',
                flex: '1 1 auto',
                minHeight: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                overscrollBehavior: 'contain',
                WebkitOverflowScrolling: 'touch',
              }}
            >
            {/* Quick Actions (Email, WhatsApp, Call) */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <a
                href={`mailto:${selectedEnquiry.email}?subject=Regarding%20your%20project%20inquiry%20%E2%80%94%2029.tech`}
                className="btn btn-fill"
                style={{ fontSize: '0.82rem', padding: '0.45rem 0.85rem' }}
              >
                ✉ Send Email
              </a>
              <a
                href={`https://wa.me/${cleanPhone(selectedEnquiry.phone)}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  fontSize: '0.82rem',
                  padding: '0.45rem 0.85rem',
                  backgroundColor: '#25D366',
                  color: '#ffffff',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  fontWeight: 500,
                  display: 'inline-flex',
                  alignItems: 'center',
                }}
              >
                WhatsApp ↗
              </a>
              <a
                href={`tel:${selectedEnquiry.phone}`}
                style={{
                  fontSize: '0.82rem',
                  padding: '0.45rem 0.85rem',
                  backgroundColor: 'var(--bg-2)',
                  color: 'var(--text-1)',
                  borderRadius: '6px',
                  border: '1px solid var(--border-2)',
                  textDecoration: 'none',
                  fontWeight: 500,
                }}
              >
                Call
              </a>
            </div>

            {/* Status Selector */}
            <div
              style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-0)',
                borderRadius: '8px',
                border: '1px solid var(--border-1)',
              }}
            >
              <label
                htmlFor={statusSelectId}
                style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-2)', marginBottom: '0.4rem' }}
              >
                LEAD STATUS
              </label>
              <select
                id={statusSelectId}
                value={selectedEnquiry.status}
                onChange={(e) => handleStatusChange(selectedEnquiry.id, e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem 0.75rem',
                  fontSize: '0.85rem',
                  backgroundColor: 'var(--bg-1)',
                  border: '1px solid var(--border-2)',
                  borderRadius: '6px',
                  color: 'var(--text-1)',
                }}
              >
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="in_discussion">In Discussion</option>
                <option value="converted">Converted (Won)</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            {/* Lead Details Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-3)', textTransform: 'uppercase' }}>Email</span>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-1)', fontWeight: 500 }}>{selectedEnquiry.email}</div>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-3)', textTransform: 'uppercase' }}>Phone</span>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-1)', fontWeight: 500 }}>{selectedEnquiry.phone}</div>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-3)', textTransform: 'uppercase' }}>Company</span>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-1)', fontWeight: 500 }}>{selectedEnquiry.company || '—'}</div>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-3)', textTransform: 'uppercase' }}>Budget</span>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-1)', fontWeight: 500 }}>{selectedEnquiry.budget}</div>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-3)', textTransform: 'uppercase' }}>Timeline</span>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-1)', fontWeight: 500 }}>{selectedEnquiry.timeline || '—'}</div>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-3)', textTransform: 'uppercase' }}>Referral Source</span>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-1)', fontWeight: 500 }}>{selectedEnquiry.source || '—'}</div>
              </div>
            </div>

            {/* Services */}
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-3)', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>
                Required Services
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {selectedEnquiry.services.map((svc) => (
                  <span
                    key={svc}
                    style={{
                      fontSize: '0.75rem',
                      padding: '0.2rem 0.55rem',
                      backgroundColor: 'var(--bg-2)',
                      borderRadius: '4px',
                      color: 'var(--text-1)',
                      border: '1px solid var(--border-1)',
                    }}
                  >
                    {svc}
                  </span>
                ))}
              </div>
            </div>

            {/* Message */}
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-3)', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>
                Requirement Message
              </span>
              <div
                style={{
                  padding: '1rem',
                  backgroundColor: 'var(--bg-0)',
                  borderRadius: '6px',
                  border: '1px solid var(--border-1)',
                  fontSize: '0.88rem',
                  lineHeight: 1.6,
                  color: 'var(--text-1)',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {selectedEnquiry.message}
              </div>
            </div>

            {/* Internal Notes */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-3)', textTransform: 'uppercase' }}>
                  Internal Notes (Team Only)
                </span>
                {noteSavedNotice && (
                  <span style={{ fontSize: '0.75rem', color: '#15803d', fontWeight: 500 }}>
                    ✓ Saved
                  </span>
                )}
              </div>
              <textarea
                rows={4}
                value={noteDraft}
                onChange={(e) => setNoteDraft(e.target.value)}
                placeholder="Log call summary, client scope, proposal links, next follow-up date…"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  fontSize: '0.85rem',
                  backgroundColor: 'var(--bg-1)',
                  border: '1px solid var(--border-2)',
                  borderRadius: '6px',
                  color: 'var(--text-1)',
                  outline: 'none',
                }}
              />
              <button
                onClick={handleSaveNotes}
                disabled={savingNote}
                className="btn btn-fill"
                style={{
                  marginTop: '0.5rem',
                  fontSize: '0.8rem',
                  padding: '0.4rem 0.85rem',
                  cursor: savingNote ? 'not-allowed' : 'pointer',
                }}
              >
                {savingNote ? 'Saving…' : 'Save Notes'}
              </button>
            </div>
          </div>
        </div>
      </>
    )}
  </div>
);
}
