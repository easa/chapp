import {Component, Input, OnInit} from '@angular/core';
import { CathModel } from '../../cath.model';


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  @Input() sender: CathModel;
  @Input() index: number;
  constructor() { }

  ngOnInit() {
  }

}
