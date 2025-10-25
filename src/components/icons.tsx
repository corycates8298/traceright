import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 8.28a2.5 2.5 0 0 0-1.7-.65H15.4a2.5 2.5 0 0 1-1.7-.65L12 5.28l-1.7.65a2.5 2.5 0 0 1-1.7.65H3.7a2.5 2.5 0 0 0-1.7.65L2 10l10 12 10-12Z" />
      <path d="m12 12-2-3h4l-2 3Z" />
      <path d="M12 22V12" />
    </svg>
  );
}
