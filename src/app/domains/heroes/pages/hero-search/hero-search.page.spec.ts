import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroSearchPage } from './hero-search.page';

describe('HeroSearchPage', () => {
  let component: HeroSearchPage;
  let fixture: ComponentFixture<HeroSearchPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroSearchPage],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroSearchPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
