`BASE_DATA_DIR setenv "D:/data/";
baseDir:getenv `BASE_DATA_DIR;

`NASDAQ_CROSSES_DATA_DIR setenv baseDir,"nasdaq/crosses/csv/";
`DAILY_VOLUME_DATA_DIR setenv baseDir,"cboe/daily_volume/";
`FINRA_WEEKLY_DATA_DIR setenv baseDir,"finra/weekly";
`MIDAS_DATA_DIR setenv baseDir,"midas";

formatD2Y:{`year$x};
formatD2H:{`$(string `year$x),'("H1";"H2") 6<`mm$x};
formatD2h:{(1 2) 6<`mm$x};
formatD2Q:{`$(string `year$x),'"Q",'string 1+floor((`mm$x)-1)%3};
formatD2q:{1+floor((`mm$x)-1)%3};
formatD2M:{`month$x};
formatD2W:{`date$2+7*`int$(x-4)%7};

readAtsData:{
    data:("SSSSSJJD"; enlist "|") 0:-1_read0 x;
    bits:"." vs string x;
    week:"D"$bits 1;
    data:select week:week,tier:Report_Type,mpid:ATS_MPID,execQty:Shares,execCount:Trades from data;
    data:update tier:`T1 from data where tier=`$"NMS Tier 1";
    data:update tier:`T2 from data where tier=`$"NMS Tier 2";
    :data;
  };
