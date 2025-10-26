import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3.5 10.5c.88 0 1.63-.44 2.1-1.12" />
      <path d="M4.64 15.5c.82.63 1.94.99 3.11.99h.5" />
      <path d_1="M17.5 10.5c-.88 0-1.63-.44-2.1-1.12" />
      <path d_2="M19.36 15.5c-.82.63-1.94.99-3.11.99h-.5" />
      <path d="M12 2v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 6.34 1.41-1.41" />
      <path d_3="M12 10a2 2 0 0 0-2 2v1.5a2 2 0 0 1-2 2" />
      <path d_4="M14 12a2 2 0 0 0 2-2" />
      <path d_5="M12 22v-2" />
      <path d_6="m4.93 19.07 1.41-1.41" />
      <path d_7="m17.66 17.66 1.41 1.41" />
      <circle cx="12" cy="12" r="10" />
      <path d="m8 14 3-3 4 4" />
      <path d="m13 15 2-2" />
    </svg>
  );
}
