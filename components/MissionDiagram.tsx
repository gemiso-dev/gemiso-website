import type { MissionDiagram as DiagramKind } from "@/components/mission-data";
import MissionPeopleFlow from "@/components/MissionPeopleFlow";
import MissionPlacesOrb from "@/components/MissionPlacesOrb";
import MissionTimeline from "@/components/MissionTimeline";

/**
 * 미션 기둥별 장식 다이어그램 (순수 SVG).
 * 사람=네트워크, 시간=타임라인, 장소=지리적 연결. 색은 globals.css의 --gem-accent를 따른다.
 */

export default function MissionDiagram({ kind }: { kind: DiagramKind }) {
  return (
    <svg
      className="mission-diagram__svg"
      viewBox="0 0 320 180"
      role="presentation"
      aria-hidden="true"
    >
      {kind === "people" && <MissionPeopleFlow />}
      {kind === "time" && <MissionTimeline />}
      {kind === "places" && <MissionPlacesOrb />}
    </svg>
  );
}
