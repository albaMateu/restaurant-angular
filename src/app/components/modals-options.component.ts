import { ModalOptionsService } from './../services/modals-options.service';
import { Component, ViewEncapsulation } from '@angular/core';
/* Instalar ng-bootstrap: ng add @ng-bootstrap/ng-bootstrap */
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'modal-options',
  templateUrl: '../views/modals-options.html',
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .dark-modal .modal-content {
      background-color: #292b2c;
      color: white;
    }
    .dark-modal .close {
      color: white;
    }
    .light-blue-backdrop {
      background-color: #5cb3fd;
    }
  `],
  providers: [ModalOptionsService]
})
export class modalsOptionsComponent {
  closeResult: string;
  missatge: string;

  constructor(private modalService: NgbModal, private _ModalOptionService: ModalOptionsService) { }

  rebreMissatge() {
    this.missatge = this._ModalOptionService.getMissatge();
  }
  /* El que gastem */
  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }
  /* Els que NO gastem */
  openBackDropCustomClass(content) {
    this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
  }

  openWindowCustomClass(content) {
    this.modalService.open(content, { windowClass: 'dark-modal' });
  }

  openSm(content) {
    this.modalService.open(content, { size: 'sm' });
  }

  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  openXl(content) {
    this.modalService.open(content, { size: 'xl' });
  }

  openScrollableContent(longContent) {
    this.modalService.open(longContent, { scrollable: true });
  }
}
