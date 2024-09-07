import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GoogleAuthProvider } from 'firebase/auth';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AngularFireModule, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: []
})
export class LoginComponent implements OnInit {
  user: any = null;
  error: string | null = null;
  isLoading: boolean = false;
  email: string = 'test@test.com';
  password: string = '123';

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  ngOnInit() {
    this.afAuth.authState.subscribe((user:any) => {
      this.user = user;
      console.log("🚀 ~ LoginComponent ~ this.afAuth.authState.subscribe ~ this.user:", this.user)
    });
  }

  async login() {
    this.isLoading = true;
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(this.email, this.password);
      this.user = userCredential.user;
      this.router.navigate(['/']); // Redirect to home page after successful login
    } catch (error:any) {
      this.error = error.message;
    } finally {
      this.isLoading = false;
    }
  }

  async signup() {
    this.isLoading = true;
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(this.email, this.password);
      this.user = userCredential.user;
      // Send verification email if needed
      this.router.navigate(['/']); // Redirect to home page after successful signup
    } catch (error:any) {
      this.error = error.message;
    } finally {
      this.isLoading = false;
    }
  }

  async googleLogin() {
    const provider = new GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    this.user = credential.user;
  }

  logout() {
    this.afAuth.signOut();
    this.router.navigate(['/login']); // Redirect to login page after logout
  }
}