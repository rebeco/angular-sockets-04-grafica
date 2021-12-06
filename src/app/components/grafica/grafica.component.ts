import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { WebSocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styles: [],
})
export class GraficaComponent implements OnInit {
  public lineChartData: ChartDataSets[] = [
    { data: [0, 0, 0, 0], label: 'Ventas' },
  ];
  public lineChartLabels: Label[] = ['enero', 'febrero', 'marzo', 'abril'];

  constructor(private http: HttpClient, private wsService: WebSocketService) {}

  ngOnInit(): void {
    this.escucharSocket();
    this.getData();
  }

  getData() {
    this.http
      .get<ChartDataSets[]>('http://localhost:5000/grafica')
      .subscribe((data) => {
        this.lineChartData = data;
      });
  }

  escucharSocket() {
    this.wsService.listen('cambio-grafica').subscribe((data) => {
      this.lineChartData = data as ChartDataSets[];
    });
  }
}
