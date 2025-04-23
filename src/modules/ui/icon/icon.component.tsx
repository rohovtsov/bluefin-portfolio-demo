import { useEffect, useState } from 'react';
import style from './style.module.scss';

interface Props {
  name: string;
  source?: 'material' | 'native';
  className?: string;
  alt?: string;
}

function useFetchSvg(url?: string) {
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchSvg = async (url: string) => {
      try {
        const response = await fetch(url, {
          credentials: 'same-origin',
          cache: 'force-cache',
          headers: { 'Cache-Control': 'max-age=3600, must-revalidate' }
        });

        if (!response.ok) {
          throw new Error(`Error loading SVG: ${response.status}`);
        }

        const svgText = await response.text();
        setSvgContent(svgText);
      } catch (err) {
        console.error(err);
        setError(true);
        setSvgContent(null);
      }
    };

    if (url) {
      fetchSvg(url);
    }
  }, [url]);

  return { svgContent, error };
}

export default function Icon({ name, source = 'native', className, alt }: Props) {
  const url = source === 'native' ? `/assets/icons/${name}.svg` : undefined;
  const { svgContent } = useFetchSvg(url);
  const content = (source === 'material' ? name : svgContent) ?? '';
  const sourceClassName = source === 'material' ? 'material-icons-outlined' : '';

  return (
    <i
      className={`${style['icon']} ${className} ${sourceClassName}`}
      dangerouslySetInnerHTML={{ __html: content }}
      aria-label={alt}
      role={'img'}
    />
  );
};
