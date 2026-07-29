# Softglass — TODO

> **v1.0–v1.2:** shipped · **v1.2.0** (2026-07-29) — npm `@softglass/tokens@1.2.0` + `@softglass/ui@1.2.0`, tag `v1.2.0`, PR #2 merged.  
> **Plan detay:** [v1.3-plan.md](./v1.3-plan.md) · arşiv [v1.2-plan.md](./v1.2-plan.md) · [v1.1-plan.md](./v1.1-plan.md)  
> Bu dosya checkbox özeti. **Yeni session:** `main` + `ArdaDDemir/softglass` + kişisel npm/gh.  
> **Kural:** 1.3 Must atomlar bitmeden 1.4 molecule’e geçilmez.

---

## Şu an durum

| Sürüm | Durum |
|-------|--------|
| 1.0.0 – 1.2.0 | **shipped** |
| **1.3.0** | **sıradaki** — atom katmanı kapanışı (plan yazıldı, kod yok) |
| 1.4.0 | molecule seti (1.3 Must sonrası) |
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

- [ ] `Progress` — linear; value + indeterminate; sizes; softglass surface  
- [ ] `StatusDot` — semantic statuses  
- [ ] Playground + API.md + LIMITATIONS  
- [ ] registry generate/build  
- [ ] typecheck + test smoke (Progress)  

**Yapma:** charts, KPI dashboard.

### Sprint 1.3b — Form controls

- [ ] `Slider` — controlled value; min/max/step; label/hint/error  
- [ ] `NumberInput` — steppers; min/max/step  
- [ ] `FileField` — solid field; basic file name list (no upload backend)  
- [ ] Playground + docs + registry  
- [ ] Keyboard basics (Slider arrows)  

**Yapma:** multi-file cloud dropzone, range product.

### Sprint 1.3c — Chrome atoms

- [ ] `Link` — href; external optional; softglass text link  
- [ ] `Chip` — selectable + removable  
- [ ] `CloseButton` — shared dismiss control  
- [ ] `PasswordInput` **veya** Input reveal pattern  
- [ ] `SearchInput` — free text + clear (not Combobox)  
- [ ] `VisuallyHidden`  
- [ ] Playground + docs + registry  

**Yapma:** icon pack, typography kit.

### Sprint 1.3d — Should (1.3.x)

- [ ] `SegmentedControl`  
- [ ] `PinInput` (OTP)  
- [ ] `Kbd` + inline `Code`  
- [ ] `CircularProgress` (1.3a’da yoksa)  
- [ ] `NavLink`  
- [ ] `ListItem`  
- [ ] `SkipLink`  
- [ ] `CharacterCount`  
- [ ] `Fieldset`  
- [ ] `Icon` wrapper (set yok)  
- [ ] `Image` framed + fallback  
- [ ] `Meter`  
- [ ] `CopyButton`  
- [ ] `TimeInput` (HH:mm; no TZ)  
- [ ] `ClientOnly`  
- [ ] `ScrollArea` (hafif)  
- [ ] `Rating`  
- [ ] `AspectRatio`  

### Sprint 1.3e — Nice

- [ ] `RangeSlider`  
- [ ] `ColorSwatch` / basit ColorInput  
- [ ] `ToggleGroup`  
- [ ] Chip variants: filter/check (veya Chip API)  
- [ ] `CountBadge` (veya Badge)  
- [ ] `Highlight`, `Truncate`  
- [ ] `LiveRegion`  
- [ ] DatePicker extract: Calendar / Month / Year (refactor)  
- [ ] `NativeDateInput` skin  
- [ ] `Text` / `Heading` (hafif; kit iddiası yok)  

### 1.3.0 publish checklist

1. [ ] Version `1.3.0` (tokens + ui)  
2. [ ] CHANGELOG `[1.3.0]`  
3. [ ] typecheck + test + build + pack:check  
4. [ ] npm/gh kişisel hesap  
5. [ ] publish tokens → ui  
6. [ ] tag `v1.3.0` + push  

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
Aktif odak: **1.3 atomları**.
