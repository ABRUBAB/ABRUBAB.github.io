import type { Metadata } from "next";
import RedirectPage from "@/components/RedirectPage";

export const metadata: Metadata = {
  title: "Journey — Abdullah Rubab",
  robots: { index: false, follow: true },
  alternates: { canonical: "/" },
};

export default function Page() {
  return <RedirectPage to="/#journey" label="Journey" />;
}
