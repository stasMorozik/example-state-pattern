import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { delay, of, Subject, Subscription, switchMap } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CheckedSecurityCodeEvent } from '../../features/sign-up/events/checked-security-code-event';
import { ConfrimedEmailEvent } from '../../features/sign-up/events/confrimed-email-event';
import { RegistredUserEvent } from '../../features/sign-up/events/registred-user-event';
import { Error } from 'src/app/features/common/error';
import { SignUpService } from 'src/app/features/sign-up/sign-up.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
 
type States = 'CONFIRMING_EMAIL' | 'CHECKING_CODE' | 'REGISTRATING'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  animations: [
    trigger('CONFIRMING_EMAIL', [
      state('CONFIRMING_EMAIL', style({ opacity: 1 })),
      state('CHECKING_CODE', style({ opacity: 0 })),
      state('REGISTRATING', style({ opacity: 1 })),
      transition('CONFIRMING_EMAIL => CHECKING_CODE', animate('1s'))
    ]),
    trigger('CHECKING_CODE', [
      state('CONFIRMING_EMAIL', style({ opacity: 0 })),
      state('CHECKING_CODE', style({ opacity: 1 })),
      state('REGISTRATING', style({ opacity: 0 })),
      transition('CONFIRMING_EMAIL => CHECKING_CODE', animate('1s')),
      transition('CHECKING_CODE => REGISTRATING', animate('1s'))
    ]),
    trigger('REGISTRATING', [
      state('CONFIRMING_EMAIL', style({ opacity: 0 })),
      state('CHECKING_CODE', style({ opacity: 0 })),
      state('REGISTRATING', style({ opacity: 1 })),
      transition('CHECKING_CODE => REGISTRATING', animate('1s')),
      transition('REGISTRATING => CONFIRMING_EMAIL', animate('1s'))
    ]),
  ],
})
export class SignUpComponent implements OnInit, OnDestroy {
  sub!: Subscription

  formConfirmingEmail!: FormGroup
  formValidatingCode!: FormGroup
  formRegistrating!: FormGroup

  currentState: States = 'CONFIRMING_EMAIL'

  error: Error | null = null
  registredevent: RegistredUserEvent | null = null

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _signUpService: SignUpService,
    @Inject('EVENT_SUBJECT') public eventSubject$: Subject<Error | ConfrimedEmailEvent | CheckedSecurityCodeEvent | RegistredUserEvent>,
  ) {
    this.formConfirmingEmail = this._fb.group({
      email: ['', Validators.required]
    })

    this.formValidatingCode = this._fb.group({
      code: ['', Validators.required]
    })

    this.formRegistrating = this._fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.sub = this.eventSubject$.pipe(
      switchMap(event => {
        if (event instanceof Error) {
          this.error = event
          return of(event).pipe(delay(2000))
        }
        if (event instanceof RegistredUserEvent) {
          this.registredevent = event
          return of(event).pipe(delay(2000))
        }

        return of(event)
      })
    ).subscribe(event => {
      if (event instanceof Error) {
        this.error = null
      }

      if (event instanceof ConfrimedEmailEvent) {
        this.currentState = 'CHECKING_CODE'
      }

      if (event instanceof CheckedSecurityCodeEvent) {
        this.currentState = 'REGISTRATING'
      }

      if (event instanceof RegistredUserEvent) {
        this.currentState = 'CONFIRMING_EMAIL'
        this.formConfirmingEmail.reset()
        this.formRegistrating.reset()
        this.formValidatingCode.reset()
        this.registredevent = null
      }
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

  onConfirmEmail() {
    if (this.formConfirmingEmail.valid) {
      this._signUpService.confirmEmail(this.formConfirmingEmail.value.email)
    }
  }

  onCheckCode() {
    if(this.formValidatingCode.valid) {
      this._signUpService.checkCode(this.formValidatingCode.value.code)
    }
  }

  onSingUp() {
    if (this.formRegistrating.valid) {
      this._signUpService.registry(
        this.formRegistrating.value.email,
        this.formRegistrating.value.password
      )
    }
  }
}
