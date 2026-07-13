import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

interface NavLink {
  label: string;
  url: string;
}

interface NavGroup {
  label: string;
  links: NavLink[];
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
            @for (link of group.links; track link.url) {
              <a class="dropdown-item" [routerLink]="link.url">
                <span class="item-label">{{ link.label }}</span>
                <span class="item-url">{{ link.url }}</span>
              </a>
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
      min-width: 200px;
      background: #fff;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      z-index: 1000;
      padding: 0.25rem 0;
    }

    .dropdown:hover .dropdown-menu,
    .dropdown:focus-within .dropdown-menu {
      display: block;
    }

    .dropdown-item {
      display: flex;
      flex-direction: column;
      padding: 0.5rem 0.8rem;
      text-decoration: none;
      color: #333;
      white-space: nowrap;
    }

    .dropdown-item:hover {
      background: #f0f0f0;
    }

    .item-label {
      font-weight: 500;
    }

    .item-url {
      font-size: 0.75rem;
      color: #888;
      font-family: monospace;
    }
  `,
})
export class App {
  protected readonly navGroups = signal<NavGroup[]>([
    {
      label: 'MF1',
      links: [
        { label: 'Page', url: '/mf1' },
        { label: 'Detail with :id', url: '/mf1/detail/42' },
      ],
    },
    {
      label: 'MF2',
      links: [
        { label: 'Page', url: '/mf2' },
        { label: 'Child A', url: '/mf2/a' },
        { label: 'Child B', url: '/mf2/b' },
      ],
    },
    {
      label: 'MF3',
      links: [
        { label: 'Page', url: '/mf3' },
        { label: 'Child A', url: '/mf3/a' },
        { label: 'Child B', url: '/mf3/b' },
      ],
    },
  ]);
}
