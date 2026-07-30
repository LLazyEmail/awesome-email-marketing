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
    {label: 'Growth & Automation Tools', to: '/docs/tools/growth-automation-tools'},
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
    {label: 'Filter automation', to: '/explore?tag=automation'},
  ],
  'strategy/lead-generation': [
    {label: 'Opt-in Tactics', to: '/docs/strategy/opt-in-tactics'},
    {label: 'List Building Playbook', to: '/docs/strategy/list-building-playbook'},
    {label: 'Demand Curve Tactics', to: '/docs/guides/demand-curve'},
    {label: 'Filter newsletters', to: '/explore?tag=newsletter'},
  ],
  'guides/demand-curve': [
    {label: 'Lead Generation', to: '/docs/strategy/lead-generation'},
    {label: 'Building an Email List', to: '/docs/strategy/building-an-email-list'},
    {label: 'Newsletter Platforms', to: '/docs/tools/newsletter-platforms'},
    {label: 'Filter newsletters', to: '/explore?tag=newsletter'},
  ],
  'strategy/cold-email-tips': [
    {label: 'DNS & DKIM', to: '/docs/operations/dns-dkim'},
    {label: 'Email Work Tools', to: '/docs/tools/email-work-tools'},
    {label: 'Filter deliverability tools', to: '/explore?tag=deliverability'},
  ],
  'development/frontend-development': [
    {label: 'Articles & Tutorials', to: '/docs/development/html-email-tutorials'},
    {label: 'HTML Email Templates', to: '/docs/development/html-email-templates'},
    {label: 'GitHub Repositories', to: '/docs/development/github-repositories'},
  ],
  'development/html-email-tutorials': [
    {label: 'HTML Email Templates', to: '/docs/development/html-email-templates'},
    {label: 'Frontend Development overview', to: '/docs/development/frontend-development'},
    {label: 'Email Coding Checkers', to: '/docs/development/checkers'},
  ],
  'development/html-email-templates': [
    {label: 'Articles & Tutorials', to: '/docs/development/html-email-tutorials'},
    {label: 'GitHub Repositories', to: '/docs/development/github-repositories'},
    {label: 'Filter templates', to: '/explore?tag=templates'},
  ],
  'development/github-repositories': [
    {label: 'Templates & Boilerplates', to: '/docs/development/github-email-templates'},
    {label: 'Frameworks & Compilers', to: '/docs/development/github-frameworks'},
    {label: 'Infrastructure & APIs', to: '/docs/development/github-infrastructure'},
    {label: 'Cool Projects', to: '/docs/development/cool-projects'},
    {label: 'Related Repositories', to: '/docs/development/related-repositories'},
  ],
  'development/github-email-templates': [
    {label: 'GitHub Repositories overview', to: '/docs/development/github-repositories'},
    {label: 'Frameworks & Compilers', to: '/docs/development/github-frameworks'},
    {label: 'Related Repositories', to: '/docs/development/related-repositories'},
  ],
  'development/github-frameworks': [
    {label: 'GitHub Repositories overview', to: '/docs/development/github-repositories'},
    {label: 'Cool Projects', to: '/docs/development/cool-projects'},
    {label: 'Related Repositories', to: '/docs/development/related-repositories'},
  ],
  'development/github-infrastructure': [
    {label: 'GitHub Repositories overview', to: '/docs/development/github-repositories'},
    {label: 'Checkers', to: '/docs/development/checkers'},
    {label: 'Amazon SES', to: '/docs/operations/amazon-ses'},
  ],
  'development/cool-projects': [
    {label: 'GitHub Repositories', to: '/docs/development/github-repositories'},
    {label: 'Frameworks & Compilers', to: '/docs/development/github-frameworks'},
    {label: 'Related Repositories', to: '/docs/development/related-repositories'},
  ],
  'development/related-repositories': [
    {label: 'GitHub Repositories', to: '/docs/development/github-repositories'},
    {label: 'Frameworks & Compilers', to: '/docs/development/github-frameworks'},
    {label: 'Cool Projects', to: '/docs/development/cool-projects'},
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
    {label: 'Concepts & Guides', to: '/docs/more/transactional-articles'},
    {label: 'Providers & Products', to: '/docs/more/transactional-tools'},
    {label: 'Lifecycle Emails', to: '/docs/strategy/lifecycle-emails'},
    {label: 'Email Marketing Strategy', to: '/docs/strategy/email-marketing-strategy'},
    {label: 'Amazon SES', to: '/docs/operations/amazon-ses'},
  ],
  'more/transactional-articles': [
    {label: 'Providers & Products', to: '/docs/more/transactional-tools'},
    {label: 'Transactional Emails overview', to: '/docs/more/transactional-emails'},
    {label: 'Lifecycle Emails', to: '/docs/strategy/lifecycle-emails'},
    {label: 'Startup email marketing', to: '/docs/strategy/email-marketing-strategy'},
  ],
  'more/transactional-tools': [
    {label: 'Concepts & Guides', to: '/docs/more/transactional-articles'},
    {label: 'Amazon SES', to: '/docs/operations/amazon-ses'},
    {label: 'Automation Platforms', to: '/docs/tools/automation-platforms'},
  ],
  'strategy/email-marketing-strategy': [
    {label: 'Lifecycle Emails', to: '/docs/strategy/lifecycle-emails'},
    {label: 'Transactional Emails', to: '/docs/more/transactional-emails'},
    {label: 'Reasons for Newsletters', to: '/docs/strategy/reasons-for-newsletters'},
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
