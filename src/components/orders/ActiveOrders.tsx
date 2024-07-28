import { useMutation, useQuery, useQueryClient } from 'react-query'
import * as API from 'api/Api'
import { OrderType } from 'models/order'
import { Link } from 'react-router-dom'


const ActiveOrders = () => {
    const queryClient = useQueryClient()

    const { data, isLoading } = useQuery(
        ['fetchActiveOrders'],
        () => API.fetchActiveOrders(),
    )

    const mutation = useMutation(
        (orderId: string) => API.deleteOrder(orderId),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['fetchActiveOrders'])
            },
        },
    )

    const handleDelete = (orderId: string) => {
        mutation.mutate(orderId)
    }

    return (
        <div>
            {isLoading ? (
                <div>
                    <p>Loading...</p>
                </div>
            ) : (
                <>
                    {data?.data.length === 0 ? (
                        <div className='container-fluid h-75 d-flex justify-content-center align-items-center'>
                            <div className='row'>
                                <div className='col-mb-6'>
                                    <h4 className='fw-bold'>No orders yet</h4>
                                </div>
                            </div>
                        </div>
                    ) :
                        (
                            <div className='d-flex flex-wrap gap-4 justify-content-start'>
                                <ul className='list-group'>
                                    {data?.data.map((order: OrderType, index: number) => (
                                        <div key={index} className=''>
                                            <li className='list-group-item'>
                                                <Link to={`/orders/orderdetail/${order.id}`}>
                                                    <b>Costumer: </b>{order.costumer},
                                                    <b> Contact: </b>{order.contact},
                                                    <b> Oreder date </b>{order.date.toString()}
                                                    <button className='btn btn-dark ms-2' onClick={() => handleDelete(order.id)}>Delete</button>
                                                </Link>

                                            </li>

                                        </div>
                                    ))}
                                </ul>

                            </div>
                        )}
                </>
            )}

        </div>
    )
}

export default ActiveOrders
