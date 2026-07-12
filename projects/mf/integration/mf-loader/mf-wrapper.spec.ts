import { Component, signal, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MfWrapper } from './mf-wrapper';
import { MfLoader } from './mf-loader';
import { MfBundleLoader } from './mf-bundle-loader';

describe('MfWrapper', () => {
  let fixture: ComponentFixture<MfWrapper>;
  let component: MfWrapper;
  let mockBundleLoader: { loadElement: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    mockBundleLoader = {
      loadElement: vi.fn().mockResolvedValue(undefined),
    };

    await TestBed.configureTestingModule({
      imports: [MfWrapper],
    })
      .overrideProvider(MfBundleLoader, { useValue: mockBundleLoader })
      .compileComponents();

    fixture = TestBed.createComponent(MfWrapper);
    component = fixture.componentInstance;

    // Set required input
    fixture.componentRef.setInput('mf', { elementId: 'mf1', tag: 'mf1-v19' });
  });

  it('should create the component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render the mfLoader directive when mf input is set', () => {
    fixture.detectChanges();
    const loaderDirective = fixture.debugElement.query(By.directive(MfLoader));
    expect(loaderDirective).toBeTruthy();
  });

  it('should show loading text when the loader status is Loading', () => {
    fixture.detectChanges();
    const loaderDirective = fixture.debugElement.query(By.directive(MfLoader));
    const loader = loaderDirective.injector.get(MfLoader);

    loader.status.set('Loading');
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Loading...');
  });

  it('should show failed state with reload button when loader status is Failed', () => {
    fixture.detectChanges();
    const loaderDirective = fixture.debugElement.query(By.directive(MfLoader));
    const loader = loaderDirective.injector.get(MfLoader);

    loader.status.set('Failed');
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Failed to load!');
    const button = fixture.debugElement.query(By.css('button'));
    expect(button).toBeTruthy();
    expect(button.nativeElement.textContent).toContain('Reload');
  });

  it('should not show loading or failed indicators when status is Loaded', () => {
    fixture.detectChanges();
    const loaderDirective = fixture.debugElement.query(By.directive(MfLoader));
    const loader = loaderDirective.injector.get(MfLoader);

    loader.status.set('Loaded');
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).not.toContain('Loading...');
    expect(fixture.nativeElement.textContent).not.toContain('Failed to load!');
  });

  it('should call load on the loader when reload button is clicked', () => {
    fixture.detectChanges();
    const loaderDirective = fixture.debugElement.query(By.directive(MfLoader));
    const loader = loaderDirective.injector.get(MfLoader);

    loader.status.set('Failed');
    fixture.detectChanges();

    const loadSpy = vi.spyOn(loader, 'load').mockImplementation(() => {});

    const button = fixture.debugElement.query(By.css('button'));
    button.nativeElement.click();
    fixture.detectChanges();

    expect(loadSpy).toHaveBeenCalled();
  });

  it('should pass inputs to the mfLoader directive', () => {
    fixture.componentRef.setInput('inputs', { someKey: 'someValue' });
    fixture.detectChanges();

    const loaderDirective = fixture.debugElement.query(By.directive(MfLoader));
    expect(loaderDirective).toBeTruthy();
  });
});
