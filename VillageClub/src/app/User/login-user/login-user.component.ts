import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../Service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {

  loginForm!: FormGroup;
  errorMessage: string = '';
  userRole: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });

    // ✅ ตรวจสอบ Token และ Role ตอนเริ่มต้น
    const token = this.authService.getToken();
    if (token) {
      this.redirectBasedOnRole();
    }
  }

  goReg() {
    this.router.navigate(['/reg']);
  }

  login() {
    if (this.loginForm.invalid) {
      Swal.fire({
        title: "กรุณากรอกข้อมูลให้ครบถ้วน",
        text: "Email หรือ Password ไม่ถูกต้อง",
        icon: "error"
      });
      return;
    }

    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe(
      response => {
        console.log("✅ API Response:", response);

        if (response.token) {
          this.authService.saveToken(response.token);
          Swal.fire({
            title: "เข้าสู่ระบบสำเร็จ!",
            text: "กำลังนำคุณไปยังหน้า Home...",
            icon: "success",
            timer: 2000
          }).then(() => {
            this.redirectBasedOnRole();
          });
        } else {
          console.error("❌ No token in response!");
          Swal.fire({
            title: "Login Failed!",
            text: "Token not found in response",
            icon: "error"
          });
        }
      },
      error => {
        console.error("❌ Login Error:", error);
        this.errorMessage = 'Login failed! Email or Password incorrect';
        Swal.fire({
          title: "เข้าสู่ระบบล้มเหลว!",
          text: error.error?.message || "Email หรือ Password ไม่ถูกต้อง",
          icon: "error"
        });
      }
    );
  }

  redirectBasedOnRole() {
    this.userRole = this.authService.getRole();
    console.log("🔍 User Role:", this.userRole);

    if (this.userRole === 'Admin') {
        this.router.navigate(['/adminhome']);
    } else {
        this.router.navigate(['/home']);
    }
}

}
