import { Component, OnInit } from '@angular/core';
import { helpGuideLinks, Link } from '../links';

@Component({
  selector: 'app-link-view',
  templateUrl: './link-view.component.html',
  styleUrls: ['./link-view.component.css']
})
export class LinkViewComponent implements OnInit {

  links: Link[] = helpGuideLinks;

  constructor() { }

  ngOnInit() {
  }

}
