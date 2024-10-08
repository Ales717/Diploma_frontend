import { FC, ReactNode } from 'react'
import Navbar from './Navbar'

interface Props {
  children: ReactNode | ReactNode[]
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="layout-container container-xxl p-4 ms-2 me-2">{children}</div>

    </>
  )
}

export default Layout
