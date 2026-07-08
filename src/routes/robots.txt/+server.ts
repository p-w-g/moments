export const GET = ({ url }) => {
	const body = `User-agent: *
Allow: /

Sitemap: ${url.origin}/sitemap.xml
`;

	return new Response(body, { headers: { 'Content-Type': 'text/plain' } });
};
