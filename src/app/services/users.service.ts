import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { UserListResponse } from "../types/users-list-response";

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    private readonly usersList: UserListResponse = [
        {
            name: 'User 1',
            username: 'user1',
            email: 'user1@example.com',
            password: 'password1',
            birthDate: '01/12/1990',
            state: 13,
            musics: [
                { title: 'Music 1', band: 'Band A', genre: 8, isFavorite: false },
                { title: 'Music 2', band: 'Band B', genre: 11, isFavorite: false },
                { title: 'Music 3', band: 'Band C', genre: 9, isFavorite: true },
            ]
        },
        {
            name: 'User 2',
            username: 'user2',
            email: 'user2@example.com',
            password: 'user2@22',
            birthDate: '02/02/1995',
            state: 50,
            musics: [
                { title: 'Music 4', band: 'Band x', genre: 1, isFavorite: false },
                { title: 'Music 5', band: 'Band y', genre: 7, isFavorite: true },
                { title: 'Music 6', band: 'Band z', genre: 12, isFavorite: false },
            ]
        },
        {
            name: 'User 3',
            username: 'user3',
            email: 'user3@example.com',
            password: 'PASSWORD3@123@123',
            birthDate: '03/03/2000',
            state: 42,
            musics: [
                { title: 'Easy', band: 'Commodores', genre: 2, isFavorite: true },
                { title: 'True', band: 'Spandau Ballet', genre: 2, isFavorite: false },
                { title: "If you Don't Know Me by Now", band: 'Simply Red', genre: 2, isFavorite: false },
            ]
        }
    ]

    getUsers(): Observable<UserListResponse> {
        return new Observable((observer) => {
            setTimeout(() => {
                observer.next(this.usersList);
                observer.complete();
            }, 3000)
        });
    }
}