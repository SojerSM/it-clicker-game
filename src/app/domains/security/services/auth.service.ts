import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Observable } from 'rxjs';
import { AuthDTO } from '../../../core/types/auth/auth.dto';
import { AuthResponseDTO } from '../types/auth-response.dto';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private api: ApiService) {}

  register(email: string, password: string): Observable<AuthResponseDTO> {
    const body: AuthDTO = {
      email,
      password,
    };

    return this.api.post<AuthResponseDTO>('account/register', body);
  }

  login(email: string, password: string): Observable<AuthResponseDTO> {
    const body: AuthDTO = {
      email,
      password,
    };

    return this.api.post<AuthResponseDTO>('account/login', body);
  }
}
