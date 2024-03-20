const getIsActive = (pathname: string, slug: string): boolean => {
  if (slug === '/') {
    return pathname === '/';
  }

  const normalizedPathname = pathname.endsWith('/') ? pathname : `${pathname}/`;
  const normalizedSlug = slug.endsWith('/') ? slug : `${slug}/`;

  return normalizedPathname.startsWith(normalizedSlug);
};

export default getIsActive;
