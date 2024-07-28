import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { EquipmentType } from 'models/equipment'

export interface CreateUpdateEquipmentFields {
    name: string
    type: string
    availability?: boolean
}

interface Props {
    defaultValues?: EquipmentType
}

export const useCreateUpdateEquipmentForm = ({ defaultValues }: Props) => {
    const CreateUpdateEquipmentSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        type: Yup.string().required('Type is required'),
        availability: Yup.boolean().notRequired(),
    })

    const {
        handleSubmit,
        formState: { errors },
        control,
        reset,
    } = useForm({
        defaultValues: {
            name: '',
            type: '',
            availability: true,
            ...defaultValues,
        },
        mode: 'onSubmit',
        resolver: yupResolver(CreateUpdateEquipmentSchema)
    })

    return {
        handleSubmit,
        errors,
        control,
        reset
    }
}

export type CreateUpdateEquipmentForm = ReturnType<typeof useCreateUpdateEquipmentForm>
