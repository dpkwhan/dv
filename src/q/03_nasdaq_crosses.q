dataDir:getenv `NASDAQ_CROSSES_DATA_DIR;
system "cd ",dataDir;
files:key hsym `$dataDir;
csvFiles:files where files like "cross_stats*.csv";
data:raze 0:[("DSSJJJ"; enlist ",")] each csvFiles;
data:delete from data where 0=openCross+closeCross;
total:select date,openCross,closeCross from data where sym=`TOTAL;
totalCalculated:select openCrossCalculated:sum openCross,closeCrossCalculated:sum closeCross by date from data where not sym=`TOTAL;

select from (total lj totalCalculated) where openCross<>openCrossCalculated
select from (total lj totalCalculated) where closeCross<>closeCrossCalculated

select sum openCross, sum closeCross by sym from data where date=2012.04.02


select from data where date=2012.04.02


select sum closeCross%sum openCross+closeCross by date.year from total where closeCross>0

select pct:sum closeCross%sum openCross+closeCross by date.year from data where not sym=`TOTAL

select count i by date from data where null listingMarket