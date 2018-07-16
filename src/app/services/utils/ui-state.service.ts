import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class UiState {

  public currentSettings = new BehaviorSubject(this.initialState());

  public set(setting) {
    this.currentSettings.next(setting)
  }

  public initialState () {
    return {profile: false, notifications: false, modal: false, statPanel: false}
  }

  public reset() {
    this.currentSettings.next(this.initialState());
  }

  public toggleSetting(state) {
    let current = this.currentSettings.getValue();
    current[state] = !current[state];
    this.currentSettings.next(current);
  }

}
