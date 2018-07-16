import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  templateUrl: './modal.pug',
})

export class ModalComponent implements OnInit {

  closeResult: string;

  constructor(private modalService: NgbModal) {}

  ngOnInit() {}

  openBasic(content) {
    this.modalService.open(content);
  }

  openSPSuiteModal(content) {
    this.modalService.open(content, {
      backdropClass: 'no-backdrop',
      windowClass: 'suite-modal',
      centered: true,
    });
  }

  openSm(content) {
    this.modalService.open(content, { size: 'sm' });
  }

  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }
}
