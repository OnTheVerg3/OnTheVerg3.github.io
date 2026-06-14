import { useEffect } from 'react';

/**
 * Body-scroll-lock hook.
 *
 * When `locked` is `true`, freezes the document so background content
 * cannot scroll behind a foreground surface (mobile menu overlay, modal,
 * etc.). When `locked` is `false`, restores the prior scroll behavior.
 *
 * Implementation notes:
 *   - Sets `overflow: hidden` on the documentElement (html) AND on
 *     body. Some user agents respect one and not the other.
 *   - Captures the current scrollY into `top: -scrollY` so the fixed
 *     body does not jump to the top when locked, and restores
 *     `window.scrollTo(0, scrollY)` on unlock.
 *   - Compensates for vanishing scrollbar width via
 *     `padding-right: <gutter>` so nav bars do not shift horizontally
 *     when the scrollbar disappears on lock. The compensation is
 *     measured from `window.innerWidth - documentElement.clientWidth`
 *     so it works regardless of the platform's overlay-vs-classic
 *     scrollbar style.
 *   - On unmount or when `locked` flips back to false, all touched
 *     styles are reverted to their prior inline values. Nothing leaks.
 *
 * The hook is idempotent across stacked consumers because each consumer
 * captures the style snapshot it observed at its own lock moment;
 * however, the recommended usage pattern is a single locker per layer
 * (mobile menu OR modal, not both simultaneously).
 */
export function useScrollLock(locked: boolean): void {
  useEffect(() => {
    if (!locked) {
      return;
    }

    const html = document.documentElement;
    const body = document.body;

    const scrollY = window.scrollY;
    const scrollbarGutter = window.innerWidth - html.clientWidth;

    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevBodyPosition = body.style.position;
    const prevBodyTop = body.style.top;
    const prevBodyWidth = body.style.width;
    const prevBodyPaddingRight = body.style.paddingRight;

    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${String(scrollY)}px`;
    body.style.width = '100%';
    if (scrollbarGutter > 0) {
      body.style.paddingRight = `${String(scrollbarGutter)}px`;
    }

    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      body.style.position = prevBodyPosition;
      body.style.top = prevBodyTop;
      body.style.width = prevBodyWidth;
      body.style.paddingRight = prevBodyPaddingRight;
      window.scrollTo(0, scrollY);
    };
  }, [locked]);
}
