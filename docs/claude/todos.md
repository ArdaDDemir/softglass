# Softglass — TODO

> **v1.0.0:** shipped · **v1.1.0:** shipped (2026-07-29) · **v1.2.0:** release branch hazır (publish/tag bekliyor).  
> **v1.1 plan (arşiv):** [v1.1-plan.md](./v1.1-plan.md)  
> **v1.2 plan (tek kaynak detay):** [v1.2-plan.md](./v1.2-plan.md)  
> Bu dosya checkbox özeti. **Publish:** kişisel gh/npm (`ArdaDDemir` / `ardaddemir`); work hesabı yok.

---

## Şu an durum

| Sürüm | Durum |
|-------|--------|
| 1.0.0 | shipped |
| 1.1.0 | **shipped** (kit + registry + motion + form depth) |
| **1.2.0** | **release hazır** — kod + version bump; npm/tag **senin onayın** |

**Repo:** https://github.com/ArdaDDemir/softglass  
**Hesap disiplini:** gh/npm → kişisel (`ArdaDDemir` / `ardaddemir`); work/Feedemy yok.

---

## v1.1 — bitti (özet)

- [x] A Overlay — Popover, DropdownMenu  
- [x] B Motion exit — usePresence  
- [x] C Registry — root registry.json + public/r  
- [x] D Form — Combobox, MultiSelect  
- [x] Polish + PR #1 + npm/tag `v1.1.0`  

---

## v1.2 — ne yapmalıyız? (önerilen)

> **Ürün cümlesi (öneri):**  
> *1.2 = ContextMenu + DatePicker (form tamamlayıcı) + minimum test iskeleti; docs site/theme builder şişirmesin.*

### Neden bu sıra?

1. **ContextMenu** — A’da park; DropdownMenu ailesi yarım kalmasın.  
2. **DatePicker** — D’de bilerek dışarıda; form kit’in en çok istenen eksiği.  
3. **Vitest iskeleti** — 1–2 smoke test; full suite değil.  
4. **Overlay portal + collision (hafif)** — Select/menu hâlâ absolute; sticky/overflow edge case.  
5. **Docs site / Storybook / theme builder** — vitrin; 1.2’yi geciktirmesin → 1.3 veya “nice”.

### Sprint haritası (tek açık sprint)

```
1.2a  ContextMenu (+ belki Dropdown submenu yok)
  → 1.2b  DatePicker (tek ay / range opsiyonel sonra)
    → 1.2c  Test iskeleti (Vitest + 2–3 component smoke)
      → 1.2d  Overlay portal polish (Select/Combobox/MultiSelect/Dropdown/Popover)
        → 1.2e  (nice) Motion leftovers / README GIF
          → 1.2.0 publish
```

### Sprint 1.2a — ContextMenu

- [x] API: `items` (DropdownMenu ile aynı dil) + `children` surface  
- [x] Sağ tık + long-press (touch min)  
- [x] Escape / dış tık / focus restore  
- [x] motion enter/exit (usePresence; frost menu chrome)  
- [x] Playground + API.md + LIMITATIONS  
- [x] registry generate/build  

**Yapma:** Submenu ağacı, full OS parity.

### Sprint 1.2b — DatePicker

- [x] Tek tarih seçimi (controlled `value` / `onValueChange`, ISO `YYYY-MM-DD`)  
- [x] Ay navigasyonu; softglass dil (frost panel, solid trigger)  
- [x] Klavye (oklar / Enter / Escape / PageUp-Down)  
- [x] `label` / `hint` / `error` field meta  
- [x] Playground + docs + registry  
- [x] LIMITATIONS: range, time, locale i18n → 1.3  

**Yapma:** Full calendar suite, timezone engine, RHF adapter.

### Sprint 1.2c — Test iskeleti (kalite min)

- [x] Vitest + Testing Library monorepo setup (`packages/ui`)  
- [x] Smoke: Button, Combobox filter, MultiSelect remove chip  
- [x] Smoke: usePresence (open → closed unmount)  
- [x] `npm test` script root’ta  
- [x] CI’ya `test` adımı (mevcut workflow’a ekle)  

**Yapma:** %100 coverage, Chromatic, Playwright full E2E.

### Sprint 1.2d — Overlay portal polish

- [x] Select / Combobox / MultiSelect / Dropdown / Popover: body portal + fixed coords  
- [x] Viewport collision (top/bottom flip + left/right clamp)  
- [x] Scroll/resize reposition (overflow ancestors via capture scroll)  
- [x] LIMITATIONS güncelle  

**Not:** DatePicker / ContextMenu bu sprint listesinde değil; DatePicker hâlâ absolute. 

### Sprint 1.2e — Nice (1.2 sonu veya 1.3)

- [ ] Card tilt motion (opsiyonel)  
- [ ] label-float / directional tabs content  
- [ ] Combobox: creatable / async search (API iskeleti)  
- [ ] MultiSelect: filter-in-menu  
- [ ] Animated README GIF (hero still var)  
- [ ] Token JSON export (Figma bridge min)  

### 1.2.0 publish checklist

1. [x] Version sync `1.2.0` (tokens + ui + root + web)  
2. [x] CHANGELOG `[1.2.0]`  
3. [x] typecheck + build + test + pack:check (release worktree)  
4. [ ] `npm whoami` = kişisel; org softglass  
5. [ ] publish tokens → ui  
6. [ ] tag `v1.2.0` + push (ArdaDDemir)  

**1.2e nice** bilinçli atlandı (1.2’yi geciktirmesin).

---

## v1.2 — bilinçli YAPMA

- DataTable  
- Full Radix Select rewrite  
- 4 yeni dil  
- Framer Motion dependency  
- Nested modal stack  
- Storybook + Chromatic full (1.3 vitrin)  
- Theme builder (canlı accent SaaS)  
- i18n / RTL suite  
- Yanlış hesaba push/publish  

---

## v1.3+ backlog (not; 1.2 değil)

- Docs marketing site / Storybook  
- Visual regression (Chromatic veya ucuz alternatif)  
- Date range + time picker  
- Theme builder  
- Figma tokens pipeline  
- Community languages process  

---

## Yeni session başlangıç komutu

```text
Softglass v1.2 — docs/claude/todos.md + v1.2-plan.md
Repo: ArdaDDemir/softglass (kişisel gh/npm)
İlk sprint: 1.2a ContextMenu
main'den worktree; work hesabına push yok
```

---

## Eski arşiv (1.0 / 1.1 detay)

v1.0 Must/Should ve v1.1 sprint checkbox detayları → [v1.1-plan.md](./v1.1-plan.md) + git history.  
Bu dosyada aktif odak **yalnızca 1.2**.
