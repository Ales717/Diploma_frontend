import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

export interface RegisterUserFields {
    first_name?: string
    last_name?: string
    email: string
    password: string
    role?: string
    confirm_password: string
    competences?: { [key: string]: string }
}

export const useRegisterForm = () => {
    const RegisterSchema = Yup.object().shape({
        first_name: Yup.string().notRequired(),
        last_name: Yup.string().notRequired(),
        email: Yup.string().email().required('Please enter a valid email'),
        role: Yup.string().default('ADMIN'),
        competences: Yup.object().notRequired(),
        password: Yup.string()
            .matches(
                /^(?=.*\d)[A-Za-z.\s_-]+[\w~@#$%^&*+=`|{}:;!.?"()[\]-]{6,}/,
                'Password must have at least one number, lower or upper case letter and it has to be longer than 5 characters.',
            )
            .required(),
        confirm_password: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords do not match')
            .required('Passwords do not match'),
    })

    const {
        handleSubmit,
        formState: { errors },
        control,
    } = useForm({
        defaultValues: {
            first_name: '',
            last_name: '',
            email: '',
            role: 'ADMIN',
            password: '',
            competences: {},
            confirm_password: '',
        },
        mode: 'onSubmit',
        resolver: yupResolver(RegisterSchema),
    })

    return {
        handleSubmit,
        errors,
        control,
    }
}

export type RegisterForm = ReturnType<typeof useRegisterForm>
