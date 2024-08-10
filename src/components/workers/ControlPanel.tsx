import * as API from 'api/Api'
import { StatusCode } from 'constants/errorConstants'
import { useEffect, useState } from 'react'
import { Card, Col, Container, ListGroup, Row, Button, Spinner, Alert, Navbar, FormLabel, FormControl, Form } from 'react-bootstrap'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import authStore from 'stores/auth.store'
import { useCreateUpdateReportForm, CreateUpdateReportFields } from 'hooks/react-hook-form/useCreateUpdateReportForm'
import { Controller } from 'react-hook-form'

interface TaskType {
    id: string
    startDate: string
    done: boolean
    serviceId: string
    serviceName?: string
}


const ControlPanel = () => {
    const navigate = useNavigate()
    const [apiError, setApiError] = useState('')
    const [showError, setShowError] = useState(false)

    const singout = async () => {
        const response = await API.signout()
        if (response.data?.statusCode === StatusCode.BAD_REQUEST) {
            setApiError(response.data.message)
            setShowError(true)
        } else if (response.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR) {
            setApiError(response.data.message)
            setShowError(true)
        } else {
            authStore.signout()
            navigate('/')
        }
    }

    const { data: userData, isLoading: userLoading } = useQuery(
        ['currentUser'],
        () => API.currentUser(),
    )
    const userId = userData?.data?.id


    const { data: allocationData, isLoading: allocationLoading, error: allocationError } = useQuery(
        ['allocations', userId],
        () => API.fetchAllocationByUserId(userId),
        {
            enabled: !!userId
        }
    )

    const [tasks, setTasks] = useState<TaskType[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchTasks = async () => {
            if (allocationData?.data) {
                const taskIds = allocationData.data.map((allocation: any) => allocation.taskId)
                const tasksPromises = taskIds.map(async (taskId: string) => {
                    const taskResponse = await API.fetchTaskById(taskId)
                    const serviceResponse = await API.fetchServiceById(taskResponse.data.serviceId)
                    return {
                        ...taskResponse.data,
                        serviceName: serviceResponse.data.name
                    }
                })
                const tasksResults = await Promise.all(tasksPromises)
                setTasks(tasksResults)
            }
        }

        fetchTasks()
    }, [allocationData])

    const markTaskAsDone = async (taskId: string) => {
        setLoading(true)
        try {
            await API.markTaskAsDone(taskId)
            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task.id === taskId ? { ...task, done: true } : task
                )
            )
        } catch (err) {
            setError('An error occurred while marking the task as done')
        } finally {
            setLoading(false)
        }
    }

    const inProgressTasks = tasks.filter(task => !task.done)
    const completedTasks = tasks.filter(task => task.done)

    const taskId = inProgressTasks[0]?.id


    const { handleSubmit, control, errors, reset } = useCreateUpdateReportForm({
        defaultValues: {
            userId,
            taskId,
            date: new Date().toISOString().split('T')[0],
        }
    })

    const onSubmit = handleSubmit(async (data: CreateUpdateReportFields) => {
        try {
            data.taskId = taskId
            console.log(data.userId)
            await API.createReport(data)
            console.log(data)
            reset()
        } catch (err) {
            console.error('An error occurred while creating the report:', err)
        }
    })

    return (
        <>
            <Navbar className="navbar navbar-dark bg-dark">
                <Container>
                    <Navbar.Brand>{userData?.data.first_name} {userData?.data.last_name}</Navbar.Brand>
                    <Button className="btn btn-light" onClick={singout}>
                        Signout
                    </Button>
                </Container>
            </Navbar>
            <Container className="mt-4">
                <Row>
                    <Col md={6}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Current Tasks</Card.Title>
                                <ListGroup variant="flush">
                                    {inProgressTasks.map((task: TaskType) => (
                                        <ListGroup.Item key={task.id}>
                                            <strong>Service:</strong> {task.serviceName}<br />
                                            <strong>Start Date:</strong> {new Date(task.startDate).toLocaleDateString()}<br />
                                            <strong>Status:</strong> {task.done ? 'Completed' : 'In Progress'}<br />
                                            <Button
                                                variant="success"
                                                onClick={() => markTaskAsDone(task.id)}
                                                disabled={loading}
                                            >
                                                Mark as Done
                                            </Button>
                                            {loading && <Spinner animation="border" size="sm" />}
                                            {error && <Alert variant="danger">{error}</Alert>}
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Create Report</Card.Title>
                                <Form className="report-form pt-0" onSubmit={onSubmit}>
                                    <Controller
                                        control={control}
                                        name="description"
                                        render={({ field }) => (
                                            <Form.Group className="mb-3">
                                                <FormLabel htmlFor="description">Description</FormLabel>
                                                <textarea
                                                    {...field}
                                                    placeholder="Enter description"
                                                    aria-label="Description"
                                                    aria-describedby="description"
                                                    className={
                                                        errors.description ? 'form-control is-invalid form-rounded' : 'form-control form-rounded'
                                                    }
                                                />
                                                {errors.description && (
                                                    <div className="invalid-feedback text-danger">
                                                        {errors.description.message}
                                                    </div>
                                                )}
                                            </Form.Group>
                                        )}
                                    />
                                    <Controller
                                        control={control}
                                        name="date"
                                        render={({ field }) => (
                                            <Form.Group className="mb-3">
                                                <FormLabel htmlFor="date">Date</FormLabel>
                                                <FormControl
                                                    {...field}
                                                    type="date"
                                                    placeholder="Enter date"
                                                    aria-label="Date"
                                                    aria-describedby="date"
                                                    className={
                                                        errors.date ? 'form-control is-invalid form-rounded' : 'form-control form-rounded'
                                                    }
                                                />
                                                {errors.date && (
                                                    <div className="invalid-feedback text-danger">
                                                        {errors.date.message}
                                                    </div>
                                                )}
                                            </Form.Group>
                                        )}
                                    />
                                    <input type="hidden" value={userId} {...control.register('userId')} />
                                    <input type="hidden" value={taskId} {...control.register('taskId')} />
                                    <Button className="w-100 btn btn-success mb-2" type="submit">
                                        Submit Report
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Completed Tasks</Card.Title>
                                <ListGroup variant="flush">
                                    {completedTasks.map((task: TaskType) => (
                                        <ListGroup.Item key={task.id}>
                                            <strong>Service:</strong> {task.serviceName}<br />
                                            <strong>Start Date:</strong> {new Date(task.startDate).toLocaleDateString()}<br />
                                            <strong>Status:</strong> {task.done ? 'Completed' : 'In Progress'}
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default ControlPanel
