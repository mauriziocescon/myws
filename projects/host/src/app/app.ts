import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

interface NavGroup {
  label: string;
  urls: string[];
}

@Component({
  selector: 'app-root',
  imports: [
    RouterLink,
    RouterOutlet,
  ],
  template: `
    <nav class="navbar">
      <span class="brand">Host</span>
      @for (group of navGroups(); track group.label) {
        <div class="dropdown">
          <button class="dropdown-toggle">{{ group.label }}</button>
          <div class="dropdown-menu">
            @for (url of group.urls; track url) {
              <a class="dropdown-item" [routerLink]="url">{{ url }}</a>
            }
          </div>
        </div>
      }
    </nav>
    <hr>
    <router-outlet />
  `,
  styles: `
    .navbar {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem;
    }

    .brand {
      font-size: 1.5rem;
      font-weight: bold;
      margin-right: 1rem;
    }

    .dropdown {
      position: relative;
    }

    .dropdown-toggle {
      font-size: 1.1rem;
      padding: 0.4rem 0.8rem;
      cursor: pointer;
      border: 1px solid #ccc;
      border-radius: 4px;
      background: #fff;
    }

    .dropdown-toggle:hover {
      background: #f0f0f0;
    }

    .dropdown-menu {
      display: none;
      position: absolute;
      top: 100%;
      left: 0;
      min-width: 160px;
      background: #fff;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      z-index: 1000;
      padding: 0.25rem 0;
    }

    .dropdown:hover .dropdown-menu {
      display: block;
    }

    .dropdown-item {
      display: block;
      padding: 0.4rem 0.8rem;
      text-decoration: none;
      color: #333;
      white-space: nowrap;
    }

    .dropdown-item:hover {
      background: #f0f0f0;
    }
  `,
})
export class App {
  protected readonly navGroups = signal<NavGroup[]>([
    { label: 'MF1', urls: ['/mf1', '/mf1/tab/tabId'] },
    { label: 'MF2', urls: ['/mf2', '/mf2/a'] },
    { label: 'MF3', urls: ['/mf3', '/mf3/a', '/mf3/b'] },
  ]);
}
