import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../../shared/api.service';
import { EmployeeModel } from './employee-dashboard.model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  formValue !: FormGroup;
  employeeModelObj: EmployeeModel = new EmployeeModel();
  employeeData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;
  showDetail !: boolean;
  totalLength: any;
  page: number = 1;

  constructor(private formbuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      id: [''],
      name: [''],
      surname: [''],
      email: [''],
      mobile: [''],
      age: [''],
      sex: [''],
      carrier: [''],
      role: [''],
      graduation: [''],
      parentEmployeId: ['']
    })
    this.getAllEmployee();
    this.api.getEmployee().subscribe((result) => {
      this.employeeData = result;
      this.totalLength = result.length;
    });
  }

  clickAddEmployee() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
    this.showDetail = false;
  }

  postEmployeeDetails() {
    this.employeeModelObj.id = this.formValue.value.id;
    this.employeeModelObj.name = this.formValue.value.name;
    this.employeeModelObj.surname = this.formValue.value.surname;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.age = this.formValue.value.age;
    this.employeeModelObj.sex = this.formValue.value.sex;
    this.employeeModelObj.carrier = this.formValue.value.carrier;
    this.employeeModelObj.role = this.formValue.value.role;
    this.employeeModelObj.graduation = this.formValue.value.graduation;
    this.employeeModelObj.parentEmployeId = this.formValue.value.parentEmployeId;

    this.api.postEmployee(this.employeeModelObj)
      .subscribe({
        next: res => {
          console.log(res);
          alert("Employeee Added Successfully")
          let ref = document.getElementById('cancel')
          ref?.click();
          this.formValue.reset();
          this.getAllEmployee();
        },
        error: err => {
          alert("Something Went Wrong")
        }
      })
  }

  getAllEmployee() {
    this.api.getEmployee()
      .subscribe(res => {
        this.employeeData = res;
      })
  }

  deleteEmployee(row: any) {
    this.api.deleteEmployee(row.id)
      .subscribe(res => {
        alert("Employee Deleted")
        this.getAllEmployee();
      })
  }

  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.showDetail = false;

    this.employeeModelObj.id = row.id;

    this.formValue.controls['id'].setValue(row.id);
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['surname'].setValue(row.surname);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['age'].setValue(row.age);
    this.formValue.controls['sex'].setValue(row.sex);
    this.formValue.controls['carrier'].setValue(row.carrier);
    this.formValue.controls['role'].setValue(row.role);
    this.formValue.controls['graduation'].setValue(row.graduation);
    this.formValue.controls['parentEmployeId'].setValue(row.parentEmployeId);
  }

  updateEmployeeDetails() {
    this.employeeModelObj.id = this.formValue.value.id;
    this.employeeModelObj.name = this.formValue.value.name;
    this.employeeModelObj.surname = this.formValue.value.surname;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.age = this.formValue.value.age;
    this.employeeModelObj.sex = this.formValue.value.sex;
    this.employeeModelObj.carrier = this.formValue.value.carrier;
    this.employeeModelObj.role = this.formValue.value.role;
    this.employeeModelObj.graduation = this.formValue.value.graduation;
    this.employeeModelObj.parentEmployeId = this.formValue.value.parentEmployeId;

    this.api.updateEmployee(this.employeeModelObj, this.employeeModelObj.id)
      .subscribe(res => {
        alert("Updated Successfully");
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllEmployee();
      })
  }

  onDetail(row: any) {
    this.showAdd = false;
    this.showUpdate = false;
    this.showDetail = true;

    this.employeeModelObj.id = row.id;

    this.formValue.controls['id'].setValue(row.id);
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['surname'].setValue(row.surname);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['age'].setValue(row.age);
    this.formValue.controls['sex'].setValue(row.sex);
    this.formValue.controls['carrier'].setValue(row.carrier);
    this.formValue.controls['role'].setValue(row.role);
    this.formValue.controls['graduation'].setValue(row.graduation);
    this.formValue.controls['parentEmployeId'].setValue(row.parentEmployeId);
  }

  disableTxt() {
    document.getElementsByTagName("input")[0].disabled = true;
    document.getElementsByTagName("input")[1].disabled = true;
    document.getElementsByTagName("input")[2].disabled = true;
    document.getElementsByTagName("input")[3].disabled = true;
    document.getElementsByTagName("input")[4].disabled = true;
    document.getElementsByTagName("input")[5].disabled = true;
    document.getElementsByTagName("input")[6].disabled = true;
    document.getElementsByTagName("input")[7].disabled = true;
    document.getElementsByTagName("input")[8].disabled = true;
    document.getElementsByTagName("input")[9].disabled = true;
    document.getElementsByTagName("input")[10].disabled = true;
  }

  undisableTxt() {
    document.getElementsByTagName("input")[0].disabled = false;
    document.getElementsByTagName("input")[1].disabled = false;
    document.getElementsByTagName("input")[2].disabled = false;
    document.getElementsByTagName("input")[3].disabled = false;
    document.getElementsByTagName("input")[4].disabled = false;
    document.getElementsByTagName("input")[5].disabled = false;
    document.getElementsByTagName("input")[6].disabled = false;
    document.getElementsByTagName("input")[7].disabled = false;
    document.getElementsByTagName("input")[8].disabled = false;
    document.getElementsByTagName("input")[9].disabled = false;
    document.getElementsByTagName("input")[10].disabled = false;
  }

}
