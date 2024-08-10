import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { UserType } from 'models/auth'

export interface CreateUpdateUserFields {
    first_name: string
    last_name: string
    email: string
    password?: string
    role: string
    availability: boolean
    competences: { [key: string]: string }
}

interface Props {
    defaultValues?: UserType
}

export const useCreateUpdateUserForm = ({ defaultValues }: Props) => {
    const CreateUpdateUserSchema = Yup.object().shape({
        first_name: Yup.string().required('First name is required'),
        last_name: Yup.string().required('Last name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters'),
        role: Yup.string().required('Role is required'),
        availability: Yup.boolean().required('Availability is required'),
        competences: Yup.object().notRequired(),
    })

    const {
        handleSubmit,
        formState: { errors },
        control,
        reset,
    } = useForm({
        defaultValues: {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            role: '',
            availability: true,
            competences: {},
            ...defaultValues,
        },
        mode: 'onSubmit',
        resolver: yupResolver(CreateUpdateUserSchema)
    })

    return {
        handleSubmit,
        errors,
        control,
        reset
    }
}

export type CreateUpdateUserForm = ReturnType<typeof useCreateUpdateUserForm>
