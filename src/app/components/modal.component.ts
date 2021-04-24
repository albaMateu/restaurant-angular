import { Component, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'modal-component',
  templateUrl: '../views/modal.html',
  encapsulation: ViewEncapsulation.None
})
export class modalComponent {
  closeResult: string;
  title: string;
  message: string;

  @ViewChild('templateAlert') templateAlert: TemplateRef<any>;

  constructor(private modalService: NgbModal) { }

  openModal() {
    this.modalService.open(this.templateAlert, { centered: true });
  }
  recargar() {
    window.location.reload();
  }

}



