import { Component, OnInit } from '@angular/core';
import { DashboardTwoService } from 'app/dashboard-two/Services/dashboard-two.service';
import { ElephantineFormService } from 'services/Elephantine-Form/elephantine-form.service';
import { Router } from '@angular/router';
import { LoginService } from 'app/login-page/services/login.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-dashboard-three',
  templateUrl: './dashboard-three.component.html',
  styleUrls: ['./dashboard-three.component.scss']
})
export class DashboardThreeComponent implements OnInit {

    // Filter Panel Options
    tagNumbers: Array<string> = [];
    tagNumbers2: Array<string> = [];

    tagNumbers_elephantine: Array<string> = [];
    tagNumbers_khpp: Array<string> = [];
    broadDateOptions: Array<string> = [];
    detailedDateOptions: Array<string> = [];

    tagNumbers_elephantine2: Array<string> = [];
    tagNumbers_khpp2: Array<string> = [];
    broadDateOptions2: Array<string> = [];
    detailedDateOptions2: Array<string> = [];

    selectedTagNumbers: any = ['Baseball'];
    selectedBroadDates: any = [''];
    selectedDetailedDates: any = [''];

    selectedTagNumbers2: any = ['Baseball'];
    selectedBroadDates2: any = [''];
    selectedDetailedDates2: any = [''];

    // Radio Button
    sites: string[] = ['KHPP', 'Elephantine'];
    sites2: string[] = ['KHPP', 'Elephantine'];

    selectedSite = 'KHPP';
    selectedSite2 = 'KHPP';

    numberOfSherds;
    sumOfCount;
    sumOfWeight;
    treeMapData;
    flowChartData;
    partitionedBarData;
    radarData;

    numberOfSherds2;
    sumOfCount2;
    sumOfWeight2;
    treeMapData2;
    flowChartData2;
    partitionedBarData2;
    radarData2;

    dialogOpen = false;
    weightSymbol = 'g';

    dialogOpen2 = false;
    weightSymbol2 = 'g';

    windowHeight;
    windowWidth;

    windowHeight2;
    windowWidth2;

    // count or weight
    isWeight = false;
    // isWeight2 = false;

    customFullStyle = {
      'width' : '100%',
      'height' : '100%'
    }

    cardOption = [
      {type: 'flow-chart', title: 'Flow Chart', status: 'active'},
      {type: 'chord-chhart', title: 'Chord Chart', status: 'inactive'},
    ];

    isGreaterThanTen = false;
    isGreaterThanTen2 = false;

    dialogTitle = '';
    treeMapVisible = false;
    flowChartVisible = false;
    partitionedBarVisible = false;

    houseNumbersOptions = [];
    roomNumberOptions = [];

    selectedHouseNumbers = [];
    selectedRoomNumbers = [];
    selectedHouseNumbers2 = [];
    selectedRoomNumbers2 = [];



  constructor(
    public data: DashboardTwoService,
    public elephantineService: ElephantineFormService,
    public auth: LoginService,
    public router: Router) {

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
  }

  getAllTagNumbers() {
    this.data.getTagNumbers().subscribe(res => {
      console.log('getAllTagNumbers', res);
      const allTagNumbers = res[0];
      // // console.log(allTagNumbers);
      this.tagNumbers_khpp = allTagNumbers.map(tag => {
        if (tag.type === 'khppform') {
          return tag.tagNumber;
        } else {
          return null
        }
      }).filter(tags => { return tags !== null});
      this.tagNumbers_khpp2 = allTagNumbers.map(tag => {
        if (tag.type === 'khppform') {
          return tag.tagNumber;
        } else {
          return null
        }
      }).filter(tags => { return tags !== null});

      this.tagNumbers_khpp.unshift('ALL');
      this.tagNumbers_khpp2.unshift('ALL');

      this.tagNumbers_elephantine = allTagNumbers.map(tag => {
        if (tag.type === 'eleform') {
          return tag.tagNumber;
        } else {
          return null
        }
      }).filter(tags => { return tags !== null});
      this.tagNumbers_elephantine2 = allTagNumbers.map(tag => {
        if (tag.type === 'eleform') {
          return tag.tagNumber;
        } else {
          return null
        }
      }).filter(tags => { return tags !== null});


      this.tagNumbers_elephantine.unshift('ALL');

      this.tagNumbers_elephantine2.unshift('ALL');

      this.setSiteSelection();
      this.setSiteSelection2();

      this.onSubmitSelection();
      this.onSubmitSelection2();
    }, error => {
      console.log(error);
      if (error.status === 401) {
        this.router.navigate(['/login']);
      }
    });
  }

  onCountOrWeightSelect(e: any) {  this.isWeight = e.checked; }
  // onCountOrWeightSelect2(e: any) {  this.isWeight2 = e.checked; }

  onSiteSelection(e: any, panel) {

    console.log('changed', panel);
    switch (panel) {
      case 'panel1':
        this.tagNumbers = [];
        this.selectedTagNumbers = [];
        this.setSiteSelection();
        break;
      case 'panel2':
        this.tagNumbers2 = [];
        this.selectedTagNumbers2 = [];
        this.setSiteSelection2();
        break
    }
  }


  setSiteSelection() {
    // this.tagNumbers = this.selectedSite === 'KHPP' ? this.tagNumbers_khpp : this.tagNumbers_elephantine;

    if (this.selectedSite === 'KHPP') {
      this.tagNumbers = this.tagNumbers_khpp;
      this.selectedTagNumbers = ['D09.1-002-61'];
    } else if (this.selectedSite === 'Elephantine') {
      this.tagNumbers = this.tagNumbers_elephantine;
      this.selectedTagNumbers = ['46501F/h-1'];
    }
    this.selectedBroadDates = [];
    this.selectedDetailedDates = [];
    this.selectedHouseNumbers = [];
    this.selectedRoomNumbers = [];
    // this.loadDashboardData();
  }

  setSiteSelection2() {
    // this.tagNumbers = this.selectedSite === 'KHPP' ? this.tagNumbers_khpp : this.tagNumbers_elephantine;

    if (this.selectedSite2 === 'KHPP') {
      this.tagNumbers2 = this.tagNumbers_khpp;
      this.selectedTagNumbers2 = ['D09.1-002-61'];
    } else if (this.selectedSite2 === 'Elephantine') {
      this.tagNumbers2 = this.tagNumbers_elephantine2;
      this.selectedTagNumbers2 = ['46501F/h-1'];
    }
    this.selectedBroadDates2 = [];
    this.selectedDetailedDates2 = [];
    this.selectedHouseNumbers2 = [];
    this.selectedRoomNumbers2 = [];
    // this.loadDashboardData();
  }

  onSubmitSelection() {

    if (this.selectedSite !== null && this.selectedTagNumbers.length !== 0 && this.selectedTagNumbers.length <= 15) {
      this.loadDashboardData();
    }
  }

  onSubmitSelection2() {

    if (this.selectedSite2 !== null && this.selectedTagNumbers2.length !== 0 && this.selectedTagNumbers2.length <= 15) {
      this.loadDashboardData();
    }
  }

  loadDashboardData() {
    console.warn('LOADING DASHBOARD DATA');
    let selected = this.selectedTagNumbers;
    let selected2 = this.selectedTagNumbers2;
    let key = 'tagNumber';
    const key2 = 'tagNumber'

    if (this.selectedTagNumbers.includes('ALL')) {
      selected = this.tagNumbers;
      key = 'ware';
    }

    if (this.selectedTagNumbers2.includes('ALL')) {
      selected2 = this.tagNumbers2;
      key = 'ware';
    }


    selected = selected.filter((ele) => { return ele !== 'ALL'});
    this.isGreaterThanTen = selected.length > 10;

    selected2 = selected2.filter((ele) => { return ele !== 'ALL'});
    this.isGreaterThanTen2 = selected.length > 10;

    this.data.getSumOfCount(
      selected,
      this.selectedBroadDates,
      this.selectedDetailedDates,
      this.selectedSite,
      this.selectedHouseNumbers,
      this.selectedRoomNumbers,
      ).subscribe(count => {
      this.sumOfCount = count.response.sum_of_sherds;
    });

    this.data.getSumOfCount(
      selected2,
      this.selectedBroadDates2,
      this.selectedDetailedDates2,
      this.selectedSite2,
      this.selectedHouseNumbers2,
      this.selectedRoomNumbers2,
      ).subscribe(count => {
      this.sumOfCount2 = count.response.sum_of_sherds;
    });

    this.data.getSumOfWeight(
      selected,
      this.selectedBroadDates,
      this.selectedDetailedDates,
      this.selectedSite,
      this.selectedHouseNumbers,
      this.selectedRoomNumbers
      ).subscribe(weightRes => {
      this.sumOfWeight = weightRes.sum_of_weight;
    });

    this.data.getSumOfWeight(
      selected2,
      this.selectedBroadDates2,
      this.selectedDetailedDates2,
      this.selectedSite2,
      this.selectedHouseNumbers2,
      this.selectedRoomNumbers2
      ).subscribe(weightRes => {
      this.sumOfWeight2 = weightRes.sum_of_weight;
    });

    this.data.getWareDistributionComparisson(
      selected, selected2,
      this.selectedSite, this.selectedSite2,
      this.selectedBroadDates, this.selectedBroadDates2,
      this.selectedDetailedDates, this.selectedDetailedDates2,
      this.selectedHouseNumbers, this.selectedHouseNumbers2,
      this.selectedRoomNumbers, this.selectedRoomNumbers2,
      this.isWeight).subscribe(res => {
        console.log('comparisson-ware', res);
        const grouped = _.groupBy(res.response, 'panel');
        const keys = Object.keys(grouped);
        const values = Object.keys(grouped).map(i => grouped[i]);
        const treeMapData = [];

        const tempArrayValues = [];

        values.forEach(arr => {
          const output =
          _(arr)
            .groupBy('fabricType')
            .map((objs, key) => ({
                'fabricType': key,
                'count': _.sumBy(objs, 'count') }))
            .value();

            tempArrayValues.push(output);

        })

        // console.log('treemapdata', grouped, keys, values);

        for (let i = 0; i < keys.length; i++) {
          treeMapData.push(
            { name: keys[i], children: tempArrayValues[i].map(ele => {
              return { name: ele.fabricType, value: ele.count }})
            }
          );
        }

        console.log('treemapdata', treeMapData);

        this.treeMapData = treeMapData;



      })

  }

}
