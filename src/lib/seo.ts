export function buildPersonSchema(
  profile: {
    name: string;
    tagline: string;
    seoDescription?: string;
    email: string;
    location: string;
    summary: string;
    languages: Array<{ name: string; level: string }>;
    social: Array<{ platform: string; url: string }>;
  },
  siteUrl: string,
  imageUrl: string,
) {
  const description = profile.seoDescription ?? profile.summary.replace(/\*\*/g, '');

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.tagline,
    description,
    email: profile.email,
    image: imageUrl,
    url: siteUrl,
    worksFor: {
      '@type': 'Organization',
      name: 'ASB Bank',
      url: 'https://www.asb.co.nz/',
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'University of Auckland',
      url: 'https://www.auckland.ac.nz/',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: profile.location,
    },
    sameAs: profile.social.map((s) => s.url),
    knowsLanguage: profile.languages.map((language) => ({
      '@type': 'Language',
      name: language.name,
    })),
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
