import Layout from 'components/ui/Layout'
import WorkerList from 'components/workers/WorkerList'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const Index = () => {
    return (
        <Layout>
            <div className="container">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1>Workers</h1>
                    <Link to="/workers/addworker">
                        <Button className='btn btn-dark'>Add New Worker</Button>
                    </Link>
                </div>
                <WorkerList />
            </div>
        </Layout>
    )
}

export default Index
