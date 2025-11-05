import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kruft's Articles",
  description: "No refunds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-4xl min-h-200 m-auto p-4">
      {children}
    </div>
  );
}
