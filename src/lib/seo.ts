export function buildPersonSchema(profile: {
  name: string;
  tagline: string;
  email: string;
  location: string;
  social: Array<{ platform: string; url: string }>;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.tagline,
    email: profile.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: profile.location,
    },
    url: 'https://kevin-cv.netlify.app/',
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
