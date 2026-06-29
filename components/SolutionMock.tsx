import type { CSSProperties, ReactElement } from "react";
import type { SolutionMockType } from "@/components/solutions-data";

/**
 * 솔루션 히어로의 장식용 제품 목업 패널.
 * 순수 장식이라 의미 전달이 없어 aria-hidden 처리하고, 디자인 원본의
 * 인라인 스타일을 그대로 옮겨 한 번에 그린다(레이아웃 CSS는 globals.css).
 */

const accent = "var(--gem-accent)";
const mono = "var(--gem-font-mono)";

/* 멀티트랙 파형 — 빌드 시 결정적으로 생성(디자인의 wave()와 동일). */
function wave(seed: number, n: number): number[] {
  return Array.from({ length: n }, (_, i) => {
    const x = Math.sin((i + 1) * seed) * 0.5 + 0.5;
    return 8 + Math.round(x * x * 34);
  });
}

const clipCells = [
  { time: "00:32", name: "CLIP_014" },
  { time: "01:08", name: "CLIP_021" },
  { time: "00:14", name: "CLIP_022" },
  { time: "02:45", name: "CLIP_030" },
  { time: "00:51", name: "CLIP_031" },
  { time: "03:20", name: "CLIP_037" },
];

const clipBg: CSSProperties = {
  position: "relative",
  aspectRatio: "16 / 9",
  border: "1px solid var(--gem-border)",
  background:
    "repeating-linear-gradient(135deg,#eef1f6 0 7px,#e4e9f1 7px 14px)",
  overflow: "hidden",
};

function MockGrid() {
  return (
    <div style={{ padding: 12 }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <div
          style={{
            flex: 1,
            background: "var(--gem-surface)",
            borderBottom: "1px solid #8d8d8d",
            height: 32,
            display: "flex",
            alignItems: "center",
            padding: "0 10px",
            fontSize: 12,
            color: "var(--gem-subtle)",
          }}
        >
          자산 검색
        </div>
        <span style={{ width: 32, height: 32, border: "1px solid var(--gem-border)" }} />
        <span style={{ width: 32, height: 32, border: "1px solid var(--gem-border)" }} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
        {clipCells.map((c) => (
          <div key={c.name} style={clipBg}>
            <span
              style={{
                position: "absolute",
                top: 5,
                right: 5,
                background: "rgba(22,22,22,0.78)",
                color: "#fff",
                fontFamily: mono,
                fontSize: 9,
                padding: "1px 4px",
              }}
            >
              {c.time}
            </span>
            <span
              style={{
                position: "absolute",
                left: 5,
                bottom: 5,
                fontFamily: mono,
                fontSize: 9,
                color: "#3d4757",
                background: "rgba(255,255,255,0.72)",
                padding: "1px 4px",
              }}
            >
              {c.name}
            </span>
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: 12,
          borderTop: "1px solid var(--gem-border)",
          paddingTop: 10,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <span style={{ fontFamily: mono, fontSize: 10, color: "var(--gem-muted)" }}>
          00:00:12:04
        </span>
        <div
          style={{
            position: "relative",
            flex: 1,
            height: 26,
            background: "var(--gem-surface)",
            border: "1px solid var(--gem-border)",
            overflow: "hidden",
          }}
        >
          <div style={{ position: "absolute", top: 0, bottom: 0, left: "6%", width: "22%", background: "#d7e0f2" }} />
          <div style={{ position: "absolute", top: 0, bottom: 0, left: "34%", width: "14%", background: "#cdd6e6" }} />
          <div style={{ position: "absolute", top: 0, bottom: 0, left: "54%", width: "30%", background: "#d7e0f2" }} />
          <div style={{ position: "absolute", top: 0, bottom: 0, left: "42%", width: 2, background: accent }} />
        </div>
      </div>
    </div>
  );
}

const rundownCols = "26px 52px 1fr 54px";
const rundownRows = [
  { no: "01", time: "00:30", item: "오프닝 · 헤드라인", st: "완료", stColor: "#0e8a52" },
  { no: "02", time: "02:10", item: "[종합] 예산안 처리", st: "완료", stColor: "#0e8a52" },
  { no: "03", time: "01:20", item: "[속보] 현장 연결", st: "송고", stColor: accent, active: true },
  { no: "04", time: "00:45", item: "날씨", st: "검토", stColor: "#a06a00" },
  { no: "05", time: "01:40", item: "국제 · 정상회담", st: "작성중", stColor: "#8c8c8c" },
  { no: "06", time: "00:20", item: "클로징", st: "대기", stColor: "#8c8c8c" },
];

function MockRundown() {
  return (
    <div style={{ padding: "12px 14px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <span style={{ fontSize: 12, fontWeight: 600 }}>뉴스데스크 큐시트</span>
        <span style={{ fontFamily: mono, fontSize: 10, color: "var(--gem-muted)" }}>19:00:00 / 26:30</span>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: rundownCols,
          fontFamily: mono,
          fontSize: 9,
          color: "var(--gem-subtle)",
          letterSpacing: "0.04em",
          padding: "0 0 6px",
          borderBottom: "1px solid var(--gem-border)",
        }}
      >
        <span>NO</span>
        <span>TIME</span>
        <span>ITEM</span>
        <span style={{ textAlign: "right" }}>ST</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {rundownRows.map((r) => (
          <div
            key={r.no}
            style={{
              display: "grid",
              gridTemplateColumns: rundownCols,
              alignItems: "center",
              fontSize: 12,
              ...(r.active
                ? {
                    padding: "9px 8px",
                    margin: "0 -8px",
                    borderLeft: `2px solid ${accent}`,
                    background: "var(--gem-surface)",
                  }
                : { padding: "9px 0", borderBottom: "1px solid #f0f0f0" }),
            }}
          >
            <span style={{ fontFamily: mono, fontSize: 10, color: r.active ? accent : "var(--gem-subtle)" }}>{r.no}</span>
            <span style={{ fontFamily: mono, fontSize: 10, color: "var(--gem-muted)" }}>{r.time}</span>
            <span style={{ color: "var(--gem-fg)", fontWeight: r.active ? 600 : 400 }}>{r.item}</span>
            <span style={{ textAlign: "right", fontSize: 10, color: r.stColor }}>{r.st}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const schedCols = "74px 1fr 50px 54px";
const schedRows = [
  { start: "19:00:00", prog: "뉴스데스크", dur: "LIVE", st: "ON AIR", stColor: accent, active: true },
  { start: "19:28:30", prog: "스테이션 ID", dur: "00:10", st: "대기", stColor: "#8c8c8c" },
  { start: "19:28:40", prog: "광고 블록 A", dur: "00:30", st: "대기", stColor: "#8c8c8c" },
  { start: "19:29:10", prog: "일기예보", dur: "02:00", st: "대기", stColor: "#8c8c8c" },
  { start: "19:31:10", prog: "프로그램 예고", dur: "00:20", st: "대기", stColor: "#8c8c8c" },
];

function MockSchedule() {
  return (
    <div style={{ padding: "12px 14px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <span style={{ fontSize: 12, fontWeight: 600 }}>CH 1 · 자동 송출</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 12, fontFamily: mono, fontSize: 9, color: "var(--gem-muted)" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
            <span style={{ width: 7, height: 7, background: "#0e8a52" }} />
            MAIN
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
            <span style={{ width: 7, height: 7, background: "#0e8a52" }} />
            BACKUP
          </span>
        </span>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: schedCols,
          fontFamily: mono,
          fontSize: 9,
          color: "var(--gem-subtle)",
          letterSpacing: "0.04em",
          padding: "0 0 6px",
          borderBottom: "1px solid var(--gem-border)",
        }}
      >
        <span>START</span>
        <span>PROGRAM</span>
        <span>DUR</span>
        <span style={{ textAlign: "right" }}>ST</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {schedRows.map((r) => (
          <div
            key={r.start}
            style={{
              display: "grid",
              gridTemplateColumns: schedCols,
              alignItems: "center",
              fontSize: 12,
              ...(r.active
                ? {
                    padding: "9px 8px",
                    margin: "0 -8px",
                    borderLeft: `2px solid ${accent}`,
                    background: "var(--gem-surface)",
                  }
                : { padding: "9px 0", borderBottom: "1px solid #f0f0f0" }),
            }}
          >
            <span style={{ fontFamily: mono, fontSize: 10, color: r.active ? accent : "var(--gem-subtle)" }}>{r.start}</span>
            <span style={{ color: "var(--gem-fg)", fontWeight: r.active ? 600 : 400 }}>{r.prog}</span>
            <span style={{ fontFamily: mono, fontSize: 10, color: "var(--gem-muted)" }}>{r.dur}</span>
            <span style={{ textAlign: "right", fontSize: 10, color: r.stColor }}>{r.st}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12, borderTop: "1px solid var(--gem-border)", paddingTop: 10, display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontFamily: mono, fontSize: 10, color: "var(--gem-muted)" }}>ON AIR</span>
        <div style={{ position: "relative", flex: 1, height: 22, background: "var(--gem-surface)", border: "1px solid var(--gem-border)", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: "34%", background: "#d7e0f2" }} />
          <div style={{ position: "absolute", top: 0, bottom: 0, left: "34%", width: "8%", background: "#cdd6e6" }} />
          <div style={{ position: "absolute", top: 0, bottom: 0, left: "42%", width: "18%", background: "#cdd6e6" }} />
          <div style={{ position: "absolute", top: 0, bottom: 0, left: "34%", width: 2, background: accent }} />
        </div>
      </div>
    </div>
  );
}

const waveTracks = [
  { label: "VOX", bars: wave(1.7, 28) },
  { label: "MUSIC", bars: wave(2.3, 28) },
  { label: "SFX", bars: wave(3.1, 28) },
];

function MockWaveform() {
  return (
    <div style={{ padding: 14 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <span style={{ fontSize: 12, fontWeight: 600 }}>멀티트랙 세션</span>
        <span style={{ fontFamily: mono, fontSize: 10, color: "var(--gem-muted)" }}>00:01:24:12</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {waveTracks.map((trk) => (
          <div key={trk.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                flex: "none",
                width: 52,
                fontFamily: mono,
                fontSize: 9,
                color: "var(--gem-subtle)",
                border: "1px solid var(--gem-border)",
                padding: "4px 0",
                textAlign: "center",
              }}
            >
              {trk.label}
            </span>
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                gap: 2,
                height: 44,
                background: "#f7f8fa",
                border: "1px solid #eceef2",
                padding: "0 6px",
                overflow: "hidden",
              }}
            >
              {trk.bars.map((b, i) => (
                <span key={i} style={{ flex: 1, height: b, background: "#c3ccdb" }} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12, borderTop: "1px solid var(--gem-border)", paddingTop: 10, display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ width: 0, height: 0, borderLeft: `8px solid ${accent}`, borderTop: "5px solid transparent", borderBottom: "5px solid transparent" }} />
        <div style={{ position: "relative", flex: 1, height: 6, background: "#e8eaef", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: "38%", background: accent }} />
        </div>
        <span style={{ fontFamily: mono, fontSize: 10, color: "var(--gem-muted)" }}>−6 dB</span>
      </div>
    </div>
  );
}

const aiTags = ["앵커", "스튜디오", "한국어", "영어", "뉴스"];

function MockAi() {
  return (
    <div style={{ padding: 14 }}>
      <div style={{ display: "flex", gap: 12 }}>
        <div style={{ flex: "none", width: 118, position: "relative", aspectRatio: "4 / 3", border: "1px solid var(--gem-border)", background: "repeating-linear-gradient(135deg,#eef1f6 0 7px,#e4e9f1 7px 14px)", overflow: "hidden" }}>
          <span style={{ position: "absolute", top: 6, left: 6, background: accent, color: "#fff", fontFamily: mono, fontSize: 8, letterSpacing: "0.06em", padding: "2px 5px" }}>AI</span>
          <span style={{ position: "absolute", left: 0, right: 0, top: "46%", height: 2, background: "rgba(15,98,254,0.5)" }} />
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 11, color: "var(--gem-muted)" }}>자막 자동 생성</span>
            <span style={{ fontFamily: mono, fontSize: 11, color: accent }}>98%</span>
          </div>
          <div style={{ position: "relative", height: 6, background: "#e8eaef", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: "98%", background: accent }} />
          </div>
          <div style={{ marginTop: 2, display: "flex", flexDirection: "column", gap: 5, fontFamily: mono, fontSize: 9.5, lineHeight: 1.5, color: "#3d4757" }}>
            <span>[00:03] 안녕하십니까, 아리랑뉴스입니다.</span>
            <span>[00:09] 오늘의 주요 소식입니다.</span>
          </div>
        </div>
      </div>
      <div style={{ marginTop: 12, borderTop: "1px solid var(--gem-border)", paddingTop: 10 }}>
        <div style={{ fontFamily: mono, fontSize: 9, color: "var(--gem-subtle)", letterSpacing: "0.06em", marginBottom: 7 }}>DETECTED METADATA</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {aiTags.map((t) => (
            <span key={t} style={{ fontSize: 11, color: "var(--gem-muted)", background: "var(--gem-surface)", border: "1px solid var(--gem-border)", padding: "3px 9px" }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

const MOCKS: Record<SolutionMockType, () => ReactElement> = {
  grid: MockGrid,
  rundown: MockRundown,
  schedule: MockSchedule,
  waveform: MockWaveform,
  ai: MockAi,
};

export default function SolutionMock({
  type,
  name,
  ko,
}: {
  type: SolutionMockType;
  name: string;
  ko: string;
}) {
  const Body = MOCKS[type];
  return (
    <div className="sol-mock" aria-hidden="true">
      <div className="sol-mock__bar">
        <div className="sol-mock__app">
          <span className="sol-mock__dot" />
          <b>{name}</b>
          <span>{ko}</span>
        </div>
        <div className="sol-mock__controls">
          <span />
          <span />
          <span />
        </div>
      </div>
      <Body />
    </div>
  );
}
