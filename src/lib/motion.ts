export const cartDrawerEase = [0.32, 0.72, 0, 1] as const;

export const drawerTransition = {
  duration: 0.3,
  ease: cartDrawerEase,
};

export const cardEnterTransition = {
  duration: 0.45,
  ease: 'easeOut' as const,
};

export const cardHoverTransition = {
  duration: 0.2,
  ease: 'easeOut' as const,
};

export const cartItemExitTransition = {
  duration: 0.28,
  ease: cartDrawerEase,
};

export const cartTrashRemoveTransition = {
  duration: 0.26,
  ease: cartDrawerEase,
};

export const CART_TRASH_REMOVE_MS = 260;

export const cartTrashTapTransition = {
  type: 'spring' as const,
  stiffness: 520,
  damping: 22,
};
