import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserPlaceholderListResponse } from "../types/user-placeholder-list-response";

@Injectable({
    providedIn: 'root'
})
export class UsersPlaceholderService {
    constructor(
        private readonly _httpClient: HttpClient
    ){}

    getUsersPlaceholder(): Observable<UserPlaceholderListResponse> {
        return this._httpClient.get<UserPlaceholderListResponse>('https://jsonplaceholder.typicode.com/users')
    }
}