import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import 'rxjs/Rx';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  loggingError = false;
  errorMessage = '';
  spinnerVisible = false;
  hint = false;

  constructor(private auths: AuthService) { }

  ngOnInit() {
    this.signinForm = new FormGroup({
      'signin-email': new FormControl(null, [Validators.required, Validators.email]),
      'signin-password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  onLogin() {
    this.spinnerVisible = true;
    const email = this.signinForm.get('signin-email').value;
    const password = this.signinForm.get('signin-password').value;
    this.auths.loginUser(email, password).subscribe(
      (data: string) => {
        console.log(data);
      },
      (error: string) => {
        this.spinnerVisible = false;
        this.errorMessage = error;
        this.loggingError = true;
        console.log(error);
      }
    );
  }
  onClear() {
    this.loggingError = false;
    this.signinForm.reset();
  }

  onHint() {
    this.hint = !this.hint;
  }
}
