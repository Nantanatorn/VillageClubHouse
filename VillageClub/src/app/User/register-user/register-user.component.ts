import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { FlowbiteService } from '../../Service/flowbite.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { RegisterService } from '../../Service/registerService/register.service';


@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css'
})
export class RegisterUserComponent implements OnInit{

  signUpForm: FormGroup;

  constructor(private flowbiteService: FlowbiteService,
              private router: Router,
              private fb: FormBuilder,
              private registerService: RegisterService) {
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      idCard: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }

  goLogin() {
    this.router.navigate(['']);
  }
    
  passwordMatchValidator(form: FormGroup) {
    return form.get('password')!.value === form.get('confirmPassword')!.value 
      ? null 
      : { mismatch: true };
  }

  onSubmit() {
    console.log('Form submit triggered');
    if (this.signUpForm.valid) {
      console.log('Form data:', this.signUpForm.value);

      // ส่งข้อมูลไปยังเซิร์ฟเวอร์
      this.registerService.registerUser(this.signUpForm.value).subscribe(
        response => {
          Swal.fire({
            title: "สมัคร สำเร็จ!",
            text: "sign up successful",
            icon: "success"
          });
          console.log('Registration successful', response);
          this.router.navigate(['']);
          
        },
        error => { 
          Swal.fire({
          title: "สมัคร ไม่สำเร็จ",
          text: "sign up failed",
          icon: "error"
        });
          console.error('Registration error', error);
        }
      );
      this.signUpForm.reset();
    } else {
      Swal.fire({
        title: "กรอกข้อมูลไม่ถูกต้อง",
        text: "form is invalid",
        icon: "error"})
      console.log('Form is invalid');
    }
  }


}
