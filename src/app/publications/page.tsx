import type { Metadata } from "next";
import RedirectPage from "@/components/RedirectPage";

export const metadata: Metadata = {
  title: "Research — Abdullah Rubab",
  robots: { index: false, follow: true },
  alternates: { canonical: "/" },
};

export default function Page() {
  return <RedirectPage to="/#research" label="Research" />;
}
