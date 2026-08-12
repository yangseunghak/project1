import type { Metadata } from "next";
import { CasesArchive } from "@/components/CasesArchive";
export const metadata:Metadata={title:"COADS Casenote",description:"온라인 평판 리스크 대응 사례 아카이브"};
export default function CasesPage(){return <CasesArchive/>}
