import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { constants } from '../constants';


declare var $: any;

@Component({
    selector: 'app-login',
    moduleId: module.id,
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})

export class LoginComponent {
    loginForm: FormGroup;
    submitted = false;
    failed = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private http: HttpClient
    ) { }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        // console.log("login init"+cons.baseURL);

        //this.authenticationService.login(this.f.username.value,this.f.password.value);


        this.http.post(constants.baseURL + '/customer/authenticate', { username: this.f.username.value, password: this.f.password.value }, { responseType: 'json', observe: 'response' })
            .subscribe(
                res => {
                    let body : any;
                    body = res;
                    this.failed = false;
                    if (res && body.body) {
                        console.log(body.body);
                        localStorage.setItem('currentUser', JSON.stringify(body.body));
                        if (body.body.temporaryPassword) {
                            console.log(body.body.id);
                            this.router.navigate(['/resetpassword',body.body.id]);
                        } else {
                            this.router.navigate(['/customers']);
                        }
                    }
                },
                err => {
                    this.failed = true;
                    console.log('login fail');
                }
            );

    }
}