import { defineCollection, z } from 'astro:content';

const socialPlatform = z.enum(['linkedin', 'github', 'website', 'x', 'scholar', 'orcid', 'other']);

const profile = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string().min(1),
    tagline: z.string().min(1).max(120),
    seoDescription: z.string().optional(),
    location: z.string().min(1),
    email: z.string().email(),
    summary: z.string().min(40),
    social: z.array(z.object({
      platform: socialPlatform,
      url: z.string().url(),
      handle: z.string().min(1),
    })).min(1),
    languages: z.array(z.object({ name: z.string().min(1), level: z.string().min(1) })),
    interests: z.array(z.string().min(1)),
    hero: z.object({
      eyebrow: z.string().min(1),
      heading: z.string().min(1),
      subheading: z.string().min(1),
      stats: z.array(z.string().min(1)).min(1),
      badges: z.array(z.string().min(1)).min(1),
      highlights: z.array(z.object({
        value: z.string().min(1),
        label: z.string().min(1),
      })).min(1).max(3),
      positioning: z.string().min(1),
    }),
  }),
});

const experience = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().min(1),
    company: z.string().min(1),
    location: z.string().min(1),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().nullable(),
    tags: z.array(z.string().min(1)),
    highlights: z.array(z.string().min(1)).min(1),
  }).refine((data) => !data.endDate || data.startDate <= data.endDate, {
    message: 'endDate must be after startDate',
    path: ['endDate'],
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().min(1),
    blurb: z.string().min(20).max(280),
    url: z.string().url().optional(),
    stack: z.array(z.string().min(1)).min(1),
    category: z.enum(['app', 'dashboard', 'research', 'tool', 'policy', 'agent']),
    featured: z.boolean().default(false),
    year: z.number().int().min(1990).max(2100),
  }),
});

const publications = defineCollection({
  type: 'data',
  schema: z.object({
    items: z.array(z.object({
      year: z.number().int().min(1900).max(2100),
      citation: z.string().min(8),
      url: z.string().url().optional(),
    })).min(1),
  }),
});

const education = defineCollection({
  type: 'data',
  schema: z.object({
    items: z.array(z.object({
      degree: z.string().min(1),
      university: z.string().min(1),
      year: z.number().int().min(1900).max(2100),
    })).min(1),
  }),
});

const skills = defineCollection({
  type: 'data',
  schema: z.object({
    tiers: z.array(z.object({
      title: z.string().min(1),
      items: z.array(z.string().min(1)).min(1),
    })).min(1),
  }),
});

const snapshot = defineCollection({
  type: 'data',
  schema: z.object({
    cards: z.array(z.object({
      label: z.string().min(1),
      title: z.string().min(1),
      detail: z.string().min(1),
    })).min(1).max(8),
  }),
});

export const collections = { profile, experience, projects, publications, education, skills, snapshot };
