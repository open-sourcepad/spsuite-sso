import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../utils/http.service';
import { BaseService } from './base.service';


const ENDPOINT = `${process.env.API_URL}/api/client`;

@Injectable()
export class CpService extends BaseService {

  constructor(
    public http: HttpService
  ) {
    super(http, ENDPOINT);
  }

  chartLabelMap() {
    return [
      {
        label: "Home",
        group: "Completed"
      },
      {
        label: "Epic 1",
        group: "Completed"
      },
      {
        label: "Epic 2",
        group: "Completed"
      },
      {
        label: "Epic 3",
        group: "Completed"
      },
      {
        label: "Epic 4",
        group: "In Progress"
      },
      {
        label: "Epic 5",
        group: "In Progress"
      }
    ]
  }

  chartInnerLabel() {
    return [
      "In Progress",
      "Complete"
    ]
  }

  chartData() {
    let labels = [];
    let mapping = this.chartLabelMap();
    mapping.forEach(item => {
      labels.push(item.label);
    });
    return {
      labels: labels,
      datasets: [{
        data: [10,30,20,20,10,10],
        backgroundColor: [
          "#fc7b60",
          "#eb5f67",
          "#d1476e",
          "#ac3778",
          "#832f7d",
          "#532b7f"
        ],
        hoverBackgroundColor: [
          "#fc7b60",
          "#eb5f67",
          "#d1476e",
          "#ac3778",
          "#832f7d",
          "#532b7f"
        ],
        borderWidth: 0,
        datasetIndex: 0
      }, {
        data: [80,20],
        backgroundColor: [
          "#4656a4",
          "#2ce3cb"
        ],
        hoverBackgroundColor: [
          "#4656a4",
          "#2ce3cb"
        ],
        borderWidth: 0,
        datasetIndex: 1
      }]
    };
  }

  chartOptions() {
    let mapping = this.chartInnerLabel();
    return {
      responsive: true,
      legend: {
        display: false
      },
      mapping: mapping,
      pieceLabel: {
        fontColor: '#fff',
        position: 'border',
        fontSize: 14,
        overlap: true,
        render: function (args,context) {
          if (args.dataset.datasetIndex == 1) {
            let label = this.chartInstance.options.mapping[args.index];
            return label+ '\n' +args.value+'%';
          } else {
            return args.label+ '\n' +args.value+'%';
          }
        },
      }
    }
  }

  mapInnerLabel(index) {
    let mapping = this.chartLabelMap();
    return mapping[index].group;
  }

  getDeliveredStories() {
    return {
      count: 3,
      delivered: [
        {
          id: '#158719442',
          link: 'https://www.pivotaltracker.com/story/show/158719442',
          title: 'As a user, I shall be able to select a project and see client portal'
        },
        {
          id: '#158719414',
          link: 'https://www.pivotaltracker.com/story/show/158719414',
          title: 'As a user, I shall be able to see list of projects I own'
        },
        {
          id: '#158719447',
          link: 'https://www.pivotaltracker.com/story/show/158719447',
          title: 'As a user, I shall be able to see Stream Hours section'
        }
      ]
    }
  }

}
