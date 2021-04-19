import { Injectable } from '@angular/core';

import { mergeMap, map, catchError, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MemberService } from '../member.service';

/* NgRx */
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MemberPageActions, MemberApiActions } from './actions';

//Decorator that marks a class as available to be provided and injected as a dependency.
@Injectable()
export class MemberEffects {

  constructor(private actions$: Actions, private memberService: MemberService) { }  // action, member service

  loadMembers$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(MemberPageActions.loadMembers),
        mergeMap(() => this.memberService.getMembers()  // here is call API
          .pipe(
            map(members => MemberApiActions.loadMembersSuccess({ members })),
            catchError(error => of(MemberApiActions.loadMembersFailure({ error })))
          )
        )
      );
  });

  updateMember$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(MemberPageActions.updateMember),
        concatMap(action =>
          this.memberService.updateMember(action.member) // // here is call API
            .pipe(
              map(member => MemberApiActions.updateMemberSuccess({ member })),
              catchError(error => of(MemberApiActions.updateMemberFailure({ error })))
            )
        )
      );
  });

  createMember$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(MemberPageActions.createMember),
        concatMap(action =>
          this.memberService.createMember(action.member) // // here is call API
            .pipe(
              map(member => MemberApiActions.createMemberSuccess({ member })),
              catchError(error => of(MemberApiActions.createMemberFailure({ error })))
            )
        )
      );
  });

  deleteMember$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(MemberPageActions.deleteMember),  //// here is call API
        mergeMap(action =>
          this.memberService.deleteMember(action.memberId).pipe(
            map(() => MemberApiActions.deleteMemberSuccess({ memberId: action.memberId })),
            catchError(error => of(MemberApiActions.deleteMemberFailure({ error })))
          )
        )
      );
  });
}
