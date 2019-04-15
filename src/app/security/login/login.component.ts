import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { LoginService } from './login.service';

import { NotificationService } from '../../shared/messages/notification.service'
import { Router } from '@angular/router';

@Component({
  selector: 'mt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  navigateTo: string

  constructor(private fb: FormBuilder,
              private loginService: LoginService,
              private notificationService: NotificationService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.loginForm = this.fb.group(
      {
        email: this.fb.control('juliana@gmail.com', [Validators.required, Validators.email]),
        password: this.fb.control('juliana23', [Validators.required]),  
      })
    this.navigateTo =  this.activatedRoute.snapshot.params['to'] || btoa('/')
  }

  login(){
    this.loginService.login(this.loginForm.value.email,
                            this.loginForm.value.password)
                     .subscribe(user =>{
                                  this.notificationService.notify(`Bem vindo, ${user.name}`)
                                  this.router.navigate(['/restaurants'])
                                  },
                                response =>  //HttpErrorResponse
                                  this.notificationService.notify(response.error.message),
                                () => {
                                  this.router.navigate([atob(this.navigateTo)])
                                }              
                               )
  }

}
