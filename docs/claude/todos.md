# Softglass — TODO

> **v1.0–v1.5.0:** shipped (npm + tag) · **1.6:** Component Studio on main (web-only)  
> **Sıradaki:** 1.7 DataTable — plan: [v1.7-plan.md](./v1.7-plan.md)  
> Arşiv: [v1.6-plan.md](./v1.6-plan.md) · [v1.5-plan.md](./v1.5-plan.md)  
> **Hesap:** gh **ArdaDDemir** · npm **ardaddemir** · work/Feedemy **YASAK**.  
> **Kural:** Aynı anda tek sprint · otomatik push yok.

---

## Şu an durum

| Sürüm | Durum |
|-------|--------|
| 1.0.0 – 1.5.0 | **shipped** (npm + tag) |
| **1.6.0** | Component Studio — 56 playgrounds on **main** (web-only) |
| **1.7** | DataTable — branch `feat/v1.7-datatable` · **1.7-0 + 1.7a + 1.7b done** · next **1.7c optional / ship** |
| 1.8+ | Theme builder / marketing / Storybook |

**Repo:** https://github.com/ArdaDDemir/softglass  
**npm:** `@softglass/tokens@1.5.0` · `@softglass/ui@1.5.0`  
**Tag:** `v1.5.0`

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

### 1.7c — Gallery App (optional)

- [ ] Product list recipe demo (PageHeader + DataTable + Pagination)  

### 1.7 YAPMA

- Storybook, theme builder, marketing site  
- Excel-grid (edit cell, pivot, freeze N)  
- work hesabı push  

### 1.7.0 ship

- [ ] version bump `@softglass/ui` (+ tokens if CSS) → **1.7.0**  
- [ ] CHANGELOG `[1.7.0]`  
- [ ] registry build  
- [ ] npm publish **ardaddemir** only  
- [ ] tag `v1.7.0`  
- [ ] PR merge → main  

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
Softglass v1.7 DataTable — 1.7b virtualized done
Branch: feat/v1.7-datatable (WIP uncommitted until commit)
#library/datatable · virtualized + 1k showcase
Next: 1.7c optional Gallery App demo OR 1.7.0 ship
UI API → 1.7.0 version bump on ship; no auto publish
work hesabına push yok
```
