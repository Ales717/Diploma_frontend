import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Controller } from 'react-hook-form'
import { Button, Form, FormLabel } from 'react-bootstrap'
import { useCreateUpdateUserForm, CreateUpdateUserFields } from 'hooks/react-hook-form/useCreateUpdateUserForm'
import { fetchWorkerById, updateWorker } from 'api/Api'
import { StatusCode } from 'constants/errorConstants'
import ToastContainer from 'react-bootstrap/ToastContainer'
import Toast from 'react-bootstrap/Toast'
import { UserType } from 'models/auth'
import { useQuery } from 'react-query'
import * as API from 'api/Api'

const UpdateWorkerForm = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { handleSubmit, errors, control, reset } = useCreateUpdateUserForm({})
    const [apiError, setApiError] = useState('')
    const [showError, setShowError] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadWorker = async () => {
            try {
                const response = await fetchWorkerById(id!)
                reset(response.data)
                setLoading(false)
            } catch (error) {
                setApiError('An error occurred while fetching the worker details')
                setShowError(true)
                setLoading(false)
            }
        }
        loadWorker()
    }, [id, reset])

    const onSubmit = async (data: CreateUpdateUserFields) => {
        try {
            await updateWorker(id!, data)
            navigate('/workers')
        } catch (error) {
            setApiError('An error occurred while updating the worker')
            setShowError(true)
        }
    }

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <>
            <div className='d-flex flex-column align-items-center justify-content-center'>
                <h2 className="display-5 fw-bold">Update Worker</h2>
                <Form className="w-50" onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        control={control}
                        name="first_name"
                        render={({ field }) => (
                            <Form.Group className="mb-3">
                                <FormLabel htmlFor="first_name">First Name</FormLabel>
                                <input
                                    {...field}
                                    type="text"
                                    className={errors.first_name ? 'form-control is-invalid' : 'form-control'}
                                    placeholder="John"
                                    defaultValue={field.value}
                                />
                                {errors.first_name && (
                                    <div className="invalid-feedback">
                                        {errors.first_name.message}
                                    </div>
                                )}
                            </Form.Group>
                        )}
                    />
                    <Controller
                        control={control}
                        name="last_name"
                        render={({ field }) => (
                            <Form.Group className="mb-3">
                                <FormLabel htmlFor="last_name">Last Name</FormLabel>
                                <input
                                    {...field}
                                    type="text"
                                    className={errors.last_name ? 'form-control is-invalid' : 'form-control'}
                                    placeholder="Doe"
                                    defaultValue={field.value}
                                />
                                {errors.last_name && (
                                    <div className="invalid-feedback">
                                        {errors.last_name.message}
                                    </div>
                                )}
                            </Form.Group>
                        )}
                    />
                    <Controller
                        control={control}
                        name="email"
                        render={({ field }) => (
                            <Form.Group className="mb-3">
                                <FormLabel htmlFor="email">Email</FormLabel>
                                <input
                                    {...field}
                                    type="email"
                                    className={errors.email ? 'form-control is-invalid' : 'form-control'}
                                    placeholder="example@gmail.com"
                                    defaultValue={field.value}
                                />
                                {errors.email && (
                                    <div className="invalid-feedback">
                                        {errors.email.message}
                                    </div>
                                )}
                            </Form.Group>
                        )}
                    />
                    <Controller
                        control={control}
                        name="password"
                        render={({ field }) => (
                            <Form.Group className="mb-3">
                                <FormLabel htmlFor="password">Password</FormLabel>
                                <input
                                    {...field}
                                    type="password"
                                    className={errors.password ? 'form-control is-invalid' : 'form-control'}
                                    placeholder="******"
                                />
                                {errors.password && (
                                    <div className="invalid-feedback">
                                        {errors.password.message}
                                    </div>
                                )}
                            </Form.Group>
                        )}
                    />
                    <Controller
                        control={control}
                        name="role"
                        render={({ field }) => (
                            <Form.Group className="mb-3">
                                <FormLabel htmlFor="role">Role</FormLabel>
                                <input
                                    {...field}
                                    type="text"
                                    className={errors.role ? 'form-control is-invalid' : 'form-control'}
                                    placeholder="WORKER"
                                />
                                {errors.role && (
                                    <div className="invalid-feedback">
                                        {errors.role.message}
                                    </div>
                                )}
                            </Form.Group>
                        )}
                    />

                    <Button type="submit" className="w-100 btn btn-primary">Update Worker</Button>
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

export default UpdateWorkerForm
