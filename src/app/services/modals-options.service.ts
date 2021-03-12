
import { Injectable } from "@angular/core";


@Injectable()
export class ModalOptionsService {
  public missatge: string;
  public code: number;

  constructor() {
  }


  setMissatge(missatge: string) {
    this.missatge = missatge;
  }

  getMissatge() {
    return this.missatge;
  }
  setCode(code: number) {
    this.code = code;
  }

  getcode() {
    return this.code;
  }

}
