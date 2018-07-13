import { Component, OnInit, Input } from '@angular/core';

import {FormBuilder, FormGroup} from '@angular/forms';
import { Proyecto } from '../clases/proyecto';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {
  @Input() public nombreProyecto: String;

  public checkboxGroupForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
  }

}
