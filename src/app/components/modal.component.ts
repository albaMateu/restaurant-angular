import { TranslateService } from '@ngx-translate/core';
import { Component, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'modal-component',
  templateUrl: '../views/modal.html',
  encapsulation: ViewEncapsulation.None
})
export class modalComponent {
  public title: string;
  public message: string;

  @ViewChild('templateAlert') templateAlert: TemplateRef<any>;

  constructor(private modalService: NgbModal, private translate: TranslateService) { }

  openModal() {
    this.message = this.translate.instant(this.message);
    this.title = this.translate.instant(this.title);
    this.modalService.open(this.templateAlert, { centered: true });
  }
  recargar() {
    window.location.reload();
  }

}



