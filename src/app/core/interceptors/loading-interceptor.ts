import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

let requests = 0;

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {

  const spinner = inject(NgxSpinnerService);

  if (requests === 0) {
    spinner.show();
  }

  requests++;

  return next(req).pipe(
    finalize(() => {
      requests--;

      if (requests === 0) {
        spinner.hide();
      }
    })
  );
};