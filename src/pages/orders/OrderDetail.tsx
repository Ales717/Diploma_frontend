import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import * as API from 'api/Api'

const OrderDetail = () => {
    const { orderId } = useParams()
    const { data, isLoading, error } = useQuery(
        ['fetchOrderById', orderId],
        () => API.fetchOrderById(orderId || '')
    )

    return (
        <div>

        </div>
    )
}

export default OrderDetail
