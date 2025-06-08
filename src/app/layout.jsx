import '@assets/css/fonts/fonts.css'
import '@assets/css/icons.css'
import '@assets/css/plugins.css'
import '@assets/css/tailwind.css'
import ClientProviders from '@src/components/Common/ClientProviders'
import 'flatpickr/dist/flatpickr.css'
import 'simplebar-react/dist/simplebar.min.css'

export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
    userScalable: 'no',
  }
}
export async function generateMetadata() {
  return {
    title: 'CNVSG',
    description:
      'CNVSG',
    keywords: [
      'admin dashboard template',
      'admin template',
      'TailwindCSS dashboard',
      'react admin',
      'angular admin',
      'laravel admin',
      'responsive dashboard',
      'dark mode',
      'RTL support',
      'Vue',
      'Blazor',
      'PHP',
      'Node.js',
      'Django',
      'Flask',
      'Symfony',
      'CodeIgniter',
    ],
    openGraph: {
      title: 'CNVSG',
      description:
        'Versatile and responsive admin templates supporting 22 frameworks. Includes features like charts, RTL, LTR, dark light modes, and more',
      type: 'website',
    },
    twitter: {
      title: 'CNVSG',
      description:
        '',
    },
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  )
}
