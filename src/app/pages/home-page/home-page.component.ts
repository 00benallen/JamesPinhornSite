import { Component, OnInit } from '@angular/core';
import { UpdatesService, Update } from 'src/app/updates/updates.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  updates: Observable<Update[]> | undefined;

  constructor(private updatesService: UpdatesService) { }

  ngOnInit() {

    this.updates = this.updatesService.getUpdates();

  }

}
