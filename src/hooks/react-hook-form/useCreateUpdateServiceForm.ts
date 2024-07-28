import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { ServiceType } from 'models/service'

export interface CreateUpdateServiceFields {
    name: string
    description: string
    requiredEquipment: string
    necessaryCompetences: string
}

interface Props {
    defaultValues?: ServiceType
}

export const useCreateUpdateServiceForm = ({ defaultValues }: Props) => {
    const CreateUpdateServiceSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        description: Yup.string().required('Description is required'),
        requiredEquipment: Yup.string().required('Required equipment is required'),
        necessaryCompetences: Yup.string().required('Necessary competences are required'),
    })

    const {
        handleSubmit,
        formState: { errors },
        control,
        reset,
    } = useForm({
        defaultValues: {
            name: '',
            description: '',
            requiredEquipment: '',
            necessaryCompetences: '',
            ...defaultValues,
        },
        mode: 'onSubmit',
        resolver: yupResolver(CreateUpdateServiceSchema)
    })

    return {
        handleSubmit,
        errors,
        control,
        reset
    }
}

export type CreateUpdateServiceForm = ReturnType<typeof useCreateUpdateServiceForm>

