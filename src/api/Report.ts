import { apiRoutes } from 'constants/apiConstants'
import { apiRequest } from './Api'
import { ReportType } from 'models/report'
import { CreateUpdateReportFields } from 'hooks/react-hook-form/useCreateUpdateReportForm'


export const fetchReportsByTaskId = async (taskId: string) =>
    apiRequest<undefined, ReportType[]>('get', `${apiRoutes.REPORT_PREFIX}/task/${taskId}`)


export const createReport = async (data: CreateUpdateReportFields) =>
    apiRequest<CreateUpdateReportFields, ReportType>('post', apiRoutes.REPORT_PREFIX, data)
