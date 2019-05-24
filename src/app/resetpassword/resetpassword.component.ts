import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { constants } from '../constants';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit{

  resetPasswordForm: FormGroup;
  submitted = false;
  failed = false;
  id;

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private activatedroute:ActivatedRoute,
      private http: HttpClient
  ) {}

  ngOnInit() {
      this.resetPasswordForm = this.formBuilder.group({
        password: ['', Validators.required],
        confirmpassword: ['', Validators.required]
      });

      this.id=this.activatedroute.snapshot.params['id'];
      console.log(this.id);
  }
  get f() { return this.resetPasswordForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.resetPasswordForm.invalid) {
          return;
      }
      if(this.f.password.value !== this.f.confirmpassword.value){
        console.log('not same');
        this.failed = true;
        return;
      }
     console.log("forget password init");

     this.http.put(constants.baseURL + '/customer/reset/password', {id:this.id, password: this.f.password.value, confirmPassword: this.f.confirmpassword.value }, { responseType: 'text', observe: 'response' })
     .subscribe(
         res => {
             console.log('conf password pass' + JSON.stringify(res));
             this.router.navigate(['/login']);
         },
         err => {
             console.log('login fail');
         }
     );

  }
}




