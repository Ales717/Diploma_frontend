import React, { useState, useEffect } from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { Button, Form, FormLabel, Toast, ToastContainer } from 'react-bootstrap'
import * as API from 'api/Api'
import { useNavigate } from 'react-router-dom'
import { StatusCode } from 'constants/errorConstants'

interface Service {
    id: string
    name: string
}

interface OrderFormData {
    customer: string
    contact: string
    services: string[]
    costumer: string
    date: string
    done: boolean
}

const OrderForm = () => {
    const { handleSubmit, control, formState: { errors }, setValue } = useForm<OrderFormData>()
    const [services, setServices] = useState<Service[]>([])
    const [apiError, setApiError] = useState('')
    const [showError, setShowError] = useState(false)

    useEffect(() => {
        const loadServices = async () => {
            try {
                const response = await API.fetchServices()
                setServices(response.data)
            } catch (error) {
                setServices([])
            }
        }
        loadServices()
    }, [])

    useEffect(() => {
        setValue('services', [])
    }, [setValue])

    const onSubmit: SubmitHandler<OrderFormData> = async (data) => {
        try {
            const orderData = {
                ...data,
                costumer: data.customer,
                date: new Date().toISOString(),
                done: false,
            }
            console.log(orderData)
            const response = await API.create(orderData)
            if (response.data?.statusCode === StatusCode.BAD_REQUEST) {
                setApiError(response.data?.message)
                setShowError(true)
            }
        } catch (error) {

            setApiError('Error creating order: ' + error)
            setShowError(true)
        }
    }

    return (
        <>
            <Form className='w-75' onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    control={control}
                    name="customer"
                    render={({ field }) => (
                        <Form.Group className="mb-3">
                            <FormLabel>Customer Name</FormLabel>
                            <input
                                {...field}
                                type="text"
                                className={`form-control ${errors.customer ? 'is-invalid' : ''}`}
                                placeholder="Enter customer name"
                            />
                            {errors.customer && <div className="invalid-feedback">Customer name is required</div>}
                        </Form.Group>
                    )}
                />
                <Controller
                    control={control}
                    name="contact"
                    render={({ field }) => (
                        <Form.Group className="mb-3">
                            <FormLabel>Contact</FormLabel>
                            <input
                                {...field}
                                type="text"
                                className={`form-control ${errors.contact ? 'is-invalid' : ''}`}
                                placeholder="Enter contact"
                            />
                            {errors.contact && <div className="invalid-feedback">Contact is required</div>}
                        </Form.Group>
                    )}
                />
                <Controller
                    control={control}
                    name="services"
                    render={({ field }) => (
                        <Form.Group className="mb-3">
                            <FormLabel>Services</FormLabel>
                            <select
                                {...field}
                                className={`form-control ${errors.services ? 'is-invalid' : ''}`}
                                multiple
                                value={field.value || []}
                                onChange={(e) => {
                                    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value)
                                    field.onChange(selectedOptions)
                                }}
                            >
                                {services.map(service => (
                                    <option key={service.id} value={service.id}>
                                        {service.name}
                                    </option>
                                ))}
                            </select>
                            {errors.services && <div className="invalid-feedback">At least one service is required</div>}
                        </Form.Group>
                    )}
                />
                <Button type="submit" className="w-100 btn btn-primary">Submit Order</Button>
            </Form>
            {showError && (
                <ToastContainer className="p-3" position="top-end">
                    <Toast onClose={() => setShowError(false)} show={showError} delay={3000} autohide>
                        <Toast.Header>
                            <strong className="me-auto text-danger">Error</strong>
                        </Toast.Header>
                        <Toast.Body className="text-danger">{apiError}</Toast.Body>
                    </Toast>
                </ToastContainer>
            )}</>
    )
}

export default OrderForm
