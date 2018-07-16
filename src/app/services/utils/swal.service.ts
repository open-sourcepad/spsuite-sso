import { Injectable } from '@angular/core';

import swal from 'sweetalert2';
declare var $;

@Injectable()
export class SwalService {
  question(titleHeader: string, message: string): any {
    return swal({
      title: titleHeader,
      text: message,
      type: 'question',
      showCancelButton: true,
      confirmButtonText: `Yes, ${titleHeader} it!`,
      cancelButtonText: 'Cancel',
      showCloseButton: true,
    })
  }

  successMessage(titleHeader: string, message: string): any {
    return swal({
      title: titleHeader,
      text: message,
      type: 'success'
    })
  }

  errorMessage(titleHeader: string, message: string): any {
    return swal({
      title: titleHeader,
      text: message,
      type: 'error'
    })
  }
}
