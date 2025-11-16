import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeModel } from './model/Employee';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-app';

  employeeForm: FormGroup = new FormGroup({});
  employeeObj: EmployeeModel = new EmployeeModel();
  employeeList: EmployeeModel[] = [];

  constructor() {
    debugger;
    this.createForm();
    const oldData = localStorage.getItem("EmpData");
    if (oldData != null) {
      this.employeeList = JSON.parse(oldData);
    }

  }
  createForm() {
    this.employeeForm = new FormGroup({
      empId: new FormControl(this.employeeObj.empId),
      name: new FormControl(this.employeeObj.name,[Validators.required]),
      city: new FormControl(this.employeeObj.city),
      state: new FormControl(this.employeeObj.state),
      emailId: new FormControl(this.employeeObj.emailId),
      contactNo: new FormControl(this.employeeObj.contactNo),
      address: new FormControl(this.employeeObj.address),
      pinCode: new FormControl(this.employeeObj.pinCode,[Validators.required,Validators.minLength(6)])
    });
  }

  onReset(){
    this.employeeObj = new EmployeeModel();
    this.createForm();
  }

  onSave() {
    debugger;
    const oldData = localStorage.getItem("EmpData");
    if (oldData != null) {
      const parseData = JSON.parse(oldData);
      this.employeeForm.controls['empId'].setValue(parseData.length + 1);
      this.employeeList.unshift(this.employeeForm.value);
    }
    else {
      this.employeeList.unshift(this.employeeForm.value);
    }
    localStorage.setItem("EmpData", JSON.stringify(this.employeeList));
    this.onReset();
  }

  onEdit(item: EmployeeModel) {
    this.employeeObj = item;
    this.createForm()
  }

  onUpdate() {
    const record = this.employeeList.find(x => x.empId == this.employeeForm.controls['empId'].value)
    if (record) {
      record.address = this.employeeForm.controls['address'].value;
      record.city = this.employeeForm.controls['city'].value;
      record.state = this.employeeForm.controls['state'].value;
      record.contactNo = this.employeeForm.controls['contactNo'].value;
      record.emailId = this.employeeForm.controls['emailId'].value;
      record.name = this.employeeForm.controls['name'].value;
      record.pinCode = this.employeeForm.controls['pinCode'].value;
    }
     localStorage.setItem("EmpData", JSON.stringify(this.employeeList));
     this.onReset();
  }

  onDelete(item: EmployeeModel) {
    const isDelete = confirm("Are you sure to delete this record?");
    if (isDelete) {
      const index = this.employeeList.findIndex(x => x.empId == item.empId);
      this.employeeList.splice(index, 1);
      localStorage.setItem("EmpData", JSON.stringify(this.employeeList));
    }
  }


}
