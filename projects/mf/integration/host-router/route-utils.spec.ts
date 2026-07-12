import { UrlSegment } from '@angular/router';

import { startsWith } from './route-utils';

describe('startsWith', () => {
  const matcher = startsWith('mf1');

  function segments(...paths: string[]): UrlSegment[] {
    return paths.map(p => new UrlSegment(p, {}));
  }

  it('should match a URL that starts with the prefix', () => {
    const result = matcher(segments('mf1'), null as any, null as any);
    expect(result).toEqual({ consumed: segments('mf1') });
  });

  it('should match a URL with sub-paths after the prefix', () => {
    const result = matcher(segments('mf1', 'details', '42'), null as any, null as any);
    expect(result).toEqual({ consumed: segments('mf1', 'details', '42') });
  });

  it('should return null for a URL that does not start with the prefix', () => {
    const result = matcher(segments('mf2', 'home'), null as any, null as any);
    expect(result).toBeNull();
  });

  it('should return null for an empty URL', () => {
    const result = matcher(segments(), null as any, null as any);
    expect(result).toBeNull();
  });

  it('should match when the prefix is part of a longer first segment', () => {
    // 'mf1extra' starts with 'mf1'
    const result = matcher(segments('mf1extra'), null as any, null as any);
    expect(result).toEqual({ consumed: segments('mf1extra') });
  });

  it('should work with different prefixes', () => {
    const mf2Matcher = startsWith('mf2');
    const result = mf2Matcher(segments('mf2', 'page'), null as any, null as any);
    expect(result).toEqual({ consumed: segments('mf2', 'page') });
  });

  it('should not match a URL where the prefix appears after the start', () => {
    const result = matcher(segments('home', 'mf1'), null as any, null as any);
    expect(result).toBeNull();
  });
});
