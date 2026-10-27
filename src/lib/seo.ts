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
    '@id': new URL('/#person', siteUrl).href,
    name: profile.name,
    jobTitle: profile.tagline.split('|')[0].trim(),
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
      'Generative AI',
      'Statistical Modelling',
      'Retail Banking Pricing',
      'Pricing Analytics',
      'Revenue Optimisation',
      'Customer Intelligence',
      'Customer Lifetime Value',
      'Model Risk',
      'Microsimulation',
      'R Programming',
      'Python',
      'SQL',
    ],
  };
}

export interface ArticleMetadata {
  title: string;
  summary: string;
  topic: string;
  date: Date;
  status: 'draft' | 'outline' | 'published';
}

export function buildArticleSchema(article: ArticleMetadata, canonicalUrl: string, siteUrl: string, authorName: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${canonicalUrl}#article`,
    headline: article.title,
    description: article.summary,
    articleSection: article.topic,
    datePublished: article.date.toISOString(),
    creativeWorkStatus: article.status === 'outline' ? 'Outline' : 'Published',
    mainEntityOfPage: canonicalUrl,
    url: canonicalUrl,
    image: new URL('/og-image.png', siteUrl).href,
    author: { '@type': 'Person', '@id': new URL('/#person', siteUrl).href, name: authorName, url: siteUrl },
    inLanguage: 'en-NZ',
  };
}
