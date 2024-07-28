import { routes } from 'constants/routesConstants'
import { FC, useState } from 'react'
import ToastContainer from 'react-bootstrap/ToastContainer'
import Button from 'react-bootstrap/Button'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import authStore from 'stores/auth.store'
import Toast from 'react-bootstrap/Toast'
import { StatusCode } from 'constants/errorConstants'
import * as API from 'api/Api'

const Navbar: FC = () => {
  const navigate = useNavigate()
  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)

  const singout = async () => {
    const response = await API.signout()
    if (response.data?.statusCode === StatusCode.BAD_REQUEST) {
      setApiError(response.data.message)
      setShowError(true)
    } else if (response.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR) {
      setApiError(response.data.message)
      setShowError(true)
    } else {
      authStore.signout()
      navigate('/')
    }
  }

  return (
    <>
      <aside className="sidebar">
        <div className="sidebar-header">
          <Link className="sidebar-brand" to={routes.HOME}>
            <img src="/images/icon.png" alt="diploma" width={100} />
          </Link>
        </div>
        <div className="sidebar-content">
          <ul className="sidebar-nav">
            {authStore.user ? (
              <>
                <li className="sidebar-item">
                  <NavLink className="sidebar-link" style={{ fontWeight: 'bold' }} to={routes.ORDERS}>
                    Orders
                  </NavLink>
                </li>
                <li className="sidebar-item">
                  <NavLink className="sidebar-link" style={{ fontWeight: 'bold' }} to={routes.WORKERS}>
                    Workers
                  </NavLink>
                </li>
                <li className="sidebar-item">
                  <NavLink className="sidebar-link" style={{ fontWeight: 'bold' }} to={routes.LOGIN}>
                    Equipment
                  </NavLink>
                </li>
                <li className="sidebar-item">
                  <NavLink className="sidebar-link" style={{ fontWeight: 'bold' }} to={routes.LOGIN}>
                    Services
                  </NavLink>
                </li>
                <li className="sidebar-item">
                  <Button className="btn btn-dark" onClick={singout}>
                    Signout
                  </Button>
                </li>
              </>
            ) : (
              <>
                <li className="sidebar-item">
                  <NavLink className="sidebar-link" style={{ fontWeight: 'bold' }} to={routes.LOGIN}>
                    Sign in
                  </NavLink>
                </li>
                <li className="sidebar-item">
                  <p className='font-weight-bold'>or</p>
                </li>
                <li className="sidebar-item">
                  <NavLink className="btn btn-dark" to={routes.SIGNUP}>
                    Sign Up
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </aside>
      {showError && (
        <ToastContainer className="p-3" position="top-end">
          <Toast onClose={() => setShowError(false)} show={showError}>
            <Toast.Header>
              <strong className="me-suto text-danger">Error</strong>
            </Toast.Header>
            <Toast.Body className="text-danger bg-light">{apiError}</Toast.Body>
          </Toast>
        </ToastContainer>
      )}
    </>
  )
}

export default Navbar
