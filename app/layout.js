

export const metadata = {
  title: 'Excel Viewer',
  description: 'View Excel files using Fortune Sheets',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}