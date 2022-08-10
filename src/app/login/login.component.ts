import { AuthService } from './../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getAuth, signInAnonymously, signInWithPopup } from 'firebase/auth';
import { environment } from './../../environments/environment.prod';
import { initializeApp } from 'firebase/app';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  

  constructor(private auth:AuthService, private router: Router) { 
  
  }

  ngOnInit(): void {
  }

  registerUser(value:any){
    
    const app=initializeApp(environment.firebase);
    const auth=getAuth(app);
    signInWithEmailAndPassword(auth, value.email, value.password).then(
      userCredential=>{
        const user=userCredential.user;
       
        alert("User created")
      }
    )
    .catch((error)=>{
      const errorCode=error.code;
      const errorMessage=error.message;
      alert(errorMessage);
    })
   
  }

  login(){
     this.auth.login();
    
  }
}

