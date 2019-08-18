dataDir:(getenv `DAILY_VOLUME_DATA_DIR);

system "cd ",dataDir;
years:-12#2007+til 13;
fnames: ":daily_volume_" ,/: (string years) ,\: ".csv";
cboeDaily:raze 0:[("DSFFFFFFFFJJJJ"; enlist ",")] each `$fnames;
cnames:`date`sym`tapeAShares`tapeBShares`tapeCShares`totalShares`tapeANotional`tapeBNotional`tapeCNotional`totalNotional`tapeATradeCount`tapeBTradeCount`tapeCTradeCount`totalTradeCount;
cboeDaily:cnames xcol cboeDaily;
trfs:(`$"ADF (D)";`$"NSX (DC)";`$"NASDAQ (DQ)";`$"Nasdaq (DQ)";`$"NYSE (DN)";`$"TRF (D)";`$"FINRA / Nasdaq TRF Chicago (DB)";`$"FINRA / NYSE TRF (DN)";`$"FINRA / Nasdaq TRF Carteret (DQ)");
update sym:`$"NYSE" from `cboeDaily where sym=`$"NYSE (N)";
update sym:`$"NYSE Arca" from `cboeDaily where sym=`$"NYSE Arca (P)";
update sym:`$"NYSE National" from `cboeDaily where sym in (`$"NSX (C)";`$"NYSE National (C)");
update sym:`$"NYSE American" from `cboeDaily where sym in (`$"AMEX (A)";`$"NYSE MKT (A)";`$"NYSE American (A)");
update sym:`$"NYSE Chicago" from `cboeDaily where sym in (`$"CHX (M)";`$"NYSE Chicago (M)");
update sym:`$"CBOE" from `cboeDaily where sym in (`$"CBSX (W)";`$"CBOE (W)");
update sym:`$"CBOE BYX" from `cboeDaily where sym in (`$"BATS BYX (Y)";`$"BYX Equities (Y)");
update sym:`$"CBOE BZX" from `cboeDaily where sym in (`$"BATS BZX (Z)";`$"BATS (Z)";`$"BZX Equities (Z)");
update sym:`$"CBOE EDGA" from `cboeDaily where sym in (`$"EDGA (J)";`$"BATS EDGA (J)";`$"EDGA Equities (J)");
update sym:`$"CBOE EDGX" from `cboeDaily where sym in (`$"EDGX (K)";`$"BATS EDGX (K)";`$"EDGX Equities (K)");
update sym:`$"NASDAQ" from `cboeDaily where sym in (`$"NASDAQ (Q)";`$"Nasdaq (Q)");
update sym:`$"NASDAQ ISE" from `cboeDaily where sym=`$"ISE (I)";
update sym:`$"NASDAQ BX" from `cboeDaily where sym in (`$"BEX (B)";`$"NASDAQ BX (B)");
update sym:`$"NASDAQ PSX" from `cboeDaily where sym in (`$"PSX (X)";`$"NASDAQ PSX (X)";`$"NASDAQ PSX (X)";`$"PHLX (X)");
update sym:`$"IEX" from `cboeDaily where sym=`$"IEX (V)";
update sym:`$"TRF" from `cboeDaily where sym in trfs;
`date`sym xasc `cboeDaily;

getWeek:{[date]
 `date$2+7*`int$(date-4)%7
 };

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
byWeek:select tapeCTotalShares:sum tapeCShares by week:`date$2+7*`int$(date-4)%7 from cboeDaily where date>=nyseCLiveDate;
nyseMarketShareTapeC:select string week,mktShare:tapeCShares%tapeCTotalShares from byWeekExch lj byWeek;
`:market_share_nyse_c.json 0: enlist .j.j nyseMarketShareTapeC;

nyseNationalLiveDate:2018.05.21;
nyseNationalByWeek:0!select shares:sum totalShares by week:getWeek date from cboeDaily where date>=nyseNationalLiveDate,sym=`$"NYSE National";
byWeek:select sum totalShares by week:getWeek date from cboeDaily where date>=nyseNationalLiveDate;
nyseNationalMktShares:select string week,mktShare:shares%totalShares from nyseNationalByWeek lj byWeek;
`:market_share_nyse_national.json 0: enlist .j.j select from nyseNationalMktShares;

`:market_volume_by_tape.json 0: enlist .j.j select from byYearTape;
