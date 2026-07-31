# Softglass — TODO

> **v1.0–v1.5.0:** shipped (npm + tag) · **Sıradaki:** 1.6 Component Studio ship  
> Plan: [v1.6-plan.md](./v1.6-plan.md) · arşiv: [v1.5-plan.md](./v1.5-plan.md)  
> **Hesap:** gh **ArdaDDemir** · npm **ardaddemir** · work/Feedemy **YASAK**.  
> **Kural:** Aynı anda tek sprint · otomatik push yok.

---

## Şu an durum

| Sürüm | Durum |
|-------|--------|
| 1.0.0 – 1.5.0 | **shipped** (npm + tag) |
| **1.6.0** | Component Studio — 56 playgrounds (branch `feat/v1.6-0-component-studio`) |
| 1.7+ | DataTable / theme builder / marketing site |

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

## v1.6 — Component Studio (Library)

> Library listesi tık → **her component’e custom sayfa**: live controls + tüm seçenek strip’leri + prop table.

### 1.6-0 — Shell + Button proof

- [x] Hash `#library` / `#library/<id>`  
- [x] `ComponentStudio` chrome (geri, stage, controls, docs)  
- [x] **Button** full matrix (variant · size · look · motion · loading · fullWidth · iconOnly)  
- [x] Library kartı tıklanınca detay  

### 1.6a–d — Full coverage (docs.ts 56)

- [x] Core atoms + display (Badge, Avatar, Alert, Spinner, …)  
- [x] Form pickers (Input, Select, Combobox, DatePicker, Slider, …)  
- [x] Molecules (Card, Tabs, Accordion, Pagination, …)  
- [x] Overlays (Modal, Sheet, menus, Toast, Tooltip, …)  
- [x] App shell (AppShell, PageHeader, SettingsSection, CommandPalette)  
- [x] Coverage = all `COMPONENT_DOCS.id`  

### 1.6 YAPMA

- Storybook farm, DataTable, Theme builder SaaS, auto prop codegen  

### 1.6.0 ship

- [x] Must sayfalar (56)  
- [ ] Manual mobile pass in browser  
- [x] CHANGELOG Unreleased  
- [ ] PR merge → main (web-only; no npm unless packages change)  

---

## v1.7+ backlog

- [ ] DataTable / virtualization  
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
Softglass v1.6 Component Studio — 56 playgrounds
Branch: feat/v1.6-0-component-studio
#library/button
web-only; npm yok unless UI touch
work hesabına push yok
```
