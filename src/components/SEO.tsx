import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
}

const SITE_TITLE =
  "Mashood Ahmed | Video Editor, Motion Designer & Web Developer";
const SITE_DESCRIPTION =
  "Mashood Ahmed — Video Editor & Motion Designer crafting cinematic promos, SaaS explainers, and short-form content for brands and creators.";
const SITE_URL = "https://mashoodsportfolio.lovable.app";

export function SEO({
  title,
  description = SITE_DESCRIPTION,
  canonical,
  ogImage,
  ogType = "website",
}: SEOProps) {
  const fullTitle = title ? `${title} | Mashood Ahmed` : SITE_TITLE;
  const url = canonical
    ? canonical.startsWith("http")
      ? canonical
      : `${SITE_URL}${canonical}`
    : SITE_URL;
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={ogType} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
    </Helmet>
  );
}

export default SEO;