import { Component, OnInit } from '@angular/core';
import { DashboardTwoService } from './Services/dashboard-two.service';
import * as _ from 'lodash';
import { ElephantineFormService } from 'services/Elephantine-Form/elephantine-form.service';
import { LoginService } from 'app/login-page/services/login.service';
import { Http } from '@angular/http';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';


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
  radarData;

  dialogOpen = false;
  weightSymbol = 'g';

  windowHeight;
  windowWidth;

  // count or weight
  isWeight = false;

  customFullStyle = {
    'width' : '100%',
    'height' : '100%'
  }

  cardOption = [
    {type: 'flow-chart', title: 'Flow Chart', status: 'active'},
    {type: 'chord-chhart', title: 'Chord Chart', status: 'inactive'},
  ];

  isGreaterThanTen = false;

  dialogTitle = '';
  treeMapVisible = false;
  flowChartVisible = false;
  partitionedBarVisible = false;

  houseNumbersOptions = [];
  roomNumberOptions = [];
  selectedHouseNumbers = [];
  selectedRoomNumbers = [];

  // isAuthenticated = false;

  constructor(
    public data: DashboardTwoService,
    public elephantineService: ElephantineFormService,
    public auth: LoginService,
    public router: Router) {

    this.windowHeight = window.innerHeight;
    this.windowWidth = window.innerWidth;

    this.getAllTagNumbers();
    this.broadDateOptions = this.elephantineService.getBroadDate().map(ele => {
      return ele.value;
    });
    this.detailedDateOptions = this.elephantineService.getDynasticDate().map(ele => {
      return ele.value;
    });
    this.houseNumbersOptions = this.elephantineService.getHouseNumber().map(ele => {
      return ele.value;
    })
    this.roomNumberOptions = this.elephantineService.getRoomNumber().map(ele => {
      return ele.value;
    })


   }

  ngOnInit() {
    // // console.log('dashboard ngOnInit - two')
  }

  close() {
    this.dialogOpen = !this.dialogOpen;
  }

  onDialogOpen(type) {
    this.treeMapVisible = false;
    this.flowChartVisible = false;
    this.partitionedBarVisible = false;
    switch (type) {
      case 'tree-map':
        this.treeMapVisible = true;
        this.dialogTitle = 'Ware Distribution';
        break;
      case 'partitioned-bar':
        this.partitionedBarVisible = true;
        this.dialogTitle = 'Relationships between Ware, Surface Treatment and Blackening. Values by Count';
        break;
      case 'flow-chart':
        this.flowChartVisible = true;
        this.dialogTitle = 'Relationships between Ware, Surface Treatment and Blackening. Values by Count';
        break;
    }
    this.dialogOpen = !this.dialogOpen;
  }

  onChartSelect(type: string) {
    this.cardOption.forEach(option => {
      if (option.type === type) {
        option.status = 'active';
      } else {
        option.status = 'inactive';
      }
    });
    // // console.log(this.cardOption);
  }


  onSubmitSelection() {

      if (this.selectedSite !== null && this.selectedTagNumbers.length !== 0 && this.selectedTagNumbers.length <= 15) {
        this.loadDashboardData();
      }
  }

  onCountOrWeightSelect(e: any) {  this.isWeight = e.checked; }


  onSiteSelection(e: any) {
    // // console.log('changed');
    this.tagNumbers = [];
    this.selectedTagNumbers = [];
    this.setSiteSelection();
  }

  getAllTagNumbers() {
    this.data.getTagNumbers().subscribe(res => {
      const allTagNumbers = res[0];
      // // console.log(allTagNumbers);
      this.tagNumbers_khpp = allTagNumbers.map(tag => {
        if (tag.type === 'khppform') {
          return tag.tagNumber;
        } else {
          return null
        }
      }).filter(tags => { return tags !== null});

      this.tagNumbers_khpp.unshift('ALL');
      // // console.log('KHPP TAGS', this.tagNumbers_khpp);

      this.tagNumbers_elephantine = allTagNumbers.map(tag => {
        if (tag.type === 'eleform') {
          return tag.tagNumber;
        } else {
          return null
        }
      }).filter(tags => { return tags !== null});
      // // console.log('ELE TAGS', this.tagNumbers_elephantine);

      this.tagNumbers_elephantine.unshift('ALL');

      this.setSiteSelection();

      this.onSubmitSelection();
    }, error => {
      console.log(error);
      if (error.status === 401) {
        this.router.navigate(['/login']);
      }
    });
  }

  setSiteSelection() {
    // this.tagNumbers = this.selectedSite === 'KHPP' ? this.tagNumbers_khpp : this.tagNumbers_elephantine;

    if (this.selectedSite === 'KHPP') {
      this.tagNumbers = this.tagNumbers_khpp;
      // this.selectedTagNumbers = ['D09.1-002-61'];
      this.selectedTagNumbers = ['ALL'];
    } else if (this.selectedSite === 'Elephantine') {
      this.tagNumbers = this.tagNumbers_elephantine;
      // this.selectedTagNumbers = ['46501F/h-1'];
      this.selectedTagNumbers = ['ALL'];
    }
    this.selectedBroadDates = [];
    this.selectedDetailedDates = [];
    this.selectedHouseNumbers = [];
    this.selectedRoomNumbers = [];
    // this.loadDashboardData();
  }

  loadDashboardData() {
    console.warn('LOADING DASHBOARD DATA');
    let selected = this.selectedTagNumbers;
    let key = 'tagNumber';
    if (this.selectedTagNumbers.includes('ALL')) {
      selected = this.tagNumbers;
      key = 'ware';
    }

    selected = selected.filter((ele) => { return ele !== 'ALL'});
    this.isGreaterThanTen = selected.length > 10;

    this.data.getSumOfCount(
      selected,
      this.selectedBroadDates,
      this.selectedDetailedDates,
      this.selectedSite,
      this.selectedHouseNumbers,
      this.selectedRoomNumbers,
      ).subscribe(count => {
      // console.log('getSumOfCount...');
      this.sumOfCount = count.response.sum_of_sherds;
    });

    this.data.getSumOfWeight(
      selected,
      this.selectedBroadDates,
      this.selectedDetailedDates,
      this.selectedSite,
      this.selectedHouseNumbers,
      this.selectedRoomNumbers
      ).subscribe(weightRes => {
      // console.log('getSumOfWeight...');
      this.sumOfWeight = weightRes.sum_of_weight;
    });
    console.log('getWareDistribution...');
    this.data.getWareDistribution(
      selected,
      this.selectedSite,
      this.selectedBroadDates,
      this.selectedDetailedDates,
      this.selectedHouseNumbers,
      this.selectedRoomNumbers,
      this.isWeight).subscribe(res => {
      console.log('getWareDistribution...', res);

      const groupedByFabricType = _.groupBy(res.response, 'fabricType');
      const ftKeys = Object.keys(groupedByFabricType);
      const ftValues = Object.keys(groupedByFabricType).map(i => groupedByFabricType[i]);
      const radarData = [];


      // test
      for (let j = 0; j < ftKeys.length; j++) {
        const sum = _.sumBy(ftValues[j], (x) => {return x.count});
        const fullValue = _.sumBy(res.response, (e) => { return e.count})
        const test = sum / fullValue;

        radarData.push({
          category: ftKeys[j],
          value: Math.round(test * 100),
          full: 100
        })
      }

      this.radarData = radarData;

      const grouped = _.groupBy(res.response, 'tagNumber');
      const keys = Object.keys(grouped);
      const values = Object.keys(grouped).map(i => grouped[i]);
      const treeMapData = [];




      for (let i = 0; i < keys.length; i++) {
        treeMapData.push(
          { name: keys[i], children: values[i].map(ele => {
            return { name: ele.fabricType, value: ele.count }})
          }
        );
      }
      // console.log('treemapdata', res.response);
      // console.log('treemapdata', treeMapData);
      this.treeMapData = treeMapData;

    });

    this.data.getFlowChartData(
      selected,
      this.selectedBroadDates,
      this.selectedDetailedDates,
      this.selectedSite,
      this.selectedHouseNumbers,
      this.selectedRoomNumbers,
      this.isWeight).subscribe(flowRes => {
      // console.log('getFlowChartData...');


      const grouped = _.groupBy(flowRes.response, key);
      const keys = Object.keys(grouped);
      const values = Object.keys(grouped).map(i => grouped[i]);
      const flowData = [];

      // console.log('FETCHING FLOW CHART DATA...', grouped);

      // REDO
      if (key === 'ware') {
        for (let i = 0; i < keys.length; i++) {
          const wr = keys[i];
          const groupBySF = _.groupBy(values[i], 'surfaceTreatment');
          Object.keys(groupBySF).forEach((sf, index) => {
            const to = sf;
            const from = wr;
            const wareValues = Object.keys(groupBySF).map(s => groupBySF[s]);
            const sum = wareValues[index].map(item => item['count']).reduce((prev, next) => prev + next)
            flowData.push({ from: from, to: to, value: sum, id: (from + '-' + index + '-0')});
          });
        }
      } else {
          // Tag Numbers
          for (let i = 0; i < keys.length; i++) {
            const groupBySurfaceTreatment = _.groupBy(values[i], 'surfaceTreatment');

            Object.keys(groupBySurfaceTreatment).forEach((surface) => {
              const valuesBySurface = groupBySurfaceTreatment[surface];
              const surfaceByWareGroup = _.groupBy(valuesBySurface, 'ware');
              const ware = Object.keys(surfaceByWareGroup);
              const wareValues = Object.keys(surfaceByWareGroup).map(j => surfaceByWareGroup[j]);

              ware.forEach((w, index) => {
                const sum = wareValues[index].map(item => item['count']).reduce((prev, next) => prev + next);
                flowData.push({ from: w, to: surface, value: sum, id: 'tag' + index + '-0'});
              });
            });
          }

        // Ware
        if (selected.length <= 10) {
          for (let i = 0; i < keys.length; i++) {
            const tagNumber = keys[i];
            const groupByWare = _.groupBy(values[i], 'ware');
            Object.keys(groupByWare).forEach((ware, index) => {
              const to = ware;
              const from = tagNumber;
              const wareValues = Object.keys(groupByWare).map(s => groupByWare[s]);
              const sum = wareValues[index].map(item => item['count']).reduce((prev, next) => prev + next)
              flowData.push({ from: from, to: to, value: sum, id: (from + '-' + index + '-0')});
            });
          }
        }


        // Surface Treatment
        for (let i = 0; i < keys.length; i++) {
          const groupBySurfaceTreatment = _.groupBy(values[i], 'surfaceTreatment');

          Object.keys(groupBySurfaceTreatment).forEach((surface) => {
            const valuesBySurface = groupBySurfaceTreatment[surface];
            const surfaceByWareGroup = _.groupBy(valuesBySurface, 'ware');
            const ware = Object.keys(surfaceByWareGroup);
            const wareValues = Object.keys(surfaceByWareGroup).map(j => surfaceByWareGroup[j]);

            ware.forEach((w, index) => {
              const sum = wareValues[index].map(item => item['count']).reduce((prev, next) => prev + next);
              flowData.push({ from: w, to: surface, value: sum, id: 'tag' + index + '-0'});
            });
          });
        }
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
            flowData.push({ from: w, to: blackening, value: sum, id: w + index + '-0'});
          });
        });
      }

      // console.log('getFlowChartData', (flowRes.response));
      // console.log('getFlowChartData', (flowData));

      this.flowChartData = flowData;

    });
    // console.log('getDirectedTree');
    this.data.getDirectedTreeData(
      selected,
      this.selectedBroadDates,
      this.selectedDetailedDates,
      this.selectedSite,
      this.selectedHouseNumbers,
      this.selectedRoomNumbers,
      this.isWeight).subscribe(response => {
      // console.log('getDirectedTreeData', response)

      this.partitionedBarData = response.data.map(ele => {
        return {
          'region': ele.type,
          'state': ele.category,
          'sales': ele.count
        }
      });


    });

  }

}
