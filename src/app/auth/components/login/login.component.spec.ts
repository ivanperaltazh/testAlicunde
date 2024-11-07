import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { LoginComponent } from './login.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { AuthService } from '../../services/auth-service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, LoginComponent, ModalComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });
  it('should create the login form', () => {
    expect(component.loginForm).toBeTruthy();
  });
  it('should have invalid form when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });
  it('should validate email and password', () => {
    const email = component.email;
    const password = component.password;
    if (email && password) {
      email.setValue('invalid-email');
      password.setValue('123');
      expect(email.valid).toBeFalsy();
      expect(password.valid).toBeFalsy();
      email.setValue('test@example.com');
      password.setValue('123456');
      expect(email.valid).toBeTruthy();
      expect(password.valid).toBeTruthy();
    }
  });
  it('should navigate to success on valid login', () => {
    authService.login.and.returnValue(of(true));
    const email = component.email;
    const password = component.password;
    if (email && password) {
      email.setValue('test@example.com');
      password.setValue('123456');
      component.onSubmit();
      expect(router.navigate).toHaveBeenCalledWith(['/success']);
    }
  });
  it('should open modal on invalid login', () => {
    authService.login.and.returnValue(of(false));
    const email = component.email;
    const password = component.password;
    if (email && password) {
      email.setValue('test@example.com');
      password.setValue('wrongpassword');
      spyOn(component.modal, 'openModal');
      component.onSubmit();
      expect(component.modal.openModal).toHaveBeenCalled();
    }
  });
});
