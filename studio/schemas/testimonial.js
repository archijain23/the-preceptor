import { defineType, defineField } from 'sanity';

export const testimonialSchema = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Client Name',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g. New York, USA',
    }),
    defineField({
      name: 'rating',
      title: 'Rating (1–5)',
      type: 'number',
      initialValue: 5,
      validation: (R) => R.required().min(1).max(5).integer(),
    }),
    defineField({
      name: 'review',
      title: 'Review Text',
      type: 'text',
      rows: 4,
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'service',
      title: 'Service Taken',
      type: 'string',
      description: 'Optional — which service did this client book?',
    }),
    defineField({
      name: 'avatarInitial',
      title: 'Avatar Initial',
      type: 'string',
      description: 'Single letter shown as avatar fallback e.g. "A"',
      validation: (R) => R.max(1),
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'location' },
  },
});
