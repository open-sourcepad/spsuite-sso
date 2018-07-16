import { Component, OnInit } from '@angular/core';
import { SwalService } from '../../../services/utils';

@Component({
  templateUrl: './swal.pug',
})

export class SwalComponent implements OnInit {

  constructor(private swalService: SwalService) {}

  ngOnInit() {}

  askQuestion() {
    this.swalService.question('Save', `Are you sure?`)
      .then(result => {
        if (result.value) {
          // your code here
        } else {
          // your code here
        }
      });
  }


}
