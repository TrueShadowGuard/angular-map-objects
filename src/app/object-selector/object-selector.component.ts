import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Point, points} from "../points";

type SelectablePoint = Point & {selected: boolean};

@Component({
  selector: 'app-object-selector',
  templateUrl: './object-selector.component.html',
  styleUrls: ['./object-selector.component.scss']
})
export class ObjectSelectorComponent {
  @Input() points: Point[] = [];
  selectablePoints: SelectablePoint[] = points.map(point => ({...point, selected: false}));

  @Output() objectSelect = new EventEmitter();

  filter = "";

  selectPoint(pointToBeSelected: Point): void {
    this.selectablePoints.forEach(point => point.selected = point === pointToBeSelected);
    this.objectSelect.emit(pointToBeSelected);
  }

  onFilterChange(e: Event) {
    const target = e.target as HTMLInputElement;
    this.filter = target.value;
  }

  get filteredPoints(): SelectablePoint[] {
    return this.selectablePoints.filter(p => p.name.toLowerCase().match(this.filter.toLowerCase()))
  }
}
