import { yupResolver } from '@hookform/resolvers/yup'
import { OrderType } from 'models/order'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

export interface CreateUpdateOrderFields {
    costumer: string
    contact: string
    date: string
    done: Boolean
}

interface Props {
    defaultValues?: OrderType
}

export const useCreateUpdateOrderForm = ({ defaultValues }: Props) => {
    const CreateUpdateOrderSchema = Yup.object().shape({
        costumer: Yup.string().required('Customer name is required'),
        contact: Yup.string().required('Contact information is required'),
        date: Yup.date().required('Date is required'),
        done: Yup.boolean().required('Status is required.')
    })

    const {
        handleSubmit,
        formState: { errors },
        control,
        reset,
    } = useForm({
        defaultValues: {
            costumer: '',
            contact: '',
            date: '',
            done: false,
            ...defaultValues,
        },
        mode: 'onSubmit',
        resolver: yupResolver(CreateUpdateOrderSchema)
    })

    return {
        handleSubmit,
        errors,
        control,
        reset
    }
}

export type CreateUpdateOrderForm = ReturnType<typeof useCreateUpdateOrderForm>
