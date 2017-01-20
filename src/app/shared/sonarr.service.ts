/**
 * Created by taren on 20-1-2017.
 */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {StorageService} from './storage.service';

@Injectable()
export class SonarrService {

    constructor(private http:Http, storage:StorageService) { }

}
