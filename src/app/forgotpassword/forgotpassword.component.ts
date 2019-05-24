import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { constants } from '../constants';


declare var $: any;


@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent {

    forgotPasswordForm: FormGroup;
    submitted = false;
    failed = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private http: HttpClient
    ) {}

    ngOnInit() {
        this.forgotPasswordForm = this.formBuilder.group({
            email: ['', Validators.required]
        });
    }
    get f() { return this.forgotPasswordForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.forgotPasswordForm.invalid) {
            return;
        }
       console.log("forget password init");

        this.http.get(constants.baseURL+'/customer/forget/password/'+this.f.email.value, {responseType: 'text'})
            .subscribe(
                res => {
                    console.log('forget pass');
                    // this.failed = false;
                    // this.router.navigate(['/dashboard']);

                },
                err => {
                //this.failed = true;
                console.log('login fail');
                }
            );

    }
}