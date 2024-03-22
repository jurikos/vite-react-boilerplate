import { useEffect } from 'react';

enum MetaTagName {
  Title = 'title',
  Description = 'description',
}

type MetaTags = {
  [key in MetaTagName]?: string;
};

export const projectName = 'Vite React Boilerplate';

const useMetaTags = ({ title, ...metaTags }: MetaTags): void => {
  useEffect(() => {
    if (title) {
      document.title = `${title} | ${projectName}`;
    }

    Object.entries(metaTags).forEach(([name, content]) => {
      if (!content) return;

      let element = document.head.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }

      element.setAttribute('content', content);
    });

    return () => {
      Object.keys(metaTags).forEach((name) => {
        const element = document.head.querySelector(`meta[name="${name}"]`);
        if (element) document.head.removeChild(element);
      });
    };
  }, [metaTags, title]);
};

export default useMetaTags;
