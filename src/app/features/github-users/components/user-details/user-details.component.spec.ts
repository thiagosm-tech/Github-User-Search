// import { UserDetailsComponent } from './user-details.component';
// import { Router } from '@angular/router';
// import { Store } from '@ngrx/store';
// import { AppState } from 'src/app/store/app.state';
// import { getGitHubUsers } from 'src/app/store/users/user.reducer';
// import { of } from 'rxjs';
// import { ofType } from '@ngrx/effects';

// describe('UserDetailsComponent', () => {
//   let componente: UserDetailsComponent;
//   let routerSpy: jasmine.SpyObj<Router>;
//   let storeSpy: jasmine.SpyObj<Store<AppState>>;

//   beforeEach(() => {
//     routerSpy = jasmine.createSpyObj('Router', ['navigate']);
//     storeSpy = jasmine.createSpyObj('Store', ['select']);
//     storeSpy.select.and.returnValue(of({ items: {} }));

//     componente = new UserDetailsComponent(storeSpy, routerSpy);
//   });

//   it('deve criar o componente', () => {
//     expect(componente).toBeTruthy();
//   });

//   it('deve navegar para a página de resultados de busca', () => {
//     componente.returnUsersSearch();
//     expect(routerSpy.navigate).toHaveBeenCalledWith(['']);
//   });
// });