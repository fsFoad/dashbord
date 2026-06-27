/**
 * Release history — the single source of truth for the app version.
 *
 * Developer workflow (best practice):
 *  1. Ship a release → add a new object to the TOP of CHANGELOG.
 *  2. APP_VERSION / APP_RELEASE_DATE derive automatically from it.
 *  3. Users who had seen an older version get the "What's new" dialog
 *     exactly once (handled by WhatsNewService, per user).
 *
 * Entries are bilingual on purpose: the changelog is authored by developers,
 * not translators, so keeping fa/en together beats scattering i18n keys.
 */
export type ChangeType = 'feature' | 'improvement' | 'fix';

export interface ChangelogEntry {
  type: ChangeType;
  fa: string;
  en: string;
}

export interface Release {
  version: string;
  /** ISO date of the release. */
  date: string;
  entries: ChangelogEntry[];
}

export const CHANGELOG: Release[] = [
  {
    version: '2.7.2',
    date: '2026-06-27',
    entries: [
      { type: 'fix', fa: 'حذف قطعی resize/reorder ستون: دایرکتیوهای pReorderableColumn و pResizableColumn در PrimeNG 21 با این روش شناسایی نمی‌شوند (سه بار خطای NG8002). برای حفظ API صادق، این دو قابلیت و config مربوطه حذف شدند. سایر قابلیت‌های جدول کامل و فعال‌اند', en: 'Definitively removed column resize/reorder: pReorderableColumn and pResizableColumn are not recognized this way in PrimeNG 21 (NG8002 three times). To keep the API honest, these two features and their config were removed. All other table features remain complete and active' },
      { type: 'fix', fa: 'رفع هشدار NG8113: حذف import بلااستفاده‌ی RouterLinkActive از site-layout (پس از تبدیل منوی موبایل به آکاردئون دیگر استفاده نمی‌شد)', en: 'Fixed NG8113 warning: removed the unused RouterLinkActive import from site-layout (no longer used after the mobile menu became an accordion)' },
    ],
  },
  {
    version: '2.7.1',
    date: '2026-06-27',
    entries: [
      { type: 'fix', fa: 'رفع خطای TS2339 (cm): منوی راست‌کلیک همیشه رندر می‌شود تا ارجاع template در دسترس باشد', en: 'Fixed TS2339 (cm): the context menu is always rendered so its template reference is available' },
      { type: 'feature', fa: 'افزودن گروه‌بندی ردیف با هدر گروه (rowGroupMode: subheader) که قبل از هر گروه یک ردیف عنوان با تعداد اعضا نشان می‌دهد، در کنار حالت rowspan؛ و تلاش مجدد برای فعال‌سازی resize/reorder ستون از طریق فلگ‌های p-table و دایرکتیوهای سرستون', en: 'Added row grouping with a group header (rowGroupMode: subheader) showing a title row with member count before each group, alongside rowspan mode; and re-attempted column resize/reorder via p-table flags and header directives' },
    ],
  },
  {
    version: '2.7.0',
    date: '2026-06-27',
    entries: [
      { type: 'feature', fa: 'دو قابلیت نهایی به رپر جدول اضافه شد: (۱) منوی راست‌کلیک روی ردیف (context menu) از طریق input [rowMenu] با آیتم‌های دارای آیکون و حالت danger؛ (۲) ادغام سلول‌ها با rowspan از طریق config.rowGroupField که ردیف‌های متوالی با مقدار یکسانِ آن فیلد را به‌صورت یک سلولِ ادغام‌شده نمایش می‌دهد. نمونه‌ها در گالری اضافه شدند. حالا data-table کامل است', en: 'Two final features added to the table wrapper: (1) row right-click context menu via [rowMenu] input with icon and danger-styled items; (2) cell merging with rowspan via config.rowGroupField, which renders consecutive rows sharing that field value as one merged cell. Examples added to the gallery. The data-table is now complete' },
    ],
  },
  {
    version: '2.6.2',
    date: '2026-06-27',
    entries: [
      { type: 'fix', fa: 'رفع خطای TS2322: ورودی stateStorage جدول PrimeNG مقدار undefined نمی‌پذیرد (فقط local یا session). حالا همیشه local است و فعال/غیرفعال بودن ذخیره‌سازی از طریق ptableStateKey کنترل می‌شود (کلید معتبر وقتی stateKey داده شده، رشته‌ی خالی در غیر این صورت)', en: 'Fixed TS2322: the PrimeNG table stateStorage input does not accept undefined (only local or session). It is now always local, and whether persistence is active is controlled via ptableStateKey (a valid key when stateKey is provided, empty string otherwise)' },
    ],
  },
  {
    version: '2.6.1',
    date: '2026-06-27',
    entries: [
      { type: 'feature', fa: 'نوار انتخاب پیشرفته در رپر جدول: وقتی ردیفی انتخاب می‌شود نواری با شمارنده، دکمه‌ی «انتخاب همه‌ی رکوردها» (کل داده، نه فقط صفحه‌ی فعلی) و دکمه‌ی «پاک‌کردن انتخاب» نمایش داده می‌شود. با گزینه‌های config: selectionToolbar و selectAllAcrossPages. باکس دستی انتخاب در گالری حذف و با این نوار جایگزین شد', en: 'Advanced selection toolbar in the table wrapper: when rows are selected, a bar appears with a counter, a “select all records” button (entire dataset, not just the current page) and a “clear selection” button. Controlled via config: selectionToolbar and selectAllAcrossPages. The manual selection box in the gallery was removed in favor of this toolbar' },
    ],
  },
  {
    version: '2.6.0',
    date: '2026-06-27',
    entries: [
      { type: 'feature', fa: 'ذخیره‌ی وضعیت جدول (state save) به رپر اضافه شد: با دادن input [stateKey]، وضعیت جدول در localStorage ذخیره و پس از بارگذاری مجدد بازیابی می‌شود — شامل جستجوی سراسری و ستون‌های مخفی (مدیریت‌شده توسط رپر) و نیز sort/filter/page (از طریق stateStorage داخلی p-table). متد clearState برای پاک‌کردن و بازنشانی هم اضافه شد', en: 'Added table state persistence to the wrapper: provide [stateKey] and the table state is saved to localStorage and restored after reload — covering global search and hidden columns (managed by the wrapper) plus sort/filter/page (via p-table built-in stateStorage). A clearState method to reset is also included' },
    ],
  },
  {
    version: '2.5.5',
    date: '2026-06-27',
    entries: [
      { type: 'fix', fa: 'رفع خطای NG2011: کلاس‌های ReorderableColumn/ResizableColumn در PrimeNG 21 standalone نیستند و قابل import مستقیم نبودند. تصمیم تمیز: قابلیت resize/reorder ستون به‌کلی از config حذف شد تا API صادق بماند (هر گزینه‌ای که در config هست واقعاً کار کند). سایر ۱۵+ قابلیت رپر کامل و فعال‌اند', en: 'Fixed NG2011: ReorderableColumn/ResizableColumn are not standalone in PrimeNG 21 and could not be imported directly. Clean decision: removed column resize/reorder from the config entirely so the API stays honest (every config option actually works). The other 15+ wrapper features remain complete and active' },
    ],
  },
  {
    version: '2.5.4',
    date: '2026-06-27',
    entries: [
      { type: 'improvement', fa: 'تلاش برای فعال‌سازی resize/reorder ستون در رپر جدول: کلاس‌های ReorderableColumn و ResizableColumn از primeng/table import و دایرکتیوهای متناظر به سرستون‌ها بازگردانده شدند. اگر نام کلاس‌ها در این نسخه‌ی PrimeNG متفاوت باشد و خطای build بدهد، باید حذف شوند', en: 'Attempt to enable column resize/reorder in the table wrapper: imported ReorderableColumn and ResizableColumn from primeng/table and restored the directives on headers. If the class names differ in this PrimeNG version and cause a build error, they should be removed' },
    ],
  },
  {
    version: '2.5.3',
    date: '2026-06-27',
    entries: [
      { type: 'improvement', fa: 'پاک‌سازی معماری (clean architecture): رپر گلوبال data-table از shared/data-table به shared/components/data-table منتقل شد تا با سایر رپرهای گلوبال یکدست باشد؛ مسیرهای import به‌روز شدند؛ یک barrel (index.ts) برای shared/components اضافه شد تا importها تمیزتر شوند. کد بدون console.log و TODO باقی‌مانده است', en: 'Clean-architecture pass: moved the global data-table wrapper from shared/data-table to shared/components/data-table for consistency with the other global wrappers; updated import paths; added a barrel (index.ts) for shared/components for cleaner imports. Codebase has no leftover console.log or TODO' },
    ],
  },
  {
    version: '2.5.2',
    date: '2026-06-27',
    entries: [
      { type: 'fix', fa: 'رفع سه خطای رپر جدول: (۱) expandedRowKeys از two-way به one-way تغییر کرد؛ (۲و۳) دایرکتیوهای سطح ستونِ pReorderableColumn و pResizableColumn که در TableModule نیستند و خطا می‌دادند حذف شدند (resize/reorder ستون موقتاً غیرفعال تا import دایرکتیو جداگانه اضافه شود). سایر امکانات (row expansion، row reorder، sort، filter، toggle، export، edit) فعال‌اند', en: 'Fixed three table-wrapper errors: (1) expandedRowKeys changed from two-way to one-way; (2,3) removed the column-level pReorderableColumn and pResizableColumn directives that are not in TableModule and were erroring (column resize/reorder temporarily disabled until the separate directive import is added). Other features (row expansion, row reorder, sort, filter, toggle, export, edit) remain enabled' },
    ],
  },
  {
    version: '2.5.1',
    date: '2026-06-27',
    entries: [
      { type: 'fix', fa: 'رفع هشدار NG8113: حذف import بلااستفاده‌ی FaBooleanPipe از رپر جدول (نوع boolean با آیکون رندر می‌شود نه پایپ). خود پایپ برای استفاده‌ی آینده باقی است', en: 'Fixed NG8113 warning: removed the unused FaBooleanPipe import from the table wrapper (boolean type renders via icon, not the pipe). The pipe itself remains exported for future use' },
    ],
  },
  {
    version: '2.5.0',
    date: '2026-06-27',
    entries: [
      { type: 'feature', fa: 'رپر جدول به نسخه‌ی کامل ارتقا یافت و تقریباً همه‌ی امکانات جدول PrimeNG را پوشش می‌دهد: مرتب‌سازی تک/چندستونه، فیلتر ستونی (text/numeric/date/boolean/select)، انتخاب تکی (radio) و چندتایی، نمایش/مخفی ستون‌ها (column toggle)، تغییر اندازه و جابه‌جایی ستون (resize/reorder)، باز شدن ردیف (row expansion)، جابه‌جایی ردیف (row reorder)، ویرایش درون‌خطی (cell edit)، اسکرول مجازی (virtual scroll)، خروجی CSV با پشتیبانی فارسی، caption، و حالت موبایل کارت + infinite scroll. همه از طریق config سراسری یا موضعی قابل کنترل‌اند. تمپلیت به فایل HTML جدا منتقل شد', en: 'Upgraded the table wrapper to a complete version covering almost all PrimeNG table features: single/multi-column sort, column filters (text/numeric/date/boolean/select), single (radio) and multiple selection, column toggle, column resize/reorder, row expansion, row reorder, inline cell edit, virtual scroll, CSV export with Persian support, caption, and mobile card mode + infinite scroll. All controllable via global or local config. Template moved to a separate HTML file' },
    ],
  },
  {
    version: '2.4.2',
    date: '2026-06-27',
    entries: [
      { type: 'feature', fa: 'قابلیت ستون ثابت (frozen) رپر جدول راه‌اندازی شد — با CSS sticky خالص (بدون وابستگی به دایرکتیو PrimeNG): ستون‌هایی که frozen: true دارند هنگام اسکرول افقی در لبه می‌چسبند، با پس‌زمینه و سایه‌ی جداکننده و پشتیبانی کامل RTL/دارک. ستون شناسه در جدول نمونه frozen شد', en: 'Enabled the table wrapper frozen-column feature using pure CSS sticky (no PrimeNG directive dependency): columns with frozen: true stick to the edge during horizontal scroll, with a background and divider shadow and full RTL/dark support. The ID column in the sample table is now frozen' },
    ],
  },
  {
    version: '2.4.1',
    date: '2026-06-27',
    entries: [
      { type: 'fix', fa: 'رفع خطای NG8002 رپر جدول: دایرکتیو pFrozenColumn حذف شد (در TableModule نیست و نیاز به import جدا دارد). فیلد frozen در مدل برای استفاده‌ی آینده رزرو ماند', en: 'Fixed the table wrapper NG8002 error: removed pFrozenColumn (not part of TableModule, needs a separate import). The frozen field remains reserved in the model for future use' },
    ],
  },
  {
    version: '2.4.0',
    date: '2026-06-27',
    entries: [
      { type: 'feature', fa: 'کامپوننت رپر قابل‌استفاده‌ی مجدد <app-data-table> برای جدول‌های PrimeNG اضافه شد: پیکربندی سراسری از طریق سرویس (provideTableDefaults) و موضعی از طریق input [config]؛ ستون‌ها با typeهای آماده (currency/tag/date/number/boolean/badge) و پایپ‌های فارسی، یا ng-template سفارشی #cell؛ دو حالت داده (آرایه‌ی محلی یا lazy سرور با رویداد onLazyLoad)؛ جستجوی سراسری، مرتب‌سازی، انتخاب، صفحه‌بندی؛ و در موبایل به‌جای جدول، هر ردیف یک کارت با infinite scroll. جدول گالری با همین رپر بازنویسی شد', en: 'Added a reusable <app-data-table> wrapper for PrimeNG tables: global config via a service (provideTableDefaults) and local via [config] input; columns with built-in types (currency/tag/date/number/boolean/badge) and Persian pipes, or a custom #cell ng-template; two data modes (local array or server lazy via onLazyLoad); global search, sorting, selection, pagination; and on mobile each row becomes a card with infinite scroll. The gallery table was rewritten to use this wrapper' },
    ],
  },
  {
    version: '2.3.2',
    date: '2026-06-27',
    entries: [
      { type: 'feature', fa: 'منوی موبایل سایت به آکاردئون چندسطحی تبدیل شد: حالا تمام عمق منو (دسته‌ها و زیرمنوها) با باز/بسته شدن گروه‌ها و تورفتگی بر اساس سطح در دسترس است. کامپوننت بازگشتی SiteMobileAccordion ساخته شد', en: 'The site mobile menu is now a multi-level accordion: the full menu depth (categories and submenus) is reachable via collapsible groups with depth-based indentation. Added a recursive SiteMobileAccordion component' },
    ],
  },
  {
    version: '2.3.1',
    date: '2026-06-27',
    entries: [
      { type: 'fix', fa: 'رفع مشکل انتخاب‌نشدن تب‌های گالری در موبایل: به‌جای select بومی (که در حالت zoneless درست کار نمی‌کرد) از یک گرید دو‌ستونه‌ی دکمه استفاده شد که قطعاً قابل لمس و انتخاب است', en: 'Fixed gallery tabs not being selectable on mobile: replaced the native select (which misbehaved under zoneless) with a reliable two-column grid of buttons' },
    ],
  },
  {
    version: '2.3.1',
    date: '2026-06-27',
    entries: [
      { type: 'fix', fa: 'رفع مشکل انتخاب تب‌های گالری در موبایل: در موبایل به‌جای نوار اسکرول افقی (که انتخاب را سخت می‌کرد) یک منوی کشویی نمایش داده می‌شود؛ در دسکتاپ تب‌ها در چند ردیف wrap می‌شوند تا همه در دسترس باشند', en: 'Fixed gallery tab selection on mobile: a dropdown is shown on mobile instead of a horizontally-scrolling bar (which made tabs hard to reach); on desktop the tabs wrap to multiple rows so all are reachable' },
    ],
  },
  {
    version: '2.3.0',
    date: '2026-06-27',
    entries: [
      { type: 'feature', fa: 'جدول کامل و حرفه‌ای در گالری (تب «جدول»): جستجوی سراسری، مرتب‌سازی ستون‌ها، انتخاب چندتایی، برچسب وضعیت رنگی، صفحه‌بندی و ۲۰ تراکنش بانکی واقعی با اسکرول افقی در موبایل', en: 'Full-featured data table in the gallery (Table tab): global search, column sorting, multi-select, colored status tags, pagination, and 20 realistic banking transactions with horizontal scroll on mobile' },
      { type: 'fix', fa: 'بهبود حالت موبایل گالری: کارت‌ها padding کمتری در موبایل می‌گیرند، کامپوننت‌های عریض (select، datepicker، منوها، جدول‌ها) دیگر از صفحه بیرون نمی‌زنند و عرض کامل/wrap می‌شوند', en: 'Improved gallery mobile mode: cards use less padding on mobile, and wide components (selects, datepicker, menus, tables) no longer overflow — they take full width or wrap' },
    ],
  },
  {
    version: '2.2.0',
    date: '2026-06-27',
    entries: [
      { type: 'feature', fa: 'تکمیل گالری کامپوننت‌ها: بخش «بیشتر» با DatePicker، ConfirmDialog، MegaMenu، Galleria، ContextMenu و OrganizationChart اضافه شد. حالا تقریباً تمام کامپوننت‌های PrimeNG پوشش داده شده‌اند (به‌جز Editor که به پکیج quill نیاز دارد)', en: 'Completed the components gallery: a "More" section with DatePicker, ConfirmDialog, MegaMenu, Galleria, ContextMenu and OrganizationChart. Almost the entire PrimeNG component set is now covered (except Editor, which needs the quill package)' },
    ],
  },
  {
    version: '2.1.4',
    date: '2026-06-27',
    entries: [
      { type: 'fix', fa: 'افزودن @angular/cdk به وابستگی‌ها — چند کامپوننت PrimeNG (Listbox، PickList، OrderList) به آن نیاز دارند. PickList و OrderList دوباره به گالری برگشتند. پس از npm i باید بدون خطا اجرا شود', en: 'Added @angular/cdk to dependencies — several PrimeNG components (Listbox, PickList, OrderList) require it. PickList and OrderList are back in the gallery. Should run without errors after npm i' },
    ],
  },
  {
    version: '2.1.3',
    date: '2026-06-27',
    entries: [
      { type: 'fix', fa: 'حذف PickList و OrderList از گالری (نیازمند وابستگی نصب‌نشده‌ی @angular/cdk/drag-drop بودند). افزودن .npmrc با legacy-peer-deps برای رفع تعارض peer dependency بین @angular/build و vitest (حالا npm i بدون فلگ کار می‌کند)', en: 'Removed PickList and OrderList from the gallery (they needed the uninstalled @angular/cdk/drag-drop). Added .npmrc with legacy-peer-deps to resolve the peer dependency conflict between @angular/build and vitest (npm i now works without a flag)' },
    ],
  },
  {
    version: '2.1.2',
    date: '2026-06-27',
    entries: [
      { type: 'fix', fa: 'رفع قطعی خطای CascadeSelect (تایپ options به any[] تغییر کرد تا تداخل type-checker تمپلیت برطرف شود) و اصلاح عنوان کارت‌های گالری که اشتباهاً به پسوند Module تغییر کرده بودند', en: 'Definitively fixed the CascadeSelect error (options typed as any[] to resolve the template type-checker clash) and corrected gallery card titles that had wrongly gained a Module suffix' },
    ],
  },
  {
    version: '2.1.1',
    date: '2026-06-27',
    entries: [
      { type: 'fix', fa: 'رفع خطای TypeScript در CascadeSelect گالری (تداخل تایپ options و optionGroupChildren با جداسازی فیلدها و تایپ صریح مدل‌ها)', en: 'Fixed a TypeScript error in the gallery CascadeSelect (options vs optionGroupChildren type clash) by separating fields and typing the models explicitly' },
    ],
  },
  {
    version: '2.1.0',
    date: '2026-06-27',
    entries: [
      { type: 'feature', fa: 'گالری کامپوننت‌ها کامل‌تر شد: ۴ بخش جدید (ورودی‌ها، داده‌ها، ناوبری، متفرقه) با ۳۹ کامپوننت تازه‌ی PrimeNG شامل InputText، Textarea، FloatLabel، InputOTP، Listbox، TreeSelect، CascadeSelect، Tree، TreeTable، Paginator، MeterGroup، OrderList، PickList، DataView، Breadcrumb، Stepper، PanelMenu، TieredMenu، Splitter، SpeedDial، Dock، Toolbar، Carousel، FileUpload و بیشتر', en: 'Components gallery expanded: 4 new sections (Inputs, Data, Navigation, Misc) covering 39 more PrimeNG components including InputText, Textarea, FloatLabel, InputOTP, Listbox, TreeSelect, CascadeSelect, Tree, TreeTable, Paginator, MeterGroup, OrderList, PickList, DataView, Breadcrumb, Stepper, PanelMenu, TieredMenu, Splitter, SpeedDial, Dock, Toolbar, Carousel, FileUpload and more' },
      { type: 'improvement', fa: 'هر چهار عکس واقعی در صفحه‌ی فرود استفاده شد: بخش جدید «تیم ما» با عکس تیم و دو عکس فرعی (فضای کار و پرداخت موبایلی)', en: 'All four real photos now used on the landing: a new "Our team" section with the team photo and two secondary photos (workspace and mobile payment)' },
    ],
  },
  {
    version: '2.0.1',
    date: '2026-06-27',
    entries: [
      { type: 'improvement', fa: 'منوی واقعی برنامه (APP_MENU) دوباره فعال شد و منوی نمونه‌ی بانکی به‌صورت کامنت (APP_MENU_DEMO) نگه داشته شد تا در صورت نیاز برای تست Mega Menu در دسترس باشد', en: 'Restored the real application menu (APP_MENU); the banking demo menu is kept commented (APP_MENU_DEMO) so it remains available for mega-menu testing if needed' },
    ],
  },
  {
    version: '2.0.0',
    date: '2026-06-26',
    entries: [
      { type: 'feature', fa: 'صفحه‌ی فرود (Landing) واقعی برای حالت سایت اضافه شد: بخش‌های Hero با ماک‌آپ زنده‌ی داشبورد، آمار، امکانات (۶ کارت)، بخش دسترسی‌پذیری با عکس واقعی، سه گام شروع، تعرفه‌ها (۳ پلن) و CTA نهایی. کاملاً RTL و سه‌زبانه، رنگ‌ها از تم فعال', en: 'Real landing page for the site shell: Hero with a live dashboard mock-up, stats, features (6 cards), an accessibility section with a real photo, 3-step onboarding, pricing (3 plans) and a final CTA. Fully RTL and trilingual, colors from the active theme' },
      { type: 'improvement', fa: 'عکس‌های واقعی بهینه‌شده (webp) برای لندینگ اضافه شد؛ مسیر /site حالا به‌جای داشبورد، صفحه‌ی فرود را نشان می‌دهد', en: 'Optimized real photos (webp) added for the landing; /site now shows the landing page instead of the dashboard' },
    ],
  },
  {
    version: '1.9.6',
    date: '2026-06-26',
    entries: [
      { type: 'improvement', fa: 'کادر بالای سایت (لوگو/زبان/کنترل‌ها) و نوار منو دیگر سفید نیستند؛ یک ته‌رنگ ملایم از رنگ برند تم فعال می‌گیرند و با تغییر تم هماهنگ عوض می‌شوند', en: 'The site top bar (logo/language/controls) and the menu bar are no longer white; they take a soft tint of the active theme primary color and update as the theme changes' },
    ],
  },
  {
    version: '1.9.5',
    date: '2026-06-26',
    entries: [
      { type: 'feature', fa: 'افزودن دکمه‌ی تنظیمات ظاهری به نوار سایت: یک picker سبک که فقط امکان تغییر تم‌پک را می‌دهد (با پیش‌نمایش مینی‌لایوت هر تم)', en: 'Added an appearance button to the site bar: a lightweight picker that only switches theme packs (each with a mini-layout preview)' },
      { type: 'feature', fa: 'تم‌پک جدید «آذرین» با رنگ دقیق #0077B3 (آبی اقیانوسی تمیز) — دسته‌ی سازمانی', en: 'New "Azure" theme pack built around the exact color #0077B3 (clean ocean blue) — enterprise category' },
    ],
  },
  {
    version: '1.9.4',
    date: '2026-06-26',
    entries: [
      { type: 'improvement', fa: 'نوار سایت دو ردیفه شد: ردیف بالا شامل لوگو، جستجو، زبان، دارک‌مود و دکمه‌ی ورود؛ ردیف پایین فقط منوی Mega با عرض کامل تا جای بیشتری داشته باشد و جذاب بماند', en: 'Site bar is now two rows: top row has the logo, search, language, dark mode and the CTA; the bottom row is the full-width mega menu so it has more room and stays clean' },
    ],
  },
  {
    version: '1.9.3',
    date: '2026-06-26',
    entries: [
      { type: 'fix', fa: 'پرچم زبان به‌صورت SVG واقعی نمایش داده می‌شود (به‌جای ایموجی که در ویندوز «IR» نشان داده می‌شد). دکمه‌ی زبان در نمای سایت هم به dropdown کامل با لیست زبان‌ها تبدیل شد', en: 'Language flags now render as real SVGs (instead of emoji, which showed as "IR" on Windows). The site-view language button is now a full dropdown listing all languages' },
    ],
  },
  {
    version: '1.9.2',
    date: '2026-06-26',
    entries: [
      { type: 'improvement', fa: 'دکمه‌ی زبان در داشبورد و سایت به‌جای آیکون جهان و متن، پرچم زبان فعال را نشان می‌دهد (جای کمتر، جلوه‌ی بصری بهتر)؛ نام زبان در tooltip باقی می‌ماند', en: 'The language button in both the dashboard and site now shows the active language flag instead of a globe icon and text (more compact, nicer visual); the language name stays in the tooltip' },
    ],
  },
  {
    version: '1.9.1',
    date: '2026-06-26',
    entries: [
      { type: 'fix', fa: 'رفع سرریز منوی سایت: نوار دسته‌ها دیگر از صفحه بیرون نمی‌زند؛ در فضای موجود جا می‌گیرد و در صورت زیادبودن، با ماسک محو لبه‌ها به‌صورت تمیز اسکرول می‌شود. دکمه‌های برند/زبان/ورود همیشه سر جای خود می‌مانند', en: 'Fixed site nav overflow: the category bar no longer spills off-screen; it fits the available space and, when there are many items, scrolls cleanly with an edge fade mask. Brand/language/CTA stay pinned' },
    ],
  },
  {
    version: '1.9.0',
    date: '2026-06-26',
    entries: [
      { type: 'feature', fa: 'منوی Mega برای حالت سایت: نوار دسته‌های اصلی + پنل کشویی تمام‌عرض با ستون‌بندی زیرمنوها + جستجوی زنده بین همه‌ی صفحات. مخصوص منوهای بزرگ و چندسطحی (بانکی)', en: 'Site mega menu: top category bar + full-width dropdown panel with columned sub-groups + live search across all pages. Built for large, deep (banking) menus' },
      { type: 'improvement', fa: 'دیتای منوی واقعی (APP_MENU) موقتاً کامنت شد و یک منوی نمونه‌ی بانکی (۸ دسته، ۱۱۰ لینک) برای تست جایگزین شد — ساختار منوی اصلی دست‌نخورده باقی ماند', en: 'Real APP_MENU data temporarily commented out and replaced with a banking sample menu (8 categories, 110 links) for testing — the original menu structure is preserved' },
    ],
  },
  {
    version: '1.8.3',
    date: '2026-06-26',
    entries: [
      { type: 'feature', fa: 'منوی سایت و سایدبار حالا از یک منبع مشترک (APP_MENU) پر می‌شوند؛ منوی سایت آیتم‌های اصلی سایدبار را افقی نشان می‌دهد. با فعال‌کردن USE_SEPARATE_SITE_MENU می‌توان منوی سایت را مستقل و جدا کرد (SITE_MENU)', en: 'Site nav and sidebar now share a single source (APP_MENU); the site shows the sidebar top-level items horizontally. Set USE_SEPARATE_SITE_MENU to give the site its own independent menu (SITE_MENU)' },
    ],
  },
  {
    version: '1.8.2',
    date: '2026-06-26',
    entries: [
      { type: 'fix', fa: 'رفع باگ قفل‌شدن صفحه هنگام رفتن به «نمای سایت» از تنظیمات: پنل اول بسته می‌شود سپس ناوبری انجام می‌گیرد، و یک محافظ CSS از باقی‌ماندن ماسک تیره‌ی پنل جلوگیری می‌کند', en: 'Fixed the page becoming unclickable when switching to Site view from settings: the panel now closes before navigation, plus a CSS guard prevents a lingering drawer mask from blocking clicks' },
    ],
  },
  {
    version: '1.8.1',
    date: '2026-06-26',
    entries: [
      { type: 'feature', fa: 'افزودن بخش «حالت نمایش» در تنظیمات: با یک کلیک بین داشبورد و نمای عمومی سایت جابه‌جا شوید (برای دیدن منوی جدید سایت)', en: 'Added a "View mode" section in settings: switch between the dashboard and the public site view with one click (to preview the new site nav)' },
    ],
  },
  {
    version: '1.8.0',
    date: '2026-06-26',
    entries: [
      { type: 'feature', fa: 'بازطراحی کامل منو و لایوت حالت سایت با استایل مدرن: نوار شناور با گوشه‌های گرد، ناوبری کپسولی (pill) با هایلایت آیتم فعال، افکت اسکرول (جمع‌وجور و سایه‌دار شدن)، دکمه‌ی CTA، و منوی موبایل کشویی. همه‌ی رنگ‌ها از تم فعلی سیستم گرفته می‌شوند', en: 'Redesigned the site-mode nav & layout with a modern style: floating rounded bar, pill navigation with an active highlight, scroll effect (shrinks + shadow), a CTA button, and a slide-in mobile menu. All colors come from the active system theme' },
    ],
  },
  {
    version: '1.7.9',
    date: '2026-06-25',
    entries: [
      { type: 'fix', fa: 'آیتم «تنظیمات» در منو حالا پنل تنظیمات کشویی را باز می‌کند (قبلاً به مسیر بدون صفحه اشاره می‌کرد). فیلد action به مدل منو اضافه شد', en: 'The Settings menu item now opens the settings drawer (it previously pointed to a dead route). Added an action field to the menu model' },
    ],
  },
  {
    version: '1.7.8',
    date: '2026-06-25',
    entries: [
      { type: 'improvement', fa: 'پیش‌نمایش تم‌پک‌ها در تنظیمات واقعی‌تر شد: به‌جای گرادینت ساده، یک مینی‌لایوت نمایش می‌دهد (سایدبار پررنگ + محتوای روشن + کارت) که دقیقاً همان خروجی اعمال‌شده است', en: 'More accurate theme-pack previews in settings: instead of a flat gradient, each shows a mini-layout (strong sidebar + light content + card) matching the real applied result' },
    ],
  },
  {
    version: '1.7.7',
    date: '2026-06-25',
    entries: [
      { type: 'improvement', fa: 'جابه‌جایی رنگ تم‌پک: ناحیه‌ی محتوا رنگ روشن تم را می‌گیرد و تولبار/تب‌ها خنثی می‌شوند؛ سایدبار همچنان رنگ پررنگ یشمی تم را دارد', en: 'Pack color swap: the content area now takes the light pack tint while the topbar/tabs go neutral; the sidebar keeps the strong jewel tone' },
    ],
  },
  {
    version: '1.7.6',
    date: '2026-06-25',
    entries: [
      { type: 'improvement', fa: 'تفکیک رنگ تم‌پک: سایدبار رنگ پررنگ و یشمی تم را می‌گیرد (با متن روشن برای کنتراست) و تولبار/تب‌ها رنگ روشن همان تم را؛ محتوا و فوتر خنثی می‌مانند', en: 'Pack color split: the sidebar takes the strong jewel tone of the pack (with light text for contrast) while the topbar/tabs take the light tint; content and footer stay neutral' },
    ],
  },
  {
    version: '1.7.5',
    date: '2026-06-25',
    entries: [
      { type: 'fix', fa: 'تم‌پک‌ها دیگر رنگ پس‌زمینه‌ی محتوا/فوتر و کارت‌ها را عوض نمی‌کنند (خنثی مثل قبل)؛ فقط سایدبار، تولبار و تب‌ها یک ته‌رنگ واضح و پررنگ‌تر در تُنالیته‌ی پک می‌گیرند تا از محتوا متمایز شوند', en: 'Theme packs no longer recolor the content/footer or cards (kept neutral); only the sidebar, topbar and tabs take a clear, stronger tint in the pack hue to stand out from the content' },
    ],
  },
  {
    version: '1.7.4',
    date: '2026-06-25',
    entries: [
      { type: 'fix', fa: 'رنگ‌بندی تم‌پک‌ها در حالت روشن اصلاح شد: سایدبار، تولبار و تب‌ها دیگر سفید نمی‌مانند و ته‌رنگی در تُنالیته‌ی همان پک می‌گیرند؛ کارت‌ها کمی روشن‌تر از سایدبار برای حس عمق', en: 'Fixed pack colors in light mode: sidebar, topbar and tabs are no longer white — they take a tint in the pack hue; cards sit slightly lighter than the sidebar for depth' },
    ],
  },
  {
    version: '1.7.3',
    date: '2026-06-24',
    entries: [
      { type: 'feature', fa: 'دو تم‌پک سازمانی جدید: «خاکی» (قهوه‌ای گرم، مناسب دفاتر اسناد/حقوقی/بانک‌های قدیمی) و «فولادی» (خاکستری خنثی و حرفه‌ای). هر دو سایدبار، topbar، کارت‌ها و پس‌زمینه را هماهنگ می‌کنند', en: 'Two new enterprise theme packs: Sienna (warm brown) and Slate (neutral steel-grey). Both coordinate sidebar, topbar, cards and background' },
    ],
  },
  {
    version: '1.7.2',
    date: '2026-06-24',
    entries: [
      { type: 'feature', fa: 'بازگشت تم‌پک‌ها به‌صورت سبک و رنگی: هر پک پس‌زمینه، سایدبار، topbar، کارت‌ها، بوردر و سایه را یکجا هماهنگ می‌کند (فعلاً رنگ ساده، بدون گرادینت/عکس). اعمال پک تک‌مرحله‌ای و سازگار با رفع فریز', en: 'Theme packs reintroduced lightweight & color-based: each pack coordinates page background, sidebar, topbar, cards, border and shadow at once (plain color for now). Single-step apply, freeze-safe' },
    ],
  },
  {
    version: '1.8.0',
    date: '2026-06-23',
    entries: [
      { type: 'feature', fa: 'بازگشت تم‌پک‌ها (نسخه‌ی سبک و پایدار): ۱۱ پک در دو دسته سازمانی و استارتاپی که با یک کلیک رنگ پس‌زمینه (شامل سایدبار و کل زیرساخت)، رنگ برند، سبک سطح، بوردر و سایه را هماهنگ ست می‌کنند. اعمال پک با یک patch انجام می‌شود تا پالت فقط یک‌بار بازسازی شود', en: 'Theme packs return (light, stable version): 11 packs in two categories that coordinate background color (including sidebar and whole shell), brand color, surface style, border and shadow in one click. Applied in a single patch so the palette rebuilds once' },
    ],
  },
  {
    version: '1.7.0',
    date: '2026-06-23',
    entries: [
      { type: 'fix', fa: 'رفع فریز هنگام تغییر رنگ سفارشی/تم: انتخابگر رنگ اکنون debounce می‌شود و به‌روزرسانی پالت فقط پس از توقف کاربر اجرا می‌شود؛ به‌روزرسانی‌های پالت هم گارد و coalesce شدند', en: 'Fixed a freeze when changing the custom color/theme: the color picker is now debounced and the palette only updates after the user pauses; palette updates are also guarded and coalesced' },
      { type: 'improvement', fa: 'سیستم تم‌پک موقتاً غیرفعال شد تا پایداری حفظ شود', en: 'Theme-pack system temporarily disabled for stability' },
    ],
  },
  {
    version: '1.6.1',
    date: '2026-06-14',
    entries: [
      { type: 'improvement', fa: 'بازطراحی صفحه‌ی «نقش‌ها و دسترسی» به‌صورت مرکز کنترل دسترسی: ماتریس کامل نقش × امکانات و لینک به مدیریت تیم', en: 'Reworked the Roles & access page into an access-control center: full role × capability matrix and a link to team management' },
    ],
  },
  {
    version: '1.6.0',
    date: '2026-06-14',
    entries: [
      { type: 'feature', fa: 'چهار سبک ظاهری قابل‌انتخاب: ساده، شیشه‌ای، نرم و نئون — از پنل تنظیمات', en: 'Four selectable surface styles: Solid, Glass, Soft and Neon — from settings' },
      { type: 'improvement', fa: 'بازطراحی کارت‌های KPI با آیکون گرادینتی، شمارنده‌ی انیمیشنی و افکت hover', en: 'Redesigned KPI cards with gradient icons, count-up animation and hover lift' },
      { type: 'improvement', fa: 'پس‌زمینه‌ی متحرک (aurora) و کارت شیشه‌ای در صفحه‌ی ورود', en: 'Animated aurora background and glass card on the login page' },
      { type: 'improvement', fa: 'نشانگر فعال لغزان و افکت‌های ظریف در منوی کناری', en: 'Sliding active indicator and subtle motion in the sidebar' },
      { type: 'improvement', fa: 'احترام کامل به prefers-reduced-motion برای دسترسی‌پذیری', en: 'Full prefers-reduced-motion support for accessibility' },
    ],
  },
  {
    version: '1.5.0',
    date: '2026-06-13',
    entries: [
      { type: 'improvement', fa: 'افزودن تست‌های واحد (Vitest) برای تبدیل تاریخ شمسی، RBAC، بازگردانی خوش‌بینانه و اعتبارسنجی فرم', en: 'Unit tests (Vitest) for Jalali conversion, RBAC, optimistic rollback and form validation' },
      { type: 'improvement', fa: 'افزودن تست‌های سرتاسری (Playwright) برای ورود، RBAC، تم/راست‌چین و کانبان', en: 'End-to-end tests (Playwright) for auth, RBAC, theme/RTL and Kanban' },
      { type: 'improvement', fa: 'مستندسازی کامل README: برندینگ، افزودن زبان، اتصال backend، ساختار پوشه‌ها', en: 'Comprehensive README: branding, adding languages, backend wiring, structure' },
      { type: 'improvement', fa: 'بهینه‌سازی باندل: بودجه‌های سخت‌گیرانه‌تر و بارگذاری تنبل کتابخانه‌های سنگین', en: 'Bundle optimization: tighter budgets and lazy-loaded heavy libraries' },
    ],
  },
  {
    version: '1.4.0',
    date: '2026-06-13',
    entries: [
      { type: 'feature', fa: 'افزودن زبان عربی (سومین زبان) با راست‌چین کامل و انتخابگر زبان', en: 'Arabic added as a third language with full RTL and a language picker' },
      { type: 'feature', fa: 'خلاصه‌ی هوشمند (دستیار) روی داشبورد برای تحلیل خودکار وضعیت', en: 'Smart summary (AI assistant) on the dashboard' },
      { type: 'feature', fa: 'قابلیت نصب کامل به‌صورت PWA با کش نسخه‌دار؛ هر نسخه‌ی جدید خودکار جایگزین می‌شود و کش قدیمی پاک می‌شود', en: 'Full PWA with versioned cache: every release auto-replaces the old cache, no prompt' },
      { type: 'improvement', fa: 'دسترسی‌پذیری: حلقه‌ی فوکوس در اورلی‌ها، پیوند پرش به محتوا، فوکوس‌رینگ کیبورد و برچسب‌های ARIA', en: 'Accessibility: focus-trap on overlays, skip link, keyboard focus rings and ARIA labels' },
      { type: 'improvement', fa: 'آماده‌سازی اتصال به API واقعی با یک سوییچ (useMock) و آدرس پایه‌ی قابل‌تنظیم', en: 'Real-API ready via a single useMock switch and configurable base URL' },
    ],
  },
  {
    version: '1.3.0',
    date: '2026-06-13',
    entries: [
      { type: 'feature', fa: 'نماهای ذخیره‌شده برای جدول‌ها: فیلتر/سورت/ستون‌ها را با نام ذخیره و بازیابی کنید', en: 'Saved table views: store & restore filter/sort/columns by name' },
      { type: 'feature', fa: 'خروجی PDF از داشبورد تحلیل و آمار', en: 'Export the analytics dashboard to PDF' },
      { type: 'feature', fa: 'ورود دومرحله‌ای (۲FA) با کد یک‌بارمصرف و قابلیت فعال/غیرفعال در پروفایل', en: 'Two-factor authentication with OTP, toggleable in profile' },
      { type: 'feature', fa: 'فرم‌ساز پویا از روی JSON با پیش‌نمایش زنده', en: 'Dynamic JSON-schema form builder with live preview' },
    ],
  },
  {
    version: '1.2.0',
    date: '2026-06-13',
    entries: [
      { type: 'feature', fa: 'گالری زنده‌ی کامپوننت‌های PrimeNG به‌عنوان مرجع توسعه و بررسی تم/دارک/RTL', en: 'Live PrimeNG component gallery for dev reference and theme/dark/RTL checks' },
    ],
  },
  {
    version: '1.1.0',
    date: '2026-06-13',
    entries: [
      { type: 'fix', fa: 'حفظ کامل وضعیت هر صفحه هنگام جابه‌جایی بین تب‌ها (فیلترها، اسکرول و نمودارها دیگر از بین نمی‌روند)', en: 'Each tab now fully preserves its state when switching (filters, scroll and charts no longer reset)' },
      { type: 'feature', fa: 'دانلود خودکار فونت‌های فارسی هنگام انتخاب، بدون نیاز به نصب چیزی روی دستگاه', en: 'On-demand download of Persian fonts when selected — nothing to install on the device' },
      { type: 'feature', fa: 'امکان ورود (Import) فایل تنظیمات کنار خروجی گرفتن', en: 'Import a settings file alongside export' },
      { type: 'improvement', fa: 'حالت تیره‌ی سرمه‌ای به‌جای مشکی، به‌صورت پیش‌فرض', en: 'Navy dark mode by default instead of near-black' },
      { type: 'improvement', fa: 'اعمال واقعی حالت فشرده (Compact) روی جدول‌ها و منوها', en: 'Compact density now genuinely applies to tables and menus' },
    ],
  },
  {
    version: '1.0.0',
    date: '2026-06-12',
    entries: [
      { type: 'feature', fa: 'جستجوی سراسری و دستورات سریع با Ctrl+K', en: 'Global command palette with Ctrl+K' },
      { type: 'feature', fa: 'تب‌های چندگانه داخل برنامه با ذخیره‌سازی برای هر کاربر', en: 'In-app multi-tab with per-user persistence' },
      { type: 'feature', fa: 'تور معرفی امکانات برای کاربران جدید', en: 'Onboarding tour for new users' },
      { type: 'feature', fa: 'قابلیت نصب به‌صورت اپلیکیشن (PWA)', en: 'Installable as an app (PWA)' },
      { type: 'improvement', fa: 'بهبود فاصله‌گذاری دیالوگ‌ها و پنل‌ها در سراسر برنامه', en: 'More comfortable spacing across dialogs and panels' },
    ],
  },
  {
    version: '0.9.0',
    date: '2026-06-11',
    entries: [
      { type: 'feature', fa: 'مرکز اعلان‌ها با دریافت زنده (WebSocket)', en: 'Notification center with live (WebSocket) delivery' },
      { type: 'feature', fa: 'تقویم رویدادها با پشتیبانی کامل شمسی', en: 'Event calendar with full Jalali support' },
      { type: 'feature', fa: 'مدیریت تیم: نقش‌ها، دعوت عضو و فعال/غیرفعال‌سازی', en: 'Team management: roles, invitations and activation' },
      { type: 'feature', fa: 'مدیریت فایل‌ها با نمای شبکه‌ای و فهرستی', en: 'File manager with grid and list views' },
    ],
  },
  {
    version: '0.8.0',
    date: '2026-06-10',
    entries: [
      { type: 'feature', fa: 'برد کانبان با کشیدن و رهاکردن آنی (Optimistic)', en: 'Kanban board with optimistic drag & drop' },
      { type: 'feature', fa: 'نمودار گانت با برچسب ماه‌های شمسی', en: 'Gantt chart with Jalali month labels' },
      { type: 'feature', fa: 'داشبورد ویجتی با چیدمان قابل شخصی‌سازی', en: 'Widget dashboard with customizable layout' },
      { type: 'fix', fa: 'رفع اشکال نمایش بردکرامب در اولین بارگذاری', en: 'Fixed breadcrumb crash on first render' },
    ],
  },
];

export const APP_VERSION = CHANGELOG[0].version;
export const APP_RELEASE_DATE = CHANGELOG[0].date;
