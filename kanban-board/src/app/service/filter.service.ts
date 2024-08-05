import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private filterSource = new BehaviorSubject<any>(null);
  currentFilter = this.filterSource.asObservable();

  constructor() { }

  changeFilter(filter: any) {
    this.filterSource.next(filter);
  }
}
