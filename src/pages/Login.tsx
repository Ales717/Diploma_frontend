import LoginForm from 'components/user/LoginForm'
import { routes } from 'constants/routesConstants'
import { FC } from 'react'
import { Link } from 'react-router-dom'

const Login: FC = () => {
  return <div className="container-fluid px-0 mx-0 vh-100">
    <div className="row g-0">
      <div className="col-5 d-flex flex-column p-3 ">

        <div className="flex-grow-1 d-flex align-items-center justify-content-center">
          <LoginForm />

        </div>

      </div>
      <div className="col-7 d-flex flex-column gradient-bg vh-100">
        <div className="flex-grow-1 d-flex align-items-center justify-content-center">
          <img src="/images/icon.png" alt="diploma" />
        </div>

      </div>
    </div>
  </div>
}

export default Login
