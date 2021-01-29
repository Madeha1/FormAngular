import { Component } from '@angular/core';
import { AbstractControl, FormControl} from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  profileForm: FormGroup;
  title = 'forms';
  submitted = false;
  imageUrl;
  constructor(private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.profileForm = this.formBuilder.group({
    name : new FormControl('', [Validators.required , Validators.pattern('[a-zA-Z]+')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    gender: new FormControl('', [Validators.required]),
    mobile: new FormControl('', [Validators.required ,this.ValidateMobile]),
    img: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, this.Validatepassword]),
    confirmPassword: new FormControl('', [Validators.required]),
    },
    { 
      validators: this.checkPasswords
    });
  }
//dummy data for the service
invalidNamesArr: string[] = ['test@email.com' , 'admin@email.com'];
//Validators.pattern(/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/)
  onSubmit(){
    this.submitted = true;
    // stop here if form is invalid
    if (this.profileForm.invalid) {
        return;
    }    
  }
  get f() { return this.profileForm.controls; }

  ValidateMobile(control: AbstractControl): {[key: string]: any} | null  {
    if (!control.value.match(/^[0-9]*$/)) {
      return { 'phoneNumberInvalid': true };
    }
    if (control.value && control.value.length != 10) {
      return {'lengthInvalid' : true}
    }
    return null;
  }

  Validatepassword(control: AbstractControl): {[key: string]: any} | null  {
    let validations = {
      'capitalMissing':false,
      'smallMissing':false,
      'numberMissing': false,
      'specialCharMissing':false,
      'lengthInvalid': false
    };
    if (!(control.value.match(/^(?=[^A-Z]*[A-Z]).{1,}$/))) {
      validations['capitalMissing']=true;
    }
    if (!(control.value.match(/^(?=[^a-z]*[a-z]).{1,}$/))) {
      validations['smallMissing']=true;
    }
    if (!(control.value.match(/^(?=[^0-9]*[0-9]).{1,}$/))) {
      validations['numberMissing']=true;
    }
    if (!(control.value.match(/^(?=[^!@#\$%\^\&*\)\(+=._-]*[!@#\$%\^\&*\)\(+=._-]).{1,}$/))) {
      validations['specialCharMissing']=true;
    }
    if (control.value.length > 12 || control.value.length <6 ) {
      validations['lengthInvalid']=true;
    }
    return validations;
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;
    return password === confirmPassword ? null : { notSame: true }     
  }

  selectFile(event) {
		if(!event.target.files[0] || event.target.files[0].length == 0) {
			return;
		}
		
		var mimeType = event.target.files[0].type;
		
		if (mimeType.match(/image\/*/) == null) {
			return;
		}
		
		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		
		reader.onload = (_event) => {
			this.imageUrl = reader.result; 
		}
	}
}
