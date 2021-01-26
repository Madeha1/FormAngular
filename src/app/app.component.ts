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
  name : new FormControl('', [Validators.required , Validators.pattern('[a-zA-Z]*')]),
  email: new FormControl('', [Validators.required]),
  gender: new FormControl('', [Validators.required]),
  mobile: new FormControl('', [Validators.required,Validators.minLength(10),Validators.maxLength(10) ,Validators.pattern('[0-9]*')]),
  img: new FormControl('', [Validators.required]),
  password: new FormControl('', [Validators.required]),
  confirmPassword: new FormControl('', [Validators.required]),
});
//dummy data for the service
invalidNamesArr: string[] = ['test@email.com' , 'admin@email.com'];

  onSubmit(){
    console.log(this.profileForm);
  }

  // invalidNameValidation(control: AbstractControl): {[key: string]: boolean} {
  //   if (this.invalidNamesArr.indexOf(control.value) >= 0) {
  //     return {invalidName: true};
  //   }
  //   return null;
  // }

}
