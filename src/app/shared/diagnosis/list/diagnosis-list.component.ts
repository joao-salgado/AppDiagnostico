import { Component, OnInit } from '@angular/core';
import { UserLoggedService } from '../../../core/user-logged.service';

@Component({
  templateUrl: 'diagnosis-list.component.html'
})
export class DiagnosisListComponent implements OnInit {

  constructor(public userLoggedService: UserLoggedService) {}

  ngOnInit(): void {

  }

}
