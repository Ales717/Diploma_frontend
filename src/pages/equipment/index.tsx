import EquipmentList from 'components/equipment/EquipmentList'
import Layout from 'components/ui/Layout'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'


const index = () => {
  return (
    <div>
      <Layout>
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1>Workers</h1>
            <Link to="/equipment/addequipment">
              <Button className='btn btn-dark'>Add New Equipment</Button>
            </Link>
          </div>
          <EquipmentList />
        </div>
      </Layout>
    </div>
  )
}

export default index
