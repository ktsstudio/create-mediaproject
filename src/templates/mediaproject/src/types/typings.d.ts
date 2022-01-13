declare module '*.modules.scss' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.png';
declare module '*.svg';
declare module '*.jpg';

declare module 'eruda';
declare module 'eruda-dom';
declare module 'eruda-code';
