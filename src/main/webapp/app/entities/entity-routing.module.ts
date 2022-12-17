import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'account-subject',
        data: { pageTitle: 'effOrbacApp.accountSubject.home.title' },
        loadChildren: () => import('./account-subject/account-subject.module').then(m => m.AccountSubjectModule),
      },
      {
        path: 'rule',
        data: { pageTitle: 'effOrbacApp.rule.home.title' },
        loadChildren: () => import('./rule/rule.module').then(m => m.RuleModule),
      },
      {
        path: 'account-jsonattributes',
        data: { pageTitle: 'effOrbacApp.accountJsonattributes.home.title' },
        loadChildren: () => import('./account-jsonattributes/account-jsonattributes.module').then(m => m.AccountJsonattributesModule),
      },
      {
        path: 'account-set',
        data: { pageTitle: 'effOrbacApp.accountSet.home.title' },
        loadChildren: () => import('./account-set/account-set.module').then(m => m.AccountSetModule),
      },
      {
        path: 'account-set-association',
        data: { pageTitle: 'effOrbacApp.accountSetAssociation.home.title' },
        loadChildren: () => import('./account-set-association/account-set-association.module').then(m => m.AccountSetAssociationModule),
      },
      {
        path: 'privilege-set',
        data: { pageTitle: 'effOrbacApp.privilegeSet.home.title' },
        loadChildren: () => import('./privilege-set/privilege-set.module').then(m => m.PrivilegeSetModule),
      },
      {
        path: 'rule-account-set-predicate',
        data: { pageTitle: 'effOrbacApp.ruleAccountSetPredicate.home.title' },
        loadChildren: () =>
          import('./rule-account-set-predicate/rule-account-set-predicate.module').then(m => m.RuleAccountSetPredicateModule),
      },
      {
        path: 'rule-attribute-predicate',
        data: { pageTitle: 'effOrbacApp.ruleAttributePredicate.home.title' },
        loadChildren: () => import('./rule-attribute-predicate/rule-attribute-predicate.module').then(m => m.RuleAttributePredicateModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
