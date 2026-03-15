import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { RegisterDTO } from '../types/auth/register.dto';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private api: ApiService) {}

  register(email: string, password: string): Observable<string> {
    const body: RegisterDTO = {
      email,
      password,
    };

    return this.api.post<string>('account/register', body);
  }
}
