# CLAUDE.md

이 저장소에서 작업할 때 따라야 할 지침이다.

## 규칙

- @.claude/rules/project.md — 개발 서버 등 프로젝트 운영 규칙

## 프로젝트 개요

- Geminisoft(제미소) 회사 소개 웹사이트. Next.js 15 (App Router) + React 19 + TypeScript.
- `next.config.mjs`의 `output: "export"`로 정적 사이트를 빌드(`out/`)해 Cloudflare로 배포한다.
- 페이지별 콘텐츠는 `app/`, 공통 컴포넌트·데이터는 `components/`에 둔다.

## 작업 규칙

- 브랜치: `develop`에서 작업한다. `main`은 운영(Cloudflare) 배포 전용.
- 스타일: 인라인 스타일 대신 [app/globals.css](app/globals.css)의 디자인 토큰(`--gem-*`)과 시맨틱 클래스를 재사용한다. 새 스타일은 globals.css에 페이지 단위 섹션으로 추가한다.
- 페이지 데이터는 `components/<page>-data.ts`에 단일 소스로 분리하고, 화면 컴포넌트는 그 데이터를 조합한다.
- 상태가 필요한 UI만 `"use client"` 컴포넌트로 만든다(예: 필터·토글).
- 자산 경로는 `site-config.ts`의 `asset()`를 통해 basePath를 붙인다.

## 검증

- 변경 후 `npm run build`로 타입 체크 + 정적 export가 통과하는지 확인한다. (dev 서버는 별도로 띄우지 않는다 — 규칙 참고)
