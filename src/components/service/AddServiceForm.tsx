import React, { useState, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Button, Form, FormLabel } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import * as API from 'api/Api'
import ToastContainer from 'react-bootstrap/ToastContainer'
import Toast from 'react-bootstrap/Toast'
import { CreateUpdateServiceFields } from 'hooks/react-hook-form/useCreateUpdateServiceForm'

interface Equipment {
    id: string
    name: string
}

interface Competence {
    competence: string
    type: string
}

const AddServiceForm = () => {
    const navigate = useNavigate()
    const { handleSubmit, formState: { errors }, control, setValue } = useForm<CreateUpdateServiceFields>()
    const [apiError, setApiError] = useState('')
    const [showError, setShowError] = useState(false)
    const [equipmentList, setEquipmentList] = useState<Equipment[]>([])
    const [selectedEquipment, setSelectedEquipment] = useState<Record<string, string>>({})
    const [competences, setCompetences] = useState<{ competence: string, type: string }[]>([])

    useEffect(() => {
        const loadEquipment = async () => {
            try {
                const response = await API.fetchEquipment()
                setEquipmentList(response.data)
            } catch (error) {
                console.error('Error fetching equipment:', error)
            }
        }
        loadEquipment()
    }, [])

    const handleEquipmentDoubleClick = (equipmentId: string) => {
        const equipment = equipmentList.find(eq => eq.id === equipmentId)
        if (equipment) {
            setSelectedEquipment(prevSelected => {
                const newSelected = {
                    ...prevSelected,
                    [equipmentId]: equipment.name
                }
                setValue('requiredEquipment', JSON.stringify(newSelected))
                return newSelected
            })
        }
    }

    const handleAddCompetence = () => {
        setCompetences([...competences, { competence: '', type: '' }])
    }

    const handleRemoveCompetence = (index: number) => {
        const newCompetences = competences.slice()
        newCompetences.splice(index, 1)
        setCompetences(newCompetences)
    }

    const handleCompetenceChange = (index: number, field: keyof Competence, value: string) => {
        const newCompetences = competences.slice()
        newCompetences[index] = {
            ...newCompetences[index],
            [field]: value
        }
        setCompetences(newCompetences)
        setValue('necessaryCompetences', JSON.stringify(newCompetences.reduce((acc, curr) => {
            acc[curr.competence] = curr.type
            return acc
        }, {} as Record<string, string>)))
    }

    const onSubmit = async (data: CreateUpdateServiceFields) => {
        try {
            const serviceData = {
                ...data,
                requiredEquipment: JSON.parse(data.requiredEquipment || '{}'),
                necessaryCompetences: JSON.parse(data.necessaryCompetences || '{}')
            }
            await API.createService(serviceData)
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
                    <Form.Group className="mb-3">
                        <FormLabel>Available Equipment (Double click to select)</FormLabel>
                        <ul className="list-group">
                            {equipmentList.map(equipment => (
                                <li
                                    key={equipment.id}
                                    className="list-group-item"
                                    onDoubleClick={() => handleEquipmentDoubleClick(equipment.id)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {equipment.name}
                                </li>
                            ))}
                        </ul>
                    </Form.Group>
                    <Controller
                        control={control}
                        name="requiredEquipment"
                        render={({ field }) => (
                            <Form.Group className="mb-3">
                                <FormLabel htmlFor="requiredEquipment">Selected Equipment</FormLabel>
                                <textarea
                                    {...field}
                                    className={errors.requiredEquipment ? 'form-control is-invalid' : 'form-control'}
                                    value={JSON.stringify(selectedEquipment, null, 2)}
                                    placeholder='{"id1":"name1","id2":"name2"}'
                                    readOnly
                                />
                                {errors.requiredEquipment && (
                                    <div className="invalid-feedback">
                                        {errors.requiredEquipment.message}
                                    </div>
                                )}
                            </Form.Group>
                        )}
                    />
                    <Form.Group className="mb-3">
                        <FormLabel>Necessary Competences</FormLabel>
                        {competences.map((comp, index) => (
                            <div key={index} className="d-flex mb-2">
                                <input
                                    type="text"
                                    className="form-control me-2"
                                    placeholder="Competence"
                                    value={comp.competence}
                                    onChange={(e) => handleCompetenceChange(index, 'competence', e.target.value)}
                                />
                                <input
                                    type="text"
                                    className="form-control me-2"
                                    placeholder="Type"
                                    value={comp.type}
                                    onChange={(e) => handleCompetenceChange(index, 'type', e.target.value)}
                                />
                                <Button variant="danger" onClick={() => handleRemoveCompetence(index)}>Remove</Button>
                            </div>
                        ))}
                        <Button variant="secondary" onClick={handleAddCompetence}>Add Competence</Button>
                    </Form.Group>
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
