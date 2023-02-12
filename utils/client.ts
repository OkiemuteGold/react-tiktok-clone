import sanityClient from '@sanity/client';

export const client = sanityClient({
  projectId: 'mofmf7uf',
  dataset: 'production',
  apiVersion: '2023-02-11',
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});
