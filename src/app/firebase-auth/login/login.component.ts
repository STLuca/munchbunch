import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { GoogleLogin, SignIn, SignUp } from '../store/auth.action';
import { AuthState } from '../store/auth.state';

@Component({
  selector: 'app-firebase-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<any>) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required,  Validators.minLength(6)])]
    });
  }

  login() {
    if (this.loginForm.valid) {
      const formValue = this.loginForm.value;
      this.store.dispatch(new SignIn({
        email: formValue.email,
        password: formValue.password}));
    }
  }

  register() {
    if (this.loginForm.valid) {
      const formValue = this.loginForm.value;
      this.store.dispatch(new SignUp({
        email: formValue.email,
        password: formValue.password}));
    }
  }

  googleLogin() {
    this.store.dispatch(new GoogleLogin());
  }
}
