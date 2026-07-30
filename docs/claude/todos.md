# Softglass — TODO

> **v1.0–v1.2:** shipped · **v1.3.0** — atom layer complete in worktree `softglass-v1.3a-progress` / branch `feat/v1.3-progress` (publish checklist).  
> **Plan detay:** [v1.3-plan.md](./v1.3-plan.md) · arşiv [v1.2-plan.md](./v1.2-plan.md) · [v1.1-plan.md](./v1.1-plan.md)  
> Bu dosya checkbox özeti. **Hesap:** gh **ArdaDDemir** · npm **ardaddemir** · work/Feedemy **YASAK**.  
> **Kural:** 1.3 Must atomlar bitmeden 1.4 molecule’e geçilmez (Must bitti).

---

## Şu an durum

| Sürüm | Durum |
|-------|--------|
| 1.0.0 – 1.2.0 | **shipped** |
| **1.3.0** | **kod + docs hazır** — publish tokens→ui + tag (kişisel hesap) |
| 1.4.0 | molecule seti (Must bitti → açılabilir) |
| 1.5.0 | organism + product patterns |
| 1.6+ | docs site / visual / theme builder |

**Repo:** https://github.com/ArdaDDemir/softglass  
**Hesap:** gh `ArdaDDemir` · npm `ardaddemir` · work/Feedemy **yok**.

---

## v1.2 — bitti (özet)

- [x] ContextMenu  
- [x] DatePicker (day/month/year)  
- [x] Vitest smokes + CI test  
- [x] Overlay portals (Select/Combobox/MultiSelect/Dropdown/Popover)  
- [x] npm/tag `v1.2.0`  

---

## v1.3 — Atom katmanı kapanışı

> **Ürün cümlesi:**  
> *1.3 = form + feedback + link/chip tuğlaları; molecule’e geçmeden atom Must biter.*

### Sprint haritası

```
1.3a  Progress + StatusDot
  → 1.3b  Slider + NumberInput + FileField
    → 1.3c  Link + Chip + CloseButton + Password/Search + VisuallyHidden
      → 1.3d  Should atoms (Segmented, Pin, Kbd, …)
        → 1.3e  Nice / extract
          → 1.3.0 publish
```

### Sprint 1.3a — Feedback atoms

- [x] `Progress` — linear; value + indeterminate; sizes; softglass surface  
- [x] `StatusDot` — semantic statuses  
- [x] Playground + API.md + LIMITATIONS  
- [x] registry generate/build  
- [x] typecheck + test smoke (Progress)  

**Yapma:** charts, KPI dashboard.  
**Branch:** `feat/v1.3-progress` (worktree `softglass-v1.3a-progress`) — push/PR kullanıcı onayı.  
**Not:** CircularProgress 1.3d Should’a bırakıldı (plan opsiyonu).

### Sprint 1.3b — Form controls

- [x] `Slider` — controlled value; min/max/step; label/hint/error  
- [x] `NumberInput` — steppers; min/max/step  
- [x] `FileField` — solid field; basic file name list (no upload backend)  
- [x] Playground + docs + registry  
- [x] Keyboard basics (Slider arrows)  

**Yapma:** multi-file cloud dropzone, range product.  
**Playground:** sidebar → **Slider · Number · File**

### Sprint 1.3c — Chrome atoms

- [x] `Link` — href; external optional; softglass text link  
- [x] `Chip` — selectable + removable  
- [x] `CloseButton` — shared dismiss control  
- [x] `PasswordInput` **veya** Input reveal pattern  
- [x] `SearchInput` — free text + clear (not Combobox)  
- [x] `VisuallyHidden`  
- [x] Playground + docs + registry  

**Yapma:** icon pack, typography kit.  
**Playground:** sidebar → **Link · Chip · Fields**

### Sprint 1.3d — Should (1.3.x)

- [x] `SegmentedControl`  
- [x] `PinInput` (OTP)  
- [x] `Kbd` + inline `Code`  
- [x] `CircularProgress` (1.3a’da yoksa)  
- [x] `NavLink`  
- [x] `ListItem`  
- [x] `SkipLink`  
- [x] `CharacterCount`  
- [x] `Fieldset`  
- [x] `Icon` wrapper (set yok)  
- [x] `Image` framed + fallback  
- [x] `Meter`  
- [x] `CopyButton`  
- [x] `TimeInput` (HH:mm; no TZ)  
- [x] `ClientOnly`  
- [x] `ScrollArea` (hafif)  
- [x] `Rating`  
- [x] `AspectRatio`  

**Playground:** sidebar → **Should · 1.3d** (1.3d Should set complete)  

### Sprint 1.3e — Nice

- [x] `RangeSlider`  
- [x] `ColorSwatch` / basit ColorInput  
- [x] `ToggleGroup`  
- [x] Chip variants: filter/check (veya Chip API)  
- [x] `CountBadge` (veya Badge)  
- [x] `Highlight`, `Truncate`  
- [x] `LiveRegion`  
- [ ] DatePicker extract: Calendar / Month / Year (refactor) — **bilinçli erteleme** (refactor risk; 1.4d/ayrı task)  
- [x] `NativeDateInput` skin  
- [x] `Text` / `Heading` (hafif; kit iddiası yok)  

**Playground:** sidebar → **Nice · 1.3e**  

### 1.3.0 publish checklist

1. [x] Version `1.3.0` (tokens + ui + root + web)  
2. [x] CHANGELOG `[1.3.0]`  
3. [x] typecheck + test (39) + build:ui + pack:check (1.3.0 tarballs dry-run OK)  
4. [ ] npm/gh **kişisel** — npm = **ardaddemir** ✓ · **gh ACTIVE hâlâ ArdaFeedemy** → push öncesi `gh auth switch` → **ArdaDDemir**  
5. [ ] publish **tokens** → **ui** (sadece 4 OK ise; work hesabı YASAK)  
6. [ ] tag `v1.3.0` + push (sadece ArdaDDemir)  

### v1.3 bilinçli YAPMA

- Icon pack / Lucide clone  
- Full Typography system / Box-Stack layout kit  
- DataTable  
- Framer Motion  
- Theme builder  
- Date **range** suite (1.5/1.6)  
- Storybook+Chromatic full (1.6)  
- Yanlış hesaba push  

---

## v1.4 — Molekül seti (1.3 Must sonrası)

> Atom 1.3a–c bitmeden **başlama**.

### 1.4a — Disclosure & nav

- [ ] Accordion / Collapsible  
- [ ] Breadcrumb  
- [ ] Pagination  

### 1.4b — Surface

- [ ] EmptyState  
- [ ] Sheet / Drawer  
- [ ] HoverCard  

### 1.4c — Structure

- [ ] Stepper (basit wizard)  
- [ ] Toolbar  
- [ ] List (ListItem üstüne)  
- [ ] Stat / metric tile  

### 1.4d — Overlay/form polish

- [ ] DatePicker body portal  
- [ ] Combobox creatable / async iskelet (nice)  
- [ ] MultiSelect filter-in-menu  

### 1.4 YAPMA

- Command palette full, Menubar OS, nested modals, DataTable  

---

## v1.5 — Organism & patterns

### 1.5a — Shell

- [ ] AppShell: collapse sidebar, mobile drawer polish  
- [ ] PageHeader (title + actions + crumbs)  

### 1.5b — Composite

- [ ] SettingsSection pattern  
- [ ] CommandPalette minimal (search + list)  
- [ ] Auth/settings playground recipes (composite export opsiyonel)  

### 1.5c — Quality

- [ ] Daha fazla smoke test (Slider, Progress, Chip…)  
- [ ] TimePicker **veya** Date range (birini seç)  
- [ ] API + LIMITATIONS refresh  

### 1.5 YAPMA

- Full DataTable, Theme builder SaaS, zorunlu Storybook farm  

---

## v1.6+ backlog (platform / vitrin)

- [ ] Docs marketing site / Storybook  
- [ ] Visual regression (Chromatic veya ucuz)  
- [ ] Theme builder  
- [ ] Token JSON / Figma bridge  
- [ ] i18n / RTL suite  
- [ ] Community languages  
- [ ] Full calendar suite (range + time + locale packs)  

---

## Yeni session başlangıç komutu

```text
Softglass v1.3 — docs/claude/todos.md + v1.3-plan.md
Repo: ArdaDDemir/softglass (kişisel gh/npm)
İlk sprint: 1.3a Progress + StatusDot
main'den worktree; work hesabına push yok
Atom Must bitmeden molecule yok
```

---

## Arşiv

v1.0–v1.2 detay → [v1.2-plan.md](./v1.2-plan.md) + [v1.1-plan.md](./v1.1-plan.md) + git history.  
Aktif odak: **1.3.0 publish** (kişisel hesap) — sonra 1.4 molecule.
