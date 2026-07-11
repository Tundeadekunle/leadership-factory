const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export default function sitemap() {
  return [
    { url: SITE_URL, lastModified: new Date() },
    { url: `${SITE_URL}/about`, lastModified: new Date() },
    { url: `${SITE_URL}/programs`, lastModified: new Date() },
    { url: `${SITE_URL}/contact`, lastModified: new Date() },
    { url: `${SITE_URL}/admissions`, lastModified: new Date() },
  ]
}
