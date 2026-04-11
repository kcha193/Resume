export function buildPersonSchema(
  profile: {
    name: string;
    tagline: string;
    email: string;
    location: string;
    summary: string;
    social: Array<{ platform: string; url: string }>;
  },
  siteUrl: string,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.tagline,
    description: profile.summary.replace(/\*\*/g, ''),
    email: profile.email,
    image: new URL('/avatar.jpg', siteUrl).href,
    url: siteUrl,
    address: {
      '@type': 'PostalAddress',
      addressLocality: profile.location,
    },
    worksFor: {
      '@type': 'Organization',
      name: 'ASB Bank',
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'University of Auckland',
    },
    sameAs: profile.social.map((s) => s.url),
    knowsAbout: [
      'Data Science',
      'Machine Learning',
      'Statistical Modelling',
      'Pricing Analytics',
      'Customer Intelligence',
      'Microsimulation',
      'R Programming',
      'Python',
      'SQL',
    ],
  };
}
