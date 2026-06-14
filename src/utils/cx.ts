/**
 * Tiny class-name composition helper.
 *
 * Accepts any number of class-name arguments, filters out falsy values
 * (`undefined`, `null`, `false`, empty string), and joins the remainder
 * with a single space.
 *
 * Designed for use with CSS Module imports under `noUncheckedIndexedAccess`,
 * where a missing class on a styles record is typed as `undefined`. The
 * helper transparently absorbs that case rather than forcing a coalesce
 * (`?? ''`) at every call site, and keeps the call site visually clean.
 *
 * Usage:
 *   cx(styles.foo)                                 -> 'foo'
 *   cx(styles.foo, styles.bar)                     -> 'foo bar'
 *   cx(styles.foo, isActive && styles.active)      -> 'foo' or 'foo active'
 *   cx(styles.foo, condition ? styles.a : styles.b) -> 'foo a' or 'foo b'
 */
export function cx(...parts: readonly (string | undefined | null | false)[]): string {
  return parts.filter((part): part is string => Boolean(part)).join(' ');
}
