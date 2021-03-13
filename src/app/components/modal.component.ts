import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'modal-component',
  templateUrl: '../views/modal.html'
})

export class modalComponent {
  modalRef: BsModalRef;
  title: string;
  message: string;
  question: string;
  @ViewChild('Alert') templateAlert: TemplateRef<any>;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {

  }

  openModal() {
    this.modalService.show(this.templateAlert);
  }
  openConfirmDialog(templatedialog) {
    this.modalRef = this.modalService.show(templatedialog);
    this.modalRef.content.onClose.subscribe(result => {
      console.log('results', result);
    })
  }
}
