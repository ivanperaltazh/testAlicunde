import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { SuccessComponent } from './success.component';
describe('SuccessComponent', () => {
  let component: SuccessComponent;
  let fixture: ComponentFixture<SuccessComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, SuccessComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(SuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create the success component', () => {
    expect(component).toBeTruthy();
  });
  it('should render the title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Logged in successfully!'
    );
  });
  it('should have an image with alt text', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const imgElement = compiled.querySelector('img');
    expect(imgElement).not.toBeNull();
    expect(imgElement?.alt).toBe('Success GIF');
  });
  it('should have a success container', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.success-container')).not.toBeNull();
  });
});
