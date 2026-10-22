import type { Metadata } from "next";
import RedirectPage from "@/components/RedirectPage";

export const metadata: Metadata = {
  title: "Selected work — Abdullah Rubab",
  robots: { index: false, follow: true },
  alternates: { canonical: "/" },
};

export default function Page() {
  return <RedirectPage to="/#work" label="Selected work" />;
}
