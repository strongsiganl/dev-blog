# blog — 프로젝트 규칙

공통 규칙은 `C:\ai\CLAUDE.md`가 진실원이다. **여기에는 이 프로젝트만의 차이만 적는다.**
규칙이 어디 사는지는 `C:\ai\체계지도.md`가 색인이다.

- **위험 태그**: **ext** — 이 저장소는 **공개 웹에 나간다**(https://strongsiganl.github.io/dev-blog/).
- **이 프로젝트만의 안전 경계**: ①**본업(회사·실무 자료)은 소재로 쓰지 않는다** ②공개되는 곳이므로 사람 이름·회사 이름·
  사내 화면·실제 수치를 글에 넣지 않는다 ③**글의 초안은 발주자가 직접 쓴다. AI는 다듬기와 사실 확인만 한다**
  (2026-08-30, DEC-PJT-009-005·006 — AI가 소재부터 통째로 쓰는 시험은 PJT-019 글쓰기시험에서 따로 한다)
  ④배포는 되돌리기 어렵다(공개 이력) — 발행 여부는 발주자가 정한다.
- **검증 명령**: 없음 — 자동 시험이 없다. `npm run build`가 통과하는지와 `npm run preview`로 눈으로 본다.

> 2026-08-30 신설(DEC-SYS-038 소급). 그 전까지 이 파일은 Astro가 만든 안내문뿐이어서 위층을 가리키지 않았다.
> 아래는 그 안내문 원문이다.

---

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
