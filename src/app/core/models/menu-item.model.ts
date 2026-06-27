/**
 * A navigation menu item. The structure is recursive (`children`) so the
 * sidebar can render any number of nested levels.
 */
export interface MenuItem {
  /** Stable id, used for pinning / reordering / persistence. */
  id: string;
  /** i18n key resolved via Transloco (so it switches language at runtime). */
  labelKey: string;
  /** PrimeIcons class, e.g. 'pi pi-home'. */
  icon?: string;
  /** Router link. Omit for items that only group children. */
  route?: string;
  /** Optional URL fragment (anchor) used with route, e.g. /site#features. */
  fragment?: string;
  /** Built-in action instead of navigation (e.g. open the settings drawer). */
  action?: 'openSettings';
  /** External link (opens in new tab). */
  href?: string;
  /** Small badge text (e.g. counts, "new"). */
  badgeKey?: string;
  /** Roles allowed to see this item. Empty/undefined = everyone. */
  roles?: string[];
  /** Nested items (any depth). */
  children?: MenuItem[];
  /** Marks a non-clickable section header. */
  separator?: boolean;
}
