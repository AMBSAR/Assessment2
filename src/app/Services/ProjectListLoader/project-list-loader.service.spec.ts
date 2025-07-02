import { TestBed } from '@angular/core/testing';

import { ProjectListLoaderService } from './project-list-loader.service';

describe('ProjectListLoaderService', () => {
  let service: ProjectListLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectListLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
