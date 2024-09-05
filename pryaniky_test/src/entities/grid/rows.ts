import { DateUtils } from 'entities/helpers';
import { TGridElement } from 'shared/pages/table/types';

export const getGridRows = (grid: TGridElement[]) => {
  if(!grid) return [];

  return grid.map((el: TGridElement, i) => {
    return {
      number: i + 1,
      id: el.id,
      companySigDate: DateUtils.formatForGrid(el.companySigDate),
      companySignatureName: el.companySignatureName,
      documentName: el.documentName,
      documentStatus: el.documentStatus,
      documentType: el.documentType,
      employeeNumber: el.employeeNumber,
      employeeSigDate: DateUtils.formatForGrid(el.employeeSigDate),
      employeeSignatureName: el.employeeSignatureName,
    }
  })
}