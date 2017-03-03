import {
  Component,
  OnInit
} from '@angular/core';

import {AppState} from '../app.service';
import {Title} from './title';
import {Player} from '../Player';
import {DragulaService} from 'ng2-dragula';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'home',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    Title
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: ['./home.component.css'],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  // Set our default values
  public localState = {value: ''};
  // TypeScript public modifiers
  private players: Player[];
  private red: Player[];
  private blue: Player[];

  public groups: Array<any> = [
    {
      name: 'Team Red',
      players: [],
      rank: 0
    },
    {
      name: 'Team Blue',
      players: [],
      rank: 0
    },
    {
      name: 'Player Pool',
      players: [],
      rank: 0
    }
  ];

  constructor(public appState: AppState,
              public title: Title,
              private dragulaService: DragulaService) {

    dragulaService.drag.subscribe((value) => {
      console.log(`drag: ${value[0]}`);
      this.onDrag(value.slice(1));
    });
    dragulaService.drop.subscribe((value) => {
      console.log(`drop: ${value[0]}`);
      this.onDrop(value.slice(1));
    });
    dragulaService.over.subscribe((value) => {
      console.log(`over: ${value[0]}`);
      this.onOver(value.slice(1));
    });
    dragulaService.out.subscribe((value) => {
      console.log(`out: ${value[0]}`);
      this.onOut(value.slice(1));
    });
  }


  public ngOnInit(){
    this.appState.getPlayers().subscribe(
      data => {
        this.players = data as Player[];
        this.groups[2].players = data as Player[];
      }
    );
  }

  private onDrag(args){
    let [e, el] = args;
    console.log("on Drag")
    // do something
  }

  private onDrop(args) {
    let [e, el] = args;
    this.groups[0].rank = el.text;
    self.console.log(e);
    console.log(el);
  }

  private onOver(args) {
    let [e, el, container] = args;
    // do something
  }

  private onOut(args) {
    let [e, el, container] = args;
    // do something
  }
}
