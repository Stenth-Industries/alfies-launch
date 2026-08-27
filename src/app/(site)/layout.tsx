import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

/**
 * The chrome for everything behind the age gate. It is a route group rather
 * than the root layout so the gate itself renders without the header, the
 * footer or the brand list — an unverified visitor should not be sent brand
 * elements in any form, navigation included.
 */
export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </>
  );
}
