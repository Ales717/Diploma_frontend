import { RegisterUserFields, useRegisterForm } from 'hooks/react-hook-form/useRegister'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as API from 'api/Api'
import { StatusCode } from 'constants/errorConstants'
import authStore from 'stores/auth.store'
import { Button, Form, FormLabel } from 'react-bootstrap'
import { Controller } from 'react-hook-form'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import ToastContainer from 'react-bootstrap/ToastContainer'
import Toast from 'react-bootstrap/Toast'
import { routes } from 'constants/routesConstants'

const AddWorkerForm = () => {
    const navigate = useNavigate()
    const { handleSubmit, errors, control } = useRegisterForm()
    const [apiError, setApiError] = useState('')
    const [showError, setShowError] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [competences, setCompetences] = useState<{ key: string, value: string }[]>([{ key: '', value: '' }])

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState)
    }
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(prevState => !prevState)
    }

    const addCompetenceField = () => {
        setCompetences([...competences, { key: '', value: '' }])
    }

    const removeCompetenceField = (index: number) => {
        setCompetences(competences.filter((_, i) => i !== index))
    }

    const handleCompetenceChange = (index: number, field: 'key' | 'value', value: string) => {
        const newCompetences = competences.slice()
        newCompetences[index][field] = value
        setCompetences(newCompetences)
    }

    const onSubmit = handleSubmit(async (data: RegisterUserFields) => {
        const formattedCompetences = competences.reduce((acc, { key, value }) => {
            if (key) acc[key] = value
            return acc
        }, {} as { [key: string]: string })

        const response = await API.createUser({ ...data, role: 'WORKER', competences: formattedCompetences })

        if (response.data?.statusCode === StatusCode.BAD_REQUEST) {
            setApiError(response.data.message)
            setShowError(true)
        } else if (response.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR) {
            setApiError(response.data.message)
            setShowError(true)
        } else {
            navigate('/workers')
        }
    })

    return (
        <>
            <div className='d-flex flex-column align-items-center justify-content-center pt-4'>
                <h2 className="display-5 fw-bold pt-4">Add Worker</h2>
                <Form className="register-form pt-0" onSubmit={onSubmit}>
                    <Controller
                        control={control}
                        name="email"
                        render={({ field }) => (
                            <Form.Group className="mb-3">
                                <FormLabel htmlFor="email">E-mail</FormLabel>
                                <input
                                    {...field}
                                    type="email"
                                    placeholder="example@gmail.com"
                                    aria-label="Email"
                                    aria-describedby="email"
                                    className={
                                        errors.email ? 'form-control is-invalid form-rounded' : 'form-control form-rounded'
                                    }
                                />
                                {errors.email && (
                                    <div className="invalid-feedback text-danger">
                                        {errors.email.message}
                                    </div>
                                )}
                            </Form.Group>
                        )}
                    />
                    <div className="row">
                        <div className="col">
                            <Controller
                                control={control}
                                name="first_name"
                                render={({ field }) => (
                                    <Form.Group className="mb-3">
                                        <FormLabel htmlFor="first_name">First name</FormLabel>
                                        <input
                                            {...field}
                                            type="text"
                                            aria-label="First name"
                                            aria-describedby="first_name"
                                            placeholder='John'
                                            className={
                                                errors.first_name ? 'form-control is-invalid form-rounded' : 'form-control form-rounded'
                                            }
                                        />
                                        {errors.first_name && (
                                            <div className="invalid-feedback text-danger">
                                                {errors.first_name.message}
                                            </div>
                                        )}
                                    </Form.Group>
                                )}
                            />
                        </div>
                        <div className="col">
                            <Controller
                                control={control}
                                name="last_name"
                                render={({ field }) => (
                                    <Form.Group className="mb-3">
                                        <FormLabel htmlFor="last_name">Last name</FormLabel>
                                        <input
                                            {...field}
                                            type="text"
                                            aria-label="Last name"
                                            aria-describedby="last_name"
                                            placeholder='Doe'
                                            className={
                                                errors.last_name ? 'form-control is-invalid form-rounded' : 'form-control form-rounded'
                                            }
                                        />
                                        {errors.last_name && (
                                            <div className="invalid-feedback text-danger">
                                                {errors.last_name.message}
                                            </div>
                                        )}
                                    </Form.Group>
                                )}
                            />
                        </div>
                    </div>

                    <Controller
                        control={control}
                        name="password"
                        render={({ field }) => (
                            <Form.Group className="mb-3">
                                <FormLabel htmlFor="password">Password</FormLabel>
                                <div className="input-group">
                                    <input
                                        {...field}
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="******"
                                        aria-label="Password"
                                        aria-describedby="password"
                                        className={
                                            errors.password ? 'form-control is-invalid form-rounded' : 'form-control form-rounded'
                                        }
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary form-rounded"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? <BsEyeSlash /> : <BsEye />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <div className="invalid-feedback text-danger">
                                        {errors.password.message}
                                    </div>
                                )}
                            </Form.Group>
                        )}
                    />

                    <Controller
                        control={control}
                        name="confirm_password"
                        render={({ field }) => (
                            <Form.Group className="mb-3">
                                <FormLabel htmlFor="confirm_password">Confirm password</FormLabel>
                                <div className="input-group">
                                    <input
                                        {...field}
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        placeholder="******"
                                        aria-label="Confirm password"
                                        aria-describedby="confirm_password"
                                        className={
                                            errors.password ? 'form-control is-invalid form-rounded' : 'form-control form-rounded'
                                        }
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary form-rounded"
                                        onClick={toggleConfirmPasswordVisibility}
                                    >
                                        {showConfirmPassword ? <BsEyeSlash /> : <BsEye />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <div className="invalid-feedback text-danger">
                                        {errors.password.message}
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
                    <Button className="w-100 btn btn-success mb-2" type="submit">
                        Add
                    </Button>
                </Form>

            </div>
            {showError && (
                <ToastContainer className="p-3" position="top-end">
                    <Toast onClose={() => setShowError(false)} show={showError}>
                        <Toast.Header>
                            <strong className="me-suto text-danger">Error</strong>
                        </Toast.Header>
                        <Toast.Body className="text-danger bg-light">{apiError}</Toast.Body>
                    </Toast>
                </ToastContainer>
            )}
        </>
    )
}

export default AddWorkerForm
