declare module 'react';
declare module 'react-dom/client';
declare module 'react-router-dom';
declare module '@chakra-ui/react';
declare module '@emotion/react';
declare module '@emotion/styled';
declare module 'framer-motion';
declare module 'axios';

declare namespace JSX { interface IntrinsicElements { [elemName: string]: any } }

declare module 'react/jsx-runtime' {
  export const jsx: any
  export const jsxs: any
  export const Fragment: any
}
