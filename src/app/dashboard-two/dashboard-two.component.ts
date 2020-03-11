import { Component, OnInit } from '@angular/core';
import { DashboardTwoService } from './Services/dashboard-two.service';
import * as _ from 'lodash';

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
  selectedTagNumbers: any = ['Baseball'];

  // Radio Button
  sites: string[] = ['KHPP', 'Elephantine'];
  selectedSite = 'KHPP';

  numberOfSherds;
  sumOfCount;
  treeMapData;
  flowChartData;

  constructor(public data: DashboardTwoService) {
    console.log('dashboard constructor - two');
    this.getAllTagNumbers();

   }

  ngOnInit() {
    console.log('dashboard ngOnInit - two')
  }

  onSubmitSelection() {
    console.log('Submit clicked...');
    if (this.selectedSite !== null && this.selectedTagNumbers.length !== 0) {
      console.log('Selected Site: ', this.selectedSite);
      console.log('Selected Tag Numbers: ', this.selectedTagNumbers);
      this.loadDashboardData();
    }
  }

  onSiteSelection(e?: any) {
    console.log('changed');
    this.tagNumbers = [];
    this.setSiteSelection();
  }

  getAllTagNumbers() {
    this.data.getTagNumbers().subscribe(res => {
      const allTagNumbers = res[0];
      console.log(allTagNumbers);
      this.tagNumbers_khpp = allTagNumbers.map(tag => {
        if (tag.type === 'khppform') {
          return tag.tagNumber;
        } else {
          return null
        }
      }).filter(tags => { return tags !== null});
      console.log('KHPP TAGS', this.tagNumbers_khpp);

      this.tagNumbers_elephantine = allTagNumbers.map(tag => {
        if (tag.type === 'eleform') {
          return tag.tagNumber;
        } else {
          return null
        }
      }).filter(tags => { return tags !== null});
      console.log('ELE TAGS', this.tagNumbers_elephantine);

      this.setSiteSelection();

      this.onSubmitSelection();
    });
  }

  setSiteSelection() {
    this.tagNumbers = this.selectedSite === 'KHPP' ? this.tagNumbers_khpp : this.tagNumbers_elephantine;
    //this.selectedTagNumbers = this.tagNumbers[0] ? [this.tagNumbers[0]] : [];
    // test
    this.selectedTagNumbers = ['D09.1-002-61'];
  }

  loadDashboardData() {
    console.log('LOADING DASHBOARD DATA');
    this.data.getSherdCount(this.selectedTagNumbers, this.selectedSite).subscribe(res => {
      // console.log(res);
      this.numberOfSherds = res.number_of_sherds;
      this.data.getSumOfCount(this.selectedTagNumbers, this.selectedSite).subscribe(res => {
        // console.log(res);
        this.sumOfCount = res.sum_of_sherds;
      });
      this.data.getWareDistribution(this.selectedTagNumbers, this.selectedSite).subscribe(res => {
        // console.log('treemapdata', res);
        const grouped = _.groupBy(res, 'tagNumber');
        // console.log(Object.keys(grouped))
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

        console.log('treeMapData', treeMapData);
        this.treeMapData = treeMapData;

      });
      this.data.getFlowChartData(this.selectedTagNumbers, this.selectedSite).subscribe(res => {
        console.log('flowchart data', res);

        const grouped = _.groupBy(res, 'tagNumber');
        const keys = Object.keys(grouped);
        const values = Object.keys(grouped).map(i => grouped[i]);

        const flowData = [];

        console.log(keys);
        console.log('RAW', values[0]);

        // Ware
        for (let i = 0; i < keys.length; i++) {
          const tagNumber = keys[i];
          const groupByWare = _.groupBy(values[i], 'ware');
          Object.keys(groupByWare).forEach((ware, index) => {
            const to = ware;
            const from = tagNumber;
            const wareValues = Object.keys(groupByWare).map(s => groupByWare[s]);
            flowData.push({ from: from, to: to, value: wareValues[index].length, id: ware + index + '-0'});
          });
        }
        //  Surface Treatment
        for (let i = 0; i < keys.length; i++) {
          const groupBySurfaceTreatment = _.groupBy(values[i], 'surfaceTreatment');
          Object.keys(groupBySurfaceTreatment).forEach((surface) => {
            const valuesBySurface = groupBySurfaceTreatment[surface];
            const surfaceByWareGroup = _.groupBy(valuesBySurface, 'ware');
            const ware = Object.keys(surfaceByWareGroup);
            const wareValues = (Object.keys(surfaceByWareGroup).map(j => surfaceByWareGroup[j]));
            ware.forEach((w, index) => {
              flowData.push({ from: w, to: surface, value: wareValues[index].length, id: surface + index + '-0'});
            });
          });
        }
        // Blackening
        for (let i = 0; i < keys.length; i++) {
          const groupBySurfaceTreatment = _.groupBy(values[i], 'blackening');
          Object.keys(groupBySurfaceTreatment).forEach((surface) => {
            const valuesBySurface = groupBySurfaceTreatment[surface];
            const surfaceByWareGroup = _.groupBy(valuesBySurface, 'surfaceTreatment');
            const ware = Object.keys(surfaceByWareGroup);
            const wareValues = (Object.keys(surfaceByWareGroup).map(j => surfaceByWareGroup[j]));
            ware.forEach((w, index) => {
              flowData.push({ from: w, to: surface, value: wareValues[index].length, id: surface + index + '-0'});
            });
          });
        }

        console.log(flowData);

        this.flowChartData = flowData;


        // this.flowChartData =  [
        //     { from: 'D09.1-002-61', to: 'Coarse', value: 7, id: 'A0-0' },
        //     { from: 'D09.1-002-61', to: 'Medium', value: 14, id: 'A1-0' },
        //     { from: 'D09.1-002-61', to: 'Fine', value: 9, id: 'A2-0' },

        //     { from: 'Coarse', to: 'Unslipped', value: 3, id: 'B0-0' },
        //     { from: 'Coarse', to: 'R Slip In', value: 1, id: 'B1-0' },
        //     { from: 'Coarse', to: 'R Slip Out', value: 1, id: 'B2-0' },
        //     { from: 'Coarse', to: 'Cream Slip Out', value: 1, id: 'B3-0' },
        //     { from: 'Coarse', to: 'Cream Slip In', value: 1, id: 'B4-0' },

        //     { from: 'Medium', to: 'Unslipped', value: 4, id: 'B0-0' },
        //     { from: 'Medium', to: 'R Slip In', value: 1, id: 'B1-0' },
        //     { from: 'Medium', to: 'R Slip Out', value: 1, id: 'B2-0' },
        //     { from: 'Medium', to: 'R Slip Both', value: 3, id: 'B3-0' },
        //     { from: 'Medium', to: 'Cream Slip Out', value: 1, id: 'B4-0' },
        //     { from: 'Fine', to: 'Unslipped', value: 3, id: 'B0-0' },
        //     { from: 'Fine', to: 'R Slip In', value: 1, id: 'B1-0' }, 
        //     { from: 'Fine', to: 'R Slip Both', value: 3, id: 'B3-0' },
        //     { from: 'Unslipped', to: 'Out', value: 3, id: 'B0-0' },
        //     { from: 'Unslipped', to: 'None', value: 3, id: 'B1-0' }, 
        //     { from: 'Unslipped', to: 'In/Out', value: 4, id: 'B3-0' },
        //   ];

      });
    });
  }


}
