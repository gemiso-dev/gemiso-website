/** JSON-LD 구조화 데이터를 <script type="application/ld+json">으로 출력한다(서버 컴포넌트). */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  // "<" 이스케이프 — 문자열 안의 "</script>"가 태그를 닫지 못하게 한다.
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
