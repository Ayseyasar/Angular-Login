import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../../shared/api.service';
import { PatientModel } from './home.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  formpatValue !: FormGroup;
  patientModelObj: PatientModel = new PatientModel();
  patientData: any;
  showAdd !: boolean;
  showUpdate !: boolean;
  showDetail !: boolean;
  totalLength: any;
  page: number = 1;

  constructor(private formbuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formpatValue = this.formbuilder.group({
      id: [''],
      name: [''],
      surname: [''],
      age: [''],
      mobile: [''],
      action: [''],
      disease: [''],
      status: [''],
      doctorId: [''],
      note: ['']
    })
    this.getAllPatient();
    this.api.getPatient().subscribe((result) => {
      this.patientData = result;
      this.totalLength = result.length;
    });
  }

  clickAddPatient() {
    this.formpatValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
    this.showDetail = false;
  }

  postPatientDetails() {
    this.patientModelObj.id = this.formpatValue.value.id;
    this.patientModelObj.name = this.formpatValue.value.name;
    this.patientModelObj.surname = this.formpatValue.value.surname;
    this.patientModelObj.age = this.formpatValue.value.age;
    this.patientModelObj.mobile = this.formpatValue.value.mobile;
    this.patientModelObj.action = this.formpatValue.value.action;
    this.patientModelObj.disease = this.formpatValue.value.disease;
    this.patientModelObj.status = this.formpatValue.value.status;
    this.patientModelObj.doctorId = this.formpatValue.value.doctorId;
    this.patientModelObj.note = this.formpatValue.value.note;

    this.api.postPatient(this.patientModelObj)
      .subscribe({
        next: res => {
          console.log(res);
          alert("Patient Added Successfully")
          let ref = document.getElementById('cancel')
          ref?.click();
          this.formpatValue.reset();
          this.getAllPatient();
        },
        error: err => {
          alert("Something Went Wrong")
        }
      })
  }

  getAllPatient() {
    this.api.getPatient()
      .subscribe(res => {
        this.patientData = res;
      })
  }

  deletePatient(row: any) {
    this.api.deletePatient(row.id)
      .subscribe(res => {
        alert("Patient Deleted")
        this.getAllPatient();
      })
  }

  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.showDetail = false;

    this.patientModelObj.id = row.id;

    this.formpatValue.controls['id'].setValue(row.id);
    this.formpatValue.controls['name'].setValue(row.name);
    this.formpatValue.controls['surname'].setValue(row.surname);
    this.formpatValue.controls['age'].setValue(row.age);
    this.formpatValue.controls['mobile'].setValue(row.mobile);
    this.formpatValue.controls['action'].setValue(row.action);
    this.formpatValue.controls['disease'].setValue(row.disease);
    this.formpatValue.controls['status'].setValue(row.status);
    this.formpatValue.controls['doctorId'].setValue(row.doctorId);
    this.formpatValue.controls['note'].setValue(row.note);
  }

  updatePatientDetails() {
    this.patientModelObj.id = this.formpatValue.value.id;
    this.patientModelObj.name = this.formpatValue.value.name;
    this.patientModelObj.surname = this.formpatValue.value.surname;
    this.patientModelObj.age = this.formpatValue.value.age;
    this.patientModelObj.mobile = this.formpatValue.value.mobile;
    this.patientModelObj.action = this.formpatValue.value.action;
    this.patientModelObj.disease = this.formpatValue.value.disease;
    this.patientModelObj.status = this.formpatValue.value.status;
    this.patientModelObj.doctorId = this.formpatValue.value.doctorId;
    this.patientModelObj.note = this.formpatValue.value.note;

    this.api.updatePatient(this.patientModelObj, this.patientModelObj.id)
      .subscribe(res => {
        alert("Updated Successfully");
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formpatValue.reset();
        this.getAllPatient();
      })
  }

  onDetail(row: any) {
    this.showAdd = false;
    this.showUpdate = false;
    this.showDetail = true;

    this.patientModelObj.id = row.id;

    this.formpatValue.controls['id'].setValue(row.id);
    this.formpatValue.controls['name'].setValue(row.name);
    this.formpatValue.controls['surname'].setValue(row.surname);
    this.formpatValue.controls['age'].setValue(row.age);
    this.formpatValue.controls['mobile'].setValue(row.mobile);
    this.formpatValue.controls['action'].setValue(row.action);
    this.formpatValue.controls['disease'].setValue(row.disease);
    this.formpatValue.controls['status'].setValue(row.status);
    this.formpatValue.controls['doctorId'].setValue(row.doctorId);
    this.formpatValue.controls['note'].setValue(row.note);
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
  }

}