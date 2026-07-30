export type RelatedLink = {
  label: string;
  to: string;
};

/**
 * Related reading map keyed by docs id (path without extension).
 */
export const relatedByDocId: Record<string, RelatedLink[]> = {
  intro: [
    {label: 'Explore & filter tools', to: '/explore'},
    {label: 'Best Tools', to: '/docs/tools/best-tools'},
    {label: 'Glossary', to: '/docs/glossary'},
    {label: 'Changelog', to: '/docs/changelog'},
  ],
  'tools/best-tools': [
    {label: 'Newsletter Platforms', to: '/docs/tools/newsletter-platforms'},
    {label: 'Self-Hosted ESPs', to: '/docs/tools/self-hosted-esp'},
    {label: 'Email Builders', to: '/docs/tools/email-builders'},
    {label: 'Filter all tools', to: '/explore'},
  ],
  'tools/newsletter-platforms': [
    {label: 'Best Tools overview', to: '/docs/tools/best-tools'},
    {label: 'Email Service Providers', to: '/docs/tools/email-service-providers'},
    {label: 'Filter newsletters', to: '/explore?tag=newsletter'},
  ],
  'tools/self-hosted-esp': [
    {label: 'Open Source Tools', to: '/docs/tools/open-source-tools'},
    {label: 'Amazon SES', to: '/docs/operations/amazon-ses'},
    {label: 'Filter self-hosted', to: '/explore?tag=self-hosted'},
  ],
  'tools/email-builders': [
    {label: 'Frontend Development', to: '/docs/development/frontend-development'},
    {label: 'Email Templates guide', to: '/docs/guides/email-templates'},
    {label: 'Filter templates', to: '/explore?tag=templates'},
  ],
  'tools/deliverability-tools': [
    {label: 'DNS & DKIM', to: '/docs/operations/dns-dkim'},
    {label: 'Email Work Tools', to: '/docs/tools/email-work-tools'},
    {label: 'Filter deliverability', to: '/explore?tag=deliverability'},
  ],
  'tools/growth-automation-tools': [
    {label: 'Automation Platforms', to: '/docs/tools/automation-platforms'},
    {label: 'Lifecycle Emails', to: '/docs/strategy/lifecycle-emails'},
    {label: 'Filter automation', to: '/explore?tag=automation'},
  ],
  'tools/email-service-providers': [
    {label: 'Best Tools overview', to: '/docs/tools/best-tools'},
    {label: 'Newsletter Platforms', to: '/docs/tools/newsletter-platforms'},
    {label: 'Filter ESPs', to: '/explore?tag=esp'},
  ],
  'tools/automation-platforms': [
    {label: 'Best Tools', to: '/docs/tools/best-tools'},
    {label: 'Lifecycle Emails', to: '/docs/strategy/lifecycle-emails'},
    {label: 'Transactional Emails', to: '/docs/more/transactional-emails'},
    {label: 'Filter by automation', to: '/explore?tag=automation'},
  ],
  'tools/ecommerce': [
    {label: 'Best Tools', to: '/docs/tools/best-tools'},
    {label: 'Lifecycle Emails', to: '/docs/strategy/lifecycle-emails'},
    {label: 'Filter ecommerce tools', to: '/explore?tag=ecommerce'},
  ],
  'tools/email-work-tools': [
    {label: 'Checkers', to: '/docs/development/checkers'},
    {label: 'DNS & DKIM', to: '/docs/operations/dns-dkim'},
    {label: 'Cold Email Tips', to: '/docs/strategy/cold-email-tips'},
  ],
  'tools/open-source-tools': [
    {label: 'GitHub Repositories', to: '/docs/development/github-repositories'},
    {label: 'Cool Projects', to: '/docs/development/cool-projects'},
    {label: 'Filter open source', to: '/explore?tag=open-source'},
  ],
  'strategy/building-an-email-list': [
    {label: 'List Building Playbook', to: '/docs/strategy/list-building-playbook'},
    {label: 'Opt-in Tactics', to: '/docs/strategy/opt-in-tactics'},
    {label: 'Lead Generation', to: '/docs/strategy/lead-generation'},
  ],
  'strategy/list-building-playbook': [
    {label: 'Building an Email List', to: '/docs/strategy/building-an-email-list'},
    {label: 'Opt-in Tactics', to: '/docs/strategy/opt-in-tactics'},
    {label: 'Reasons for Newsletters', to: '/docs/strategy/reasons-for-newsletters'},
  ],
  'strategy/lifecycle-emails': [
    {label: 'Personalization', to: '/docs/strategy/personalization'},
    {label: 'Transactional Emails', to: '/docs/more/transactional-emails'},
    {label: 'Automation Platforms', to: '/docs/tools/automation-platforms'},
  ],
  'strategy/cold-email-tips': [
    {label: 'DNS & DKIM', to: '/docs/operations/dns-dkim'},
    {label: 'Email Work Tools', to: '/docs/tools/email-work-tools'},
    {label: 'Filter deliverability tools', to: '/explore?tag=deliverability'},
  ],
  'development/frontend-development': [
    {label: 'GitHub Repositories', to: '/docs/development/github-repositories'},
    {label: 'HTML Utilities', to: '/docs/development/html-utilities'},
    {label: 'Email Templates', to: '/docs/guides/email-templates'},
  ],
  'development/github-repositories': [
    {label: 'Frontend Development', to: '/docs/development/frontend-development'},
    {label: 'Cool Projects', to: '/docs/development/cool-projects'},
    {label: 'Filter templates', to: '/explore?tag=templates'},
  ],
  'development/checkers': [
    {label: 'Email Work Tools', to: '/docs/tools/email-work-tools'},
    {label: 'DNS & DKIM', to: '/docs/operations/dns-dkim'},
    {label: 'Filter checkers', to: '/explore?tag=checker'},
  ],
  'operations/dns-dkim': [
    {label: 'Amazon SES', to: '/docs/operations/amazon-ses'},
    {label: 'Cold Email Tips', to: '/docs/strategy/cold-email-tips'},
    {label: 'Glossary', to: '/docs/glossary'},
  ],
  'operations/amazon-ses': [
    {label: 'DNS & DKIM', to: '/docs/operations/dns-dkim'},
    {label: 'Transactional Emails', to: '/docs/more/transactional-emails'},
    {label: 'Filter SES tools', to: '/explore?tag=ses'},
  ],
  'operations/metrics/index': [
    {label: 'Email Marketing Basics', to: '/docs/operations/metrics/email-marketing-basics'},
    {label: 'Measure Performance', to: '/docs/operations/metrics/measure-performance'},
    {label: 'Glossary', to: '/docs/glossary'},
  ],
  'more/transactional-emails': [
    {label: 'Lifecycle Emails', to: '/docs/strategy/lifecycle-emails'},
    {label: 'Amazon SES', to: '/docs/operations/amazon-ses'},
    {label: 'Automation Platforms', to: '/docs/tools/automation-platforms'},
  ],
  glossary: [
    {label: 'DNS & DKIM', to: '/docs/operations/dns-dkim'},
    {label: 'Newsletter Metrics', to: '/docs/operations/metrics/'},
    {label: 'Public API', to: '/docs/api'},
  ],
  changelog: [
    {label: 'Overview', to: '/docs/'},
    {label: 'Explore tools', to: '/explore'},
    {label: 'Public API', to: '/docs/api'},
  ],
  api: [
    {label: 'Explore & filter', to: '/explore'},
    {label: 'Changelog', to: '/docs/changelog'},
    {label: 'API docs', to: '/docs/api'},
  ],
};

export function getRelatedLinks(docId: string): RelatedLink[] {
  return relatedByDocId[docId] ?? [];
}
