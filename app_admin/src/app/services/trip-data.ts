import { Inject, Injectable} from '@angular/core';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { BROWSER_STORAGE } from '../storage';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Trip } from '../models/trips';

@Injectable({
    providedIn: 'root'
})

export class TripData {
    constructor(private http: HttpClient,
        @Inject(BROWSER_STORAGE) private storage: Storage
    ) {}
    baseUrl = 'http://localhost:3000/api'

    login(user: User, passwd: string) : Observable<AuthResponse> {
        return this.handleAuthAPICall('login', user, passwd);
    }

    register(user: User, passwd: string): Observable<AuthResponse> {
        return this.handleAuthAPICall('register', user, passwd);
    }

    handleAuthAPICall(endpoint: string, user: User, passwd: string) : Observable<AuthResponse> {
        let formData = {
            name: user.name,
            email: user.email,
            password: passwd
        };

        return this.http.post<AuthResponse>(this.baseUrl + '/' + endpoint, formData);
    }

    getTrips() : Observable<Trip[]> {
        return this.http.get<Trip[]>(this.baseUrl + '/trips');
    }

    addTrip(formData: Trip) : Observable<Trip> {
        return this.http.post<Trip>(this.baseUrl + '/trips', formData);
    }

    getTrip(tripCode: string) : Observable<Trip[]> {
        return this.http.get<Trip[]>(this.baseUrl + '/trips' + '/' + tripCode);
    }

    updateTrip(formData: Trip) : Observable<Trip> {
        return this.http.put<Trip>(this.baseUrl + '/trips' + '/' + formData.code, formData);
    }
}
