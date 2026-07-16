import Image from "next/image";
import Link from "next/link";
import { COMPANY, FOOTER_COLUMNS, asset } from "@/components/site-config";

/** 공통 푸터 — 브랜드 + 링크 컬럼 + 회사정보 + 법적 고지. */
export default function SiteFooter() {
  return (
    <footer className="gem-footer">
      <div className="gem-footer__inner">
        <div className="gem-footer__top">
          <div className="gem-footer__brand">
            <Image
              src={asset("/assets/geminisoft-logo.png")}
              alt="Geminisoft"
              width={135}
              height={28}
            />
            <p className="gem-footer__tagline">
              방송을 위한 디지털 미디어 관리 플랫폼. Geminisoft가 직접 개발하고
              기술 지원까지 책임집니다.
            </p>
          </div>

          <div className="gem-footer__cols">
            {FOOTER_COLUMNS.map((col, i) => (
              <div key={i}>
                <div className="gem-footer__heading">{col.heading}</div>
                <div className="gem-footer__links">
                  {col.links.map((link, j) => (
                    <Link key={j} href={link.href}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            <div>
              <div className="gem-footer__heading">문의</div>
              <div className="gem-footer__links">
                <span>
                  {COMPANY.addressLines[0]}
                  <br />
                  {COMPANY.addressLines[1]}
                </span>
                <a href={COMPANY.telHref}>{COMPANY.tel}</a>
                <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
              </div>
            </div>
          </div>
        </div>

        <div className="gem-footer__bottom">
          <span>© 2026 {COMPANY.name}. All rights reserved.</span>
          <div className="gem-footer__legal">
            <span className="gem-lang">
              <a href="#" className="gem-lang__current">
                KOR
              </a>
              <span className="gem-sep">|</span>
              <a href="https://www.gemiso.com/">ENG</a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
