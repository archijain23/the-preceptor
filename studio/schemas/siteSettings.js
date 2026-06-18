import { defineType, defineField } from 'sanity';

export const siteSettingsSchema = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'siteName',          title: 'Site Name',           type: 'string' }),
    defineField({ name: 'tagline',           title: 'Tagline',             type: 'string' }),
    defineField({ name: 'email',             title: 'Email',               type: 'string' }),
    defineField({ name: 'phone',             title: 'Phone',               type: 'string' }),
    defineField({ name: 'instagramUrl',      title: 'Instagram URL',       type: 'url'    }),
    defineField({ name: 'redditUrl',         title: 'Reddit URL',          type: 'url'    }),
    defineField({ name: 'calcomUsername',    title: 'Cal.com Username',    type: 'string' }),
    defineField({ name: 'calcomEventType',   title: 'Cal.com Event Type',  type: 'string' }),
    defineField({
      name: 'announcementBanner',
      title: 'Announcement Banner',
      type: 'string',
      description: 'Leave blank to hide the banner',
    }),
  ],
  preview: {
    select: { title: 'siteName' },
    prepare({ title }) { return { title: title ?? 'Site Settings' }; },
  },
});
