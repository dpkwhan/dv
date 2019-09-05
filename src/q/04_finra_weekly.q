readData:{
    data:("SSSSSJJD"; enlist "|") 0:-1_read0 x;
    bits:"." vs string x;
    week:"D"$bits 1;
    data:select week:week,tier:Report_Type,mpid:ATS_MPID,execQty:Shares,execCount:Trades from data;
    data:update tier:`T1 from data where tier=`$"NMS Tier 1";
    data:update tier:`T2 from data where tier=`$"NMS Tier 2";
    :data;
  };

formatD2Q:{`$(string `year$x),'"Q",'string 1+floor((`mm$x)-1)%3};

dataDir:(getenv `FINRA_WEEKLY_DATA_DIR);
system "cd ",dataDir;
files:key hsym `$dataDir;

atsTxtFiles:files where files like "ats.*.txt";
atsDataBefore2017:raze readData each atsTxtFiles;
atsDataBefore2017:0!select sum execQty,sum execCount by week,tier,mpid from atsDataBefore2017;

atsCsvFiles:files where files like "ats.weekly*.csv";
atsDataSince2017:raze 0:[("   SSSS JJ  D   "; enlist ",")] each atsCsvFiles;
atsDataSince2017:select week:weekStartDate
  ,tier:tierIdentifier
  ,mpid:MPID
  ,execQty:totalWeeklyShareQuantity
  ,execCount:totalWeeklyTradeCount 
from atsDataSince2017;

atsData:atsDataBefore2017,atsDataSince2017;
atsData:select from atsData where week>=2015.01.01;
atsData:update month:`month$week,quarter:formatD2Q week from atsData;

filterByTier:{[tid] 
    atsStats:0!select sum execQty by week,tier,mpid from atsData where tier=tid;
    atsStatsByPeriod:select totalQty:sum execQty by week,tier from atsStats;
    atsStatsByMpid:update atsMarketShare:execQty%totalQty from atsStats lj atsStatsByPeriod;
    topVenues:exec mpid from 10#`atsMarketShare xdesc select mpid,atsMarketShare from atsStatsByMpid where week=max week;
    atsStatsByMpid:update mpid:`Others from atsStatsByMpid where not mpid in topVenues;
    atsStatsByMpid:0!select sum execQty,sum atsMarketShare,last totalQty by tier,week,mpid from atsStatsByMpid;
    mpids:topVenues,`Others;
    default:mpids!(count mpids)#0;
    atsMarketShare:0!exec (default,mpid!atsMarketShare) by week,tier from atsStatsByMpid where mpid in mpids;
    delete tier from atsMarketShare
  };
statsT1:filterByTier[`T1];
statsT2:filterByTier[`T2];

system "cd ","C:/Users/david/workspace/git/dv/src/data";
`:ats_market_share.json 0: enlist .j.j `t1`t2!(flip statsT1;flip statsT2);

