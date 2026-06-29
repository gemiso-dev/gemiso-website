# gemiso-website

Next.js 정적 export 기반 제미소 홈페이지.
**로컬 개발 → GitHub Pages(스테이징) → Cloudflare(운영)** 3단 배포 구조.

## 배포 구조

```
                       ┌─────────────────────────────────────┐
  feature/*  ──PR──▶   │ develop  ──push──▶  GitHub Pages     │  스테이징 확인
                       │                     (자동, Actions)   │
                       └──────────────┬──────────────────────┘
                                      │ PR & merge
                                      ▼
                       ┌─────────────────────────────────────┐
                       │ main     ──push──▶  Cloudflare Pages │  운영 서비스
                       │                     (Git 연동, 자동)  │
                       └─────────────────────────────────────┘
```

| 환경       | 트리거            | 호스팅              | 경로(base path)      |
| ---------- | ----------------- | ------------------- | -------------------- |
| 로컬 개발  | `npm run dev`     | localhost:3000      | `/` (없음)           |
| 스테이징   | `develop` 푸시    | GitHub Pages        | `/gemiso-website`    |
| 운영       | `main` 푸시       | Cloudflare Pages    | `/` (없음)           |

> base path는 `next.config.mjs`에서 `PAGES_BASE_PATH` 환경변수로 분기됩니다.
> GitHub Pages 빌드에서만 주입되고, 로컬·Cloudflare는 루트로 서비스됩니다.

## 로컬 개발

```bash
npm install        # 최초 1회
npm run dev        # http://localhost:3000
```

정적 결과물을 실제 배포본처럼 확인하려면:

```bash
npm run build      # out/ 생성
npm run preview    # out/ 을 로컬 서버로 서비스
```

## 최초 설정 (한 번만)

### 1. 원격 저장소 연결 & 브랜치 생성

```bash
git add .
git commit -m "chore: scaffold Next.js static site with CI/CD"
git branch -M main
git branch develop

# GitHub 저장소 생성 후 (예시)
git remote add origin https://github.com/gemiso-dev/gemiso-website.git
git push -u origin main
git push -u origin develop
```

### 2. GitHub Pages (develop → 스테이징)

저장소 **Settings → Pages → Build and deployment → Source** 를
**GitHub Actions** 로 설정합니다.

이후 `develop` 에 푸시되면 `.github/workflows/deploy-github-pages.yml`
이 자동 빌드·배포합니다.

- 확인 URL: `https://gemiso-dev.github.io/gemiso-website/`

### 3. Cloudflare Pages (main → 운영)

Cloudflare 대시보드 → **Workers & Pages → Create → Pages → Connect to Git**
에서 이 저장소를 연결하고 아래처럼 설정합니다.

| 항목                 | 값                                       |
| -------------------- | ---------------------------------------- |
| Production branch    | `main`                                   |
| Framework preset     | `Next.js (Static HTML Export)`           |
| Build command        | `npm run build`                          |
| Build output directory | `out`                                  |
| 환경변수             | `PAGES_BASE_PATH` **설정하지 않음** (루트 서비스) |

- Node 버전은 `.nvmrc`(20)를 따릅니다. 필요 시 환경변수 `NODE_VERSION=20` 추가.
- **중요:** `@cloudflare/next-on-pages` 는 사용하지 않습니다(SSR용). 본 프로젝트는 순수 정적 export(`output: "export"`)라 `out/` 디렉터리만 배포하면 됩니다.
- (선택) develop 이 Cloudflare 미리보기로도 빌드되는 걸 막으려면
  **Settings → Builds & deployments → Branch control** 에서
  Preview 배포를 끄거나 `main` 만 허용하세요. (스테이징은 GitHub Pages가 담당)

## 디렉터리 구조

```
app/                      App Router 페이지
  layout.tsx
  page.tsx
  globals.css
public/                   정적 파일 (.nojekyll 포함)
.github/workflows/
  deploy-github-pages.yml develop → GitHub Pages 배포
  ci.yml                  PR 빌드 검증
next.config.mjs           정적 export + base path 분기
.nvmrc                    Node 20 고정
```

## 페이지 추가 시 주의 (정적 export)

- `output: "export"` 이므로 서버 기능(API Route, SSR, 동적 `generateMetadata` 일부)은 사용 불가.
- 동적 라우트(`[slug]`)는 `generateStaticParams` 로 경로를 미리 정의해야 합니다.
- `public/` 의 이미지를 직접 참조할 때 base path가 필요하면
  `process.env.NEXT_PUBLIC_BASE_PATH` 를 접두어로 붙이세요.
  (`next/link`, `next/image` 는 base path가 자동 적용됩니다.)
