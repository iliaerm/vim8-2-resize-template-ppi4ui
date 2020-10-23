import {
  Directive,
  Input,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
  EventEmitter
} from '@angular/core';
import { Subscription, combineLatest } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

import { ViewportSizeService, WidthMode } from './viewport-size.service';

@Directive({
  selector: '[ifViewportSize]'
})
export class IfViewportSizeDirective implements OnDestroy {

  private widthMode: WidthMode;

  private widthModeSubscription: Subscription;

  // Fires when input value of ifViewportSize property is changed.
  private onWidthModeChanged: EventEmitter<WidthMode> = new EventEmitter();

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private viewportService: ViewportSizeService) {

    this.widthModeSubscription = combineLatest(
      this.viewportService.viewportWidthMode$,
      this.onWidthModeChanged,
      (viewportWidthMode: WidthMode, directiveWidthMode: WidthMode) => viewportWidthMode === directiveWidthMode)
      .pipe(distinctUntilChanged())
      .subscribe((isVisible: boolean) => {
        this.setVisibility(isVisible);
      });
  }

  @Input() set ifViewportSize(widthMode: WidthMode) {
    if (this.widthMode !== widthMode) {
      this.onWidthModeChanged.emit(widthMode);
      this.widthMode = widthMode;
    }
  }

  public ngOnDestroy(): void {
    if (this.widthModeSubscription) {
      this.widthModeSubscription.unsubscribe();
    }
  }

  private setVisibility(isVisible: boolean): void {
    isVisible
      ? this.viewContainer.createEmbeddedView(this.templateRef)
      : this.viewContainer.clear();
  }
}
