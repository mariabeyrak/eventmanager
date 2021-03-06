import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Event} from '../model/event';
import {Observable} from "rxjs/Observable";
import {Router} from '@angular/router';
import {User} from "../model/user";
import {Category} from "../model/category";

@Injectable()
export class EventService {

  private base_url = '/event/';


  constructor(private http: HttpClient, private router: Router) {

  }

  getEventById(id) {
    return this.http.get(this.base_url + id);
  }

  public createEvent(event) {

   return this.http.post(this.base_url, event);

  }

  public getEvent(id: number): Observable<Event> {
    return this.http.get<Event>(this.base_url + id);
  }

  public updateEvent(event: Event): Observable<Object> {
    return this.http.post(this.base_url + event.id, event);
  }

  public getPublicEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.base_url);
  }

  public getPriority(id) {

    return this.http.get(this.base_url + id + "/priority", {responseType: 'text'});
  }

  public changePriority(id,priority_id) {

    return this.http.get(this.base_url + id + "/priority/change",
      {
        params: {
          priority_id:priority_id
        }
      }
    )
  }
  public isParticipantRequest(id) {
    return this.http.get(this.base_url + id + "/isParticipant", {responseType: 'text'});
  }

  public joinToEvent(id){
    return this.http.get(this.base_url + id + "/join");
  }

  public getParticipants(id){
    return this.http.get(this.base_url+id+"/participants")
  }

  public leaveEvent(id){
    return this.http.get(this.base_url+id+"/leave")
  }

  public deleteEvent(id){
    return this.http.delete(this.base_url+id)
  }

  public addUsers(users:User[],id){
    return this.http.post(this.base_url+id+"/participants",users)
  }
  public removeUsers(users:User[],id){
    return this.http.post(this.base_url+id+"/participants/remove",users)
  }

  public getCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(this.base_url+"categories")
  }

  public getCalendarData(year: number, month: number, id: number) {
    return this.http.get(this.base_url + `${id}/calendar/${year}/${month+1}`);
  }

  public getFilteredEvents(pattern: string, category: string, start: Date, finish: Date, limit: number, offset: number):Observable<HttpResponse<Event[]>> {
    return this.http.get<Event[]>(this.base_url + 'public/filter' +
      `?pattern=${pattern.toLowerCase()}&category=${category}&start=${start.toISOString()}&finish=${finish.toISOString()}&limit=${limit}&offset=${offset}`, {observe: 'response'});
  }

  public getFilteredUserEvents(pattern: string, category: string, start: Date, finish: Date,
      user_id: number, priority: number, by_priority: boolean, 
      limit: number, offset: number):Observable<HttpResponse<Event[]>> {
    return this.http.get<Event[]>(this.base_url + `user/${user_id}/all/filter` +
      `?pattern=${pattern.toLowerCase()}&category=${category}&start=${start.toISOString()}&finish=${finish.toISOString()}` +
      `&priority=${priority}&byPriority=${by_priority}` +
      `&limit=${limit}&offset=${offset}`, {observe: 'response'});
  }

  public getFilteredUserCreatedEvents(pattern: string, category: string, start: Date, finish: Date,
      user_id: number, priority: number, by_priority: boolean, 
      limit: number, offset: number):Observable<HttpResponse<Event[]>> {
    return this.http.get<Event[]>(this.base_url + `user/${user_id}/created/filter` +
      `?pattern=${pattern.toLowerCase()}&category=${category}&start=${start.toISOString()}&finish=${finish.toISOString()}` +
      `&priority=${priority}&byPriority=${by_priority}` +
      `&limit=${limit}&offset=${offset}`, {observe: 'response'});
  }

  public getFilteredUserDraftsEvents(pattern: string, category: string, start: Date, finish: Date,
      user_id: number, priority: number, by_priority: boolean,
      limit: number, offset: number):Observable<HttpResponse<Event[]>> {
    return this.http.get<Event[]>(this.base_url + `user/${user_id}/drafts/filter` +
      `?pattern=${pattern.toLowerCase()}&category=${category}&start=${start.toISOString()}&finish=${finish.toISOString()}` +
      `&priority=${priority}&byPriority=${by_priority}` +
      `&limit=${limit}&offset=${offset}`, {observe: 'response'});
  }

  public getFriendsNotParticipants(id) {
    return this.http.get<User[]>(this.base_url + id + "/friendsNotParticipants");
  }
}
