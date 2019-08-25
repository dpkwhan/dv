getWeek:{[date]
 `date$2+7*`int$(date-4)%7
 };

dataDir:(getenv `DAILY_VOLUME_DATA_DIR);

system "cd ",dataDir;
years:-12#2007+til 13;
fnames: ":daily_volume_" ,/: (string years) ,\: ".csv";
cboeDaily:raze 0:[("DSFFFFFFFFJJJJ"; enlist ",")] each `$fnames;
cnames:`date`sym`tapeAShares`tapeBShares`tapeCShares`totalShares`tapeANotional`tapeBNotional`tapeCNotional`totalNotional`tapeATradeCount`tapeBTradeCount`tapeCTradeCount`totalTradeCount;
cboeDaily:cnames xcol cboeDaily;
trfs:(`$"ADF (D)";`$"NSX (DC)";`$"NASDAQ (DQ)";`$"Nasdaq (DQ)";`$"NYSE (DN)";`$"TRF (D)";`$"FINRA / Nasdaq TRF Chicago (DB)";`$"FINRA / NYSE TRF (DN)";`$"FINRA / Nasdaq TRF Carteret (DQ)");
cboeDaily:update sym:`$"NYSE" from cboeDaily where sym=`$"NYSE (N)";
cboeDaily:update sym:`$"NYSE Arca" from cboeDaily where sym=`$"NYSE Arca (P)";
cboeDaily:update sym:`$"NYSE National" from cboeDaily where sym in (`$"NSX (C)";`$"NYSE National (C)");
cboeDaily:update sym:`$"NYSE American" from cboeDaily where sym in (`$"AMEX (A)";`$"NYSE MKT (A)";`$"NYSE American (A)");
cboeDaily:update sym:`$"NYSE Chicago" from cboeDaily where sym in (`$"CHX (M)";`$"NYSE Chicago (M)");
cboeDaily:update sym:`$"CBOE" from cboeDaily where sym in (`$"CBSX (W)";`$"CBOE (W)");
cboeDaily:update sym:`$"CBOE BYX" from cboeDaily where sym in (`$"BATS BYX (Y)";`$"BYX Equities (Y)");
cboeDaily:update sym:`$"CBOE BZX" from cboeDaily where sym in (`$"BATS BZX (Z)";`$"BATS (Z)";`$"BZX Equities (Z)");
cboeDaily:update sym:`$"CBOE EDGA" from cboeDaily where sym in (`$"EDGA (J)";`$"BATS EDGA (J)";`$"EDGA Equities (J)");
cboeDaily:update sym:`$"CBOE EDGX" from cboeDaily where sym in (`$"EDGX (K)";`$"BATS EDGX (K)";`$"EDGX Equities (K)");
cboeDaily:update sym:`$"NASDAQ" from cboeDaily where sym in (`$"NASDAQ (Q)";`$"Nasdaq (Q)");
cboeDaily:update sym:`$"NASDAQ ISE" from cboeDaily where sym=`$"ISE (I)";
cboeDaily:update sym:`$"NASDAQ BX" from cboeDaily where sym in (`$"BEX (B)";`$"NASDAQ BX (B)");
cboeDaily:update sym:`$"NASDAQ PSX" from cboeDaily where sym in (`$"PSX (X)";`$"NASDAQ PSX (X)";`$"NASDAQ PSX (X)";`$"PHLX (X)");
cboeDaily:update sym:`$"IEX" from cboeDaily where sym=`$"IEX (V)";
cboeDaily:update sym:`$"TRF" from cboeDaily where sym in trfs;cboeDaily:`date`sym xasc cboeDaily;
cboeDaily:update month:`month$date,week:getWeek date from cboeDaily;

system "cd ","C:/Users/david/workspace/git/dv/src/data";

byYearExch:0!select shares:sum tapeAShares+tapeBShares+tapeCShares by date.year,sym from cboeDaily;
byYear:select totalShares:sum tapeAShares+tapeBShares+tapeCShares by date.year from cboeDaily;
marketShareByExch:byYearExch lj byYear;
marketShareByExch:update mktShare:shares%totalShares from marketShareByExch;
`:market_share_by_exch.json 0: enlist .j.j select year,sym,mktShare from marketShareByExch;

byYearTape:select sum tapeAShares,sum tapeBShares,sum tapeCShares by date.year from cboeDaily;
marketShareByTape:byYearTape lj byYear;
marketShareByTape:select year,mktShareA:100*tapeAShares%totalShares,mktShareB:100*tapeBShares%totalShares,mktShareC:100*tapeCShares%totalShares from marketShareByTape;
`:market_share_by_tape.json 0: enlist .j.j flip marketShareByTape;

nyseCLiveDate:2018.04.09;
byWeekExch:select sum tapeCShares by week:getWeek date,sym from cboeDaily where date>=nyseCLiveDate,sym=`$"NYSE";
byWeek:select tapeCTotalShares:sum tapeCShares by week:getWeek date from cboeDaily where date>=nyseCLiveDate;
nyseMarketShareTapeC:select string week,mktShare:tapeCShares%tapeCTotalShares from byWeekExch lj byWeek;
`:market_share_nyse_c.json 0: enlist .j.j nyseMarketShareTapeC;

nyseNationalLiveDate:2018.05.21;
nyseNationalByWeek:0!select shares:sum totalShares by week:getWeek date from cboeDaily where date>=nyseNationalLiveDate,sym=`$"NYSE National";
byWeek:select sum totalShares by week:getWeek date from cboeDaily where date>=nyseNationalLiveDate;
nyseNationalMktShares:select string week,mktShare:shares%totalShares from nyseNationalByWeek lj byWeek;
`:market_share_nyse_national.json 0: enlist .j.j select from nyseNationalMktShares;

`:market_volume_by_tape.json 0: enlist .j.j select from byYearTape;

exch:asc exec distinct sym from marketShareByExch;
default:exch!(count exch)#0;
mktShareByYearExch:0!exec (default,sym!mktShare) by year:year from marketShareByExch;
`:market_share_by_year_exch.json 0: enlist .j.j flip mktShareByYearExch;



nyseCLiveDate:2018.04.09;
byMonthExch:select sum tapeCShares by month,sym from cboeDaily where date>=nyseCLiveDate,sym=`$"NYSE";
byMonth:select tapeCTotalShares:sum tapeCShares by month from cboeDaily where date>=nyseCLiveDate;
nyseMarketShareTapeC:select month,nyseMarketShareInTapeC:tapeCShares%tapeCTotalShares from byMonthExch lj byMonth;

byMonthExch:select sum tapeAShares by month,sym from cboeDaily where date>=nyseCLiveDate,sym=`$"NASDAQ";
byMonth:select tapeATotalShares:sum tapeAShares by month from cboeDaily where date>=nyseCLiveDate;
nasdaqMarketShareTapeA:select month,nasdaqMarketShareInTapeA:tapeAShares%tapeATotalShares from byMonthExch lj byMonth;
marketShareTapeAC:nyseMarketShareTapeC lj `month xkey nasdaqMarketShareTapeA;
`:market_share_by_year_ac.json 0: enlist .j.j flip marketShareTapeAC;

