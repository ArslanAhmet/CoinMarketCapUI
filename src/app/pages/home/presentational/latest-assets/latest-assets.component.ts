import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { merge, fromEvent, Subscription, Observable, timer } from 'rxjs';
import { AssetDataService, AssetsDataSource } from 'src/app/@core/data-services';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-latest-assets',
  templateUrl: './latest-assets.component.html',
  styleUrls: ['./latest-assets.component.scss']
})
export class LatestAssetsComponent implements OnInit {

  sortedData!: AssetsDataSource;
  displayedColumns = ['id', 'coinID', 'instantPrice', 'holdings', 'averageBuyPrice', 'h24Difference', 'profitLoss'];


   subscription!: Subscription;
   refreshTime: Observable<number> = timer(0, 30000);

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  @ViewChild(MatSort, { static: true })
  sort!: MatSort;

  @ViewChild('input', { static: true })
  input!: ElementRef;
  totalCount: any;

  constructor(private route: ActivatedRoute,
    private assetsService: AssetDataService,
    public deleteDialog: MatDialog) {
  }

  ngOnInit() {
    this.sortedData = new AssetsDataSource(this.assetsService);
    // this.sortedData.loadAssets('', 'Id desc', 0, 20);
    this.sortedData.loadAssets();
    this.subscription = this.refreshTime.subscribe(() => {
      this.loadAssetsPage();
    });

  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit() {


    // this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);


    // fromEvent(this.input.nativeElement, 'keyup')
    //   .pipe(
    //     debounceTime(200),
    //     distinctUntilChanged(),
    //     tap(() => {
    //       this.paginator.pageIndex = 0;

    //       this.loadAssetsPage();
    //     }),
    //   )
    //   .subscribe();

    // merge(this.sort.sortChange, this.paginator.page)
    //   .pipe(
    //     tap(() => this.loadAssetsPage()),
    //   )
    //   .subscribe();

  }


  loadAssetsPage() {
    this.sortedData.loadAssets();
  }
}
