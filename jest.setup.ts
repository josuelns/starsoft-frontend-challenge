import '@testing-library/jest-dom';
import { createElement, type ReactNode } from 'react';

jest.mock('framer-motion', () => {
  const createMotionComponent = (tag: string) =>
    function MotionComponent({
      children,
      ...props
    }: {
      children?: ReactNode;
    }) {
      const {
        initial: _initial,
        animate: _animate,
        exit: _exit,
        transition: _transition,
        whileHover: _whileHover,
        whileTap: _whileTap,
        ...rest
      } = props as Record<string, unknown>;

      return createElement(tag, rest, children);
    };

  return {
    motion: {
      div: createMotionComponent('div'),
      aside: createMotionComponent('aside'),
      button: createMotionComponent('button'),
    },
    AnimatePresence: ({ children }: { children: ReactNode }) => children,
    useReducedMotion: () => true,
  };
});
