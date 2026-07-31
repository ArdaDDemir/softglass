# Softglass — TODO

> **v1.0–v1.7.0:** shipped (npm + tag) · plan: [v1.7-plan.md](./v1.7-plan.md)  
> Arşiv: [v1.6-plan.md](./v1.6-plan.md) · [v1.5-plan.md](./v1.5-plan.md)  
> **Hesap:** gh **ArdaDDemir** · npm **ardaddemir** · work/Feedemy **YASAK**.  
> **Kural:** Aynı anda tek sprint · otomatik push yok.

---

## Şu an durum

| Sürüm | Durum |
|-------|--------|
| 1.0.0 – 1.5.0 | **shipped** (npm + tag) |
| **1.6** | Component Studio (gallery; shipped with 1.7.0 packages) |
| **1.7.0** | DataTable + virtualization + Studio + App recipe — **shipped** |
| 1.8+ | Theme builder / marketing / Storybook |

**Repo:** https://github.com/ArdaDDemir/softglass  
**npm:** `@softglass/tokens@1.7.0` · `@softglass/ui@1.7.0`  
**Tag:** `v1.7.0`

---

## v1.5 — bitti

- [x] 1.5a–c + gallery + noir/ember  
- [x] review fixes  
- [x] 1.5.0 publish + tag  
- [x] PR #7 merge → main  

---

## v1.6 — Component Studio (Library) — bitti (main)

- [x] Hash `#library` / `#library/<id>`  
- [x] ComponentStudio chrome  
- [x] 56 playgrounds = all `COMPONENT_DOCS.id`  
- [x] CHANGELOG Unreleased  
- [x] PR #8 merge → main  
- [ ] Manual mobile pass in browser *(nice)*  

---

## v1.7 — DataTable (+ virtualization)

> Ürün listeleri: sort · selection · sticky header · density · loading/empty · Softglass looks.  
> Virtualization: planda karar 1.7-0 · ship **1.7b**.

### 1.7-0 — Plan + skeleton + Studio *(done)*

- [x] Plan + todos  
- [x] `DataTable` + `Table*` compounds  
- [x] Tokens CSS  
- [x] Studio `#library/datatable`  
- [x] Tests: sort · select · empty · loading  
- [x] Registry `data-table`  

### 1.7a — Polish *(done)*

- [x] `Checkbox.indeterminate`  
- [x] Select-all mixed state  
- [x] `getRowLabel`  
- [x] Sort `aria-label`  
- [x] Skeleton density  
- [x] Docs (API / LIMITATIONS / CHANGELOG)  

### 1.7b — Virtualization *(done)*

- [x] `virtualized` API + implementation  
- [x] 1k-row Studio showcase  
- [x] Sticky + selection regression  

### 1.7c — Gallery App (optional) *(done)*

- [x] Product list recipe demo (PageHeader + DataTable + Pagination) · `#app`

### 1.7 YAPMA

- Storybook, theme builder, marketing site  
- Excel-grid (edit cell, pivot, freeze N)  
- work hesabı push  

### 1.7.0 ship

- [x] version bump `@softglass/ui` (+ tokens) → **1.7.0**  
- [x] CHANGELOG `[1.7.0]`  
- [x] registry build  
- [x] npm publish **ardaddemir** only  
- [x] tag `v1.7.0`  
- [ ] PR merge → main *(open PR; merge when green)*  

---

## v1.8+ backlog

- [ ] Theme builder  
- [ ] Docs marketing site / Storybook  
- [ ] Visual regression  
- [ ] Token JSON / Figma bridge  
- [ ] i18n / RTL  
- [ ] Full calendar / TimePicker suite  
- [ ] DatePicker Calendar extract  

---

## Yeni session

```text
Softglass v1.7.0 shipped — DataTable + Component Studio
npm @softglass/tokens@1.7.0 · @softglass/ui@1.7.0 · tag v1.7.0
Branch feat/v1.7-datatable → PR → main
Next: 1.8+ backlog
work hesabına push yok
```
