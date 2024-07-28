import React from 'react'
import { useQuery, useQueryClient, useMutation } from 'react-query'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import * as API from 'api/Api'
import { ServiceType } from 'models/service'

const ServiceList = () => {
    const queryClient = useQueryClient()

    const { data, isLoading, error } = useQuery('fetchServices', API.fetchServices)

    const mutation = useMutation(
        (serviceId: string) => API.deleteService(serviceId),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('fetchServices')
            },
        }
    )

    const handleDelete = (serviceId: string) => {
        mutation.mutate(serviceId)
    }

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>An error occurred while fetching services</p>
    }

    return (
        <div>
            {data?.length === 0 ? (
                <div className="container-fluid h-75 d-flex justify-content-center align-items-center">
                    <div className="row">
                        <div className="col-mb-6">
                            <h4 className="fw-bold">No services yet</h4>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="d-flex flex-wrap gap-4 justify-content-start">
                    <ul className="list-group">
                        {data?.map((service: ServiceType, index: number) => (
                            <div key={index} className="">
                                <li className="list-group-item">
                                    <Link to={`/service/updateservice/${service.id}`}>
                                        <b>Name: </b>{service.name},
                                        <b> Description: </b>{service.description}
                                    </Link>
                                    <Button className="btn btn-dark ms-2 ms-2" onClick={() => handleDelete(service.id)}>
                                        Delete
                                    </Button>
                                </li>
                            </div>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default ServiceList
