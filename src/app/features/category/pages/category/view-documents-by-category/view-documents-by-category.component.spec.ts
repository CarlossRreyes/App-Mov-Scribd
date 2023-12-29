import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewDocumentsByCategoryComponent } from './view-documents-by-category.component';

describe('ViewDocumentsByCategoryComponent', () => {
  let component: ViewDocumentsByCategoryComponent;
  let fixture: ComponentFixture<ViewDocumentsByCategoryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDocumentsByCategoryComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewDocumentsByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
