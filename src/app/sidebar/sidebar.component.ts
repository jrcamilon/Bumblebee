import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    // { path: '/dashboard', title: 'Dashboard', icon: 'pe-7s-graph', class: '' },
    // { path: '/dashboard', title: 'Dashboard', icon: 'pe-7s-graph', class: '' },
    { path: '/site', title: 'Site', icon: 'pe-7s-graph', class: '' },
    { path: '/comparisson', title: 'Comparisson', icon: 'pe-7s-graph2', class: '' },
    // { path: '/maps', title: 'Maps', icon: 'pe-7s-map-marker', class: '' },
    { path: '/processing', title: 'Processing', icon: 'pe-7s-note', class: '' },
    // { path: '/homemap', title: 'HomeMap', icon: 'pe-7s-home', class: '' },
];

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    menuItems: any[];

    constructor() { }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };
}
