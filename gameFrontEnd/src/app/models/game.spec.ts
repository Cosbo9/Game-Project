import { Game } from './game';

describe('Board', () => {
  it('should create an instance', () => {
    expect(new Game('blue6')).toBeTruthy();
  });
});
