import { useEffect, useState } from 'react';

export const useScrollSpy = (sectionIds: string[], offset: number = 100) => {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const listener = () => {
      const scroll = window.scrollY;

      const sections = sectionIds.map(id => {
        const element = document.getElementById(id);
        if (!element) return { id, top: 0, bottom: 0 };
        
        const rect = element.getBoundingClientRect();
        const top = rect.top + scroll;
        return {
          id,
          top,
          bottom: top + rect.height,
        };
      });

      const current = sections.find(section => {
        return scroll >= section.top - offset && scroll < section.bottom - offset;
      });

      if (current) {
        setActiveSection(current.id);
      }
    };

    listener();
    window.addEventListener('scroll', listener);
    window.addEventListener('resize', listener);

    return () => {
      window.removeEventListener('scroll', listener);
      window.removeEventListener('resize', listener);
    };
  }, [sectionIds, offset]);

  return activeSection;
};