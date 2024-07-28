import React, { useState } from 'react'
import { Controller } from 'react-hook-form'
import { Button, Form, FormLabel } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import * as API from 'api/Api'
import ToastContainer from 'react-bootstrap/ToastContainer'
import Toast from 'react-bootstrap/Toast'
import { useCreateUpdateServiceForm, CreateUpdateServiceFields } from 'hooks/react-hook-form/useCreateUpdateServiceForm'

const AddServiceForm = () => {
    const navigate = useNavigate()
    const { handleSubmit, errors, control, reset } = useCreateUpdateServiceForm({})
    const [apiError, setApiError] = useState('')
    const [showError, setShowError] = useState(false)

    const onSubmit = async (data: CreateUpdateServiceFields) => {
        try {
            // Pretvorba v JSON
            data.requiredEquipment = JSON.parse(data.requiredEquipment)
            data.necessaryCompetences = JSON.parse(data.necessaryCompetences)

            await API.createService(data)
            navigate('/service')
        } catch (error) {
            setApiError('An error occurred while creating the service')
            setShowError(true)
        }
    }

    return (
        <>
            <div className='d-flex flex-column align-items-center justify-content-center'>
                <h2 className="display-5 fw-bold">Add New Service</h2>
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
                                    placeholder="Service Name"
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
                        name="description"
                        render={({ field }) => (
                            <Form.Group className="mb-3">
                                <FormLabel htmlFor="description">Description</FormLabel>
                                <input
                                    {...field}
                                    type="text"
                                    className={errors.description ? 'form-control is-invalid' : 'form-control'}
                                    placeholder="Service Description"
                                />
                                {errors.description && (
                                    <div className="invalid-feedback">
                                        {errors.description.message}
                                    </div>
                                )}
                            </Form.Group>
                        )}
                    />
                    <Controller
                        control={control}
                        name="requiredEquipment"
                        render={({ field }) => (
                            <Form.Group className="mb-3">
                                <FormLabel htmlFor="requiredEquipment">Required Equipment</FormLabel>
                                <textarea
                                    {...field}
                                    className={errors.requiredEquipment ? 'form-control is-invalid' : 'form-control'}
                                    placeholder='{"equipment1":"type1","equipment2":"type2"}'
                                />
                                {errors.requiredEquipment && (
                                    <div className="invalid-feedback">
                                        {errors.requiredEquipment.message}
                                    </div>
                                )}
                            </Form.Group>
                        )}
                    />
                    <Controller
                        control={control}
                        name="necessaryCompetences"
                        render={({ field }) => (
                            <Form.Group className="mb-3">
                                <FormLabel htmlFor="necessaryCompetences">Necessary Competences</FormLabel>
                                <textarea
                                    {...field}
                                    className={errors.necessaryCompetences ? 'form-control is-invalid' : 'form-control'}
                                    placeholder='{"competence1":"typeA","competence2":"typeB"}'
                                />
                                {errors.necessaryCompetences && (
                                    <div className="invalid-feedback">
                                        {errors.necessaryCompetences.message}
                                    </div>
                                )}
                            </Form.Group>
                        )}
                    />
                    <Button type="submit" className="w-100 btn btn-primary">Add Service</Button>
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
export default AddServiceForm
