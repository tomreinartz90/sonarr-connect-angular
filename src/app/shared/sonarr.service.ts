/**
 * Created by taren on 20-1-2017.
 */
import {Injectable} from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';
import {StorageService} from './storage.service';
import {SonarrUtil} from "./sonarr.util";
import {Observable} from "rxjs/Rx";
import {SonarrSeriesModel} from "./domain/sonarr-series.model";
import {SonarrImageModel} from "./domain/sonarr-image.model";


@Injectable()
export class SonarrService {
  activeShow: any;


  constructor(private http: Http, private storage: StorageService, private util: SonarrUtil) {
  }

  private get(path: string, params: URLSearchParams): Observable<any> {
    let url = this.getSonarrUrlAndParams().url;
    return this.http.get(url + path, {search: params}).map(resp => resp.json());
  }

  private getSonarrUrlAndParams(): {url: string, params: URLSearchParams, apiKey: string} {
    let params = new URLSearchParams();
    let url = this.storage.getSonarrConfig().getFullUrl() + "/api/";
    let apiKey: string = this.storage.getSonarrConfig().apiKey;

    params.set('apikey', apiKey);

    return {url: url, params: params, apiKey:apiKey}
  }

  getCalendar() {
    let params = this.getSonarrUrlAndParams().params;
    params.set('start', this.util.formatDate(new Date(), null));
    params.set('end', this.util.formatDate(new Date(), this.storage.getSonarrConfig().daysInCalendar));
    return this.get("/calendar", params)
  }

  getWanted(page: number = 0) {
    let params = this.getSonarrUrlAndParams().params;
    params.set('pageSize', String(this.storage.getSonarrConfig().wantedItems));
    params.set('page', String(page + 1));
    // params.set('end', this.util.formatDate(new Date(), this.storage.getSonarrConfig().daysInCalendar));
    return this.get("/wanted/missing", params)
  }

  getSeries(): Observable<Array<SonarrSeriesModel>> {
    let params = this.getSonarrUrlAndParams().params;
    params.set('pageSize', String(this.storage.getSonarrConfig().wantedItems));
    return this.get("/series", params)
  }

  getEpisodesForSeries(seriesId:number){
    let params = this.getSonarrUrlAndParams().params;
    params.set('seriesId', String(seriesId));
    // http://192.168.1.100:8989/api/episode?seriesId=10&apikey=aa9838e7d4444602849061ca1a6bffa7
    return this.get("/episode", params)
  }

  getHistory(page: number = 0) {
    let params = this.getSonarrUrlAndParams().params;
    params.set('pageSize', String(this.storage.getSonarrConfig().historyItems));
    params.set('page', String(page + 1));
    return this.get("/history", params)
  }

  getSeriesUrl(series: SonarrSeriesModel, type: 'banner' | 'poster') {
    let image: SonarrImageModel = series.images.find((image: SonarrImageModel) => image.coverType == type);
    if (image) {
      if (image.url.indexOf('MediaCover')) {
        return this.getSonarrUrlAndParams().url + image.url + "&apikey=" + this.getSonarrUrlAndParams().apiKey;
      } else {
        return image.url;
      }
    }
    return '';
  }
}
