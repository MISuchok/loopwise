export const metadata = {
  title: "My PDF Socratic Bot",
  description: "Ask and discuss any PDF using Socratic questions",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}


