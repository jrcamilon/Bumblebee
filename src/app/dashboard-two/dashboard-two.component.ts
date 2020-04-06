import { Component, OnInit } from '@angular/core';
import { DashboardTwoService } from './Services/dashboard-two.service';
import * as _ from 'lodash';
import { ElephantineFormService } from 'services/Elephantine-Form/elephantine-form.service';

@Component({
  selector: 'app-dashboard-two',
  templateUrl: './dashboard-two.component.html',
  styleUrls: ['./dashboard-two.component.scss']
})
export class DashboardTwoComponent implements OnInit {

  // Filter Panel Options
  tagNumbers: Array<string> = [];
  tagNumbers_elephantine: Array<string> = [];
  tagNumbers_khpp: Array<string> = [];
  broadDateOptions: Array<string> = [];
  detailedDateOptions: Array<string> = [];

  selectedTagNumbers: any = ['Baseball'];
  selectedBroadDates: any = [''];
  selectedDetailedDates: any = [''];

  // Radio Button
  sites: string[] = ['KHPP', 'Elephantine'];
  selectedSite = 'KHPP';

  numberOfSherds;
  sumOfCount;
  sumOfWeight;
  treeMapData;
  flowChartData;
  partitionedBarData;

  // count or weight
  isWeight = false;

  cardOption = [
    {type: 'flow-chart', title: 'Flow Chart', status: 'active'},
    {type: 'chord-chhart', title: 'Chord Chart', status: 'inactive'},
  ];

  constructor(public data: DashboardTwoService, public elephantineService: ElephantineFormService) {
    // console.log('dashboard constructor - two');
    this.getAllTagNumbers();
    this.broadDateOptions = this.elephantineService.getBroadDate().map(ele => {
      return ele.value;
    });
    this.detailedDateOptions = this.elephantineService.getDynasticDate().map(ele => {
      return ele.value;
    });


   }

  ngOnInit() {
    // console.log('dashboard ngOnInit - two')
  }

  onChartSelect(type: string) {
    this.cardOption.forEach(option => {
      if (option.type === type) {
        option.status = 'active';
      } else {
        option.status = 'inactive';
      }
    });
    // console.log(this.cardOption);
  }


  onSubmitSelection() {

    console.log('isWeight', this.isWeight);
    // console.log('Submit clicked...');
    if (this.selectedSite !== null && this.selectedTagNumbers.length !== 0) {
      // console.log('Selected Site: ', this.selectedSite);
      // console.log('Selected Tag Numbers: ', this.selectedTagNumbers);
      this.loadDashboardData();
    }
  }

  onCountOrWeightSelect(e: any) {  this.isWeight = e.checked; }


  onSiteSelection(e?: any) {
    // console.log('changed');
    this.tagNumbers = [];
    this.setSiteSelection();
  }

  getAllTagNumbers() {
    this.data.getTagNumbers().subscribe(res => {
      const allTagNumbers = res[0];
      // console.log(allTagNumbers);
      this.tagNumbers_khpp = allTagNumbers.map(tag => {
        if (tag.type === 'khppform') {
          return tag.tagNumber;
        } else {
          return null
        }
      }).filter(tags => { return tags !== null});
      // console.log('KHPP TAGS', this.tagNumbers_khpp);

      this.tagNumbers_elephantine = allTagNumbers.map(tag => {
        if (tag.type === 'eleform') {
          return tag.tagNumber;
        } else {
          return null
        }
      }).filter(tags => { return tags !== null});
      // console.log('ELE TAGS', this.tagNumbers_elephantine);

      this.setSiteSelection();

      this.onSubmitSelection();
    });
  }

  setSiteSelection() {
    this.tagNumbers = this.selectedSite === 'KHPP' ? this.tagNumbers_khpp : this.tagNumbers_elephantine;
    // this.selectedTagNumbers = this.tagNumbers[0] ? [this.tagNumbers[0]] : [];
    // test
    this.selectedTagNumbers = ['D09.1-002-61'];
    this.selectedBroadDates = [];
    this.selectedDetailedDates = [];
  }

  loadDashboardData() {


    this.data.getSumOfCount(this.selectedTagNumbers,
      this.selectedBroadDates, this.selectedDetailedDates, this.selectedSite).subscribe(count => {
      console.log('FETCHING SHERD COUNT...');
      this.sumOfCount = count.sum_of_sherds;
    });

    this.data.getSumOfWeight(this.selectedTagNumbers,
      this.selectedBroadDates, this.selectedDetailedDates, this.selectedSite).subscribe(weightRes => {
      console.log('FETCHING SUM OF WEIGHT...');
      this.sumOfWeight = weightRes.sum_of_weight;
    });

    this.data.getWareDistribution(this.selectedTagNumbers,
      this.selectedSite, this.selectedBroadDates, this.selectedDetailedDates, this.isWeight).subscribe(res => {
      console.log('FETCHING WARE DISTRIBUTION...', res.query);
      const grouped = _.groupBy(res.response, 'tagNumber');
      const keys = Object.keys(grouped);
      const values = Object.keys(grouped).map(i => grouped[i]);
      const treeMapData = [];

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        treeMapData.push({
          name: key,
          children: values[i].map(ele => {
            return { name: ele.fabricType, value: ele.count }
          })
        });
      }

      this.treeMapData = treeMapData;

    });

    this.data.getFlowChartData(this.selectedTagNumbers,
      this.selectedBroadDates, this.selectedDetailedDates, this.selectedSite, this.isWeight).subscribe(flowRes => {
      console.log('FETCHING FLOW CHART DATA...', flowRes);

      const grouped = _.groupBy(flowRes.response, 'tagNumber');
      const keys = Object.keys(grouped);
      const values = Object.keys(grouped).map(i => grouped[i]);
      const flowData = [];

      // Ware
      for (let i = 0; i < keys.length; i++) {
        const tagNumber = keys[i];
        const groupByWare = _.groupBy(values[i], 'ware');
        Object.keys(groupByWare).forEach((ware, index) => {
          const to = ware;
          const from = tagNumber;
          const wareValues = Object.keys(groupByWare).map(s => groupByWare[s]);
          const sum = wareValues[index].map(item => item['count']).reduce((prev, next) => prev + next)
          flowData.push({ from: from, to: to, value: sum, id: (ware + '-0')});
        });
      }

      //  Surface Treatment
      for (let i = 0; i < keys.length; i++) {
        const groupBySurfaceTreatment = _.groupBy(values[i], 'surfaceTreatment');

        Object.keys(groupBySurfaceTreatment).forEach((surface) => {
          const valuesBySurface = groupBySurfaceTreatment[surface];
          const surfaceByWareGroup = _.groupBy(valuesBySurface, 'ware');
          const ware = Object.keys(surfaceByWareGroup);
          const wareValues = Object.keys(surfaceByWareGroup).map(j => surfaceByWareGroup[j]);

          ware.forEach((w, index) => {
            const sum = wareValues[index].map(item => item['count']).reduce((prev, next) => prev + next);
            flowData.push({ from: w, to: surface, value: sum, id: surface + '-0'});
          });
        });
      }

      // Blackening
      for (let i = 0; i < keys.length; i++) {
        const groupBySurfaceTreatment = _.groupBy(values[i], 'blackening');
        Object.keys(groupBySurfaceTreatment).forEach((blackening) => {
          const valuesBySurface = groupBySurfaceTreatment[blackening];
          const surfaceByWareGroup = _.groupBy(valuesBySurface, 'surfaceTreatment');
          const ware = Object.keys(surfaceByWareGroup);
          const wareValues = (Object.keys(surfaceByWareGroup).map(j => surfaceByWareGroup[j]));
          ware.forEach((w, index) => {
            const sum = wareValues[index].map(item => item['count']).reduce((prev, next) => prev + next);
            flowData.push({ from: w, to: blackening, value: sum, id: blackening + '-0'});
          });
        });
      }


      console.log('getFlowChartData', (flowData));

      this.flowChartData = flowData;

    });

    this.data.getDirectedTreeData(this.selectedTagNumbers,
      this.selectedBroadDates,
      this.selectedDetailedDates,
      this.selectedSite, this.isWeight).subscribe(response => {
      console.log('FETCHING DIRECTED TREE DATA...', response);
      this.partitionedBarData = response.map(ele => {
        return {
          'region': ele.type,
          'state': ele.category,
          'sales': ele.count
        }
      });
      // console.log(this.partitionedBarData);

    });

  }

}
