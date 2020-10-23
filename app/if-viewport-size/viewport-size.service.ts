import { Inject, InjectionToken, NgZone } from '@angular/core';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

interface IConfig {
  medium: number;
  large: number;
}

export const CONFIG_TOKEN = new InjectionToken<IConfig>('ConfigToken');

export type WidthMode = 'small' | 'medium' | 'large';

export class ViewportSizeService {

  public viewportWidthMode$: BehaviorSubject<WidthMode>

  public get currentWidthMode(): WidthMode {
    const width = window.innerWidth;
    return width < this.config.medium
      ? 'small'
      : width < this.config.large
        ? 'medium'
        : 'large';
  }

  constructor(
    @Inject(CONFIG_TOKEN) private config: IConfig,
    zone: NgZone) {

    this.viewportWidthMode$ = new BehaviorSubject(this.currentWidthMode);

    zone.runOutsideAngular(() => {
      fromEvent(window, 'resize').pipe(
        map(() => this.currentWidthMode),
        distinctUntilChanged()
      ).subscribe(mode => {
        // Run in zone to process change detection when widthMode is changed.
        // If it is not required, zone.run can be omitted,
        // But consumers should manage change detection by themselves.
        zone.run(() => this.viewportWidthMode$.next(mode));
      });
    })
  }
}