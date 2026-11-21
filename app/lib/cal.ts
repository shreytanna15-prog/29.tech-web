const DEFAULT_CAL_LINK = 'shrey-tanna-ydglsi/project-discovery-call-29.tech';
const CAL_NAMESPACE = 'project-discovery-call-29.tech';

function normalizeCalLink(value: string | undefined): string {
  if (!value?.trim()) return DEFAULT_CAL_LINK;
  return value
    .trim()
    .replace(/^https?:\/\/(www\.)?cal\.com\//i, '')
    .replace(/\/$/, '');
}

/** Cal.com event path, e.g. "shrey-tanna-ydglsi/project-discovery-call-29.tech" */
export const CAL_LINK = normalizeCalLink(process.env.NEXT_PUBLIC_CAL_LINK);

export const CAL_BOOKING_URL = `https://cal.com/${CAL_LINK}`;

export const CAL_EMBED = {
  namespace: CAL_NAMESPACE,
  elementId: 'my-cal-inline-project-discovery-call-29.tech',
  calLink: CAL_LINK,
} as const;
