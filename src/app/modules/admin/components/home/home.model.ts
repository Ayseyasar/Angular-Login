export class PatientModel {
    id: number = 0;
    name: string = '';
    surname: string = '';
    age: string = '';
    mobile: string = '';
    action: string = '';
    disease?: string = '';
    status: string = '';
    doctorId: number = 0;
    note?: any[] = [''];
}