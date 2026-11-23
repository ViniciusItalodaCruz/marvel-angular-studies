import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeSearchPage } from './home-search.page';

describe('HomeSearchPage', () => {
  let component: HomeSearchPage;
  let fixture: ComponentFixture<HomeSearchPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeSearchPage],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeSearchPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
