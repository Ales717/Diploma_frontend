import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Controller } from 'react-hook-form'
import { Button, Form, FormLabel } from 'react-bootstrap'
import { useCreateUpdateUserForm, CreateUpdateUserFields } from 'hooks/react-hook-form/useCreateUpdateUserForm'
import { fetchWorkerById, updateWorker } from 'api/Api'
import ToastContainer from 'react-bootstrap/ToastContainer'
import Toast from 'react-bootstrap/Toast'

const UpdateWorkerForm = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { handleSubmit, errors, control, reset } = useCreateUpdateUserForm({})
    const [apiError, setApiError] = useState('')
    const [showError, setShowError] = useState(false)
    const [loading, setLoading] = useState(true)
    const [competences, setCompetences] = useState<{ key: string, value: string }[]>([])

    useEffect(() => {
        const loadWorker = async () => {
            try {
                const response = await fetchWorkerById(id!)
                const workerData = response.data
                reset(workerData)
                if (workerData.competences) {
                    const competencesArray = Object.entries(workerData.competences).map(([key, value]) => ({ key, value: value as string }))
                    setCompetences(competencesArray)
                }
                setLoading(false)
            } catch (error) {
                setApiError('An error occurred while fetching the worker details')
                setShowError(true)
                setLoading(false)
            }
        }
        loadWorker()
    }, [id, reset])

    const handleCompetenceChange = (index: number, field: 'key' | 'value', value: string) => {
        const newCompetences = competences.slice()
        newCompetences[index][field] = value
        setCompetences(newCompetences)
    }

    const addCompetenceField = () => {
        setCompetences([...competences, { key: '', value: '' }])
    }

    const removeCompetenceField = (index: number) => {
        setCompetences(competences.filter((_, i) => i !== index))
    }

    const onSubmit = async (data: CreateUpdateUserFields) => {
        try {
            const formattedCompetences = competences.reduce((acc, { key, value }) => {
                if (key) acc[key] = value
                return acc
            }, {} as { [key: string]: string })
            await updateWorker(id!, { ...data, competences: formattedCompetences })
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

                    {competences.map((competence, index) => (
                        <div className="row" key={index}>
                            <div className="col">
                                <Form.Group className="mb-3">
                                    <FormLabel htmlFor={`competenceKey${index}`}>Competence Key</FormLabel>
                                    <input
                                        type="text"
                                        className="form-control form-rounded"
                                        placeholder="e.g. skills"
                                        value={competence.key}
                                        onChange={e => handleCompetenceChange(index, 'key', e.target.value)}
                                    />
                                </Form.Group>
                            </div>
                            <div className="col">
                                <Form.Group className="mb-3">
                                    <FormLabel htmlFor={`competenceValue${index}`}>Competence Value</FormLabel>
                                    <input
                                        type="text"
                                        className="form-control form-rounded"
                                        placeholder="e.g. truck driver"
                                        value={competence.value}
                                        onChange={e => handleCompetenceChange(index, 'value', e.target.value)}
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-auto d-flex align-items-end">
                                <Button variant="danger" onClick={() => removeCompetenceField(index)}>Remove</Button>
                            </div>
                        </div>
                    ))}

                    <Button variant="secondary" onClick={addCompetenceField} className="mb-3">
                        Add Competence
                    </Button>

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
