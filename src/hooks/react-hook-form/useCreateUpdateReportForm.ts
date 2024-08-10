import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { ReportType } from 'models/report'

export interface CreateUpdateReportFields {
    description: string
    date: string
    userId?: string
    taskId?: string
}

interface Props {
    defaultValues?: Partial<CreateUpdateReportFields>
}

export const useCreateUpdateReportForm = ({ defaultValues }: Props) => {
    const CreateUpdateReportSchema = Yup.object().shape({
        description: Yup.string().required('Description is required'),
        date: Yup.string().required('Date is required'),
        userId: Yup.string().notRequired(),
        taskId: Yup.string().notRequired()
    })

    const {
        handleSubmit,
        formState: { errors },
        control,
        reset,
    } = useForm<CreateUpdateReportFields>({
        defaultValues: {
            description: '',
            date: '',
            userId: '',
            taskId: '',
            ...defaultValues,
        },
        mode: 'onSubmit',
        resolver: yupResolver(CreateUpdateReportSchema)
    })

    return {
        handleSubmit,
        errors,
        control,
        reset
    }
}

export type CreateUpdateReportForm = ReturnType<typeof useCreateUpdateReportForm>
