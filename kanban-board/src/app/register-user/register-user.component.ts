import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskServiceService } from '../service/task-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  registerForm!: FormGroup;
  submitStatus: boolean = false;

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private taskService: TaskServiceService,private router: Router) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[!@#$%.^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]],
      confirmPassword: ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[!@#$%.^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]]
    }, { validators: [this.mustMatchValidator] });
  }

  mustMatchValidator(control: AbstractControl) {
    const passwordValue = control.get('password')?.value;
    const confirmPasswordValue = control.get('confirmPassword')?.value;
    return passwordValue === confirmPasswordValue ? null : { passwordMismatch: true };
  }

  get firstName() { return this.registerForm.get('firstName'); }
  get lastName() { return this.registerForm.get('lastName'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }

  OnSubmit() {
    console.log(this.registerForm.value);
    const formData = this.registerForm.value;
    if (formData) {
      const newUser = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        emailId: formData.email,
        password: formData.password,
        age: 0
      };
      this.taskService.saveUser(newUser).subscribe(data => {
        this._snackBar.open('Congrats!! You have registered', 'success', {
          duration: 5000,
          panelClass: ['mat-toolbar', 'mat-primary']
        });
        this.router.navigate(['/login']);
      });
      this.registerForm.reset();
      this.submitStatus = true;
    }
  }
}
