import { defineCollection, z } from 'astro:content';

const profile = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    avatar: z.string().min(1),
    location: z.string(),
    email: z.string().email(),
    summary: z.string(),
    social: z.array(z.object({
      platform: z.string(),
      url: z.string().url(),
      handle: z.string(),
      icon: z.string(),
    })),
    languages: z.array(z.object({ name: z.string(), level: z.string() })),
    interests: z.array(z.string()),
  }),
});

const experience = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    company: z.string(),
    location: z.string(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().nullable(),
    order: z.number(),
    tags: z.array(z.string()),
    highlights: z.array(z.string()),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    blurb: z.string(),
    url: z.string().url().optional(),
    stack: z.array(z.string()),
    category: z.enum(['shiny', 'dashboard', 'research', 'tool', 'policy']),
    featured: z.boolean().default(false),
    year: z.number(),
  }),
});

const publications = defineCollection({
  type: 'data',
  schema: z.object({
    items: z.array(z.object({
      year: z.number(),
      citation: z.string(),
      doi: z.string().optional(),
    })),
  }),
});

const education = defineCollection({
  type: 'data',
  schema: z.object({
    items: z.array(z.object({
      degree: z.string(),
      university: z.string(),
      year: z.number(),
    })),
  }),
});

const skills = defineCollection({
  type: 'data',
  schema: z.object({
    categories: z.array(z.object({
      title: z.string(),
      items: z.array(z.string()),
    })),
  }),
});

export const collections = { profile, experience, projects, publications, education, skills };
