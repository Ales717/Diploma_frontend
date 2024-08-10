import ActiveOrders from 'components/orders/ActiveOrders'
import InactiveOrders from 'components/orders/InactiveOrders'
import Layout from 'components/ui/Layout'

const index = () => {
    return (
        <Layout>
            <div>
                <h1>Orders</h1>
                <ActiveOrders />
            </div>

            <div>
                <h1>Done Orders</h1>
                <InactiveOrders />
            </div>
        </Layout>
    )
}

export default index
