import NonLayoutWrapper from '@src/layout/NonLayoutWrapper'

export default function DefaultLayout({ children }) {
  return <NonLayoutWrapper>{children}</NonLayoutWrapper>
}
