dataDir:(getenv `RINRA_ATS_DATA_DIR);
system "cd ",dataDir;
files:key hsym `$dataDir;

csvFilesWeekly:files where files like "weeklySummary.2019-06-24*.csv";
/finraWeekly:raze 0:[("S  S S DJJ SD   "; enlist ",")] each csvFilesWeekly;
finraWeekly:raze 0:[("SSJSSSSDJJSSDDDD"; enlist ",")] each csvFilesWeekly;

csvFilesMonthly:files where files like "monthlySummary*.csv";
finraMonthly:raze 0:[("SSSSSDJJSSDDDD"; enlist ",")] each csvFilesMonthly;
		

qtyByVenue:0!select venueQty:sum totalWeeklyShareQuantity by summaryStartDate,tierIdentifier,MPID from finraWeekly;
qtyTotal:select totalQty:sum totalWeeklyShareQuantity by summaryStartDate,tierIdentifier from finraWeekly;
mktShare:update venueMktShare:venueQty%totalQty from qtyByVenue lj qtyTotal;
select from mktShare where not null MPID,tierIdentifier=`T1,MPID=`DBAX
select summaryStartDate,venueMktShare from mktShare where tierIdentifier=`T1,MPID=`DBAX


t1:raze 0:[("SSSSSJJD"; enlist "|")] each 1#`$"2019.08.05.T1.txt";
web:select qtyWeb:sum totalWeeklyShareQuantity by MPID from t1;
api:select qtyApi:sum totalWeeklyShareQuantity by MPID from finraWeekly where tierIdentifier=`T1,summaryStartDate=2019.08.05,not null MPID;
web uj api

select from finraWeekly where tierIdentifier=`T1,summaryStartDate=2019.08.05,MPID=`LATS,issueSymbolIdentifier=`AAPL
select sum totalWeeklyShareQuantity from t1 where issueSymbolIdentifier=`AAPL

select from finraWeekly where weekStartDate=2019.06.24,tierIdentifier=`T2,issueSymbolIdentifier=`EDU, not null MPID


`RINRA_ATS_DATA_DIR setenv baseDir;

dataDir:(getenv `RINRA_ATS_DATA_DIR);
system "cd ",dataDir;
files:key hsym `$dataDir;


fileApi:files where files like "atsWeekly*.csv";
dataApi:raze 0:[("SSJSSSSDJJSSDDDD"; enlist ",")] each fileApi;

fileWeb:files where files like "20190624*.txt";
dataWeb:raze 0:[("SSSSSJJD"; enlist "|")] each fileWeb;
byTierVenueWeb:select sum totalWeeklyShareQuantity by tier:tierDescription,mpid:MPID from dataWeb;


dataApi:select date:summaryStartDate,tier:tierIdentifier,mpid:MPID,firmName:marketParticipantName,execQty:totalWeeklyShareQuantity,execCount:totalWeeklyTradeCount,summaryTypeCode from dataApi where summaryTypeCode in `ATS_W_FIRM`OTC_W_FIRM;
atsStats:0!select sum execQty by date,tier,mpid from dataApi where summaryTypeCode in `ATS_W_FIRM;
byDateTier:select totalQty:sum execQty by date,tier from atsStats;
atsStatsByVenue:update atsMarketShare:execQty%totalQty from atsStats lj byDateTier;
mpids:exec distinct mpid from atsStatsByVenue;
default:mpids!(count mpids)#0;
atsMarketShare:exec (default,mpid!atsMarketShare) by date,tier from atsStatsByVenue;
select date,LATS from atsMarketShare where tier=`T1


select count i by summaryTypeCode from dataApi
