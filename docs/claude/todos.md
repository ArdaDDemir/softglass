# Softglass — TODO

> **v1.0.0:** shipped (2026-07-29).  
> **v1.1 planı (tek kaynak):** [v1.1-plan.md](./v1.1-plan.md) — sprint’ler, DoD, yapma listesi orada.  
> Bu dosya checkbox özeti; detay planda.

---

## A) Must — v1 çıkış (bitti)

- [x] Paket adı + npm scope `@softglass/*`
- [x] `dist` dual CJS+ESM + d.ts/d.mts
- [x] Publish-ready package.json
- [x] Consumer GETTING-STARTED
- [x] GitHub + tag `v1.0.0`
- [x] CHANGELOG + LIMITATIONS
- [x] npm publish tokens + ui
- [x] Consumer smoke
- [x] README hero (hand SVG)

---

## B) Should — v1 kalite (bitti)

- [x] A11y (Tabs, Modal focus trap)
- [x] Contrast notları
- [x] Form kit minimi + Alert/Skeleton/Spinner
- [x] Playground Get started
- [x] CI
- [x] Version sync `1.0.0`

### B2) Visual bugs (bitti)

- [x] Modal center / portal
- [x] Toast stack shadow

---

## C) v1.1 — sprint checklist

> Sıra: **A → B → C → D → E**. Aynı anda tek sprint.  
> Detay: [v1.1-plan.md](./v1.1-plan.md).

### Sprint A — Overlay ailesi

- [x] API kararı (isim, portal yok v1, controlled opsiyonel)
- [x] `Popover`
- [x] `DropdownMenu`
- [x] Playground + API.md + LIMITATIONS
- [x] (Opsiyonel) `ContextMenu` — **bilinçli hayır** (park)
- [ ] Self-review (plan §7) — kullanıcı / taze session

### Sprint B — Motion polish

- [x] Exit pattern — `usePresence` + `data-state` / `data-leaving`
- [x] Modal exit
- [x] Select / Dropdown / Popover exit
- [x] Toast stack motion (leave duration sync, bottom column-reverse, reflow)
- [x] Reduced-motion → duration 0
- [ ] (Opsiyonel) Card tilt / label-float / directional tabs — park

### C2) Motion — v1’den kalan

- [x] Dalga 0–5 (kısmi)
- [x] Exit animations → **Sprint B**
- [x] Toast stack motion → **Sprint B**
- [ ] Card tilt → park
- [ ] label-float / directional tabs → park

### Sprint C — Registry install path

- [x] Schema + item path/target (generate script, 24 items)
- [x] Host stratejisi — **GitHub root registry** + built `public/r`
- [x] Validate: `npm run registry:validate` yeşil
- [x] Build: `npm run registry:build` → button/tokens content+target
- [x] Smoke: built JSON → target path’lere yazıldı (tokens + button)
- [x] REGISTRY.md + GETTING-STARTED + README + PUBLIC-MODEL
- [ ] Self-review / GitHub’da `list ArdaDDemir/softglass` (push sonrası)

### Sprint D — Form derinliği

- [x] Combobox (type-to-filter, option-only)
- [x] MultiSelect (chips + maxSelected)
- [ ] (Sonra / 1.2) DatePicker — ayrı mini-plan

### Sprint E — Kalite & vitrin (1.1 sonu veya 1.2)

- [ ] Vitest + Testing Library
- [ ] Visual regression
- [ ] Storybook / docs site
- [ ] Figma / token JSON
- [ ] Animated README GIF
- [ ] Theme builder

---

## D) Ürün / iletişim (v1 bitti)

- [x] İsim Softglass
- [x] Pitch
- [x] README hero still
- [x] “Ne değil?”
- [x] CONTRIBUTING

---

## E) Yapma (scope — 1.1’de de geçerli)

- DataTable şişirmesi
- Radix-seviyesi Select full clone (ihtiyaç + 1.2 kararı)
- 4 dil daha
- Framer Motion dependency
- Nested dialog stack
- Yanlış hesaba push / publish
- Plansız “yoldayken ufak fix” (kapsam dışı → park + ayrı task)

---

## Publish checklist (v1.0 — bitti)

1. [x] npm org `softglass`
2. [x] `npm whoami` kişisel
3. [x] org owner
4. [x] GitHub `ArdaDDemir/softglass`
5. [x] repository URL’ler
6. [x] commit + push + tag `v1.0.0`
7. [x] pack:check
8. [x] npm publish tokens → ui
9. [x] consumer smoke test

### v1.1 publish (sprint’ler bitince — henüz değil)

1. [ ] Version sync `1.1.0` (tokens + ui)
2. [ ] CHANGELOG `[1.1.0]`
3. [ ] typecheck + build + pack:check
4. [ ] Consumer smoke (npm veya local pack)
5. [ ] Tag `v1.1.0` + publish — **sadece kullanıcı onayıyla**

---

## Plan onay kutuları (kilitli — 2026-07-29)

- [x] 1.1.0 kapsamı: **`A+B`**
- [x] ContextMenu Sprint A’da mı? **H**
- [x] Registry host tercihi: **C’de**
- [x] İlk sprint: **A**

---

## Şu an bitti (v1)

- 4 dil, UI kit, look+motion, playground, docs, MIT
- npm + GitHub + hero
- Smoke: Next 16 + React 19 consumer build OK

## Polish (PR öncesi)

- [x] MultiSelect chip remove + larger X + placeholder align  
- [x] Select menu stacking above cards  
- [x] Looks demo selects one-per-row  
- [x] CHANGELOG Unreleased tidy (1.1 candidate)  
- [x] README / CONTRIBUTING registry scripts  
- [x] typecheck + build:ui  

## Şu an sıradaki

1. [x] A–D + polish  
2. **PR aç** (kullanıcı onayı — push yok otomatik)  
3. **1.1.0 publish** (version bump + npm/tag — ayrı onay)  
4. E / DatePicker — 1.1 sonrası
