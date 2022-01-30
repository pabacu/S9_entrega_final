import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user.model'
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs';
import { debounceTime, map, switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  password: string;
  username: string;
  user: User;
  pending = false;
  spinnerVisible = false;
  singinError = false;

  constructor(private auths: AuthService) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'signup-name': new FormControl(null, [Validators.required]),
      'signup-sirname': new FormControl(null, [Validators.required]),
      'signup-username': new FormControl(null, [Validators.required, Validators.minLength(4)],[this.existingUserValidator(this.username)]),
      'signup-email': new FormControl(null, [Validators.required, Validators.email]),
      'signup-adress': new FormControl(null, [Validators.required]),
      'signup-city': new FormControl(null, [Validators.required]),
      'signup-country': new FormControl(null, [Validators.required]),
      'signup-password': new FormControl('', [Validators.required, Validators.minLength(6)]),
      'signup-passwordconfirm': new FormControl('', [Validators.required, this.passwordMatchValidator.bind(this)])
    });
    this.signupForm.statusChanges.subscribe(
      (status) => {
        this.username = this.signupForm.get('signup-username').value;
        this.password = this.signupForm.get('signup-password').value;
        if (this.signupForm.get('signup-username').status === 'PENDING') {
          this.pending = true;
        } else {
          this.pending = false;
        }
      }
    );
  }
  onSignup() {
    this.spinnerVisible = true;
    const name = this.signupForm.get('signup-name').value;
    const sirname = this.signupForm.get('signup-sirname').value;
    const username = this.signupForm.get('signup-username').value;
    const email = this.signupForm.get('signup-email').value;
    const password = this.signupForm.get('signup-password').value;
    const adress = this.signupForm.get('signup-adress').value;
    const city = this.signupForm.get('signup-city').value;
    const country = this.signupForm.get('signup-country').value;
    this.user = new User(name, sirname, username, email, adress, city, country, password, 'false');
    this.auths.signupUser(this.user).subscribe(
      (res) => {
        this.spinnerVisible = false;
      },
      (err) => {
        this.singinError = true;
      });

  }

  passwordMatchValidator(control: FormControl): { [s: string]: boolean } {
    if (this.password === control.value) {
      return null;
    } else {
      return { 'passwordsDoNotMatch': true };
    }
  }
  
  userNameExists(): Promise<ValidationErrors  | null> | Observable<ValidationErrors  | null> {
    const promise = new Promise<any>((resolve, reject) => {
      console.log(this.auths.userNameExists(this.username));
      setTimeout(() => {
        this.auths.userNameExists(this.username).subscribe((response: Response) => {
          if (response.toString() === 'true') {
            resolve({ 'userNameExists': true });
          } else {
            resolve(null);
          }
        });
      }, 1000);
    });
    return promise;
  }

  isEmptyInputValue(value: any): boolean {
    // we don't check for string here so it also works with arrays
    return value === null || value.length === 0;
  }

  existingUserValidator(initialUser: string = ""): AsyncValidatorFn {
    return (
      control: AbstractControl
    ):
      | Promise<{ [key: string]: any } | null>
      | Observable<{ [key: string]: any } | null> => {
      if (this.isEmptyInputValue(control.value)) {
        return of(null);
      } else if (control.value === initialUser) {
        return of(null);
      } else {
        return control.valueChanges.pipe(
          map(res => {
            // if res is true, username exists, return true
            return this.userNameExists();
            // NB: Return null if there is no error
          })
        );
      }
    };
  }

  private checkPassword(control: FormControl) {
    return control.value.toString().length >= 5 && control.value.toString().length <= 10
      ? null
      : {'outOfRange': true};
  }

  onReset() {
    this.singinError = false;
    this.signupForm.reset();
  }
}
