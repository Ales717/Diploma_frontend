import ActiveOrders from 'components/orders/ActiveOrders'
import Layout from 'components/ui/Layout'

const index = () => {
    return (
        <Layout>
            <div>
                <h1>Orders</h1>
                <ActiveOrders />
            </div>
        </Layout>
    )
}

export default index
