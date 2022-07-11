import { UserService } from './user.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from 'firebase/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, private router: Router, private userService: UserService) {
    this.user$=afAuth.authState;
  }
  
  login() {
    return this.afAuth.signInWithPopup(new GoogleAuthProvider).then(
      res => {
        this.router.navigate(['/products']);
        localStorage.setItem('token', JSON.stringify(res.user));
      }, err => {
        alert(err.message);
      })
  }

   logout() {
    this.afAuth.signOut();
  }
}