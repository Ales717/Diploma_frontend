import ServiceList from 'components/service/ServiceList'
import Layout from 'components/ui/Layout'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const index = () => {
    return (
        <Layout>
            <div className="container">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1>Services</h1>
                    <Link to="/service/addservice">
                        <Button className='btn btn-dark'>Add New Service</Button>
                    </Link>
                </div>
                <ServiceList />
            </div>
        </Layout>
    )
}

export default index
