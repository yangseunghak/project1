import type { Metadata } from "next";
import { SearchSignalDemo } from "@/components/SearchSignalDemo";
import { ServiceProblemReveal } from "@/components/ServiceProblemReveal";

export const metadata: Metadata = { title: "서비스" };

export default function ServicesPage() {
  return (
    <main className="coads-services-page">
      <SearchSignalDemo />
      <ServiceProblemReveal />
    </main>
  );
}
