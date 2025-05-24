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
    title: 'Domiex - Next JS Admin & Dashboard Template',
    description:
      'Domiex is a Premium Admin & Dashboard Template that supports 22 frameworks including HTML, Next TS, Next JS, React JS, React TS, Angular 19, ASP.Net Core 9 + Angular 19, Laravel 12, ASP.Net Core 9, MVC 5, Blazor, Node JS, Django, Flask, PHP, CakePHP, Symfony, CodeIgniter, Ajax & Yii and more. Perfect for developers and businesses.',
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
      title: 'Domiex - Next JS Admin & Dashboard Template',
      description:
        'Versatile and responsive admin templates supporting 22 frameworks. Includes features like charts, RTL, LTR, dark light modes, and more',
      type: 'website',
    },
    twitter: {
      title: 'Domiex - Next JS Admin & Dashboard Template',
      description:
        'Explore Domiex, an admin & dashboard template offering support for 22 frameworks. Perfect for building professional, scalable web apps',
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
