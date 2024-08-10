import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import * as API from 'api/Api'
import OrderDetails from 'components/orders/OrederDetails'
import Layout from 'components/ui/Layout'

const OrderDetail = () => {
    const { orderId } = useParams()
    const { data, isLoading, error } = useQuery(
        ['fetchOrderById', orderId],
        () => API.fetchOrderById(orderId || '')
    )

    return (
        <Layout>
            <div>
                <OrderDetails />
            </div>
        </Layout>
    )
}

export default OrderDetail
