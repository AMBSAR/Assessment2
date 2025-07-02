import { Routes } from '@angular/router';
import { LoginViewComponent } from './Dashboards/login-view/login-view.component';
import { IEPMainDashboardComponent } from './Dashboards/Main/iepmain-dashboard/iepmain-dashboard.component';
//import { OTRDashboardComponent } from './Dashboards/OTR/otrdashboard/otrdashboard.component';
import { PageNotFoundComponent } from './Dashboards/page-not-found/page-not-found.component';
import { PageTBDComponent } from './Dashboards/page-tbd/page-tbd.component';
//import { OperationsDashboardComponent } from './Dashboards/OTR/operations-dashboard/operations-dashboard.component';
//import { HomePageComponent } from './Dashboards/Main/home-page/home-page.component';
import { authGuard } from './Common/Guards/auth.guard';


export const routes: Routes = [
    {
        path: 'login',
        component: LoginViewComponent
    },
    {
        path: 'main',
        loadComponent: () =>
            import('./Dashboards/Main/iepmain-dashboard/iepmain-dashboard.component').then(c => c.IEPMainDashboardComponent),

        children: [
            // {
            //     path: 'home',
            //     loadComponent: () =>
            //         import('./Dashboards/Main/home-page/home-page.component').then(c => c.HomePageComponent),
            //     canActivate : [authGuard]
            // },
            {
                path: 'OTR',
                loadComponent: () =>
                    import('./Dashboards/OTR/OTRDashboard/otrdashboard.component').then(c => c.OTRDashboardComponent),
                canActivate: [authGuard],
                children: [
                    {
                        path: 'Operations',
                        loadComponent: () =>
                            import('./Dashboards/OTR/Operations/Operations-Dashboard/operations-dashboard.component').then(c => c.OperationsDashboardComponent),
                        canActivate: [authGuard]
                    },
                    {
                        path: '',
                        redirectTo: '/main/OTR/Operations',
                        pathMatch: 'full',
                    },
                    {
                        path: '**',
                        loadComponent: () =>
                            import('./Dashboards/page-tbd/page-tbd.component').then(c => c.PageTBDComponent),
                        canActivate : [authGuard]
                    },
                ],
            },
            {
                path: 'NPD',
                loadComponent: () =>
                    import('./Dashboards/page-tbd/page-tbd.component').then(c => c.PageTBDComponent),
                canActivate : [authGuard]
            },
            {
                path: '',
                redirectTo: '/main/OTR',
                pathMatch: 'full',
            },
            {
                path: '**',
                component: PageNotFoundComponent
            }
        ],
        canActivate : [authGuard]
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full',
    }
    // {
    //     path: '**',
    //     component: PageNotFoundComponent
    // }
];
