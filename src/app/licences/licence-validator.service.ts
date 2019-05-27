import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidatorService } from 'angular4-material-table';

@Injectable()
export class LicenceValidatorService implements ValidatorService {
  getRowValidator(): FormGroup {
    return new FormGroup({
      'id':new FormControl(),
      'code':new FormControl(),
      'license_key':new FormControl(),
      'status':new FormControl(),
      'validity': new FormControl()
      //'name': new FormControl(null, Validators.required),

      });
  }
}