import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  signUpForm!: FormGroup;
  private apiUrl = 'http://127.0.0.1:5203/api/User/register'; // ✅ API URL

  constructor(private fb: FormBuilder, 
              private http: HttpClient, 
              private router: Router) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      idCard: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      phone: ['', [Validators.required, Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.maxLength(10)]],
      confirmPassword: ['', [Validators.required, Validators.maxLength(10)]]
    }, { validators: this.passwordMatchValidator });
  }

  goLogin() {
    console.log("🔄 Navigating to Login Page...");
    this.router.navigate(['/login']).then(success => {
      console.log("✅ Navigation Success:", success);
    }).catch(error => {
      console.error("❌ Navigation Error:", error);
    });
  }

  onSubmit(): void {
    console.log('🚀 Form submit triggered');

    if (this.signUpForm.invalid) {
      Swal.fire({
        title: "กรอกข้อมูลไม่ถูกต้อง",
        text: "Form is invalid",
        icon: "error"
      });
      console.log('❌ Form is invalid');
      return;
    }

    if (this.signUpForm.errors?.['mismatch']) {
      Swal.fire({
        title: "รหัสผ่านไม่ตรงกัน",
        text: "Passwords do not match",
        icon: "error"
      });
      console.log('❌ Passwords do not match');
      return;
    }

    // ✅ กำจัด confirmPassword ออกจากข้อมูลที่ส่งไปยัง API
    const { confirmPassword, ...userData } = this.signUpForm.value;

    console.log('✅ Sending registration data:', userData);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.post(this.apiUrl, userData, { headers }).subscribe(
      response => {
        Swal.fire({
          title: "สมัครสำเร็จ!",
          text: "Sign up successful",
          icon: "success"
        });
        console.log('✅ Registration successful:', response);
        this.router.navigate(['/login']);
        this.signUpForm.reset();
      },
      error => {
        Swal.fire({
          title: "สมัครไม่สำเร็จ",
          text: error.error?.message || "ข้อมูลบางส่วนอาจซ้ำ",
          icon: "error"
        });
        console.error('❌ Registration error:', error);
      }
    );
}


  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }
}
