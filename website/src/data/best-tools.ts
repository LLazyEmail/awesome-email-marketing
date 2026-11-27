export type ToolCategory =
  | 'newsletter'
  | 'esp'
  | 'self-hosted'
  | 'builders'
  | 'deliverability'
  | 'growth'
  | 'transactional'
  | 'ecommerce';

export type BestTool = {
  name: string;
  url: string;
  description: string;
  category: ToolCategory;
  sourcePage?: string;
  featured?: boolean;
};

export const CATEGORIES: {id: ToolCategory; label: string; docsPage: string}[] =
  [
    {
      id: 'newsletter',
      label: 'Newsletter Platforms',
      docsPage: '/docs/tools/newsletter-platforms',
    },
    {
      id: 'esp',
      label: 'Email Service Providers',
      docsPage: '/docs/tools/email-service-providers',
    },
    {
      id: 'self-hosted',
      label: 'Self-Hosted ESPs',
      docsPage: '/docs/tools/self-hosted-esp',
    },
    {
      id: 'builders',
      label: 'Email Builders & Templates',
      docsPage: '/docs/tools/email-builders',
    },
    {
      id: 'deliverability',
      label: 'Deliverability & Testing',
      docsPage: '/docs/tools/deliverability-tools',
    },
    {
      id: 'growth',
      label: 'Growth & Automation',
      docsPage: '/docs/tools/growth-automation-tools',
    },
    {
      id: 'transactional',
      label: 'Transactional Email',
      docsPage: '/docs/more/transactional-tools',
    },
    {
      id: 'ecommerce',
      label: 'eCommerce',
      docsPage: '/docs/tools/ecommerce',
    },
  ];

export const BEST_TOOLS: BestTool[] = [
  // Newsletter — featured teasers keep the wording already on this page.
  {
    name: 'Substack',
    url: 'https://substack.com/',
    description: 'Paid newsletters made simple',
    category: 'newsletter',
    sourcePage: '/docs/tools/newsletter-platforms',
    featured: true,
  },
  {
    name: 'ConvertKit',
    url: 'https://convertkit.com',
    description: 'Marketing hub for creators',
    category: 'newsletter',
    sourcePage: '/docs/tools/newsletter-platforms',
    featured: true,
  },
  {
    name: 'Beehiiv',
    url: 'https://www.beehiiv.com/',
    description:
      'Newsletter platform for publishers, with paid subscriptions and built-in growth tools.',
    category: 'newsletter',
    sourcePage: '/docs/tools/newsletter-platforms',
  },
  {
    name: 'BirdSend',
    url: 'https://birdsend.co',
    description:
      "Don't waste paying 3-5X more on an expensive email marketing tool",
    category: 'newsletter',
    sourcePage: '/docs/tools/newsletter-platforms',
  },
  {
    name: 'Butondown',
    url: 'https://buttondown.email',
    description:
      'The easiest way to write/grow/build/launch/share/run/ your newsletter',
    category: 'newsletter',
    sourcePage: '/docs/tools/newsletter-platforms',
  },
  {
    name: 'EmailOctopus',
    url: 'https://emailoctopus.com',
    description: 'Email marketing made easy',
    category: 'newsletter',
    sourcePage: '/docs/tools/newsletter-platforms',
  },
  {
    name: 'Flodesk',
    url: 'https://flodesk.com',
    description:
      'a new email marketing service provider that’s built for creators, by creators',
    category: 'newsletter',
    sourcePage: '/docs/tools/newsletter-platforms',
  },
  {
    name: 'Ghost',
    url: 'https://ghost.org/',
    description:
      'Open-source publishing platform with newsletters and memberships.',
    category: 'newsletter',
    sourcePage: '/docs/tools/newsletter-platforms',
  },
  {
    name: 'Mailerlite',
    url: 'https://mailerlite.com/pricing',
    description: 'Pricing mailerlite',
    category: 'newsletter',
    sourcePage: '/docs/tools/newsletter-platforms',
  },
  {
    name: 'Sendfox',
    url: 'https://sendfox.com',
    description: 'Start a newsletter without money',
    category: 'newsletter',
    sourcePage: '/docs/tools/newsletter-platforms',
  },

  // ESPs
  {
    name: 'Mailchimp',
    url: 'https://mailchimp.com/',
    description: 'Free emailing software',
    category: 'esp',
    sourcePage: '/docs/tools/email-service-providers',
    featured: true,
  },
  {
    name: 'AWeber',
    url: 'https://aweber.com',
    description:
      "is an email marketing tool that allows you to: create a mailing list and capture data onto it; design newsletters that can be sent to the subscribers on your list; automate your email marketing via use of 'autoresponders' view and analyse statistics related to your email marketing campaigns.",
    category: 'esp',
    sourcePage: '/docs/tools/email-service-providers',
  },
  {
    name: 'Campaign Monitor',
    url: 'https://campaignmonitor.com',
    description:
      "is a global technology company that provides an email marketing platform that's easy to use yet extremely powerful",
    category: 'esp',
    sourcePage: '/docs/tools/email-service-providers',
  },
  {
    name: 'Constant Contact',
    url: 'https://constantcontact.com',
    description:
      'effective email marketing and other online marketing campaigns to meet business goals',
    category: 'esp',
    sourcePage: '/docs/tools/email-service-providers',
  },
  {
    name: 'Getresponse',
    url: 'https://getresponse.com',
    description:
      'is an email marketing platform. It enables to create a valuable marketing list of prospects, partners, and clients, so can develop relationships with them and build a responsive and profitable customer base.',
    category: 'esp',
    sourcePage: '/docs/tools/email-service-providers',
  },
  {
    name: 'HubSpot',
    url: 'https://www.hubspot.com/products/marketing/email',
    description:
      'Marketing platform with email campaigns, automation, and a CRM.',
    category: 'esp',
    sourcePage: '/docs/tools/email-service-providers',
  },
  {
    name: 'Mailjet',
    url: 'https://mailjet.com',
    description:
      'Create and send beautiful emails without touching a single line of code',
    category: 'esp',
    sourcePage: '/docs/tools/email-service-providers',
  },
  {
    name: 'Moosend',
    url: 'https://moosend.com/',
    description:
      'Email marketing and automation platform for campaigns and journeys.',
    category: 'esp',
    sourcePage: '/docs/tools/email-service-providers',
  },
  {
    name: 'Sendinblue',
    url: 'https://sendinblue.com',
    description:
      'is the only all-in-one digital marketing platform empowering B2B and B2C businesses, ecommerce sellers and agencies to build customer relationships through end to end digital marketing campaigns, transactional messaging, and marketing automation.',
    category: 'esp',
    sourcePage: '/docs/tools/email-service-providers',
  },
  {
    name: 'SendPulse',
    url: 'https://sendpulse.com',
    description:
      'is a cloud-based marketing solution that allows users to manage email, text messaging and push notifications through a single platform',
    category: 'esp',
    sourcePage: '/docs/tools/email-service-providers',
  },

  // Self-hosted
  {
    name: 'Listmonk',
    url: 'https://listmonk.app/',
    description: 'Fast self-hosted newsletter manager',
    category: 'self-hosted',
    sourcePage: '/docs/tools/self-hosted-esp',
    featured: true,
  },
  {
    name: 'Mailtrain',
    url: 'https://github.com/Mailtrain-org/mailtrain',
    description:
      'is a self-hosted newsletter app developed in Node. js. It allows you to manage large subscriber lists, generate a new campaign using entry data as message contents, send it to selected subscribers, and track individual click statistics for every link in the message.',
    category: 'self-hosted',
    sourcePage: '/docs/tools/self-hosted-esp',
  },
  {
    name: 'MailWiz',
    url: 'https://mailwizz.com',
    description: 'Self-hosted Email Marketing Software',
    category: 'self-hosted',
    sourcePage: '/docs/tools/self-hosted-esp',
  },
  {
    name: 'Mautic',
    url: 'https://www.mautic.org/',
    description: '',
    category: 'self-hosted',
    sourcePage: '/docs/tools/open-source-tools',
  },

  // Builders
  {
    name: 'BEE',
    url: 'https://beefree.io/',
    description: 'Create beautiful emails, fast',
    category: 'builders',
    sourcePage: '/docs/tools/email-builders',
    featured: true,
  },
  {
    name: 'MJML',
    url: 'https://mjml.io/',
    description: 'Open-source markup language for responsive email.',
    category: 'builders',
    sourcePage: '/docs/tools/email-builders',
  },
  {
    name: 'Postcards',
    url: 'https://designmodo.com/postcards',
    description: 'Create awesome emails with drag & drop simplicity',
    category: 'builders',
    sourcePage: '/docs/tools/email-builders',
  },
  {
    name: 'Stripo',
    url: 'https://stripo.email',
    description:
      'Drag-n-drop and HTML email builder with 1,690+ responsive templates',
    category: 'builders',
    sourcePage: '/docs/tools/email-builders',
  },
  {
    name: 'Topol',
    url: 'https://topol.io/',
    description: 'Drag-and-drop email editor and template builder.',
    category: 'builders',
    sourcePage: '/docs/tools/email-builders',
  },
  {
    name: 'Unlayer',
    url: 'https://unlayer.com',
    description: 'create beautiful emails easily',
    category: 'builders',
    sourcePage: '/docs/development/html-email-templates',
  },

  // Deliverability
  {
    name: 'dmarcian',
    url: 'https://dmarcian.com/',
    description: 'DMARC implementation and monitoring platform.',
    category: 'deliverability',
    sourcePage: '/docs/tools/deliverability-tools',
  },
  {
    name: 'EasyDMARC',
    url: 'https://easydmarc.com/',
    description: 'DMARC monitoring and email authentication management.',
    category: 'deliverability',
    sourcePage: '/docs/tools/deliverability-tools',
  },
  {
    name: 'Email on Acid',
    url: 'https://www.emailonacid.com/',
    description:
      'Email previews, accessibility checks, and deliverability testing.',
    category: 'deliverability',
    sourcePage: '/docs/tools/deliverability-tools',
  },
  {
    name: 'GlockApps',
    url: 'https://glockapps.com/',
    description: 'Inbox placement and deliverability testing for campaigns.',
    category: 'deliverability',
    sourcePage: '/docs/tools/deliverability-tools',
  },
  {
    name: 'Litmus',
    url: 'https://www.litmus.com/',
    description:
      'Email testing, preview, and analytics across clients and devices.',
    category: 'deliverability',
    sourcePage: '/docs/tools/deliverability-tools',
  },
  {
    name: 'Mail-tester',
    url: 'https://www.mail-tester.com/',
    description: 'Score a test email for spam issues before you send.',
    category: 'deliverability',
    sourcePage: '/docs/tools/deliverability-tools',
  },
  {
    name: 'Mailtrap',
    url: 'https://mailtrap.io',
    description:
      'is a testing tool and is not designed to deliver emails to real addresses',
    category: 'deliverability',
    sourcePage: '/docs/tools/deliverability-tools',
  },
  {
    name: 'Mailwarm',
    url: 'https://mailwarm.com',
    description: "Don't land in spam anymore",
    category: 'deliverability',
    sourcePage: '/docs/tools/deliverability-tools',
  },
  {
    name: 'Sendgrid',
    url: 'https://sendgrid.com',
    description: 'Email delivery service',
    category: 'deliverability',
    sourcePage: '/docs/tools/deliverability-tools',
  },
  {
    name: 'Sparkpost',
    url: 'https://sparkpost.com',
    description:
      'is the world’s first and only predictive email intelligence platform',
    category: 'deliverability',
    sourcePage: '/docs/tools/deliverability-tools',
  },
  {
    name: 'Validity',
    url: 'https://www.validity.com/',
    description: 'Email deliverability and data quality tools.',
    category: 'deliverability',
    sourcePage: '/docs/tools/deliverability-tools',
  },

  // Growth
  {
    name: 'Customer.io',
    url: 'https://customer.io/',
    description: 'Targeted messaging workflows',
    category: 'growth',
    sourcePage: '/docs/tools/growth-automation-tools',
    featured: true,
  },
  {
    name: 'ActiveCampaign',
    url: 'https://www.activecampaign.com/',
    description:
      'customer experience automation combining transactional email, marketing automation, sales automation, and CRM',
    category: 'growth',
    sourcePage: '/docs/tools/automation-platforms',
  },
  {
    name: 'Autopilot',
    url: 'https://autopilothq.com',
    description:
      'brings the customer data platform, customer journey marketing, and customer journey analytics together to grow your SaaS business',
    category: 'growth',
    sourcePage: '/docs/tools/growth-automation-tools',
  },
  {
    name: 'Braze',
    url: 'https://www.braze.com/',
    description:
      'Customer engagement platform for cross-channel messaging and journeys.',
    category: 'growth',
    sourcePage: '/docs/tools/growth-automation-tools',
  },
  {
    name: 'Drip',
    url: 'https://www.drip.com/',
    description: 'ecommerce automation and personalized campaigns',
    category: 'growth',
    sourcePage: '/docs/tools/automation-platforms',
  },
  {
    name: 'Iterable',
    url: 'https://iterable.com/',
    description:
      'Cross-channel marketing platform for email, push, SMS, and journeys.',
    category: 'growth',
    sourcePage: '/docs/tools/growth-automation-tools',
  },
  {
    name: 'Keap',
    url: 'https://keap.com',
    description:
      'the all-in-one sales and marketing automation platform designed to help you grow',
    category: 'growth',
    sourcePage: '/docs/tools/growth-automation-tools',
  },
  {
    name: 'Loops',
    url: 'https://loops.so/',
    description:
      'Email platform for SaaS, with marketing and transactional sending.',
    category: 'growth',
    sourcePage: '/docs/tools/growth-automation-tools',
  },
  {
    name: 'Omnisend',
    url: 'https://omnisend.com',
    description:
      'is an omnichannel marketing automation platform for growth-focused ecommerce businesses',
    category: 'growth',
    sourcePage: '/docs/tools/growth-automation-tools',
  },

  // Transactional
  {
    name: 'Amazon SES',
    url: 'https://aws.amazon.com/ses/',
    description:
      'AWS email sending service for transactional and marketing messages.',
    category: 'transactional',
    sourcePage: '/docs/operations/amazon-ses',
  },
  {
    name: 'Mailgun',
    url: 'https://www.mailgun.com/',
    description:
      'Email API and SMTP service for transactional and marketing mail.',
    category: 'transactional',
    sourcePage: '/docs/more/transactional-tools',
  },
  {
    name: 'Postmark',
    url: 'https://postmarkapp.com/',
    description: 'Transactional email delivery for application mail.',
    category: 'transactional',
    sourcePage: '/docs/more/transactional-tools',
  },
  {
    name: 'Resend',
    url: 'https://resend.com/',
    description: 'Email API for developers, with a simple sending interface.',
    category: 'transactional',
    sourcePage: '/docs/more/transactional-tools',
  },

  // Ecommerce
  {
    name: 'Klaviyo',
    url: 'https://www.klaviyo.com/',
    description: '',
    category: 'ecommerce',
    sourcePage: '/docs/tools/ecommerce',
  },
  {
    name: 'Encharge',
    url: 'https://encharge.io/',
    description: '',
    category: 'ecommerce',
    sourcePage: '/docs/tools/ecommerce',
  },
];
