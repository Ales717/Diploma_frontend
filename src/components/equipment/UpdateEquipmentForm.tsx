import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Controller } from 'react-hook-form'
import { Button, Form, FormLabel } from 'react-bootstrap'
import { useCreateUpdateEquipmentForm, CreateUpdateEquipmentFields } from 'hooks/react-hook-form/useCreateUpdateEquipmentForm'
import * as API from 'api/Api'
import ToastContainer from 'react-bootstrap/ToastContainer'
import Toast from 'react-bootstrap/Toast'

const UpdateEquipmentForm = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { handleSubmit, errors, control, reset } = useCreateUpdateEquipmentForm({})
    const [apiError, setApiError] = useState('')
    const [showError, setShowError] = useState(false)
    const [loading, setLoading] = useState(true)

    console.log(id)

    useEffect(() => {
        const loadEquipment = async () => {
            try {
                const response = await API.fetchEquipmentById(id!)
                reset(response.data)
                setLoading(false)
            } catch (error) {
                setApiError('An error occurred while fetching the equipment details')
                setShowError(true)
                setLoading(false)
            }
        }
        loadEquipment()
    }, [id, reset])

    const onSubmit = async (data: CreateUpdateEquipmentFields) => {
        try {
            await API.updateEquipment(id!, data)
            navigate('/equipment')
        } catch (error) {
            setApiError('An error occurred while updating the equipment')
            setShowError(true)
        }
    }

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <>
            <div className='d-flex flex-column align-items-center justify-content-center'>
                <h2 className="display-5 fw-bold">Update Equipment</h2>
                <Form className="w-50" onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        control={control}
                        name="name"
                        render={({ field }) => (
                            <Form.Group className="mb-3">
                                <FormLabel htmlFor="name">Name</FormLabel>
                                <input
                                    {...field}
                                    type="text"
                                    className={errors.name ? 'form-control is-invalid' : 'form-control'}
                                    placeholder="Equipment Name"
                                    defaultValue={field.value}
                                />
                                {errors.name && (
                                    <div className="invalid-feedback">
                                        {errors.name.message}
                                    </div>
                                )}
                            </Form.Group>
                        )}
                    />
                    <Controller
                        control={control}
                        name="type"
                        render={({ field }) => (
                            <Form.Group className="mb-3">
                                <FormLabel htmlFor="type">Type</FormLabel>
                                <input
                                    {...field}
                                    type="text"
                                    className={errors.type ? 'form-control is-invalid' : 'form-control'}
                                    placeholder="Equipment Type"
                                    defaultValue={field.value}
                                />
                                {errors.type && (
                                    <div className="invalid-feedback">
                                        {errors.type.message}
                                    </div>
                                )}
                            </Form.Group>
                        )}
                    />
                    <Button type="submit" className="w-100 btn btn-primary">Update Equipment</Button>
                </Form>
            </div>
            {showError && (
                <ToastContainer className="p-3" position="top-end">
                    <Toast onClose={() => setShowError(false)} show={showError} delay={3000} autohide>
                        <Toast.Header>
                            <strong className="me-auto text-danger">Error</strong>
                        </Toast.Header>
                        <Toast.Body className="text-danger">{apiError}</Toast.Body>
                    </Toast>
                </ToastContainer>
            )}
        </>
    )
}

export default UpdateEquipmentForm
