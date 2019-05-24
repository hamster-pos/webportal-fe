import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { constants } from 'app/constants';

declare var $:any;

@Component({
    selector: 'app-register',
    moduleId: module.id,
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.css'] 
})

export class RegisterComponent {
    registerForm : FormGroup;
    submitted = false;
    created = false;

    constructor(
        private formBuilder: FormBuilder,
        private http: HttpClient
    ) {}

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            emailAddress: ['', [Validators.required,Validators.email]],
            address: ['', Validators.required],
            shopName: ['', Validators.required],
            phoneNumber: ['', Validators.required]
        });
    }
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;
        if(this.registerForm.valid){
            console.log('API called----');
            this.http.post(constants.baseURL+'/customer', this.registerForm.value, {responseType: 'text'})
            .subscribe(
                res => {
                    console.log('register');
                    this.created = true;
                },
                err => {
                    console.log('register failed last');
                    
                }
            );
        }

    }
}