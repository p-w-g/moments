import type { HandleServerError } from '@sveltejs/kit';

// Logs the real error server-side (visible in Netlify function logs) and
// returns a generic message to the client — visitors don't need to see
// "PUBLIC_SANITY_PROJECT_ID is missing", they just need the site to fail
// gracefully instead of with a bare stack trace.
export const handleError: HandleServerError = ({ error, event }) => {
	console.error(`[${event.request.method}] ${event.url.pathname}:`, error);

	return {
		message: 'Something went wrong loading this page. Please try again shortly.'
	};
};
