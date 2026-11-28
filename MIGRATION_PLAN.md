# ESO Addons Manager Website 2.0

## Phase 0 — Project Audit

Аудит завершено й погоджено 28 листопада 2026 року. На момент аудиту робоча гілка `main`, локальний HEAD, кешований `origin/main` і фактичний віддалений `main` збігалися на `d494d935771d0bdaac9eff88c0e6a481e1791827`. У робочій копії вже були два невідстежувані файли `.vscode/extensions.json` і `.vscode/settings.json`.

### 1. Поточний стан

| Що перевірено | Результат |
| --- | --- |
| Репозиторій сайту | Локальний `origin` — публічний `eso-addons-manager/eso-addons-manager.github.io`. API GitHub позначає власника `eso-addons-manager` як `User`. Для GitHub Pages це сайт власника в корені домену. |
| Репозиторій застосунку | Публічний `powerbq/eso-addons-manager` з окремою гілкою `main`, окремими workflows і релізами. `has_pages: false` у метаданих цього репозиторію. |
| Production | [GitHub Actions](https://github.com/eso-addons-manager/eso-addons-manager.github.io/actions/runs/45899253144) успішно опублікував коміт `d494d93` 26 листопада о 23:36 за Києвом. Deployment `8096351641` у середовищі `github-pages` має статус `success` і вказує на [кореневий HTTPS URL](https://eso-addons-manager.github.io/). |
| Джерело публікації | `.github/workflows/deploy.yml` запускає checkout, Node 26, `npm ci`, TypeScript, Vite, `configure-pages` і завантаження `dist/`. Job з `pages: write` та `id-token: write` публікує тільки з `main` після успішного build. Є `push` на `main` і `workflow_dispatch`. Публічний запит до `/pages` повернув 404, тому поля `Settings → Pages` і правила середовища перевіряються з доступом власника. Доказ робочої конфігурації — успішний deployment GitHub Actions. |
| Стек сайту | Vite 6.4.6, React 18.3.1, TypeScript 5.9.3, Tailwind CSS 3.4.19, Lucide, Marked і DOMPurify за встановленим деревом npm. Є один HTML-вхід, `src/App.tsx` для композиції секцій, `src/components` для UI, `src/sections` для контентних блоків, `src/i18n` для тексту і `src/features/releases` для релізів. Типізація ввімкнена. У workflow немає окремого lint або автоматизованих тестів. |
| Сторінки й навігація | Одна англомовна сторінка з якорями `#hero`, `#features`, `#screenshots`, `#download`, `#getting-started`, `#changelog`, `#roadmap`, `#faq`, `#support`. Шапка липка, активний блок визначає `IntersectionObserver`, FAQ має один відкритий пункт, галерея відкриває оригінали в новій вкладці. |
| SEO та маршрути | `/` і `/sitemap.xml` повертають 200. Canonical та OG URL вказують на корінь, є description, favicon, Open Graph і Twitter Card. Перевірені hero SVG, OG PNG і головний WebP відповідають 200. `/robots.txt`, `/eso-addons-manager/`, `/download/`, `/changelog/` та вигаданий шлях повертають 404. Для невідомої адреси віддається стандартна сторінка GitHub Pages. |
| Контент та мови | Реальний вміст у `src/i18n/locales/en.ts`. Зарезервовані `uk`, `fr`, `de`, `es` фактично повертають англійські тексти. CMS-конфігурації немає. Тексти метаданих також продубльовані в `index.html`. |

Джерела даних про власників і deployment. [Метадані сайту](https://api.github.com/repos/eso-addons-manager/eso-addons-manager.github.io) · [Метадані застосунку](https://api.github.com/repos/powerbq/eso-addons-manager) · [Статус deployment](https://api.github.com/repos/eso-addons-manager/eso-addons-manager.github.io/deployments/8096351641/statuses)

#### Можливості десктопного застосунку

Зіставлено README, `Cargo.toml`, код GUI і синхронізації, модулі залежностей і TTC, а також `auto-tag.yml` та `build.yml` на коміті `15a9e72dbb221279a5cea9f3fb626c6536f5616d`. Це Rust-застосунок з iced. Підтверджені каталог ESOUI, встановлення, оновлення й видалення аддонів, сканування наявних аддонів, синхронізація вручну й на запуску, керування бібліотеками, винятки, власні ZIP, обране, таблиці цін TTC і журнал. Перевірка нової версії пропонує користувачу завантаження. Документовані платформи — Windows AMD64, macOS Apple Silicon ARM64, Linux AMD64. Шість мов GUI належать застосунку. На сайті опубліковано англійську версію. [README застосунку](https://github.com/powerbq/eso-addons-manager/blob/15a9e72dbb221279a5cea9f3fb626c6536f5616d/README.md) · [Код залежностей](https://github.com/powerbq/eso-addons-manager/blob/15a9e72dbb221279a5cea9f3fb626c6536f5616d/core/src/deps.rs) · [Workflow пакування](https://github.com/powerbq/eso-addons-manager/blob/15a9e72dbb221279a5cea9f3fb626c6536f5616d/.github/workflows/build.yml)

Реліз `v0.4.0` опубліковано 27 листопада о 20:21 за Києвом. Він додає вкладку Patches і перегляд release notes у діалозі оновлення. Імпорт та експорт списку встановлених аддонів позначені на сайті як заплановані. Резервне копіювання налаштувань у коді — окрема функція. Попередження про резервну копію `AddOns`, перевірку вибраної папки та сканування перед синхронізацією потрібно залишити помітним. [Реліз v0.4.0](https://github.com/powerbq/eso-addons-manager/releases/tag/v0.4.0) · [Код резервного копіювання](https://github.com/powerbq/eso-addons-manager/blob/15a9e72dbb221279a5cea9f3fb626c6536f5616d/src/backup.rs)

#### Завантаження та історія версій

`Download` і `Changelog` використовують спільний React-хук. У браузері паралельно завантажуються `/releases/latest` і `/releases?per_page=100&page=1`. Історія читає до п’яти сторінок, залишає стабільні релізи та сортує за датою публікації. Є таймаут 12 с, обробка 403/429, дедуплікація запитів, 30-хвилинний кеш у `localStorage`, резерв із застарілих даних і кнопка повтору. У браузері з чистим сховищем та заблокованим API відображаються повідомлення і посилання на GitHub Releases. З кешем доступні збережені дані, але поточна валідація перевіряє лише частину полів верхнього рівня. Прямі URL файлів, їхні типи, розміри й дати потребують перевірки.

Публічний API повернув чотири стабільні релізи від `v0.1.0` до `v0.4.0`. Останній має десять файлів. Windows пропонує EXE і ZIP, macOS — DMG і ZIP, Linux — DEB, RPM, Arch `pkg.tar.zst`, AppImage і ZIP. Є спільний `SHA256SUMS`. Відповідь 200 після переходу за перенаправленнями підтверджено для Windows EXE, macOS DMG, Linux AppImage і `SHA256SUMS` через HEAD. Бінарні файли та їх встановлення на ОС потребують окремої перевірки, якщо вона знадобиться. [GitHub Releases](https://github.com/powerbq/eso-addons-manager/releases) · [GitHub REST Releases](https://docs.github.com/en/rest/releases/releases)

### 2. Проблеми й результати перевірок

| Спостереження | Наслідок і перевірка |
| --- | --- |
| Початковий HTML містить порожній `#root` | Без JS у Chrome підтверджено відсутність H1 та вмісту. Метадані вже є, а текст, навігація й посилання на файли потребують React. |
| Заголовок на 768 px виходить за viewport | `scrollWidth` становить 909 px. Desktop-меню вмикається з 768 px, пункт Support виходить до 798 px, кнопка GitHub — до 909 px. На 320, 375, 390, 1024, 1280, 1440 і 1920 px горизонтального переповнення не виявлено. Потрібно підібрати поріг за фактичним вмістом шапки й перевірити межові ширини. |
| Часткова підтримка клавіатури | Перший Tab виділяє `Skip to content`, Enter веде до `#hero`, але фокус залишається на `BODY`. Enter відкриває мобільне меню та пункти FAQ. Вибір пункту закриває меню, Escape залишає його відкритим. Навігаційні якорі на головній мають цілі. |
| Reduced Motion уже працює | Перевірено `scroll-behavior: auto` і майже нульову тривалість входу hero під `prefers-reduced-motion`. Повний аудит WCAG 2.2 AA, включно з контрастом у всіх станах, перевіркою assistive technology та focus visibility під липкою шапкою, запланований на Phase 11. [WCAG 2.2](https://www.w3.org/TR/WCAG22/) |
| Початкове завантаження та зображення | Production у Chrome 158 віддав JS 295 877 байтів у розпакованому вигляді / 92 296 байтів стисненого тіла, CSS 22 534 / 5 117 байтів. Hero WebP — 238 196 байтів, вісім оригіналів галереї разом — 1 112 414 байтів. Hero має розміри, `fetchpriority=high` та eager-завантаження. Галерея вже lazy, але її прев’ю використовують повнорозмірні файли. Це базові вимірювання ресурсів, а порівняльний Lighthouse і CWV заплановано після Astro. |
| Вміст і документація розійшлися зі станом проєкту | README описує релізи й публікацію як майбутні. Коментар у `Logo.tsx` посилається на старий префікс, хоча Vite використовує `/`. Коментар про позицію попередження на mobile розходиться з розміткою. За еталон для Visual Parity береться відрендерений production. |
| SEO і заголовки | У корені вже правильний canonical та соціальні метадані. Потрібні `robots.txt`, брендована `404.html`, перевірка абсолютних URL, а також узгоджена ієрархія заголовків у нотатках, які сьогодні можуть виводити заголовки того самого рівня, що й версія. JSON-LD про програму можна генерувати з перевірених даних. |

`npm.cmd run typecheck` пройшов. Vite build із поточними залежностями успішно створив артефакт у тимчасовому каталозі. Попередження Vite про те, що зовнішній `outDir` не буде очищено, очікуване для окремого каталогу аудиту. Імена JS і CSS збіглися з production, різниця в HTML зводилася до закінчень рядків. Чотири контрольні PNG і результати Chrome записані у `%TEMP%/eso-addons-manager-phase0-d494d93/`. Знімки фіксують видимий viewport, включно з desktop 1440×900, mobile 390×844, відкритим мобільним меню і проблемною шапкою 768×1024. Перевірки виконано в Chromium на Windows з емуляцією ширини. Перевірки на фізичних пристроях і повний обхід зовнішніх посилань залишаються для Phase 13.

### 3. Що зберегти

- Graphite Dark з `#111317`, `#171A20`, `#1E2229`, лініями `#303640`, текстом `#F1F3F5` / `#A4ABB6` і бронзовим акцентом `#C5A36B`. Зберегти кольори станів, чинні тіні, рамки, радіуси, щільність карток і контейнер 1280 px.
- Компасний логотип, favicon, apple-touch icon, OG 1200×630, контурні SVG-фони hero і roadmap, іконки Lucide та вісім справжніх WebP. Зберегти підписи, alt і посилання на оригінали, разом з атрибуцією та ліцензійними файлами.
- Поточний стек шрифтів `Inter, Segoe UI, system-ui, -apple-system, sans-serif` і метрики. На production без завантажених `FontFace`; за відсутності встановленого Inter працює системний fallback. Для Visual Parity порівнювати в однаковому середовищі.
- Послідовність секцій, наявні якорі, дизайн кнопок, заголовків, карток і липкої шапки. Зберегти 400 мс `fade-in-up`, стани hover і focus та reduced motion. `contour-drift` оголошено в Tailwind, використання у компонентах не знайдено.
- Англійський текст для першої версії, попередження про `AddOns`, джерела завантажень, архітектури ОС, контрольні суми та розподіл підтримки сайту й застосунку.

### 4. Що переписати

- Перенести React-вхід, макет, секції та стани в Astro-компоненти, які генерують HTML під час збирання.
- Перенести Tailwind-класи в CSS design tokens, спільні стилі UI та локальні стилі компонентів.
- Замінити браузерний React-хук і кеш API типізованим сервісом збирання з відмовостійкістю.
- Перенести TS-словник у JSON/Markdown зі схемою та формами CMS. Зібрати метадані в спільному layout, додати 404 і генерацію sitemap.

### 5. Що повторно використати

- Ієрархію та порядок секцій із `App.tsx`, розмітку, чинні ID й протестовані якорі, перевірені тексти, alt і підписи.
- Бренд-файли з `public/`, дизайн-значення з `tailwind.config.js`, стилі станів і правила reduced motion зі `src/styles/global.css`.
- Класифікацію й форматування релізів зі `src/features/releases` після перевірки граничних випадків, а також реальні імена файлів і тестові дані з API.
- Кореневий canonical, OG-ресурси й чинну схему публікації статичного артефакту GitHub Actions.

### 6. Запропонована архітектура

**Репозиторій і збірка.** Розмістити Astro в `website/` у наявному репозиторії сайту та розробляти на `rebuild/astro`. Окремі `package.json` і lockfile зручні для паралельного запуску старого Vite та нового Astro. Статичний build у `website/dist/`, `site: 'https://eso-addons-manager.github.io'`, кореневі URL. На production перемкнути шлях артефакту після приймання. Git-історія та перевірений Vite-артефакт дадуть шлях відкату, а прибирання файлів старої збірки можна виконати окремо після стабілізації. Версії для перевірки в Phase 2 — Astro 7.4.13, `@astrojs/check` 0.9.12, `@astrojs/sitemap` 3.7.6. Локальні Node 26.13.1 і npm 11.20.0 задовольняють заявлені Astro вимоги Node ≥22.23.4 та npm ≥9.6.5. CI уже використовує Node 26. Перед встановленням повторити перевірку актуальних registry-версій, peers, TypeScript і зафіксувати lockfile. [npm Astro](https://registry.npmjs.org/astro/latest) · [Astro install](https://docs.astro.build/en/install-and-setup/) · [Node.js releases](https://nodejs.org/en/about/previous-releases)

```text
.github/workflows/
.pages.yml
website/
  astro.config.mjs
  package.json
  package-lock.json
  README.md
  public/brand/
  public/screenshots/
  src/
    pages/index.astro
    pages/404.astro
    layouts/BaseLayout.astro
    components/{layout,sections,ui,seo}/
    content/en/
    content.config.ts
    services/{github,releases}.ts
    styles/{tokens,global,typography}.css
```

**Сторінки та стилі.** `index.astro` компонує секції головної. Залишити `/#download` та `/#getting-started` єдиними адресами відповідного вмісту до появи погодженого матеріалу для окремої сторінки. У CSS винести колір, розміри тексту, вагу, інтервали, контейнери, рамки, радіуси, тіні, анімації, переходи й z-index. Зафіксувати базові пороги 640/768/1024 px і окремо виправити поріг шапки. Звичайні CSS-змінні придатні для значень стилів, а пороги media queries зберігатимуться як явні значення зі спільним правилом для шапки. FAQ можна відтворити спільною групою `details`, іконки — статичними SVG. Мінімальний TypeScript потрібен для поведінки мобільної навігації та індикації поточної секції. [Astro Components](https://docs.astro.build/en/basics/astro-components/)

**Контент та CMS.** Зберігати англійські JSON за секціями в `website/src/content/en/`. Схеми Astro Content Collections або локальний типізований loader перевіряють обов’язкові поля, посилання й фактичну наявність медіа. Довгі інструкції редагуються як Markdown зі схемою frontmatter за потреби. Зберегти структуру для майбутньої локалі без публікації неперекладених сторінок. За необхідності ввести у settings упорядкований список ідентифікаторів дозволених секцій, перевіряючи унікальність та відповідність навігації. У корені репозиторію `.pages.yml` посилатиметься на ці файли. Форми матимуть окремі поля для alt, підпису, URL, SEO та керування списками. Спільна перевірка CI покриватиме коміти з CMS і GitHub. Markdown оброблятиметься як дані із санітизацією. [Налаштування контенту Pages CMS](https://pagescms.org/docs/configuration/content/) · [Поля Pages CMS](https://pagescms.org/docs/configuration/content/fields/) · [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)

**Pages CMS і Preview.** Hosted Pages CMS безкоштовний за офіційною інформацією. Публічний GitHub-репозиторій сайту відповідає моделі сервісу. Фактична інсталяція GitHub App на акаунті `eso-addons-manager`, доступ до конкретного репозиторію та сумісність із правилами запису в `main` потребують перевірки після погодження. Спочатку на тестовій гілці перевірити `Save → git commit → push → CI`. Production після Phase 14 публікується через перевірений `push` на `main`. Для попереднього перегляду використати локальний `astro preview` або статичний PR-артефакт. CMS може запускати GitHub workflow кнопкою через `workflow_dispatch`, а відрендерений preview має віддавати окремий механізм. За branch protection передбачити PR і звичайний merge. Rollback контенту — revert відповідного Git-коміту, після якого діють ті самі перевірки. [Pages CMS FAQ](https://pagescms.org/#is-pages-cms-free) · [Pages CMS Quick start](https://pagescms.org/docs/quick-start/) · [Pages CMS Actions](https://pagescms.org/docs/configuration/actions/) · [GitHub про тригери й GITHUB_TOKEN](https://docs.github.com/en/actions/concepts/security/github_token)

**Релізи.** Під час build отримувати метадані й файли останнього стабільного релізу. Перевіряти HTTP, asset state, дати, розміри і HTTPS URL саме для файлів `powerbq/eso-addons-manager`. Обмежити час запитів, врахувати заголовки rate limit, відфільтрувати draft і prerelease для основного каналу. Розрізняти відсутність релізу, відмову API й невалідну відповідь. Для відмови використати останній валідований кеш та резервний snapshot, згенерований із перевірених даних. За відсутності придатних пакетів показати один перехід до GitHub Releases. Редакційні підказки й системні вимоги надходять з CMS. [GitHub REST Releases](https://docs.github.com/en/rest/releases/releases)

**CI/CD, оновлення й витрати.** Для гілок і PR запускати `npm ci`, `astro check`, перевірку контенту, lint, тести й static build. Для production видавати мінімальні дозволи `pages: write` та `id-token: write` лише deploy job. Для релізів окремого репозиторію перший варіант — щогодинна перевірка GitHub API зі зміщенням від початку години в репозиторії сайту, перевипуск при зміні релізних даних і ручний запуск за потреби. Це працює з поточним розподілом прав. GitHub може затримувати scheduled runs і вимикає їх після 60 днів без активності в публічному репозиторії. Для негайної події в майбутньому можна погодити з powerbq `repository_dispatch` з GitHub App, якій дозволено виклик workflow репозиторію сайту. Публічний Pages і стандартні runners публічного репозиторію доступні в безкоштовній моделі. Ціль $0 на місяць досяжна в межах їхніх лімітів із поточним доменом і hosted Pages CMS. [Astro на GitHub Pages](https://docs.astro.build/en/guides/deploy/github/) · [Тригери GitHub Actions](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule) · [Ліміти Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits) · [Білінг GitHub Actions](https://docs.github.com/en/billing/concepts/product-billing/github-actions)

### 7. Ризики міграції

| Ризик | Контроль |
| --- | --- |
| Зміна адреси або випадкова публікація | Зберегти чинний origin, домен і середовище `github-pages`. Підготувати build і preview на гілці. Перемикати production після схвалення та звіряти commit SHA, root, canonical і ресурси. Врахувати, що чинний workflow публікує після кожного push на `main`. |
| Відхилення дизайну | Зіставити старий і новий рендер за однакових шрифтів, viewport і стану. Зафіксувати погоджені виправлення адаптивності окремо від візуальних змін. |
| Застарілі або пошкоджені дані релізів | Валідований резерв, пряме постійне посилання, сценарії 404/429/таймауту, одного prerelease, недійсного asset і відсутності придатних пакетів. Зберігати відомі робочі дані при тимчасовій помилці. |
| CMS записує в гілку з обмеженнями | Перевірити інсталяцію й окремий тестовий коміт на гілці. Використати процес PR за чинних вимог захисту `main`. |
| Помилки індексації, зміщення ресурсів або дублі | Для кожного маршруту перевіряти HTTP, canonical, sitemap, robots, OG та внутрішні посилання. Зберегти старі якорі й окремі цілі для спільних deep links. |
| Застаріле копіювання можливостей застосунку | Звіряти опис зі стабільним release та джерелами. Погоджувати оновлення текстів після Visual Parity. |

### 8. Етапи та статус

Після кожної фази зафіксувати файли, команди, результати перевірок, ручну перевірку та запропонований Conventional Commit. Перехід до наступної фази після погодження.

| Phase | Статус | Результат |
| --- | --- | --- |
| 0 — Project Audit | Завершено | Підтверджені вихідні дані, production, релізи, базові виміри та контрольні знімки. |
| 1 — Architecture & Migration Plan | Завершено й погоджено | Напрям деталізовано в [рішеннях Phase 1](#phase-1--architecture--migration-plan). |
| 2 — Astro Initialization | Завершено й погоджено | Створено `rebuild/astro`, перевірено lockfile, типізацію, статичну збірку й паралельний preview. |
| 3 — Design System Migration | Завершено й погоджено | Перенесено спільні стилі й оригінальні ресурси. У Chrome звірено їх зі збіркою Vite. |
| 4 — Component Migration | Завершено й погоджено | Усі дев’ять секцій, навігація, галерея, FAQ, попередження та footer працюють у статичній Astro-збірці. |
| 5 — Visual Parity Test | Завершено й погоджено | Зіставлено 8 ширин і 6 інтерактивних станів. Усунуто відмінності висоти шапки, секцій і перенесення рядків FAQ. |
| 6 — UI/UX Improvements | Завершено й погоджено | Погоджено A + C і повне вилучення секції історії релізів з Astro. |
| 7 — Content Architecture | Завершено й погоджено | Перенесено тексти до 11 JSON-файлів і шести Markdown-кроків. Додано перевірки збірки та підтверджено візуальну відповідність Phase 6. |
| 8 — Pages CMS Integration | Локально перевірено й погоджено | Налаштовано 11 JSON-форм, колекцію Markdown і два джерела медіа. Підключення GitHub App і перевірка коміту в Actions потребують гілки в GitHub та Astro workflow. |
| 9 — GitHub API Integration | Завершено локально й погоджено | Збірка Astro отримує стабільний реліз і створює JSON-знімок. Перевірено резервні режими, класифікацію, посилання та HTML Download. |
| 10 — SEO & Performance | Завершено локально й погоджено | Додано sitemap, robots.txt, брендовану 404, JSON-LD та адаптивні знімки. Перевірено 18 прогонів Lighthouse на трьох збірках. |
| 11 — Responsive & Accessibility | Завершено локально й погоджено | Виправлено перекриття і втрату фокуса, мобільне меню, доступні назви карток і обрізання назв пакетів. Перевірено контрольні ширини й контраст. |
| 12 — CI/CD & Deployment Configuration | Завершено локально й погоджено | Підготовлено перевірки, preview-артефакт, шаблон публікації та планове оновлення релізу. Підтвердження запуску від CMS потребує авторизованого push тестової гілки. |
| 13 — Quality Assurance | Локальний QA пройдено. Hosted CI очікує дозволу на commit і push | Перевірено живий реліз, шість сценаріїв API, браузери, ZIP і TAR, локальний цикл CMS і відкат до Vite. |
| 14 — Production Deployment | Потребує окремого погодження | Перемкнути артефакт, звірити той самий HTTPS root, перевірити production smoke і можливість відкату. |
| 15 — Documentation & Maintenance | Заплановано | Написати окремий гайд сайту про розробку, контент, мови, CI/CD, діагностику й rollback. |

#### Команди та ручна перевірка Phase 0

- Git — `git status --short --branch`, `git status --porcelain=v1 --untracked-files=all`, `git remote -v`, `git branch -avv`, `git log`, `git ls-files`, `git ls-remote --exit-code origin refs/heads/main`, `git diff --check`.
- Локальне середовище — `node --version`, `npm.cmd --version`, `npm.cmd ls --depth=0`, `npm.cmd run typecheck`, `.\node_modules\.bin\vite.cmd build --outDir $phaseBuild`.
- Мережеві перевірки — `curl.exe` для HTTPS, GitHub REST, npm registry й HEAD файлів релізу. Перший `git ls-remote` був обмежений мережею sandbox, повтор із дозволеним доступом підтвердив віддалений SHA.
- Браузер — Chrome 158 у headless-режимі через DevTools Protocol. Виміряно viewport і ресурси, перевірено меню, FAQ, Tab, reduced motion і два сценарії відмови.

1. Відкрити [production](https://eso-addons-manager.github.io/) і перевірити англомовний hero, попередження та якір `#download`.
2. У Chrome DevTools встановити ширину 768 px і звірити переповнення шапки з контрольним PNG. На 390 px перевірити мобільне меню, вибір пункту і поведінку Escape.
3. У репозиторії сайту відкрити **Settings → Pages → Build and deployment → Source**. Для чинної схеми очікується **GitHub Actions**. Звірити SHA та URL в [останньому успішному run](https://github.com/eso-addons-manager/eso-addons-manager.github.io/actions/runs/45899253144).
4. Погодження від 28 листопада 2026 року підтвердило напрям `website/` і збереження чинних якірних адрес.

Запропонований коміт для звіту після дозволу — `docs: record Astro website audit and migration plan`.

## Phase 1 — Architecture & Migration Plan

### Межі проєкту та маршрути

Astro працюватиме в `website/` репозиторію `eso-addons-manager/eso-addons-manager.github.io`. Початок розробки — на `rebuild/astro` від перевіреного `main`. Astro має власний `package.json`, `package-lock.json`, `tsconfig.json` і `astro.config.mjs`. Локальні команди виконуються з `website/` або з кореня через `npm --prefix website …`. Vite залишається доступним з кореня як контрольна версія. Конфігурації, залежності й build output двох збірок незалежні.

| Адреса | Рішення |
| --- | --- |
| `/` | `index.astro` і `BaseLayout.astro`. Canonical `https://eso-addons-manager.github.io/`, мова `en`, англійський контент без мовного префікса. |
| `/#hero`, `/#features`, `/#screenshots`, `/#download`, `/#getting-started`, `/#roadmap`, `/#faq`, `/#support` | Чинні ID Astro після погоджених змін Phase 6. Спільні Header і Footer на вкладених сторінках посилаються на `/#…`. |
| `/404.html` і невідомі адреси | `404.astro` генерує окрему сторінку з посиланням на головну і `noindex`. Після деплою прямий запит на вигадану адресу має повернути 404 з її вмістом. |
| `/brand/…` і `/screenshots/…` | Зберігаємо публічні адреси на наявні оригінали, зокрема favicon, OG і повнорозмірні знімки. Варіанти зображень для карток оцінюємо у Phase 10 за вагою та якістю. |
| `/sitemap.xml` і `/robots.txt` | Статичні Astro endpoints генерують ці файли з `site` і списку індексованих маршрутів. Зараз у sitemap входить тільки головна. Robots посилається на абсолютний HTTPS URL sitemap. |

У першій версії Getting Started і Download залишаються секціями головної. `/docs/` та `/download/` додаються за появи окремого погодженого контенту. `/eso-addons-manager/` зберігає поточну поведінку 404.

Односторінковій версії достатньо статичного `sitemap.xml.ts`. Інтеграцію `@astrojs/sitemap`, яку розглядали під час аудиту, варто повернути до розгляду зі зростанням кількості сторінок. Її типовий результат має інші публічні шляхи. [Документація @astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/#usage)

### Компоненти й CSS

| Частина | Межа відповідальності |
| --- | --- |
| `BaseLayout`, `SEO`, `Header`, `Navigation`, `Footer` | Документ, метадані, навігація та спільний каркас. Посилання шапки й footer беруть назви та цілі з одних даних. |
| `Hero`, `Features`, `Screenshots`, `Download`, `GettingStarted`, `Roadmap`, `FAQ`, `Support` | Кожна секція має одну відповідальність, стабільний ID та отримує типізовані props. `Download` отримує нормалізовані дані останнього стабільного релізу. |
| `Section`, `SectionHeading`, `Button`, `Icon`, `WarningNotice` | Спільна семантика й стилі. Lucide — як SVG під час збирання. Картки лишаються в секціях, поки спільна структура не виправдовує окремого компонента. |

Токени CSS охоплюють кольори, типографіку, відступи, ширину контейнера 1280 px, радіуси, рамки, тіні, переходи й z-index. Глобальні правила охоплюють базову типографіку, видимий фокус і reduced motion. Решта стилів належить компонентам. Зберігаємо чинні системні шрифти, SVG-фони, 400 мс анімацію hero, фактичний порядок попередження та скриншота і поточні стани кнопок.

FAQ використовує нативні `details` із групуванням через `name` і відкритим першим пунктом. Галерея використовує посилання на оригінали. Мобільна навігація має працювати без JS через нативний disclosure. Невеликий скрипт додасть закриття на Escape і після вибору пункту, поверне фокус при Escape та підсвічуватиме активну секцію. Кандидат порога desktop-шапки — 1024 px, де поточна версія проходить перевірку. Остаточне значення визначить перевірка на межі порога, зі збільшеним текстом і довшими назвами. [HTML details](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details)

### Контент і Pages CMS

Редакційні дані живуть у `website/src/content/en/`. На етапах компонентів і Visual Parity використовуємо перенесене англійське наповнення як вхідні дані. У Phase 7 змінюється джерело цих props на провалідовані JSON або Markdown. Windows AMD64, macOS Apple Silicon ARM64 і Linux AMD64 лишаються редакційними описами. Реальні файли, дати, розміри та версії визначає GitHub.

| Форма Pages CMS | Файл або дані |
| --- | --- |
| Homepage і Navigation | `homepage.json` для hero та попередження, `navigation.json` для підписів навігації і текстів шапки. |
| Features, Screenshots і FAQ | `features.json`, `screenshots.json`, `faq.json`. Редагування впорядкованих списків із додаванням і видаленням пунктів. Для зображень є поля підпису й alt. |
| Downloads і Documentation | `downloads.json` для підписів, платформ і підказок. `getting-started.json` для заголовка. `getting-started/*.md` для впорядкованих інструкцій із frontmatter. |
| Roadmap, Support і Footer | Власні JSON за секціями. Посилання, атрибуція, інформація про підтримку і попередження доступні у відповідній формі. |
| SEO Settings | `seo.json` для title, description та соціальних метаданих. Canonical генерується з конфігурації сайту і маршруту. |

Кореневий `.pages.yml` використовує форми `type: file`, `format: json` для JSON і `type: collection`, `format: yaml-frontmatter` для Markdown. Astro Content Collections перевіряють frontmatter. Збірка також перевіряє непорожні значення, іконки, унікальність номерів кроків, цілі Markdown-посилань і наявність локальних зображень. CMS записує медіа в `website/public/screenshots/` і `website/public/brand/` та зберігає публічні шляхи `/screenshots/…` і `/brand/…`. Для майбутнього керування порядком і видимістю секцій можна додати JSON із впорядкованим списком дозволених ID, ознаками видимості та перевіркою відповідності навігації. [Pages CMS Content](https://pagescms.org/docs/configuration/content/) · [Pages CMS Media](https://pagescms.org/docs/configuration/media/) · [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)

Після погодженого підключення GitHub App тестуємо збереження форми, медіа, Git-коміт, автора події та гілку. Phase 12–13 підтвердять запуск CI від реального CMS-коміту. Із дозволеним прямим записом у `main` коміт проходить перевірки й публікується. Якщо правила `main` вимагають PR, редактор зберігає в окрему гілку, CI готує preview-артефакт, а публікація відбувається після merge. Для перегляду артефакту потрібен вхід у GitHub та доступ до репозиторію. Локальний `astro preview` працює із відповідною збіркою. [Pages CMS Quick start](https://pagescms.org/docs/quick-start/) · [Завантаження артефактів GitHub Actions](https://docs.github.com/en/actions/how-tos/manage-workflow-runs/download-workflow-artifacts)

### Дані релізів і режими збірки

1. У режимі `ESO_RELEASE_MODE=live` модуль `github.ts` викликає `/releases/latest` для `powerbq/eso-addons-manager` під час збірки. `releases.ts` перевіряє метадані, стан `uploaded`, розмір і точну відповідність HTTPS-посилання репозиторію, тегу та назві файлу. Потім визначає платформу й архітектуру пакета.
2. `snapshot` є локальним режимом за замовчуванням і режимом для PR. У `live` при помилці запиту збірка спершу читає останній опублікований знімок, а за його відсутності використовує знімок із репозиторію. Відповідь 404 від відомого публічного `/releases/latest` дає окремий стан без стабільного релізу. За відсутності придатних пакетів Download показує одну кнопку переходу до GitHub Releases.
3. Статичний `/_data/releases.json` містить `schemaVersion`, `siteSha`, `fingerprint` і `release`. Збірка підставляє `GITHUB_SHA` за наявності. Відбиток SHA-256 залежить від нормалізованих метаданих і файлів. Зміна лише порядку файлів або SHA сайту залишає відбиток релізу тим самим. Опублікований знімок повторно перевіряється за схемою та відбитком. Браузер отримує готовий HTML і посилання без звернень до GitHub API.
4. Щогодинний запуск у репозиторії сайту зі зміщенням від початку години порівнює свіжий відбиток і SHA `main` з опублікованими значеннями. Зміна будь-якого з них запускає перевірки та збірку. Коли API недоступний, збірка на CMS-коміт може використати резерв, а запуск за розкладом пропускає деплой, якщо опублікований SHA вже актуальний. `workflow_dispatch` забезпечує ручне оновлення. Затримка розкладу й автовимкнення після 60 днів неактивності залишаються обмеженнями GitHub. [GitHub Releases API](https://docs.github.com/en/rest/releases/releases) · [Подія schedule](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule)

Після узгодження з власником desktop-репозиторію можна додати негайний `repository_dispatch`. Для цього знадобиться інтеграція з правом `Contents: write` у цільовому репозиторії сайту. Базова схема використовує публічний API й не потребує змін у desktop workflow. [GitHub repository dispatch](https://docs.github.com/en/rest/repos/repos#create-a-repository-dispatch-event)

### Visual Parity та критерії приймання

1. Зібрати референс із коміту `d494d93` і порівняти його з Astro preview в одній версії Chromium, з однаковими системними шрифтами, DPR і ширинами 320, 375, 390, 768, 1024, 1280, 1440 та 1920 px. Закріпити однакові релізні відповіді для Vite й Astro. Дочекатися зображень і завершення входу елементів перед знімками.
2. Зіставити hero, шапку, відкрите меню, скриншоти, попередження, картки, Download, Changelog, FAQ й footer. Перевірити секції нижче першого viewport, стани фокусу та hover. Відмінності у кольорі, типографіці, передбаченому порядку секцій або композиції мають бути пояснені до приймання.
3. Окремо зафіксувати технічні виправлення, зокрема переповнення на 768 px, доступний перехід до основного вмісту та Escape в меню. Запропоновані зміни розташування секцій або CTA розглядаються у Phase 6 після parity й окремого погодження.
4. Перевірити HTML без JS, внутрішні якорі, стабільні release links, SEO і 404. У Phase 10 повторити вимірювання Vite й Astro із холодним кешем та однаковим профілем Lighthouse у кількох прогонах. Звіт має показати медіани і вказати, які метрики виміряно в лабораторії та які доступні з польових даних.

### CI, production і rollback

| Стан | Що виконує workflow |
| --- | --- |
| До погодження production | PR і дозволені тестові гілки запускають `npm ci`, `astro check`, валідацію контенту, lint, тести та збірку Astro. Артефакт preview зберігається окремо. Поточний workflow публікує Vite з `main`. |
| Після погодження production | Той самий сайт GitHub Pages приймає перевірений артефакт `website/dist/`. Тригери — `push` до `main`, ручний запуск і розклад. Build має `contents: read`. Якщо виробничий build виконує `configure-pages`, він отримує `pages: read`. Pages deploy job отримує `pages: write` і `id-token: write`. Production runs серіалізуються, а перед deploy звіряється актуальність SHA `main`, щоб застарілий запуск не перезаписав свіжіший результат. |
| Під час приймання | Перевірити попередній Vite build і можливість знову зібрати його. Зберегти посилання на робочий деплой і виділити активацію Astro deployment в окремий коміт для відкату. Після публікації перевірити корінь, якорі, HTTPS, 404, sitemap, robots, OG і реальні файли релізу. |
| Відкат | Контентну правку відкочуємо через revert її коміту. Відкат всього Astro-переходу повертає шлях до Vite-артефакту та попередній режим workflow через revert коміту перемикання. Після погодженого відкату перевіряємо той самий кореневий URL і CMS-стан. |

Контрольна збірка Phase 13 має відтворити deployment-процес без публікації артефакту в Pages. Дії у репозиторії desktop-застосунку, зміна Pages settings і публічний деплой потребують окремого дозволу. [GitHub Pages з Astro](https://docs.astro.build/en/guides/deploy/github/) · [GitHub Actions concurrency](https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/control-workflow-concurrency)

### Межі Phase 2

Після погодження цього плану створити `rebuild/astro` і мінімальний static Astro-проєкт у `website/`. Планові файли — `package.json`, `package-lock.json`, `astro.config.mjs`, `tsconfig.json` і мінімальний `src/pages/index.astro` для перевірки входу. Перевірити сумісність версій у npm registry, інсталювати залежності, виконати `astro check`, static build і локальний preview. Критерії — `website/dist/index.html`, кореневі шляхи, відсутність runtime-залежності від Vite-проєкту і можливість запустити обидві збірки паралельно. Кореневий `.gitignore` уже містить правила для `node_modules/`, `dist` і `.astro/`.

У Phase 1 змінено лише цей документ. Використано `git status`, `git branch --list`, `git diff --name-status`, `git check-ignore`, `git diff --check` і читання наявних типів, правил навігації та workflow. Перевірено дійсні правила формату JSON, шляхів медіа, доступу до CI-артефактів, schedule та concurrency за документацією. Перевірки коду й браузера залишаються за результатами Phase 0.

1. Переглянути таблицю маршрутів і джерел контенту.
2. Звірити послідовність **PR preview → перевірки → production switch → rollback** із поточним workflow.
3. Перехід до Phase 2 та ініціалізацію в `website/` погоджено 28 листопада 2026 року.

Запропонований коміт для плану після дозволу — `docs: define Astro architecture and migration rollout`.

## Phase 2 — Astro Initialization

Створено гілку `rebuild/astro` на основі `d494d93`. Перед створенням гілки віддалений `main` збігався з локальним HEAD. Astro використовує окремі залежності в `website/`, вихід `website/dist/` та кореневу адресу `https://eso-addons-manager.github.io/`. Тестова англомовна головна потрібна для перевірки статичної збірки перед перенесенням дизайну.

| Створений файл | Призначення |
| --- | --- |
| `website/package.json` | Скрипти `dev`, `check`, `build`, `preview` та версії залежностей. |
| `website/package-lock.json` | Відтворювана установка через `npm ci`. |
| `website/astro.config.mjs` | Статичний вихід та кореневий `site`. |
| `website/tsconfig.json` | Строга типізація Astro. |
| `website/src/pages/index.astro` | Мінімальний HTML із H1, canonical й основним вмістом. |

Оновлено цей план. Згенеровані `website/node_modules/`, `website/.astro/` та `website/dist/` покриває наявний `.gitignore`.

### Сумісність і перевірки

- Локальні Node 26.13.1 та npm 11.20.0 задовольняють `engines` Astro 7.4.13. `@astrojs/check` 0.9.12 підтримує TypeScript 5 і 6, тому обрано TypeScript 6.0.3, найновішу сумісну версію за даними npm. [Встановлення Astro](https://docs.astro.build/en/install-and-setup/) · [Метадані @astrojs/check](https://registry.npmjs.org/@astrojs/check/latest)
- `npm.cmd --prefix website install --package-lock-only --no-fund` створив lockfile. `npm.cmd --prefix website ci --no-fund` відтворив установлене дерево. npm повідомив про 0 відомих вразливостей.
- `npm.cmd --prefix website run check` — 0 помилок, 0 попереджень і 0 підказок. Перший запуск вивів стандартне інформаційне повідомлення Astro про телеметрію.
- `npm.cmd --prefix website run build` — успішна статична збірка, один маршрут, `website/dist/index.html`. Головна містить H1 і кореневий canonical у вихідному HTML без тегів скриптів.
- Обидва preview одночасно відповіли HTTP 200 на loopback. Astro використовував порт 4321 і `website/dist/`. Vite використовував порт 4173 і кореневий `dist/`. Перевірено також HTTP 200 для JS-входу Vite. Тестові процеси завершено після перевірки.
- Виконано `git status`, `git ls-remote --exit-code origin refs/heads/main`, `git switch -c rebuild/astro`, `npm view`, `npm ls --depth=0`, `git check-ignore` і `git diff --check`. Кореневі файли Vite та workflow звірено з HEAD.

### Ручна перевірка

1. Із кореня запустити `npm.cmd --prefix website run build`, потім `npm.cmd --prefix website run preview -- --host 127.0.0.1 --port 4321`.
2. Відкрити [Astro preview](http://127.0.0.1:4321/) і перевірити заголовок `ESO Addons Manager` та позначку `Astro development preview`.
3. В іншому терміналі запустити чинний Vite preview через `npm.cmd run preview -- --host 127.0.0.1 --port 4173`. Відкрити [Vite preview](http://127.0.0.1:4173/) для порівняння.

Запропонований коміт після дозволу — `chore: initialize Astro website`.

## Phase 3 — Design System Migration

Phase 2 погоджено 28 листопада 2026 року. На `rebuild/astro` перенесено базові стилі Graphite Dark і бронзові стани зі старих `tailwind.config.js` та `src/styles/global.css`. Тестова головна використовує перенесені токени, справжній логотип, картку, кнопку та анімацію входу. Компонування секцій переноситься у Phase 4, а Visual Parity повної сторінки перевіряється у Phase 5.

| Створені файли | Що містять |
| --- | --- |
| `website/src/styles/tokens.css` | Точні кольори, системний стек шрифтів, розміри й вагу тексту, відступи, контейнер 1280 px, радіуси, рамки, тіні, шари й тривалості анімацій. Контрольні пороги зафіксовано в коментарі. Media queries використовують числові значення, оскільки CSS custom properties не підставляються в умови `@media`. |
| `website/src/styles/typography.css` | Базові правила заголовків, стиль eyebrow і форматування Markdown нотаток релізу. |
| `website/src/styles/global.css` | Базові стилі, адаптивний контейнер, вертикальні відступи секцій, картка, кнопки, видимий фокус і reduced motion. `fade-in-up` збережено з тривалістю 400 мс. |
| `website/public/brand/`, `website/public/screenshots/`, `website/public/compass.svg` | 15 бренд-файлів, усі 8 оригінальних WebP і публічний SVG компаса. Збережено чинні URL і байти файлів. |

Змінено `website/src/pages/index.astro`, `website/astro.config.mjs` і цей план. Перший build після додавання CSS підхопив батьківський PostCSS із Tailwind і зупинився на `@layer`. Явна конфігурація `vite.css.postcss` в Astro ізолює обробку CSS від Vite-проєкту в корені. Повторний build пройшов без цього попередження. Маніфест і lockfile Astro залишилися з Phase 2. [Налаштування PostCSS у Vite](https://vite.dev/config/shared-options.html#css-postcss)

### Перевірки

- `npm.cmd --prefix website run check` — 0 помилок і 0 попереджень. `npm.cmd --prefix website run build` — успішна статична збірка.
- У Chrome 158 порівняно однакову тестову розмітку зі стилями з Vite та Astro при 320, 390, 639, 640, 768, 1023, 1024, 1440 і 1920 px. Збіглися перевірені кольори, шрифти, відступи, ширина контейнера, картки, кнопки, Markdown, тривалість анімації та стани hover, active, focus і reduced motion.
- Звірено SHA-256 усіх 24 скопійованих ресурсів. Усі 24 файли зі статичної збірки повернули HTTP 200 і побайтово збіглися з джерелами. Тестова сторінка має статичний HTML без тегів скриптів.
- Перевірено `git status`, `git diff --check`, `npm ls --depth=0` і кореневі файли Vite відносно HEAD.
- Знімки тестової сторінки для 390 і 1440 px збережено в `%TEMP%/eso-addons-manager-phase3-BzaeD3/`. Вони показують дизайн-токени й базові стилі. Еталоном для порівняння перенесених секцій лишається production із Phase 0.

### Ручна перевірка

1. Із кореня виконати `npm.cmd --prefix website run build`, потім `npm.cmd --prefix website run preview -- --host 127.0.0.1 --port 4321`.
2. Відкрити [Astro preview](http://127.0.0.1:4321/). Перевірити графітове тло, бронзовий логотип, картку й «View on GitHub». Tab на кнопці показує бронзовий контур.
3. У DevTools встановити ширину 390 px та активувати `prefers-reduced-motion: reduce`. Перевірити відступи і появу картки практично без анімації.

Запропонований коміт після дозволу — `feat: migrate existing design system`.

## Phase 4 — Component Migration

Phase 3 погоджено 28 листопада 2026 року. На `rebuild/astro` тестову головну замінено композицією дев’яти Astro-секцій у вихідному порядку. Збережено чинні ID секцій, англомовні тексти, попередження про `AddOns`, посилання на підтримку, оригінали галереї та метадані головної. Завантаження показують десять фактичних посилань із зафіксованого `v0.4.0`, а Changelog — чотири стабільні релізи зі знімка аудиту. Дати генеруються в часовій зоні `Europe/Kyiv` з ISO-датами публікацій у `datetime`. Формати для редактора контенту та живе API належать Phase 7–9.

| Створені файли | Призначення |
| --- | --- |
| `website/src/layouts/BaseLayout.astro` | HTML, метадані, спільні стилі, skip link і слоти шапки та footer. |
| `website/src/components/layout/` | `Header`, `Navigation`, `NavigationLinks`, `Footer`. |
| `website/src/components/sections/` | `Hero`, `Features`, `Screenshots`, `Download`, `GettingStarted`, `Changelog`, `Roadmap`, `FAQ`, `Support`, `WarningNotice`, `PlatformHeading`. |
| `website/src/components/ui/` | `Brand`, `Button`, `Icon`, `Section`, `SectionHeading`. |
| `website/src/data/` | `en.ts`, `types.ts`, `links.ts`, `navigation.ts`, `icons.ts`, `releases.ts`, `release-snapshot.ts`. |
| `website/public/brand/lucide-license.txt` | Ліцензійні повідомлення для 33 SVG-іконок Lucide 0.460.0, перенесених із чинного набору. |

Змінено `website/src/pages/index.astro`, `website/src/styles/global.css`, `website/src/styles/tokens.css` і цей план. npm показав попередження про застарілий `lucide-astro@0.460.0`. Його видалено після перенесення фактично використаних іконок у локальний набір із ліцензією. Фінальний маніфест містить ті самі залежності, що й у Phase 2.

Мобільне меню та FAQ використовують нативні `details`. Єдиний клієнтський скрипт додає закриття меню, обробку Escape та підсвічування поточної секції. Desktop-навігація вмикається з 1024 px. За меншої ширини всі пункти лишаються доступними в меню, а низький viewport отримує вертикальне прокручування списку. Skip link переводить фокус у `main`.

### Перевірки

- `npm.cmd --prefix website run check` — 31 файл, 0 помилок і 0 попереджень. `npm.cmd --prefix website run build` — один статичний маршрут. `npm.cmd --prefix website ls --depth=0` підтвердив Astro, @astrojs/check і TypeScript як єдині прямі залежності.
- У Chrome 158 локальний Astro preview повернув HTTP 200. Перевірено дев’ять секцій, усі навігаційні якорі, унікальні ID, вісім оригіналів галереї, чотири записи Changelog, десять точних URL файлів і 15 локальних URL ресурсів із головної.
- На 320, 375, 390, 768, 1024, 1280, 1440 і 1920 px горизонтального переповнення немає. При 320×320 відкритий список після перерахунку viewport вміщується в доступну висоту й прокручується.
- Перевірено Tab і Enter для skip link, відкриття меню, Escape з поверненням фокусу, перехід до секції, активний пункт і закриття меню після переходу на desktop. З вимкненим JavaScript доступні вміст, файли релізу, мобільні посилання й нативний FAQ, де відкриття другого пункту закриває перший.
- Контрольні знімки для desktop 1440 px, mobile 390 px і відкритого меню записано в `%TEMP%/eso-addons-manager-phase4-8aLy0V/`. Повне порівняння екранів, секцій і станів із Vite заплановане на Phase 5.

### Ручна перевірка

1. Виконати `npm.cmd --prefix website run build` і `npm.cmd --prefix website run preview -- --host 127.0.0.1 --port 4321`. Відкрити [локальний preview](http://127.0.0.1:4321/).
2. На 768 px відкрити меню через Enter, вибрати Download і перевірити перехід до `#download`. Відкрити меню знову й натиснути Escape.
3. Перевірити, що галерея відкриває оригінал у новій вкладці, а в FAQ можна розгорнути інше питання. У Download звірити платформи, файли та `SHA256SUMS`.

Запропонований коміт після дозволу — `feat: migrate website sections to Astro`.

## Phase 5 — Visual Parity Test

Phase 4 погоджено 28 листопада 2026 року. Для еталона локально зібрано Vite з `d494d93` у тимчасовий каталог. Віддалений `main` підтвердив той самий SHA. Назви CSS і JS у контрольній збірці збіглися з тими, що повернув production HTML. [Кореневий сайт](https://eso-addons-manager.github.io/)

### Метод і виправлення

- Обидві збірки перевірено в Chrome 158.0.8127.89 із DPR 1, тією самою системою шрифтів, часовою зоною `Europe/Kyiv` і `prefers-reduced-motion: reduce`. Дочекалися декодування зображень і завантаження шрифтів. Браузерні запити Vite до GitHub отримували відповіді з того самого знімка аудиту, що й Astro, включно з `v0.4.0` та чотирма стабільними релізами.
- Перший прогін виявив різницю в умовах перевірки. Vite показував повідомлення про кеш після першого відкриття, що додавало по 32 px до Download і Changelog. Для фінального прогону очищено локальний release cache Vite перед кожним відкриттям. Повносторінкові знімки зібрано з кадрів видимої області з контрольованим скролом, бо суцільне захоплення через Chrome змінювало перенесення рядків.
- У `website/src/components/layout/Header.astro` повернуто висоту шапки 56 px плюс рамка та початкове перенесення тексту кнопки GitHub. У `website/src/components/ui/SectionHeading.astro` відтворено висоту рядка підзаголовка з 640 px. У `website/src/components/sections/FAQ.astro` питання отримали міжлітерний інтервал з Vite. Оновлено цей план.

### Фінальні вимірювання

Показник різниці — частка пікселів, у яких будь-який канал RGB відрізняється більш ніж на 8 з 255. Секції вимірювали за їхніми координатами в документі. На всіх восьми ширинах збіглися висота сторінки, початкова позиція й висота кожного основного блоку, шапки та footer.

| Viewport | Ширина документа Vite → Astro | Різниця першого екрана | Найбільша різниця серед секцій |
| --- | ---: | ---: | ---: |
| 320×568 | 320 → 320 px | 0% | 0,049% |
| 375×812 | 375 → 375 px | 0% | 0,046% |
| 390×844 | 390 → 390 px | 0% | 0,045% |
| 768×1024 | 909 → 768 px | 1,261% | 0,036% |
| 1024×768 | 1024 → 1024 px | 0% | 0,019% |
| 1280×800 | 1280 → 1280 px | 0% | 0,015% |
| 1440×900 | 1440 → 1440 px | 0% | 0,014% |
| 1920×1080 | 1920 → 1920 px | 0% | 0,010% |

На 768 px різниця першого екрана припадає на шапку. Astro використовує мобільне меню й показує всі пункти після відкриття. Поза цією шапкою найбільше залишкове відхилення — 0,049% у Changelog на 320 px.

| Перевірений стан | Ширина | Різниця кадру |
| --- | ---: | ---: |
| Відкрите мобільне меню | 390 px | 0% |
| Друге питання FAQ відкрите | 390 px | 0,014% |
| Друге питання FAQ відкрите | 1440 px | 0,004% |
| Download з релізом і файлами | 390 px | 0% |
| Download з релізом і файлами | 1440 px | 0,007% |
| Hover на першому скриншоті | 1440 px | 0% |

### Команди та ручна перевірка

- `git ls-remote --exit-code origin refs/heads/main`, `curl.exe` для production HTML, `.\node_modules\.bin\vite.cmd build --outDir <temporary-vite-dist>`, `npm.cmd --prefix website run check` і `npm.cmd --prefix website run build`. Astro check видав 0 помилок і 0 попереджень. Обидві збірки пройшли. Vite повідомив, що зовнішній тимчасовий `outDir` очищатися автоматично не буде.
- Chromium DevTools Protocol і Sharp для знімків та порівняння RGB. У тимчасовому каталозі `%TEMP%/eso-addons-manager-phase5-pQVwUO/` збережено `compare.cjs`. Підкаталог `final/` містить 16 знімків першого екрана, 16 повносторінкових знімків, 12 кадрів інтерактивних станів, `tablet-header-comparison.png` і `comparison.json` з координатами та показниками.

1. Відкрити пару `vite-1440-full.png` і `astro-1440-full.png` та звірити порядок секцій, попередження, Download і footer.
2. Відкрити `tablet-header-comparison.png`. Ліворуч Vite на 768 px з обрізаною desktop-навігацією, праворуч Astro з мобільним меню.
3. Зіставити `vite-menu-open-390.png` з `astro-menu-open-390.png` і друге відкрите питання FAQ в обох збірках.
4. Після погодження Phase 5 окремо визначити обсяг UI/UX змін для Phase 6.

Запропонований коміт після дозволу — `fix: align Astro layout with Vite reference`.

## Phase 6 — UI/UX Improvements

Phase 5 погоджено 28 листопада 2026 року. Перед змінами сторінка мала вісім пунктів у шапці й три посилання на головну сторінку репозиторію застосунку. Секція Download іде після галереї з восьми карток. У попередній версії дві кнопки з однаковим підписом `Open releases on GitHub` вели на конкретний реліз та до повної історії.

### Вибір і прототипи

| Варіант | Конкретні зміни | Перевага й компроміс |
| --- | --- | --- |
| **A — Компактна шапка й Hero** | Залишити в шапці **Features, Screenshots, Download, Getting Started, FAQ, Support**. Додати Roadmap до переліку секцій у footer. Прибрати два переходи до репозиторію з шапки й Hero. У Hero залишити основну кнопку **View downloads**, а репозиторій — у Resources у footer. | На 1024 px назва застосунку займає один рядок замість двох, а на 320 px група кнопок у Hero займає 40 px замість 94 px. Відвідувачі шукатимуть код і дорожню карту нижче, тому підписи у footer мають лишатися однозначними. |
| **B — Download і Getting Started перед галереєю** | Після Features розмістити **Download → Getting Started → Screenshots**. Узгодити порядок навігації з порядком секцій і зберегти чинні якірні адреси. | На 390 px блок Download починається на 3038 px раніше, на 1440 px — на 2188 px раніше. Це допомагає під час звичайного прокручування. Пряма кнопка **View downloads** вже веде до цілі. Галерея при цьому зміститься нижче. |
| **C — Менше повторів у Download** | За наявності придатних пакетів замінити кнопку біля версії текстовим посиланням **View this release on GitHub** і прибрати повторну картку переходу внизу. Якщо список пакунків порожній, показати одну кнопку **Open releases on GitHub**. Повна історія доступна з Resources у footer. | У прототипі розділ коротшає на 190 px на 390 px і на 92 px на 1440 px. Прямі файли й сума перевірки лишаються доступними. Для всієї історії релізів читач переходить до Resources. |

**Погоджено A + C і повне вилучення Changelog з Astro.** Вилучення охоплює секцію, всі її посилання, англомовний контент, типи, знімок історії й стилі. Погоджене рішення застосовано до Astro та майбутніх фаз CMS і GitHub API. Попередні звіти фіксують стан Vite й результати Visual Parity на момент перевірки.

### Перевірка прототипів

У Chrome 158 використано збірку Astro після Phase 5. Прототипи створено зміною DOM лише у сеансі браузера. Для A перевірено 320, 390, 768, 1024 і 1440 px, шість пунктів навігації, одну кнопку Hero, одне посилання на головну сторінку репозиторію та відсутність нового переповнення. Для B на 390 і 1440 px виміряно фактичний зсув Download. Для C на тих самих ширинах виміряно висоту Download і підтверджено збереження десяти посилань на файли.

У порівнянні шапки використано справжні кадри Astro на 320 і 1024 px. Вимірювання прототипів і порівняння збережено в `.cache/eso-addons-manager-ux/`, який покрито чинним `.gitignore`.

### Реалізація та перевірки

- Оновлено `pages/index.astro`, `Header.astro`, `Navigation.astro`, `Hero.astro`, `Download.astro`, `data/navigation.ts`, `data/en.ts`, `data/types.ts`, `data/releases.ts`, `data/release-snapshot.ts` і `styles/typography.css` у `website/src/`. Видалено `website/src/components/sections/Changelog.astro`. План CMS і GitHub API тепер охоплює редакційний Download і дані останнього стабільного релізу.
- `npm.cmd --prefix website run check` — 30 файлів, 0 помилок і 0 попереджень. `npm.cmd --prefix website run build` — один статичний маршрут. Пошук у джерелах і зібраному сайті перевірив видалення назви, якоря, стилів і нотаток вилученої секції.
- У Chrome 158 перевірено 320, 375, 390, 768, 1024, 1280, 1440 і 1920 px без горизонтального переповнення. Підтверджено одну кнопку Hero, шість пунктів шапки й мобільного меню, Roadmap у footer, однорядкову назву на 1024 px і висоту кнопки Hero 40 px на 320 px. Перевірено skip link, Escape, фокус і роботу меню та FAQ без JS.
- У головній збірці Download містить одне посилання на конкретний реліз, дев’ять пакетів і `SHA256SUMS`. Окремою Astro-збіркою тестових даних перевірено відсутній реліз, порожній список, пакети іншої архітектури та часткову наявність для підтримуваних платформ. У перших трьох сценаріях є рівно одна кнопка до GitHub Releases. Частковий список відображає наявні файли й посилання на конкретний реліз.
- Контрольні знімки реалізації записано в `%TEMP%/eso-addons-manager-phase6-WvT3rT/`. Виконано `git status` і `git diff --check`.

1. Запустити `npm.cmd --prefix website run preview -- --host 127.0.0.1 --port 4321` і відкрити [локальний preview](http://127.0.0.1:4321/).
2. На 320 px перевірити одну кнопку `View downloads` та шість пунктів мобільного меню. На 1024 px перевірити назву застосунку в шапці.
3. Перейти до Download і звірити текстове посилання на версію, файли та `SHA256SUMS`. У footer перевірити Roadmap і переходи `Application repository` та `Application releases`.

Запропонований коміт після дозволу — `feat: simplify Astro navigation and downloads`.

## Phase 7 — Content Architecture

Phase 6 погоджено 28 листопада 2026 року. Редакційні дані перенесено до `website/src/content/en/`. Дані релізу завантажуються окремо з поточного знімка для Download. Для Hero й Download використовується один список платформ із `downloads.json`. Canonical і технічні якорі формуються кодом. Англомовний контент готується за цією ж схемою для майбутніх форм Pages CMS.

| Створено | Вміст |
| --- | --- |
| `homepage.json`, `navigation.json`, `seo.json` | Hero, попередження, назви меню, skip link, title, description та соціальне зображення. Заголовок і опис для соцмереж можна задати окремо. |
| `features.json`, `screenshots.json`, `downloads.json` | Особливості, іконки, підписи й alt галереї, платформи та редакційні підказки щодо файлів. |
| `getting-started.json` і `getting-started/*.md` | Заголовок секції та шість кроків. Frontmatter задає заголовок, порядок, іконку і виділення. Нумерація в картках визначається відсортованим порядком. |
| `faq.json`, `roadmap.json`, `support.json`, `footer.json` | Питання й відповіді, плани, канали підтримки, повідомлення та посилання. |
| `website/src/content.config.ts` | Колекція Markdown-кроків із Zod-схемою frontmatter. |
| `website/src/data/content-schema.ts`, `content-policy.ts`, `site-content.ts` | Схеми JSON, правила Markdown і завантажувач типізованих даних на етапі збирання. |

Видалено `website/src/data/en.ts`. Оновлено `data/types.ts`, `data/navigation.ts`, `data/links.ts`, `pages/index.astro`, `layouts/BaseLayout.astro`, `components/layout/{Header,Navigation,Footer}.astro` і `components/sections/{Hero,Screenshots,GettingStarted,Support}.astro` у `website/src/`, а також цей план. У `website/` оновлено `astro.config.mjs`, `tsconfig.json`, маніфест і lockfile. Sätteri, який Astro вже використовує для Markdown, явно зафіксовано на 0.4.10 для підключення валідатора. На першій перевірці TypeScript повідомив про відсутні типи `node:fs`. Додано `@types/node` 26.6.11 як devDependency. [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/) · [Налаштування Sätteri](https://docs.astro.build/en/reference/markdown-processors/satteri/)

### Перевірки

- `npm.cmd --prefix website run check` — 33 файли, 0 помилок і 0 попереджень. `npm.cmd --prefix website run build` — успішний статичний build. Виконано `npm view`, установки з точними версіями, `npm ls --depth=0`, `git status` і `git diff --check`.
- У тимчасовій копії збирання відхилило відсутній alt, невідому іконку, небезпечний JSON URL, відсутній файл зображення, дубль порядку Markdown, сирий HTML, небезпечне Markdown-посилання та посилання на відсутнє Markdown-зображення. Окрема позитивна перевірка підтвердила, що внутрішній якір, список, виділений текст і наявне зображення в Markdown рендеряться.
- На 390 і 1440 px у Chrome збіглися тексти, заголовки кроків, посилання, зображення, метадані та координати секцій із Phase 6. У кадрах першого екрана та Getting Started — 0 пікселів із різницею понад 8 із 255 на канал RGB. Знімки збережено в `%TEMP%/eso-addons-manager-phase7-9f64a2b2/`.

### Ручна перевірка

1. Запустити `npm.cmd --prefix website run build`, потім `npm.cmd --prefix website run preview -- --host 127.0.0.1 --port 4321`. Відкрити [локальний preview](http://127.0.0.1:4321/).
2. Перевірити [Getting Started](http://127.0.0.1:4321/#getting-started) і звірити порядок кроків із полями `order` у `website/src/content/en/getting-started/`.
3. Звірити підписи галереї з `screenshots.json` і метадані з `seo.json`. Схеми описані в `website/src/data/content-schema.ts`.

Запропонований коміт після дозволу — `feat: move Astro content to validated JSON and Markdown`.

## Phase 8 — Pages CMS Integration

Phase 7 погоджено 28 листопада 2026 року. Кореневий `.pages.yml` дає редактору 11 форм, колекцію з шести кроків **Getting Started** і дві бібліотеки растрових зображень. Форми підтримують списки, вибір іконок і медіа, alt-текст та необов’язкові соціальні метадані. Версії, дати та URL файлів релізів надходять зі знімка релізу. Підключення GitHub API заплановано на Phase 9. Стороння панель використовує готовий hosted Pages CMS, який сервіс надає безкоштовно. Публічний репозиторій GitHub може бути джерелом контенту для цього сервісу. [Pages CMS Quick start](https://pagescms.org/docs/quick-start/) · [Pages CMS FAQ](https://pagescms.org/#is-pages-cms-free)

| Файл | Зміна |
| --- | --- |
| `.pages.yml` | Створено форми, Markdown-колекцію, вибір зображень і правила редагування. |
| `website/src/content/en/downloads.json` | Запис підпису пакета Arch отримав ключ `pkgTarZst`, оскільки Pages CMS підтримує імена полів без крапок. |
| `website/src/data/content-schema.ts` | Схема читає поточний і попередній формат підпису та повертає ключ `pkg.tar.zst` для відображення пакета. |
| `MIGRATION_PLAN.md` | Оновлено статус і додано інструкцію з підключення, перевірки та відкату. |

### Перевірки

- Валідатори конфігурації і форм та серіалізація з вихідного коду Pages CMS 2.1.8 опрацювали `.pages.yml`, 11 JSON-файлів, 6 Markdown-файлів і шляхи обох джерел медіа. Перевірено, що очищення необов’язкових полів SEO вилучає порожні ключі. Форма відхиляє порожній обов’язковий список і URL із `javascript:`. [Випуск Pages CMS 2.1.8](https://github.com/hunvreus/pagescms/releases/tag/2.1.8)
- У тимчасовій копії Astro зібрав сторінку з доданим записом FAQ, новим Markdown-кроком із внутрішнім посиланням і заміненим зображенням галереї. Збірки з попереднім і поточним ключами пакета Arch дали однаковий HTML.
- `npm.cmd --prefix website run check` перевірив 33 файли з нулем помилок і попереджень. `npm.cmd --prefix website run build` зібрав одну статичну сторінку. Локальний `astro preview` повернув HTTP 200 для головної та зображень з обох медіатек. `git diff --check` пройшов. На GitHub є `main` з Vite workflow. `rebuild/astro` наразі існує локально.

### Підключення через браузер

Після погодженого `push` тестової гілки `rebuild/astro` конфігурація має бути в її корені. Для першого тесту виберіть цю гілку в Pages CMS.

1. Відкрийте hosted Pages CMS і натисніть **Sign in with GitHub**. Увійдіть в акаунт, який має доступ до репозиторію сайту. [Hosted Pages CMS](https://app.pagescms.org/) · [Pages CMS Quick start](https://pagescms.org/docs/quick-start/)
2. Натисніть **Install GitHub App**. На сторінці GitHub виберіть акаунт `eso-addons-manager`, далі **Only select repositories**, `eso-addons-manager.github.io` і **Install**. Якщо застосунок уже встановлено, доступ до репозиторію можна додати в GitHub через **Settings → Applications → Installed GitHub Apps → Configure**. [Встановлення GitHub App](https://docs.github.com/en/apps/using-github-apps/installing-a-github-app-from-a-third-party)
3. У Pages CMS знайдіть `eso-addons-manager.github.io` у полі **Search repositories by name** і відкрийте його. У меню з назвою репозиторію вгорі бічної панелі виберіть **Branches → rebuild/astro**. За потреби відкрийте **Manage branches** і скористайтеся полем **Search branches by name**. Форми з’являться після вибору гілки з `.pages.yml`. [Гілка `rebuild/astro` у Pages CMS](https://app.pagescms.org/eso-addons-manager/eso-addons-manager.github.io/rebuild%2Fastro) · [Інтерфейс вибору гілки Pages CMS](https://github.com/hunvreus/pagescms/blob/2.1.8/components/repo/repo-sidebar.tsx)
4. Відкрийте **FAQ**, відредагуйте питання або відповідь і натисніть **Save**. На GitHub відкрийте **Code**, виберіть `rebuild/astro` і відкрийте **Commits**. Звірте SHA і зміни у `website/src/content/en/faq.json`. Кожне збереження створює окремий коміт у вибраній гілці. [Обробник збереження Pages CMS](https://github.com/hunvreus/pagescms/blob/2.1.8/app/api/%5Bowner%5D/%5Brepo%5D/%5Bbranch%5D/files/%5Bpath%5D/route.ts)
5. У **Documentation → Getting Started steps** натисніть **Add an entry**, введіть заголовок, унікальний цілий **Step order** від 1, виберіть іконку, заповніть **Instructions** і натисніть **Save**. Для видалення відкрийте меню запису й виберіть **Delete**. Для галереї відкрийте **Screenshots → Gallery**, виберіть **Select** біля зображення або **Upload** у **Screenshot files**, задайте **Caption** і **Alternative text** та натисніть **Save**. Завантажуйте файли в корінь відповідної медіатеки, щоб публічний шлях відповідав схемі Astro. [Pages CMS Rich-text](https://pagescms.org/docs/configuration/fields/rich-text/) · [Pages CMS Media](https://pagescms.org/docs/configuration/media/)
6. У Phase 12–13 після додавання Astro workflow повторіть **Save** і відкрийте **Actions**. Запуск має показати подію `push`, гілку `rebuild/astro` і SHA коміту з CMS. Перевірте успішні кроки валідації й збірки та відкрийте preview-артефакт. Вихідний код Pages CMS підтверджує запис через GitHub API. Фактичний запуск залежить від доступу до запису, правил гілки та тригерів workflow. Поточний `Deploy website to GitHub Pages` запускається від `push` у `main` і збирає Vite. Публікація Astro з `main` потребує погодженого переходу в Phase 14. [Тригери GitHub Actions](https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/trigger-a-workflow)

### Попередній перегляд і відкат

Pages CMS показує форматування Markdown і вибране зображення в редакторі. Для перегляду зібраної сторінки отримайте потрібний коміт локально, виконайте `npm.cmd --prefix website run build`, а потім `npm.cmd --prefix website run preview -- --host 127.0.0.1 --port 4321`. Відкрийте `http://127.0.0.1:4321/`. Коли Astro workflow завантажуватиме статичний preview, його можна буде отримати через **Actions → запуск для потрібного SHA → Artifacts** і переглянути через локальний статичний сервер. Для завантаження артефакту GitHub вимагає входу й доступу до репозиторію. [Завантаження артефактів GitHub Actions](https://docs.github.com/en/actions/how-tos/manage-workflow-runs/download-workflow-artifacts)

Для відкату окремого CMS-коміту знайдіть його SHA у **Commits**, створіть зворотний коміт через `git revert <SHA>` і проведіть його через той самий шлях перевірок. Якщо зміни прийшли окремим PR, на сторінці злитого PR можна натиснути **Revert**, щоб відкрити зворотний PR. Якщо медіа було завантажене окремим комітом, врахуйте обидва SHA та спочатку поверніть посилання форми до попереднього зображення. [Відкат pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/reverting-a-pull-request)

Запропонований коміт після дозволу — `feat: integrate Pages CMS`.

## Phase 9 — GitHub API Integration

Phase 8 погоджено 28 листопада 2026 року. Під час Astro-збірки в режимі `live` сайт отримує один останній стабільний реліз із публічного GitHub API. Значення тегу, назви, дати, Release Notes, назв, розмірів і URL файлів зберігаються у статичному `/_data/releases.json`. У Download відображаються сумісні пакети з чинними підписами, а посилання на реліз відкриває нотатки на GitHub. Редакційні тексти й вибір платформ залишаються у `downloads.json`. [GitHub REST API](https://docs.github.com/en/rest/releases/releases#get-the-latest-release) · [Реліз v0.4.0](https://github.com/powerbq/eso-addons-manager/releases/tag/v0.4.0)

| Файл | Зміна |
| --- | --- |
| `website/src/data/github.ts` | Створено build-time завантажувач, обробку станів і два рівні резерву. |
| `website/src/data/releases.ts`, `links.ts`, `release-snapshot.ts` | Додано перевірку джерела та метаданих, нормалізацію, класифікацію пакетів і вбудований знімок `v0.4.0`. |
| `website/src/pages/index.astro`, `website/src/pages/[releaseData]/releases.json.ts` | Головна і статичний JSON використовують один результат запиту в межах збірки. |
| `website/tests/releases.test.mjs`, `website/package.json` | Додано 12 тестів і команду `npm test` із вбудованим Node test runner. |
| `MIGRATION_PLAN.md` | Оновлено статус, режими збірки, перевірки й план автоматичного оновлення. |

### Обробка GitHub API

- Один запит `/releases/latest` має таймаут 5 секунд і використовує GitHub API версії `2026-03-10`. Публічні запити не потребують токена. При HTTP 403 або 429 збірка враховує доступні числові `Retry-After` і `X-RateLimit-Reset` у діагностиці й переходить до резерву без повторного запиту. GitHub документує базовий ліміт 60 неавторизованих запитів за годину на IP. [Ліміти GitHub REST API](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api)
- HTTP 404 на `/releases/latest` дає стан без стабільного релізу. Успішна відповідь із порожнім списком файлів зберігає версію й дату. Чернетка, prerelease або пошкоджена відповідь з HTTP 200 переходять до резерву. Файли в невалідному стані або з невідповідним посиланням вилучаються з даних. [GitHub Get the latest release](https://docs.github.com/en/rest/releases/releases#get-the-latest-release)
- За тимчасової помилки Astro запитує `https://eso-addons-manager.github.io/_data/releases.json` із власним таймаутом 5 секунд. Якщо цей знімок також недоступний або не проходить перевірку, Astro використовує перевірені дані `v0.4.0` із репозиторію. Опублікований стан без релізу зберігається під час тимчасової відмови API.

### Перевірки

- `npm.cmd --prefix website test` пройшов 12 тестів, включно з 404, 403/429, таймаутом, мережею, prerelease, порожніми й невалідними файлами та змінами відбитка.
- `npm.cmd --prefix website run check` перевірив 36 файлів без помилок і попереджень. Офлайн-збірка й `astro preview` повернули HTTP 200 для незміненої головної та `/_data/releases.json` із валідним відбитком і типом `application/json`.
- Жива збірка отримала `v0.4.0` із дев’ятьма пакетами та `SHA256SUMS`. Головна побайтово збіглася з HTML Phase 8. JSON містить усі 10 файлів, дату, назву, нотатки, відбиток і тестовий `GITHUB_SHA`.
- Збірки з підставленими відповідями 404 і з несумісним Windows ARM64 пакетом видали узгоджені HTML і JSON. У кожній збірці виконано один запит до API, а Download показав одне посилання на всі релізи.
- На чинному сайті `/_data/releases.json` повертає 404. Опублікований знімок стане доступним після першої Astro-публікації. У тестах уже перевірено його читання як резерву.

### Ручна перевірка

1. Для офлайн-збірки виконайте `npm.cmd --prefix website run build`. Для перевірки живого релізу спочатку задайте `$env:ESO_RELEASE_MODE = 'live'` у PowerShell. Після збірки `Remove-Item Env:ESO_RELEASE_MODE` повертає режим за замовчуванням.
2. Запустіть `npm.cmd --prefix website run preview -- --host 127.0.0.1 --port 4321`. Відкрийте [Download](http://127.0.0.1:4321/#download) і [релізні дані](http://127.0.0.1:4321/_data/releases.json). Звірте тег, дату і файли з GitHub Releases.

### Автоматичне оновлення після релізу

У Phase 12 заплановано щогодинну перевірку зі зміщенням від початку години в GitHub Actions репозиторію сайту. Вона зіставлятиме свіжий відбиток релізу й SHA `main` із даними опублікованого сайту. Зміна запускає перевірки, збірку та погоджене публікування. У разі тимчасової помилки API плановий запуск може пропустити деплой, якщо SHA вже актуальний. `workflow_dispatch` покриватиме ручне оновлення. Для негайного оновлення після desktop-релізу можливий `repository_dispatch` після окремого погодження з власником того репозиторію. [Розклад GitHub Actions](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule) · [Repository dispatch](https://docs.github.com/en/rest/repos/repos#create-a-repository-dispatch-event)

Запропонований коміт після дозволу — `feat: fetch GitHub releases during Astro builds`.

## Phase 10 — SEO & Performance

Phase 9 погоджено 28 листопада 2026 року. Головна має один canonical `https://eso-addons-manager.github.io/`, абсолютні Open Graph URL і `SoftwareApplication` JSON-LD з назвою, версією, підтримуваними ОС та ціною 0. У sitemap входить тільки коренева адреса. `robots.txt` вказує абсолютну адресу sitemap. Брендована 404 використовує спільні Header і Footer, має власні title і description, `noindex` та кнопку повернення на головну. Google вимагає справжню оцінку або відгук для розширеного результату застосунку. Розмітка використовує наявні перевірені дані. [Sitemap у Google Search](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) · [SoftwareApplication](https://developers.google.com/search/docs/appearance/structured-data/software-app) · [GitHub Pages 404](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-custom-404-page-for-your-github-pages-site)

| Файл | Зміна |
| --- | --- |
| `website/src/pages/404.astro`, `robots.txt.ts`, `sitemap.xml.ts` | Додано статичну сторінку помилки та файли для пошукових роботів. |
| `website/src/layouts/BaseLayout.astro`, `website/src/pages/index.astro` | Додано `noindex` для 404 і JSON-LD з даними застосунку для головної. |
| `website/src/data/screenshot-previews.ts`, `website/src/pages/previews/[preview].webp.ts` | Створено генерацію WebP шириною 480, 800 і 1200 px зі знімків, на які посилаються Hero і галерея. Варіанти мають відбиток у назві й обираються за `srcset` та `sizes`. |
| `website/src/components/sections/Hero.astro`, `Screenshots.astro`, `Roadmap.astro` | Hero має пріоритет завантаження. Галерея і нижня ілюстрація Roadmap завантажуються відкладено. Галерея відкриває повнорозмірний оригінал. |
| `website/astro.config.mjs`, `website/package.json`, `website/package-lock.json` | Вбудовано CSS статичних сторінок, щоб забрати окремі запити з першого рендера. `sharp` 0.35.5, який уже використовував Astro, зафіксовано як пряму залежність збірки. |

Варіанти генеруються зі знімків у `public/` під час збірки. Це дає CMS стабільні URL оригіналів. Генератор пропускає збільшення зображень, анімації й варіанти, які важать більше за оригінал. Локальний `astro dev` відображає оригінали. Оптимізовані ресурси доступні через `astro build` і `astro preview`. Системний шрифт, початкові SVG, геометрія карток і повнорозмірні файли збережені. [Astro про локальні зображення](https://docs.astro.build/en/guides/images/#src-vs-public) · [Astro inlineStylesheets](https://docs.astro.build/en/reference/configuration-reference/#buildinlinestylesheets)

### Методика Lighthouse

Локально зібрано Vite 6.4.6 із бази `d494d93` й Astro 7.4.13 двох фаз. Усі сторінки використовують дані `v0.4.0`. Vite отримує збережені відповіді GitHub від локального сервера. Для порівняння використано Lighthouse 13.6.0, Chrome 158.0.8127.89 і один локальний HTTP сервер із Brotli. Для кожного з 18 прогонів створено новий контекст Chrome, а HTTP кешування вимкнено. Порядок збірок змінювався між повторами. Звіти збережено у `%TEMP%/eso-phase10-dd75e5e702/final-reports/`. Вимірювання передають різницю між реалізаціями та погодженими змінами вмісту. Польові дані нового Astro з’являться після публікації за наявності даних CrUX. Запит PageSpeed Insights для чинного публічного сайту повернув HTTP 429. [Профілі Lighthouse](https://developer.chrome.com/docs/devtools/lighthouse/) · [Доступність польових даних CrUX](https://developer.chrome.com/docs/crux/methodology)

Мобільний профіль у Lighthouse має 412 × 823 px, DPR 1,75, RTT 150 мс, 1638,4 Кбіт/с і сповільнення CPU ×4. Десктопний має 1350 × 940 px, DPR 1, RTT 40 мс, 10 240 Кбіт/с і CPU ×1. Таблиця показує медіани трьох прогонів для кожної збірки й кожного профілю.

| Профіль | Збірка | Performance | LCP, мс | CLS | TBT, мс | Передано, байтів | Запити |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Mobile | Vite | 100 | 1524 | 0 | 53 | 337 028 | 10 |
| Mobile | Astro Phase 9 | 100 | 753 | 0 | 73 | 258 257 | 7 |
| Mobile | Astro Phase 10 | 99 | 604 | 0 | 127 | 82 192 | 5 |
| Desktop | Vite | 100 | 202 | 0 | 0 | 1 212 490 | 17 |
| Desktop | Astro Phase 9 | 100 | 209 | 0 | 0 | 1 133 719 | 14 |
| Desktop | Astro Phase 10 | 100 | 208 | 0 | 0 | 312 095 | 12 |

Відносно Vite фінальна збірка передала на 76% менше байтів у мобільному профілі й на 74% менше в десктопному. Мобільний LCP скоротився на 60%. Десктопні медіани LCP залишилися близькими, а мобільні TBT і оцінка Performance погіршилися. Lighthouse SEO дав 100 у всіх шести групах. Лабораторний CLS дорівнював 0. Польовий INP не вимірювався.

Chrome завантажив для Hero файл шириною 800 px вагою 63 314 байтів. Повнорозмірний файл має 238 196 байтів. Головна Astro містить 819 байтів вбудованого JavaScript, а Vite завантажує 295 877 байтів JavaScript у розпакованому вигляді. Вбудовані стилі усувають два зовнішні CSS-запити фінальної сторінки. Сукупний обсяг переданих даних наведено окремо в таблиці.

### Перевірки

- `npm.cmd --prefix website test` пройшов 12 тестів. `npm.cmd --prefix website run check` перевірив 41 файл із нулем помилок і попереджень. `npm.cmd --prefix website run build` згенерував дві HTML-сторінки, sitemap, robots.txt, релізні дані та 24 варіанти WebP.
- `astro preview` повернув HTTP 200 для `/`, `/index.html`, `/sitemap.xml` і `/robots.txt`. Старий базовий шлях `/eso-addons-manager/`, `/download/` і вигаданий шлях повернули HTTP 404 з брендованою сторінкою. Перевірено один canonical на головній, службові метадані, ієрархію заголовків, унікальні ID, внутрішні посилання, favicon, розміри OG-зображення 1200 × 630 і відсутність Changelog в Astro.
- У Chrome на 390 px із DPR 2 і на 1440 px із DPR 1 браузер обрав варіант 800 px для Hero й першої картки галереї. Ширина зображень збіглася з Phase 9. Для Hero найбільша різниця висоти склала 0,32 CSS px через округлення при масштабуванні. Середня різниця каналу RGB у кожному з 24 варіантів відносно оригіналу, масштабованого до тієї самої ширини, була в межах 1,56 із 255. Вісім повнорозмірних файлів збігаються побайтово з оригіналами.
- Тимчасова збірка з новими PNG у редакційному JSON створила адаптивні файли для великого зображення. Знімок 64 × 64 px зберіг початковий файл і розміри. Артефакти Chrome та `verification.json` є у `%TEMP%/eso-phase10-dd75e5e702/`.

### Ручна перевірка

1. Виконайте `npm.cmd --prefix website run build` і `npm.cmd --prefix website run preview -- --host 127.0.0.1 --port 4321`.
2. Відкрийте [головну](http://127.0.0.1:4321/), [sitemap](http://127.0.0.1:4321/sitemap.xml), [robots.txt](http://127.0.0.1:4321/robots.txt) та [вигадану адресу](http://127.0.0.1:4321/phase10-missing). Після першої публікації повторіть перевірку на домені GitHub Pages.
3. На головній відкрийте скриншот галереї. Картка галереї використовує адаптивний WebP, а посилання відкриває оригінал у `/screenshots/`.

Запропонований коміт після дозволу — `feat: improve Astro SEO and asset delivery`.

## Phase 11 — Responsive & Accessibility

Phase 10 погоджено 28 листопада 2026 року. У Chrome відтворено перекриття кнопки інсталятора липкою шапкою після `Shift+Tab`, втрату фокуса при перемиканні навігації біля 1024 px і відкрите мобільне меню після переходу фокуса за його межі. Axe виявив, що вісім посилань галереї пропускали частину видимого тексту в доступній назві. На 640 px обрізалися назви восьми пакетів, на 768 px — семи. За розміру тексту 200% навігація створювала горизонтальне прокручування на 1024 px. [WCAG 2.2 AA](https://www.w3.org/TR/WCAG22/) · [Label in Name](https://www.w3.org/TR/WCAG22/#label-in-name) · [Focus Not Obscured](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html)

| Файли в `website/src/` | Зміна |
| --- | --- |
| `components/layout/Navigation.astro`, `NavigationLinks.astro`, `Header.astro` | Мобільне меню закривається при виході фокуса або кліку поза ним. На зміні режиму фокус переходить на відповідне десктопне посилання або кнопку меню. Навігація перемикається за доступною шириною шапки у `rem`. Активне посилання підкреслюється й отримує `aria-current`. Стан очищується при переході в секцію поза меню або у футер. |
| `styles/tokens.css`, `styles/global.css`, `layouts/BaseLayout.astro`, `components/ui/Section.astro`, `components/sections/Hero.astro` | Спільна висота шапки визначає відступ прокручування для якорів і клавіатурного фокуса. Попередні відступи окремих секцій прибрано. |
| `components/sections/Download.astro`, `styles/global.css` | Назва пакета та розмір можуть переноситися. За збільшення тексту сітка завантажень може перейти на меншу кількість колонок. |
| `components/sections/Screenshots.astro` | Доступну назву посилання визначає нативний вміст картки, включно з видимим підписом і текстом дії. |

### Перевірки

- Chrome 158 перевірив головну та 404 на 320, 375, 390, 768, 1024, 1280, 1440 і 1920 px, а також на 639, 640, 767 і 1023 px біля breakpoint. У всіх 24 поєднаннях ширини й сторінки не було горизонтального прокручування. Режим розміру тексту 200% перевірено на семи ширинах для кожної сторінки. Тест збільшених текстових інтервалів пройшов на 320 px. Назви пакетів повністю читаються при 100% і 200%. [WCAG Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html)
- Повний Tab-прохід дав 49 зупинок на мобільній головній, 54 на десктопній, 14 на мобільній 404 і 19 на десктопній 404. Перевірено видимість фокуса, Skip to content, `Enter`, `Space`, `Escape`, `Shift+Tab` під липкою шапкою, перехід фокуса на 1023 ↔ 1024 px, посилання з 404, усі шість пунктів меню при висоті 260 px і відкриття оригіналу галереї клавішею `Enter`. Мобільне меню та FAQ розгортаються з клавіатури з вимкненим JavaScript. [Відступ для фокуса під липкою шапкою](https://www.w3.org/WAI/WCAG22/Techniques/css/C43) · [Навігація-розкриття](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/)
- Axe 4.14.0 з правилами WCAG 2.2 повідомив 0 порушень у п’яти станах. Правило мінімального розміру цілей пройшло в усіх п’яти. Для контрасту поверх ілюстрацій зроблено 36 додаткових вимірів. Найнижчий коефіцієнт становив 6,42:1. Найнижчий контраст перевірених пар тексту й однотонного тла — 4,89:1. [WCAG Contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) · [WCAG Target Size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
- Дерево доступності Chrome показує назви посилань і нативні стани розкриття меню та FAQ. У `forced-colors` видно фокус меню. У режимі `prefers-reduced-motion` прокручування миттєве, тривалість вхідної анімації 0,01 мс. Окремий прогін із системним скринрідером залишено для QA.
- `npm.cmd --prefix website run check` перевірив 41 файл без помилок і попереджень. Пройшли 12 тестів, статична збірка й `git diff --check`. JSON-звіти та знімки Chrome збережено у `%TEMP%/eso-phase11-71af24783a/after/`, контрольний аудит у `before/`.

### Ручна перевірка

1. Запустіть `npm.cmd --prefix website run build` і `npm.cmd --prefix website run preview -- --host 127.0.0.1 --port 4321`.
2. На головній натисніть `Tab`, потім `Enter` на **Skip to content**. У мобільному меню перевірте `Enter`, `Space`, `Escape` та вихід фокуса через крайні пункти. Перемкніть ширину між 1023 і 1024 px, коли вибрано пункт меню.
3. Перегляньте **Download** на 640 і 768 px та з текстом 200%. На [404](http://127.0.0.1:4321/phase11-missing) перевірте **Back to homepage** та посилання меню на секції головної.

Запропонований коміт після дозволу — `fix: improve responsive layout and keyboard accessibility`.

## Phase 12 — CI/CD & Deployment Configuration

Phase 11 погоджено 28 листопада 2026 року. На початку етапу `origin/main` вказував на `d494d935771d0bdaac9eff88c0e6a481e1791827` із успішною публікацією Vite. Віддаленої `rebuild/astro` ще немає. Новий production-тригер збережено поза `.github/workflows/` як шаблон до Phase 14. [Чинний deployment GitHub Actions](https://github.com/eso-addons-manager/eso-addons-manager.github.io/actions/runs/45899253144)

| Файл | Зміна |
| --- | --- |
| `.github/workflows/astro.yml` | Додано Node 26, `npm ci` з кешем `website/package-lock.json`, ESLint, `astro check`, тести, збірку з валідацією контенту та перевірку артефакту. Під час preview завантажується ZIP на сім днів. Для production-виклику підготовлено GitHub Pages deploy. |
| `.github/deploy-astro.yml` | Створено шаблон заміни чинного `.github/workflows/deploy.yml`. Після заміни workflow реагуватиме на push у `main`, ручний запуск і плановий запуск на 17-й хвилині кожної години UTC. |
| `website/eslint.config.mjs`, `website/package.json`, `website/package-lock.json` | Додано `lint` і `verify:build`. ESLint 10.16.0, `eslint-plugin-astro` 3.2.2 і `typescript-eslint` 8.74.0 зафіксовано як dev-залежності. Для відтворення всього набору перевірок використовуйте Node 26. [Astro і ESLint](https://docs.astro.build/en/guides/editor-setup/#eslint) |
| `website/src/data/github.ts`, `website/scripts/prepare-scheduled-release.mjs`, `website/tests/releases.test.mjs` | Додано перевірку SHA та відбитка опублікованого знімка для розкладу, передавання підготовленого знімка в збірку й п’ять тестів планового оновлення. |
| `website/scripts/verify-build.mjs` | Перевіряє головну, 404 із `noindex`, sitemap, robots.txt, відбиток релізних даних, SHA артефакту, локальні ресурси й посилання на якорі. |

### Події й публікація

| Подія | Результат |
| --- | --- |
| Push у `rebuild/astro` | Повна перевірка й preview-артефакт. Збереження у Pages CMS після підключення цієї гілки використовує звичайну подію `push`. |
| Pull request до `main` | Повна перевірка й preview зі знімком релізу в репозиторії. Для зовнішніх PR діють правила схвалення GitHub Actions. |
| **Run workflow** у **Astro website** | Preview. Прапорець **Fetch the current GitHub release for the preview** вмикає живий GitHub API. Новий workflow з’явиться для ручного запуску після додавання його файлу до default branch. |
| Push у `main` або **Run workflow** в **Deploy website to GitHub Pages** після Phase 14 | Збірка з актуальними релізними даними, перевірки, Pages-артефакт із `website/dist/` і публікація після звірки поточного SHA `main`. |
| Розклад після Phase 14 | Порівняння SHA сайту й відбитка релізу. Зміна будь-якого запускає перевірки та збірку. Узгоджений знімок передається напряму в Astro. За відмови GitHub API валідні опубліковані дані використовуються для нового SHA сайту. Якщо джерела обидва недоступні, плановий запуск пропускає публікацію. |

Лише workflow, що передає `publish: true`, може запросити production-шлях. Його перевірка вимагає репозиторій `eso-addons-manager/eso-addons-manager.github.io`, `refs/heads/main` і дозволену подію. Збірка використовує `contents: read`, а job `deploy` додає `pages: write` та `id-token: write`. Production-шаблон передає ці дозволи як верхню межу для reusable workflow. `configure-pages` виконує перевірку з `enablement: false`. Перевірка SHA `main` використовує короткочасний `github.token` job і GitHub CLI. Релізний API публічний і працює без PAT. [Reuse workflows](https://docs.github.com/en/actions/how-tos/reuse-automations/reuse-workflows) · [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)

Production-запуски серіалізуються в групі `github-pages`. Перед публікацією застарілий SHA пропускається. Pages-артефакт містить номер спроби в назві, яку build job передає deploy job. Повний повтор створює окремий артефакт, а повтор лише невдалого deploy використовує назву успішної збірки за умови, що її артефакт ще доступний. Розклад виконується на default branch, може затримуватися й вимикається GitHub після 60 днів без активності публічного репозиторію. [Планові події GitHub Actions](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule) · [Повторний запуск workflow](https://docs.github.com/en/actions/how-tos/manage-workflow-runs/re-run-workflows-and-jobs)

### Перевірки

- У чистій копії `website/` на Windows і Node 26.13.1 виконано `npm ci`, `npm run lint`, `npm run check`, `npm test`, `npm run build` і `npm run verify:build`. Пройшли 17 тестів, типізація 44 файлів і перевірка 38 статичних ресурсів. Окремо збірка й перевірка артефакту пройшли в робочому каталозі.
- `actionlint` 1.7.12 перевірив CI, production-шаблон і чинний Vite workflow. Git Bash виконав перевірку SHA з підставленими відповідями для актуального та застарілого `main`. Зіставлено тригери, дозволи і SHA всіх action pins із репозиторіями GitHub.
- Живий виклик планової перевірки підготував `v0.4.0` і `siteSha`. Наступна збірка віддала побайтово той самий `/_data/releases.json`. Моніторинг `fetch` зафіксував нуль додаткових запитів розділу релізів під час збірки. Знімок із SHA іншого коміту відхилено.
- Створено й розпаковано тестовий preview ZIP, перевірено файли production TAR. Розпакований ZIP відкрився через локальний HTTP від кореня, включно з ресурсами, 404.html і релізними даними. `git diff --exit-code` підтвердив стан вихідного Vite workflow і файлів legacy-сайту.

### Ручна перевірка і перемикання

1. Після окремо погодженого commit і push тестової гілки відкрийте **Actions → Astro website**, виберіть запуск для SHA `rebuild/astro` та завантажте **Artifacts → astro-preview-…**. Розпакуйте архів в окрему папку й запустіть `py -m http.server 4321 --bind 127.0.0.1 --directory "<папка>"`. Відкрийте `http://127.0.0.1:4321/`. У цьому перегляді відкривайте сторінку помилки за `/404.html`. [Завантаження артефактів GitHub Actions](https://docs.github.com/en/actions/how-tos/manage-workflow-runs/download-workflow-artifacts)
2. Після підключення GitHub App за інструкцією Phase 8 виберіть `rebuild/astro` у Pages CMS. Збережіть тестову правку через **Save**. У GitHub звірте SHA нового коміту з запуском **Astro website**, подією `push` та `siteSha` у `/_data/releases.json` із його preview. Це підтвердить зовнішній тригер. [Подія push](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#push) · [Джерело подій для токенів](https://docs.github.com/en/actions/concepts/security/github_token)
3. У Phase 14 після окремого погодження замініть `.github/workflows/deploy.yml` вмістом `.github/deploy-astro.yml` в одному коміті активації та перевірте **Settings → Pages → Build and deployment → Source → GitHub Actions**. У **Actions → Deploy website to GitHub Pages** відстежте deploy, звірте production URL і SHA в `/_data/releases.json`. Відкат переходу виконується `git revert` коміту активації після дозволу. [GitHub Pages deployment](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)

Запропонований коміт після дозволу — `ci: configure Astro checks and Pages deployment`.

## Phase 13 — Quality Assurance

Phase 12 погоджено 28 листопада 2026 року. Для приймання зібрано свіжу копію поточного Astro в режимі `live`, запаковано QA-артефакти, перевірено редакторський цикл і відпрацьовано відкат. Зміни етапу в репозиторії зафіксовано в `MIGRATION_PLAN.md`. Робочі дані, тимчасові репозиторії, знімки браузерів і звіти знаходяться в `%TEMP%/eso-phase13-629c07e5bd/`.

| Перевірка | Результат |
| --- | --- |
| Збірка з живим GitHub API | `npm run lint`, `npm run build` і `npm run verify:build` пройшли. `v0.4.0` з’явився в Download і `/_data/releases.json`. Перевірено дві сторінки та 38 локальних ресурсів. [Реліз v0.4.0](https://github.com/powerbq/eso-addons-manager/releases/tag/v0.4.0) |
| Зовнішні посилання | 16 унікальних HTTPS URL зі зібраної головної повернули HTTP 200 на `HEAD`. Для дев’яти пакетів і `SHA256SUMS` сервер повідомив розміри з GitHub API. Запити першого байта всіх дев’яти пакетів повернули HTTP 206. Усі дев’ять назв присутні у файлі `SHA256SUMS`. |
| Маршрути й браузери | Дев’ять маршрутів у `astro preview` дали очікувані статуси. Корінь і `/index.html` містять однаковий canonical, а старий шлях із префіксом, `/changelog/` і вигаданий шлях віддають брендовану 404. Chrome 158 і Microsoft Edge 158 пройшли перевірку на 320, 390, 768 і 1440 px. Перевірено відсутність горизонтального прокручування, Hero, Download, FAQ, мобільне меню, оригінали галереї та шлях із 404 на головну. Після повернення на вже завантажену головну повторна перевірка HTTP-кешу може повертати 304. |
| Сценарії API | Шість окремих збірок перевірили ліміт API з валідним кешем, відмову API з невалідним кешем, відсутність стабільного релізу, несумісні пакети, неправильне URL вкладення й неочікуваний prerelease. Для кожної збіглися стан Download, `softwareVersion` у JSON-LD і релізний JSON. За відсутності пакетів відображалося одне посилання на GitHub Releases. |
| CMS і валідація | Серіалізатор Pages CMS 2.1.8 змінив FAQ, Markdown-крок і посилання на зображення в тимчасовій копії. Lint, `astro check`, 17 тестів, збірка й перевірка артефакту пройшли. Посилання на неіснуючий якір, яке пропустила форма, зупинило статичну збірку. Зворотний патч відновив JSON і Markdown побайтово та вилучив тестове зображення. [Pages CMS 2.1.8](https://github.com/hunvreus/pagescms/releases/tag/2.1.8) |
| Готовий артефакт | `astro-qa-preview.zip` і `astro-qa-pages.tar` містять по 54 статичні файли. SHA-256 кожного файла після розпакування збігається з вихідним build. Кореневі `index.html`, `404.html`, sitemap, robots.txt і `/_data/releases.json` присутні. Для перевірки перенесення поля `siteSha` використано контрольний SHA поточного `origin/main`. Після погодженого commit GitHub Actions збере артефакт із SHA Astro-коміту. |
| Відкат Vite | `git archive` відтворив `d494d93` в окремій директорії. Після застосування шаблону активації `git apply --reverse` відновив `.github/workflows/deploy.yml` побайтово. `npm ci`, `npm run typecheck` і `npm run build` видали Vite-артефакт із кореневим canonical. |

Перший зворотний `git apply` попередив про CRLF у вихідному Vite workflow. Повтор із `core.whitespace=cr-at-eol` пройшов зі збереженням точних байтів. `npm ci` у Vite повідомив про postinstall `esbuild@0.25.12` поза списком `allowScripts`. У цьому середовищі встановлений платформний пакет `esbuild` забезпечив успішне збирання. `actionlint` перевірив чинний workflow, Astro CI і шаблон активації.

Звіти `browser-report.json`, `external-links.json`, `download-ranges.json`, `release-scenarios-report.json`, `artifact-files.json` і `archive-hashes.json` збережено поруч із ZIP та TAR. GitHub Actions на `rebuild/astro` і реальний **Save → push → CI** ще потребують окремого дозволу на commit і push тестової гілки та підключеної GitHub App. `git ls-remote` підтвердив, що гілка досі локальна. Прогін із системним скринрідером і фізичними пристроями залишається для ручного приймання. [GitHub push](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#push) · [Pages CMS Quick start](https://pagescms.org/docs/quick-start/)

### Ручна перевірка

1. Розпакуйте `astro-qa-preview.zip` в окрему папку й відкрийте її через `py -m http.server 4321 --bind 127.0.0.1 --directory "<папка>"`. Перевірте головну, Download, повнорозмірний скриншот і `/404.html`. Для перевірки HTTP-статусу вигаданої адреси використовуйте `astro preview` або погоджений production.
2. На фізичному телефоні й планшеті перевірте меню, перехід до Download і відкриття скриншота. У браузері зі скринрідером перевірте **Skip to content**, назви посилань галереї та стан розкриття меню і FAQ.
3. Після дозволу на commit і push у `origin/rebuild/astro` відкрийте запуск **Actions → Astro website**. Після підключення Pages CMS збережіть тестову правку й звірте SHA коміту зі свіжим `push`-запуском і `siteSha` у preview-артефакті. Інструкцію з відкату production-переходу наведено в Phase 12.

Запропонований коміт після дозволу — `docs: record Astro QA and rollback rehearsal`.
