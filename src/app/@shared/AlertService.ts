import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';

declare var $: any;
declare var Lobibox: any;

@Injectable()
export class AlertService {
  private subject = new Subject<any>();
  private keepAfterNavigationChange = false;

  constructor(private router: Router) {
    // clear alert message on route change
    router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterNavigationChange) {
          // only keep for a single location change
          this.keepAfterNavigationChange = false;
        } else {
          // clear alert
          $.toast().reset('all');
          this.subject.next();
        }
      }
    });
  }

  success(message: string, keepAfterNavigationChange = false) {
    //this.keepAfterNavigationChange = keepAfterNavigationChange;
    //this.subject.next({ type: 'success', text: message });

    $.toast({
      heading: 'RentPRO (MSDSL) ',
      text: message,
      color: '#eafae0',
      position: 'top-right',
      loaderBg: '#eafae0',
      icon: 'success',
      hideAfter: 3000,
      stack: 6,
    });
  }

  error(message: string, keepAfterNavigationChange = false) {
    //this.keepAfterNavigationChange = keepAfterNavigationChange;
    //this.subject.next({ type: 'error', text: message });

    $.toast().reset('all');

    $.toast({
      heading: 'RentPRO (MSDSL) ',
      text: message,
      position: 'top-right',
      color: '#ff9590',
      loaderBg: '#ff9590',
      icon: 'error',
      hideAfter: 5000,
    });
  }

  info(message: string, keepAfterNavigationChange = false) {
    //this.keepAfterNavigationChange = keepAfterNavigationChange;
    //this.subject.next({ type: 'success', text: message });

    $.toast({
      heading: 'RentPRO (MSDSL) ',
      text: message,
      position: 'top-right',
      loaderBg: '#ff6849',
      icon: 'info',
      hideAfter: 3000,
      stack: 6,
    });
  }

  warning(message: string, keepAfterNavigationChange = false) {
    //this.keepAfterNavigationChange = keepAfterNavigationChange;
    //this.subject.next({ type: 'success', text: message });

    $.toast({
      heading: 'RentPRO (MSDSL) ',
      text: message,
      position: 'top-right',
      loaderBg: '#ffbc34',
      icon: 'warning',
      hideAfter: 3000,
      stack: 6,
    });
  }

  confirm(message: string, callBackMain: any) {
    var self = this;
    Lobibox.confirm({
      msg: message,
      title: 'Confirmation',
      callback: function ($this: any, type: any, ev: any) {
        if (type == 'yes') {
          callBackMain();
        }
      },
    });
  }

  confirm2(message: string, callyes: any, callNo: any) {
    var self = this;
    Lobibox.confirm({
      msg: message,
      title: 'Confirmation',
      callback: function ($this: any, type: any, ev: any) {
        if (type == 'yes') {
          callyes();
        } else if (type == 'no') {
          callNo();
        }
      },
    });
  }

  clear() {
    this.subject.next();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
