"use client";

import { useState } from "react";
import { COMPANY } from "@/components/site-config";
import {
  INQUIRY_ENTRY,
  INQUIRY_FORM_ACTION,
  INQUIRY_REFERRALS,
  INQUIRY_SOLUTIONS,
  INQUIRY_TIMELINES,
} from "@/components/inquiry-data";

type Status = "idle" | "sending" | "done" | "error";

/**
 * 문의 폼 — 화면은 사이트 디자인 그대로, 제출만 구글폼(formResponse)으로 POST.
 *
 * 구글폼은 CORS 응답 헤더를 주지 않아 no-cors로 보낸다. 이 모드에서는
 * 응답 본문을 읽을 수 없으므로 fetch가 예외 없이 끝나면 접수된 것으로
 * 간주한다(낙관적 성공 처리). 실제 접수는 구글폼 응답 시트에서 확인한다.
 */
export default function InquiryForm() {
  const [solutions, setSolutions] = useState<string[]>([]);
  const [timeline, setTimeline] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  function toggleSolution(value: string) {
    setSolutions((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const data = new FormData(e.currentTarget);
    const field = (name: string) => String(data.get(name) ?? "").trim();

    // 허니팟(봇 차단): 숨겨진 칸이 채워져 있으면 보내지 않고 조용히 성공 처리
    if (field("website")) {
      setStatus("done");
      return;
    }

    const body = new URLSearchParams();
    body.append(INQUIRY_ENTRY.company, field("company"));
    body.append(INQUIRY_ENTRY.name, field("name"));
    body.append(INQUIRY_ENTRY.email, field("email"));
    if (field("phone")) body.append(INQUIRY_ENTRY.phone, field("phone"));
    solutions.forEach((v) => body.append(INQUIRY_ENTRY.solutions, v));
    if (timeline) body.append(INQUIRY_ENTRY.timeline, timeline);
    if (field("message")) body.append(INQUIRY_ENTRY.message, field("message"));
    if (field("referral")) body.append(INQUIRY_ENTRY.referral, field("referral"));

    setStatus("sending");
    try {
      await fetch(INQUIRY_FORM_ACTION, {
        method: "POST",
        mode: "no-cors",
        body,
      });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="inq-done" role="status">
        <span className="inq-done__mark" aria-hidden>
          ✓
        </span>
        <h3 className="inq-done__title">문의가 접수되었습니다</h3>
        <p className="inq-done__desc">
          남겨주신 내용을 확인한 뒤, 영업일 기준 24시간 이내에 담당자가
          연락드리겠습니다.
        </p>
      </div>
    );
  }

  return (
    <form className="inq-form" onSubmit={handleSubmit}>
      {/* 허니팟 — 사람에게는 보이지 않는 칸. 봇이 채우면 제출을 버린다. */}
      <div className="inq-hp" aria-hidden="true">
        <label>
          웹사이트
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="inq-field">
        <label className="inq-label" htmlFor="inq-company">
          고객사명 <span className="inq-req">*</span>
        </label>
        <input
          id="inq-company"
          name="company"
          className="inq-input"
          required
          maxLength={100}
          placeholder="회사 · 기관명"
          autoComplete="organization"
        />
      </div>

      <div className="inq-field">
        <label className="inq-label" htmlFor="inq-name">
          담당자 성함 <span className="inq-req">*</span>
        </label>
        <input
          id="inq-name"
          name="name"
          className="inq-input"
          required
          maxLength={50}
          placeholder="성함"
          autoComplete="name"
        />
      </div>

      <div className="inq-field">
        <label className="inq-label" htmlFor="inq-email">
          이메일 주소 <span className="inq-req">*</span>
        </label>
        <input
          id="inq-email"
          name="email"
          type="email"
          className="inq-input"
          required
          maxLength={100}
          placeholder="name@company.com"
          autoComplete="email"
        />
      </div>

      <div className="inq-field">
        <label className="inq-label" htmlFor="inq-phone">
          연락처
        </label>
        <input
          id="inq-phone"
          name="phone"
          type="tel"
          className="inq-input"
          maxLength={30}
          placeholder="02-0000-0000"
          autoComplete="tel"
        />
      </div>

      <fieldset className="inq-field inq-field--full inq-fieldset">
        <legend className="inq-label">관심 있는 솔루션 분야</legend>
        <div className="inq-chips">
          {INQUIRY_SOLUTIONS.map((o) => {
            const on = solutions.includes(o.value);
            return (
              <label key={o.value} className={`inq-chip${on ? " is-on" : ""}`}>
                <input
                  type="checkbox"
                  className="inq-chip__input"
                  checked={on}
                  onChange={() => toggleSolution(o.value)}
                />
                <span className="inq-chip__dot" aria-hidden />
                {o.label}
              </label>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="inq-field inq-field--full inq-fieldset">
        <legend className="inq-label">솔루션 도입 희망 시기</legend>
        <div className="inq-chips">
          {INQUIRY_TIMELINES.map((o) => {
            const on = timeline === o.value;
            return (
              <label key={o.value} className={`inq-chip${on ? " is-on" : ""}`}>
                <input
                  type="radio"
                  name="inq-timeline"
                  className="inq-chip__input"
                  checked={on}
                  onChange={() => setTimeline(o.value)}
                />
                <span className="inq-chip__dot" aria-hidden />
                {o.label}
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="inq-field inq-field--full">
        <label className="inq-label" htmlFor="inq-message">
          문의 상세 내용
        </label>
        <textarea
          id="inq-message"
          name="message"
          className="inq-textarea"
          rows={6}
          maxLength={3000}
          placeholder="도입을 검토 중인 환경(방송사·채널 규모 등)과 일정, 궁금하신 점을 자유롭게 남겨주세요."
        />
      </div>

      <div className="inq-field inq-field--full">
        <label className="inq-label" htmlFor="inq-referral">
          어떻게 알게 되셨나요?
        </label>
        <select
          id="inq-referral"
          name="referral"
          className="inq-select"
          defaultValue=""
        >
          <option value="">선택 안 함</option>
          {INQUIRY_REFERRALS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      {status === "error" && (
        <p className="inq-error inq-field--full" role="alert">
          전송에 실패했습니다. 잠시 후 다시 시도하시거나{" "}
          <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>로 보내주세요.
        </p>
      )}

      <div className="inq-field--full inq-actions">
        <button
          type="submit"
          className="gem-btn gem-btn--primary"
          disabled={status === "sending"}
        >
          {status === "sending" ? "전송 중…" : "문의 보내기"}
        </button>
        <p className="inq-privacy">
          입력하신 정보는 문의 응대 목적으로만 사용됩니다.
        </p>
      </div>
    </form>
  );
}
