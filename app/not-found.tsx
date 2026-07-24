import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-wide flex min-h-screen flex-col items-start justify-center gap-6 pt-24">
      <h1 className="section-title font-black text-[#071A2B]">요청한 페이지를 찾을 수 없습니다.</h1>
      <Link href="/" className="btn btn-primary">홈으로 이동</Link>
    </div>
  );
}
