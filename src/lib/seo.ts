interface PersonSchemaOptions {
  worksFor?: string;
  alumniOf?: string;
}

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
  options?: PersonSchemaOptions,
) {
  const description = profile.seoDescription ?? profile.summary.replace(/\*\*/g, '');
  const worksFor = options?.worksFor ?? 'ASB Bank';
  const alumniOf = options?.alumniOf ?? 'University of Auckland';

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
      name: worksFor,
      ...(worksFor === 'ASB Bank' ? { url: 'https://www.asb.co.nz/' } : {}),
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: alumniOf,
      ...(alumniOf === 'University of Auckland' ? { url: 'https://www.auckland.ac.nz/' } : {}),
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
