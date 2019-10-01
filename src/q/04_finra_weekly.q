dataDir:(getenv `FINRA_WEEKLY_DATA_DIR);
system "cd ",dataDir;
files:key hsym `$dataDir;

atsTxtFiles:files where files like "ats.*.txt";
atsDataBefore2017:raze readAtsData each atsTxtFiles;
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
atsData:update mpid:`SGMT from atsData where mpid=`SGMA;

filterByTier:{[tid] 
    atsStats:0!select sum execQty by week,tier,mpid from atsData where tier=tid;
    atsStatsByPeriod:select totalQty:sum execQty by week,tier from atsStats;
    atsStatsByMpid:update atsMarketShare:execQty%totalQty from atsStats lj atsStatsByPeriod;
    topVenues:exec mpid from 10#`atsMarketShare xdesc select mpid,atsMarketShare from atsStatsByMpid where week=max week;
    atsStatsByMpid:delete from atsStatsByMpid where not mpid in topVenues;
    atsStatsByMpid:0!select sum execQty,sum atsMarketShare,last totalQty by tier,week,mpid from atsStatsByMpid;
    mpids:topVenues;
    default:mpids!(count mpids)#0;
    atsMarketShare:0!exec (default,mpid!atsMarketShare) by week,tier from atsStatsByMpid where mpid in mpids;
    delete tier from atsMarketShare
  };
statsT1:filterByTier[`T1];
statsT2:filterByTier[`T2];

system "cd ","C:/Users/david/workspace/git/dv/src/data";
`:ats_market_share.json 0: enlist .j.j `t1`t2!(flip statsT1;flip statsT2);

selectVenuesByTier:{[tid] 
    atsStats:0!select sum execQty by week,tier,mpid from atsData where tier=tid;
    atsStatsByPeriod:select totalQty:sum execQty by week,tier from atsStats;
    atsStatsByMpid:update atsMarketShare:execQty%totalQty from atsStats lj atsStatsByPeriod;
    atsStatsByMpid:0!select sum execQty,sum atsMarketShare,last totalQty by tier,week,mpid from atsStatsByMpid;
    atsStatsByMpid:select from atsStatsByMpid where mpid in `DBAX`CROS`ITGP;
    mpids:exec mpid from `atsMarketShare xdesc select mpid,atsMarketShare from atsStatsByMpid where week=max week;
    default:mpids!(count mpids)#0;
    atsMarketShare:0!exec (default,mpid!atsMarketShare) by week,tier from atsStatsByMpid where mpid in mpids;
    delete tier from atsMarketShare
  };
statsT1selected:selectVenuesByTier[`T1];
statsT2selected:selectVenuesByTier[`T2];

system "cd ","C:/Users/david/workspace/git/dv/src/data";
`:ats_market_share_selected.json 0: enlist .j.j `t1`t2!(flip statsT1selected;flip statsT2selected);


// non-ATS

mpidNsccFiles:files where files like "mpidlist.nscc*.txt";
mpidsNSCC:raze 0:[("SSS"; enlist "|")] each mpidNsccFiles;
mpidsNSCC:distinct select mpid,name from mpidsNSCC;

mpidFiles:files where files like "mpidlist_2*.txt";
mpids:raze 0:[("SSSSSSSSS"; enlist "|")] each mpidFiles;
mpids:`mpid`mpType`name xcol mpids;
mpids:distinct select mpid,name from mpids;
mpids:distinct mpids,mpidsNSCC;

nonatsCsvFiles:files where files like "nonats.weekly*.csv";
nonatsData:raze 0:[("   SSSS JJ  D   "; enlist ",")] each nonatsCsvFiles;
nonatsData:select week:weekStartDate
  ,tier:tierIdentifier
  ,mpid:MPID
  ,name:marketParticipantName
  ,execQty:totalWeeklyShareQuantity
  ,execCount:totalWeeklyTradeCount 
from nonatsData;

nonatsData:nonatsData lj `name xkey mpids;
nonatsData:update mpid:`LAFF from nonatsData where name like "*LAFFERTY*";
nonatsData:update mpid:`VIRT from nonatsData where name like "*VIRTU*";
nonatsData:update mpid:`VIRT from nonatsData where name like "KCG *";
nonatsData:update mpid:`VIRT from nonatsData where name like "VFINANCE *";
nonatsData:update mpid:`CANA from nonatsData where name like "CANACCORD *";
nonatsData:update mpid:`DEMF from nonatsData where name like "De Minimis*";
nonatsData:update mpid:`PAUL from nonatsData where name like "PAULSON IN*";
nonatsData:update mpid:`BZWV from nonatsData where name like "GOLDMAN, SACHS*";
nonatsData:update mpid:`ARXI from nonatsData where name like "ARXIS SECURITIES*";
nonatsData:update mpid:`UBSA from nonatsData where name like "UBS *";
nonatsData:update mpid:`SSUS from nonatsData where name like "SUSQUEHANNA *";
nonatsData:update mpid:`IMCC from nonatsData where name like "IMC-CHICAGO*";
nonatsData:update mpid:`DLNY from nonatsData where name like "DELANEY EQUITY*";
nonatsData:update mpid:`SPCS from nonatsData where name like "SPARTAN SECURITIES*";
nonatsData:update mpid:`STFL from nonatsData where name like "STIFEL*";
nonatsData:update mpid:`STKP from nonatsData where name like "STOCKPILE*";
nonatsData:update mpid:`BTSS from nonatsData where name like "HILLTOP SECURITIES*";
nonatsData:update mpid:`CHAS from nonatsData where name like "CHARLES SCHWAB*";
nonatsData:update mpid:`JJKS from nonatsData where name like "RAFFERTY*";
nonatsData:update mpid:`CPES from nonatsData where name like "CONVERGEX*";
nonatsData:update mpid:`YLPL from nonatsData where name like "LPL FINANCIAL*";
nonatsData:update mpid:`VGRD from nonatsData where name like "VANGUARD *";
nonatsData:update mpid:`CLVU from nonatsData where name like "CLEARVIEW *";
nonatsData:update mpid:`ESPO from nonatsData where name like "ESPOSITO *";
nonatsData:update mpid:`DADA from nonatsData where name like "D.A. DAVIDSON*";
nonatsData:update mpid:`THBT from nonatsData where name like "THREE BROTHERS*";
