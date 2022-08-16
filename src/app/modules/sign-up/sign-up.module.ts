import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { SignUpRoutingModule } from './sign-up-routing.module';
import { SignUpComponent } from './sign-up.component';
import { ConfrimedEmailEvent } from '../../features/sign-up/events/confrimed-email-event';
import { CheckedSecurityCodeEvent } from '../../features/sign-up/events/checked-security-code-event';
import { RegistredUserEvent } from '../../features/sign-up/events/registred-user-event';
import { Error } from 'src/app/features/common/error';
import { EmiterService } from './services/emiter.service';
import { ConfirmingEmailService } from './services/confirming-email.service';
import { ValidatingCodeService } from './services/validating-code.service';
import { RegistratingService } from './services/registrating.service';
import { SignUpService } from '../../features/sign-up/sign-up.service';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { InputTextComponent } from 'src/app/components/input-text/input-text.component';

const eventSubject = new Subject<Error | ConfrimedEmailEvent | CheckedSecurityCodeEvent | RegistredUserEvent>()

@NgModule({
  declarations: [
    SignUpComponent,
    ButtonComponent,
    InputTextComponent
  ],
  imports: [
    CommonModule,
    SignUpRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    ConfirmingEmailService,
    ValidatingCodeService,
    RegistratingService,
    {
      provide: EmiterService,
      useFactory: () => {
        return new EmiterService(eventSubject)
      }
    },
    {
      provide: SignUpService,
      useClass: SignUpService,
      deps: [
        EmiterService,
        ConfirmingEmailService,
        ValidatingCodeService,
        RegistratingService
      ]
    },
    {
      provide: 'EVENT_SUBJECT',
      useValue: eventSubject,
    }
  ]
})
export class SignUpModule { }
