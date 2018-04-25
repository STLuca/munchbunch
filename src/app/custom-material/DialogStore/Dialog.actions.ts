import { TemplateRef } from '@angular/core';
import { ComponentType } from '@angular/core/src/render3';
import { MatDialogConfig } from '@angular/material';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

export enum DialogActionTypes {
    OPEN = '[DIALOG] Open',
    CLOSE = '[DIALOG] Close'
}

export class DialogOpen implements Action {
    readonly type = DialogActionTypes.OPEN;
    constructor(public payload: {template: any, config?: MatDialogConfig, afterClosed ?: (any) => Observable<any>}) {}
}

export class DialogClose implements Action {
    readonly type = DialogActionTypes.CLOSE;
}
