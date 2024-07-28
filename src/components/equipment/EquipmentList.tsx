import React from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import * as API from 'api/Api'
import { EquipmentType } from 'models/equipment'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const EquipmentList = () => {
    const queryClient = useQueryClient()

    const { data, isLoading } = useQuery(
        'fetchEquipment',
        API.fetchEquipment
    )

    const mutation = useMutation(
        (equipmentId: string) => API.deleteEquipment(equipmentId),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('fetchEquipment')
            },
        },
    )

    const handleDelete = (equipmentId: string) => {
        mutation.mutate(equipmentId)
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
                                    <h4 className='fw-bold'>No equipment yet</h4>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='d-flex flex-wrap gap-4 justify-content-start'>
                            <ul className='list-group'>
                                {data?.data.map((equipment: EquipmentType, index: number) => (
                                    <div key={index} className=''>
                                        <li className='list-group-item'>
                                            <Link to={`/equipment/updateequipment/${equipment.id}`}>
                                                <b>Name: </b>{equipment.name},
                                                <b> Type: </b>{equipment.type},
                                                <b> Availability: </b>{equipment.availability ? 'Available' : 'Not Available'}
                                            </Link>
                                            <button onClick={() => handleDelete(equipment.id)}>Delete</button>
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

export default EquipmentList
