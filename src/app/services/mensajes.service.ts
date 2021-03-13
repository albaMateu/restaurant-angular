import { modalComponent } from './../components/modal.component';
import { Observable, Subscription } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {
  modalRef: BsModalRef;

  constructor(private _modalService: BsModalService) { }

  alerta(title: string, message: string): Observable<string> {
    const initialState = {
      title,
      message
    };
    this.modalRef = this._modalService.show(modalComponent, { initialState });

    return new Observable<string>(this.getAlertaSubscriber());
  }

  private getAlertaSubscriber() {
    return (observer) => {
      const subscription = this._modalService.onHidden.subscribe((reason: string) => {
        observer.complete();

      });
      return {
        unsubscribe() {
          subscription.unsubscribe();
        }
      }
    }
  }
}
