import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Controller } from 'react-hook-form'
import { Button, Form, FormLabel } from 'react-bootstrap'
import { useCreateUpdateServiceForm, CreateUpdateServiceFields } from 'hooks/react-hook-form/useCreateUpdateServiceForm'
import * as API from 'api/Api'
import ToastContainer from 'react-bootstrap/ToastContainer'
import Toast from 'react-bootstrap/Toast'

const UpdateServiceForm = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { handleSubmit, errors, control, reset } = useCreateUpdateServiceForm({})
    const [apiError, setApiError] = useState('')
    const [showError, setShowError] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadService = async () => {
            try {
                const response = await API.fetchServiceById(id!)

                response.data.requiredEquipment = JSON.stringify(response.data.requiredEquipment, null, 2)
                response.data.necessaryCompetences = JSON.stringify(response.data.necessaryCompetences, null, 2)
                reset(response.data)
                setLoading(false)
            } catch (error) {
                setApiError('Pri nalaganju podatkov o storitvi je prišlo do napake')
                setShowError(true)
                setLoading(false)
            }
        }
        loadService()
    }, [id, reset])

    const onSubmit = async (data: CreateUpdateServiceFields) => {
        try {
            data.requiredEquipment = JSON.parse(data.requiredEquipment)
            data.necessaryCompetences = JSON.parse(data.necessaryCompetences)

            await API.updateService(id!, data)
            navigate('/service')
        } catch (error) {
            setApiError('Pri posodabljanju storitve je prišlo do napake')
            setShowError(true)
        }
    }

    if (loading) {
        return <p>Nalaganje...</p>
    }

    return (
        <>
            <div className='d-flex flex-column align-items-center justify-content-center'>
                <h2 className="display-5 fw-bold">Posodobi storitev</h2>
                <Form className="w-50" onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        control={control}
                        name="name"
                        render={({ field }) => (
                            <Form.Group className="mb-3">
                                <FormLabel htmlFor="name">Ime</FormLabel>
                                <input
                                    {...field}
                                    type="text"
                                    className={errors.name ? 'form-control is-invalid' : 'form-control'}
                                    placeholder="Ime storitve"
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
                        name="description"
                        render={({ field }) => (
                            <Form.Group className="mb-3">
                                <FormLabel htmlFor="description">Opis</FormLabel>
                                <input
                                    {...field}
                                    type="text"
                                    className={errors.description ? 'form-control is-invalid' : 'form-control'}
                                    placeholder="Opis storitve"
                                    defaultValue={field.value}
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
                                <FormLabel htmlFor="requiredEquipment">Potrebna oprema</FormLabel>
                                <textarea
                                    {...field}
                                    className={errors.requiredEquipment ? 'form-control is-invalid' : 'form-control'}
                                    placeholder='{"BetonskiMešalec":"Dizelski betonski mešalec","Vibrator":"Električni betonski vibrator","RezalnikArmature":"Hidravlični rezalnik armature"}'
                                    defaultValue={field.value}
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
                                <FormLabel htmlFor="necessaryCompetences">Potrebne kompetence</FormLabel>
                                <textarea
                                    {...field}
                                    className={errors.necessaryCompetences ? 'form-control is-invalid' : 'form-control'}
                                    placeholder='{"BetonskiTehnik":"Certificiran betonski tehnik","VarnostniInšpektor":"Certificiran varnostni inšpektor","GradbeniVodja":"Izkušen gradbeni vodja"}'
                                    defaultValue={field.value}
                                />
                                {errors.necessaryCompetences && (
                                    <div className="invalid-feedback">
                                        {errors.necessaryCompetences.message}
                                    </div>
                                )}
                            </Form.Group>
                        )}
                    />
                    <Button type="submit" className="w-100 btn btn-primary">Posodobi storitev</Button>
                </Form>
            </div>
            {showError && (
                <ToastContainer className="p-3" position="top-end">
                    <Toast onClose={() => setShowError(false)} show={showError} delay={3000} autohide>
                        <Toast.Header>
                            <strong className="me-auto text-danger">Napaka</strong>
                        </Toast.Header>
                        <Toast.Body className="text-danger">{apiError}</Toast.Body>
                    </Toast>
                </ToastContainer>
            )}
        </>
    )
}

export default UpdateServiceForm
