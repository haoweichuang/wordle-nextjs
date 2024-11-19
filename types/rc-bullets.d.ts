declare module 'rc-bullets' {
  import { ReactNode } from 'react';

  interface BulletScreenOptions {
    duration?: number;
    trackHeight?: number;
  }

  interface StyledBulletProps {
    head?: string;
    msg?: string;
    backgroundColor?: string;
    size?: 'small' | 'normal' | 'large';
    color?: string;
  }

  class BulletScreen {
    constructor(selector: string | HTMLElement, options?: BulletScreenOptions);
    push(content: ReactNode | object): void;
    clear(): void;
    pause(): void;
    resume(): void;
    resize(): void;
  }

  export class StyledBullet extends React.Component<StyledBulletProps> {}
  export default BulletScreen;
} 