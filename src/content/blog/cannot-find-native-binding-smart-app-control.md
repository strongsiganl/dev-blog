---
title: '"Cannot find native binding" 에러, npm 문제가 아니라 윈도우가 막은 것이었다'
description: 'Astro 블로그 빌드가 npm 오류처럼 보이는 메시지로 죽었는데, 진짜 원인은 윈도우 11의 Smart App Control이었습니다. 진단 명령과 우회 방법을 정리합니다.'
pubDate: 'Aug 02 2026'
---

블로그를 만들어 보려고 Astro를 깔았습니다. 안내대로 `npm create astro@latest` 를 치고, 아무것도 건드리지 않은 상태에서 빌드를 돌렸는데 바로 죽었습니다.

## 처음 본 화면

```
Cannot find native binding. npm has a bug related to optional dependencies
(https://github.com/npm/cli/issues/4828). Please try `npm i` again after
removing both package-lock.json and node_modules directory.
```

메시지가 친절합니다. npm에 알려진 버그가 있으니 `package-lock.json`과 `node_modules`를 지우고 다시 설치하라고 시킵니다. 링크까지 달려 있습니다.

**이 안내를 따르면 안 됩니다.** 최소한 제 경우에는 그랬습니다.

## 헛수고한 것들

시킨 대로 다 해봤습니다.

- `node_modules` 삭제 후 `npm install` — 같은 에러
- `package-lock.json`까지 삭제 후 재설치 — 같은 에러
- npm 캐시 정리 (`npm cache clean --force`) 후 재설치 — 같은 에러
- Node.js 버전 바꿔보기 — 같은 에러

네 번을 반복하고 나서야, 에러 메시지를 위로 스크롤해 봤습니다. 친절한 안내문 **위쪽**에 이런 줄이 있었습니다.

```
An Application Control policy has blocked this file.
```

이게 진짜 원인이었습니다. npm은 아무 잘못이 없었습니다.

## 무슨 일이 있었나

윈도우 11에는 **Smart App Control(스마트 앱 제어)** 라는 기능이 있습니다. 서명이 없거나 아직 평판이 쌓이지 않은 실행 파일을 아예 못 열게 막습니다. 새로 산 PC이거나 윈도우를 클린 설치한 PC에서 기본으로 켜져 있는 경우가 있습니다.

Astro 7의 기본 마크다운 처리기(Sätteri)는 속도를 위해 네이티브 바이너리(`.node` 파일)를 씁니다. 이 패키지가 나온 지 얼마 안 돼서 평판이 없었고, 그래서 차단됐습니다.

```
@bruits/satteri-win32-x64-msvc/satteri_napi.win32-x64-msvc.node
```

Node.js 입장에서는 "파일이 있는데 읽을 수가 없다"는 상황입니다. 그래서 npm의 알려진 버그(있긴 있습니다)라고 잘못 짚어 안내한 겁니다.

## 내 PC가 이 경우인지 확인하는 법

PowerShell을 열고 이벤트 로그를 봅니다.

```powershell
Get-WinEvent -LogName 'Microsoft-Windows-CodeIntegrity/Operational' -MaxEvents 5
```

여기에 **이벤트 ID 3077 또는 3033**(서명 수준 미달)과 **3118**(Smart App Control 차단 상세)이 찍혀 있으면 확정입니다.

Smart App Control이 켜져 있는지는 레지스트리로도 볼 수 있습니다.

```powershell
Get-ItemProperty 'HKLM:\SYSTEM\CurrentControlSet\Control\CI\Policy' |
  Select-Object VerifiedAndReputablePolicyState
```

`VerifiedAndReputablePolicyState` 값이 `1`이면 켜짐(Enforced), `0`이면 꺼짐, `2`면 평가 모드입니다.

## 중요: 끄는 건 되돌릴 수 없습니다

검색하면 "설정에서 Smart App Control 끄면 된다"는 답이 제일 먼저 나옵니다. 맞는 말이긴 한데, 마이크로소프트 문서에 이렇게 적혀 있습니다.

> 한 번 끄면 윈도우를 다시 설치하기 전까지 켤 수 없습니다.

껐다 켜는 게 아니라 편도입니다. 예외 목록에 파일 하나만 추가하는 것도 안 됩니다. 그러니 이건 마지막 수단으로 두는 게 좋습니다.

## 실제로 쓴 해결책

Astro는 마크다운 처리기를 바꿀 수 있습니다. 네이티브 바이너리를 안 쓰는 순수 자바스크립트 처리기로 되돌리면 됩니다. `astro.config.mjs`에 세 줄을 넣습니다.

```js
import { unified } from '@astrojs/markdown-remark';
import { defineConfig } from 'astro/config';

export default defineConfig({
  markdown: {
    processor: unified(),
  },
});
```

빌드가 바로 통과했습니다. 빌드 속도는 체감상 차이가 없었습니다. 글이 몇 개 없는 블로그라서 그럴 겁니다.

## Astro가 아닌 경우의 선택지

같은 벽에 부딪혔는데 쓰는 도구가 달라서 처리기 교체가 안 된다면, 비용이 낮은 순서로 이렇습니다.

1. 그 도구에 순수 자바스크립트로 도는 설정이 있는지 찾기
2. WSL2(윈도우 안의 리눅스)에서 빌드하기 — Smart App Control은 윈도우 실행 파일만 봅니다
3. 도커 컨테이너 안에서 빌드하기
4. 내 PC에서는 빌드하지 않고 GitHub Actions 같은 곳에서만 빌드하기

참고로 esbuild나 rollup처럼 널리 쓰이는 네이티브 바이너리는 평판이 쌓여서 그냥 통과합니다. 문제는 나온 지 얼마 안 된 패키지에 몰려 있습니다.

## 남는 것

에러 메시지가 원인을 알려준다고 믿으면 안 된다는 걸 배웠습니다. 메시지가 구체적이고 친절할수록 더 그렇습니다. 저 npm 안내문은 실제로 존재하는 다른 버그의 안내문이고, 증상이 겹쳤을 뿐입니다.

그리고 에러는 위로 스크롤해서 **첫 줄부터** 읽어야 합니다. 마지막에 뜬 요약이 아니라요.
