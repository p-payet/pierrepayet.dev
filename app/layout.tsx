// Root layout - minimal wrapper for locale-based routing
// All actual layout content is in app/[locale]/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
