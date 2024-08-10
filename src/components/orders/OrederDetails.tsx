import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Card, Spinner, Alert, ListGroup, Container, Row, Col, Button } from 'react-bootstrap'
import * as API from 'api/Api'
import emailjs from 'emailjs-com'

interface OrderDetails {
    id: string
    costumer: string
    contact: string
    date: string
    done: boolean
}

interface TaskType {
    id: string
    startDate: string
    done: boolean
    serviceId: string
    serviceName?: string
}

interface ReportType {
    id: string
    description: string
    date: string
    userId: string
    taskId: string
    userName?: string
}

const OrderDetails = () => {
    const { id } = useParams<{ id: string }>()
    const [order, setOrder] = useState<OrderDetails | null>(null)
    const [tasks, setTasks] = useState<TaskType[]>([])
    const [reports, setReports] = useState<ReportType[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)


    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await API.fetchOrderById(id!)
                setOrder(response.data)
                setLoading(false)
            } catch (err) {
                setError('An error occurred while fetching the order details')
                setLoading(false)
            }
        }
        fetchOrderDetails()
    }, [id])

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await API.fetchTaskByOrderId(id!)
                const tasksWithServiceNames = await Promise.all(response.data.map(async (task: TaskType) => {
                    const serviceResponse = await API.fetchServiceById(task.serviceId)
                    return {
                        ...task,
                        serviceName: serviceResponse.data.name
                    }
                }))
                setTasks(tasksWithServiceNames)
            } catch (err) {
                setError('An error occurred while fetching the tasks')
            }
        }
        if (id) {
            fetchTasks()
        }
    }, [id])

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const allReports = await Promise.all(tasks.map(async (task) => {
                    const response = await API.fetchReportsByTaskId(task.id)
                    const reportsWithUserNames = await Promise.all(response.data.map(async (report: ReportType) => {
                        const userResponse = await API.fetchWorkerById(report.userId)
                        return {
                            ...report,
                            userName: `${userResponse.data.first_name} ${userResponse.data.last_name}`
                        }
                    }))
                    return reportsWithUserNames
                }))
                setReports(allReports.flat())
            } catch (err) {
                setError('An error occurred while fetching the reports')
            }
        }
        if (tasks.length > 0) {
            fetchReports()
        }
    }, [tasks])


    const sendEmail = (contact: string) => {
        const templateParams = {
            to_email: contact,
            subject: 'Order Completed',
            message: 'Your order is now complete. Thank you for your business!'
        }

        emailjs.send('service_zj4xhff', 'template_u5fonfr', templateParams, 'AkcVLdLitOc3QB_XO')
            .then((result) => {
                console.log(result.text)
            }, (error) => {
                console.log(error.text)
            })
    }


    const handleToggleStatus = async () => {
        try {
            await API.toggleOrderStatus(id!)
            const response = await API.fetchOrderById(id!)
            setOrder(response.data)
            if (response.data.done) {
                sendEmail(response.data.contact)
            }
        } catch (err) {
            setError('An error occurred while toggling the order status')
        }
    }

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
        )
    }

    if (error) {
        return (
            <Alert variant="danger" className="m-3">
                {error}
            </Alert>
        )
    }

    return (
        <Container className="mt-4">
            <Row className="justify-content-start">
                <Col md={6}>
                    {order ? (
                        <Card className="mb-4">
                            <Card.Body>
                                <Card.Title>Order Details</Card.Title>
                                <Card.Text>
                                    <strong>Customer:</strong> {order.costumer}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Contact:</strong> {order.contact}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Date:</strong> {new Date(order.date).toLocaleDateString()}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Status:</strong> {order.done ? 'Completed' : 'In Progress'}
                                </Card.Text>
                                <Button variant="primary" onClick={handleToggleStatus}>
                                    {order.done ? 'Mark as In Progress' : 'Mark as Completed'}
                                </Button>
                            </Card.Body>
                        </Card>
                    ) : (
                        <Alert variant="warning" className="m-3">
                            No order found
                        </Alert>
                    )}

                    <Card>
                        <Card.Body>
                            <Card.Title>Tasks</Card.Title>
                            <ListGroup variant="flush">
                                {tasks.map(task => (
                                    <ListGroup.Item key={task.id}>
                                        <strong>Start Date:</strong> {new Date(task.startDate).toLocaleDateString()} <br />
                                        <strong>Status:</strong> {task.done ? 'Completed' : 'In Progress'}<br />
                                        <strong>Service:</strong> {task.serviceName}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Reports</Card.Title>
                            <ListGroup variant="flush">
                                {reports.map(report => (
                                    <ListGroup.Item key={report.id}>
                                        <strong>Date:</strong> {new Date(report.date).toLocaleDateString()} <br />
                                        <strong>User:</strong> {report.userName}<br />
                                        <strong>Description:</strong> {report.description}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default OrderDetails
