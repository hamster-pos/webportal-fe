import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidatorService } from 'angular4-material-table';

@Injectable()
export class PersonValidatorService implements ValidatorService {
  getRowValidator(): FormGroup {
    return new FormGroup({
      'id':new FormControl(),
      'firstName':new FormControl(),
      'lastName':new FormControl(),
      'phoneNumber':new FormControl(),
      'address':new FormControl(),
      'shopName':new FormControl(),
      'emailAddress':new FormControl('',Validators.required),
      'status':new FormControl(),
      //'name': new FormControl(null, Validators.required),

      });
  }
}