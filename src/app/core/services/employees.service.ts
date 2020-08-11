import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpRequest,HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/publish";
import { map,tap } from 'rxjs/operators';
import { environment } from 'environments/environment';

@Injectable()
export class employeesApiService {
    private siteUrl = environment.apiHost + '/employees';
    url1="";

    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };

    constructor(private http: HttpClient) { }

    deleteemployees(id): Observable<any> {
        this.url1=this.siteUrl + "/delete.php";
			
			let obj = { "Id": id };
		
			return this.http.post<any>(this.url1, JSON.stringify(obj), this.httpOptions).pipe(
			  tap(_ => console.log(`deleted data`))
            );
            
        
    }

    addemployees(data): Observable<any> {
        this.url1=this.siteUrl + "/create.php";
			return this.http.post<any>(this.url1, JSON.stringify(data), this.httpOptions).pipe(
			  tap((data) => console.log(`added data`))
			);
    }

    updateemployees(data): Observable<any> {
        this.url1=this.siteUrl + "/update.php";
       
        return this.http.post<any>(this.url1, JSON.stringify(data), this.httpOptions).pipe(
          tap((data) => console.log(`updated data`))
        );
    }

    getemployeesByID(id: number): Observable<any> {
        return this.http.get(this.siteUrl + '/' + id);
    }

    getAllemployeess(): Observable<any> {
        return this.http.get(this.siteUrl + "/read.php");
    }
}











