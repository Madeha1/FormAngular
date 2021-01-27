import { Component } from '@angular/core';
import { AbstractControl, FormControl , FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'forms';
  profileForm = new FormGroup({
  name : new FormControl('', [Validators.required , Validators.pattern('[a-zA-Z]+')]),
  email: new FormControl('', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
  gender: new FormControl('', [Validators.required]),
  mobile: new FormControl('', [Validators.required ,this.ValidateMobile]),
  img: new FormControl('', [Validators.required]),
  password: new FormControl('', [Validators.required, Validators.pattern(/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/)]),
  confirmPassword: new FormControl('', [Validators.required]),
});
//dummy data for the service
invalidNamesArr: string[] = ['test@email.com' , 'admin@email.com'];

  onSubmit(){
    console.log(this.profileForm);
  }
//Validators.pattern('^[0-9]{10}$')
  ValidateMobile(control: AbstractControl): {[key: string]: any} | null  {
    if (!control.value.match(/^[0-9]*$/)) {
      return { 'phoneNumberInvalid': true };
    }
    if (control.value && control.value.length != 10) {
      return {'lengthInvalid' : true}
    }
    return null;
  }
}
