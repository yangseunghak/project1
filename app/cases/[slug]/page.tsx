import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { caseNotes } from "@/data/caseNotes";

export function generateStaticParams(){return caseNotes.map(note=>({slug:note.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const note=caseNotes.find(item=>item.slug===slug);return{title:note?.title??"Case Note"}}
export default async function CaseDetailPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const note=caseNotes.find(item=>item.slug===slug);if(!note)notFound();const index=caseNotes.findIndex(item=>item.slug===slug),next=caseNotes[(index+1)%caseNotes.length];return <article className="case-detail" style={{"--accent":note.accent} as React.CSSProperties}><header><Link href="/cases"><ArrowLeft size={18}/> CASENOTE ARCHIVE</Link><p>{String(note.id).padStart(2,"0")} · {note.category}</p><h1>{note.title}</h1><div>{note.channels.map(channel=><span key={channel}>{channel}</span>)}</div></header><section><div><small>ISSUE</small><h2>{note.issue}</h2><p>온라인에 노출된 원문과 반복 게시물, 검색 결과의 연결 관계를 확인하고 이슈가 시작된 시점과 현재 확산 범위를 구분했습니다.</p></div><div><small>RESPONSE</small><h2>{note.response}</h2><p>확인된 사실과 맥락을 기준으로 필요한 조치만 선별하고, 채널별 실행 순서와 후속 관찰 기준을 정리했습니다.</p></div></section><footer><Link href={`/cases/${next.slug}`}>NEXT CASE <strong>{next.title}</strong><ArrowRight size={22}/></Link></footer></article>}
