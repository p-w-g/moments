import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } from '$env/static/public';

export const client = createClient({
	projectId: PUBLIC_SANITY_PROJECT_ID,
	dataset: PUBLIC_SANITY_DATASET ?? 'production',
	apiVersion: '2024-01-01',
	useCdn: true
});

// Tiny helper for images
const builder = imageUrlBuilder(client);
export const urlFor = (src: any) => {
	return builder.image(src);
};
