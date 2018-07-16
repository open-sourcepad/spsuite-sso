import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { Observable, Subject, ReplaySubject, from, of, range } from 'rxjs';
import 'rxjs/Rx';
import { map, filter, switchMap } from 'rxjs/operators';


@Component({
  selector: 'pagination',
  templateUrl: './pagination.pug',
})

export class PaginationComponent implements OnInit, OnChanges {
  @Input() offset: number = 0;
  @Input() limit: number = 1;
  @Input() size: number = 1;
  @Input() range: number = 10;
  @Output() pageChange: EventEmitter<Object> = new EventEmitter<Object>();

  currentPage: number;
  totalPages: number;
  pages: any;

  constructor() {}

  ngOnInit() {
    this.getPages(this.offset, this.limit, this.size);
  }

  ngOnChanges() {
    this.getPages(this.offset, this.limit, this.size);
  }

  getPages(offset: number, limit: number, size: number) {
    this.currentPage = this.getCurrentPage(offset, limit);
    this.totalPages = this.getTotalPages(limit, size);
    this.pages = range(-this.range, this.range * 2 + 1)
      .pipe(filter(page => this.isValidPageNumber(page, this.totalPages)), map(offset => this.currentPage + offset));
  }

  getCurrentPage(offset: number, limit: number): number {
    return Math.floor(offset / limit) + 1;
  }

  getTotalPages(limit: number, size: number): number {
    return Math.ceil(Math.max(size, 1) / Math.max(limit, 1));
  }

  isValidPageNumber(page: number, totalPages: number): boolean {
    return page > 0 && page <= totalPages;
  }

  selectPage(page: number, event) {
    if (this.isValidPageNumber(page, this.totalPages)) {
      const offset = (page - 1) * this.limit;
      this.pageChange.emit({ offset: offset, page: page });
    }
  }

  cancelEvent(event) {
    event.preventDefault();
  }
}
