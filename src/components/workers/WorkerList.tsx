import { useMutation, useQuery, useQueryClient } from 'react-query'
import * as API from 'api/Api'
import { WorkerType } from 'models/worker'
import { Link } from 'react-router-dom'

const WorkerList = () => {
    const queryClient = useQueryClient()

    const { data, isLoading } = useQuery(
        ['findAllWorkers', 'WORKER'],
        () => API.findAllWorkers('WORKER'),
    )


    const mutation = useMutation(
        (workerId: string) => API.deleteWorker(workerId),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['findAllWorkers'])
            },
        },
    )

    const handleDelete = (workerId: string) => {
        mutation.mutate(workerId)
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
                                    <h4 className='fw-bold'>No workers yet</h4>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='d-flex flex-wrap gap-4 justify-content-start'>
                            <ul className='list-group'>
                                {data?.data.map((worker: WorkerType, index: number) => (
                                    <div key={index} className=''>
                                        <li className='list-group-item'>
                                            <Link to={`/workers/updateworker/${worker.id}`}>
                                                <b>First Name: </b>{worker.first_name},
                                                <b> Last Name: </b>{worker.last_name},
                                                <b> Email: </b>{worker.email},
                                                <b> Availability: </b>{worker.availability ? 'Available ' : 'Not Available '}
                                            </Link>
                                            <button className='btn btn-dark ms-2' onClick={() => handleDelete(worker.id)}>Delete</button>
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

export default WorkerList
