import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { AuthDTO } from '../types/auth/auth.dto';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private api: ApiService) {}

  register(email: string, password: string): Observable<string> {
    const body: AuthDTO = {
      email,
      password,
    };

    return this.api.post<string>('account/register', body);
  }

  login(email: string, password: string): Observable<string> {
    const body: AuthDTO = {
      email,
      password,
    };

    return this.api.post<string>('account/login', body);
  }
}
