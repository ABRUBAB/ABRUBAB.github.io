import type { Metadata } from "next";
import RedirectPage from "@/components/RedirectPage";

export const metadata: Metadata = {
  title: "Curriculum vitae — Abdullah Rubab",
  robots: { index: false, follow: true },
  alternates: { canonical: "/" },
};

export default function Page() {
  return <RedirectPage to="/Rubab_CV_1.pdf" label="Curriculum vitae" />;
}
