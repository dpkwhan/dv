dataDir:(getenv `MIDAS_DATA_DIR);
system "cd ",dataDir;
files:key hsym `$dataDir;

csvFiles:files where files like "20*csv";
midasData:raze 0:[("DSSSFFFFFFFFFFFFFFFF"; enlist ",")] each csvFiles;
midasData:`date`securityType`sym`exchange`mcapRank`turnoverRank`volatiltiyRank`priceRank`numCancels`numTrades`numLitTrades`numOddLotTrades`numHiddenTrades`numTradesForHidden`orderVol`tradeVol`litVol`oddLotVol`hiddenVol`tradeVolForHidden xcol midasData;

midasData:
  update `long$orderVol*1000
    ,`long$tradeVol*1000
    ,`long$litVol*1000
    ,`long$oddLotVol*1000
    ,`long$hiddenVol*1000
    ,`long$tradeVolForHidden*1000 
  from midasData;

//Update exchange name
midasData:update exchange:`$"NYSE Arca" from midasData where exchange=`Arca;
midasData:update exchange:`$"NYSE Chicago" from midasData where exchange=`CHX;
midasData:update exchange:`$"NYSE National" from midasData where exchange=`NSX;
midasData:update exchange:`$"NYSE American" from midasData where exchange=`Amex;

midasData:update exchange:`$"CBOE BYX" from midasData where exchange=`$"Bats-Y";
midasData:update exchange:`$"CBOE BZX" from midasData where exchange=`$"Bats-Z";
midasData:update exchange:`$"CBOE EDGA" from midasData where exchange=`$"Edge-A";
midasData:update exchange:`$"CBOE EDGX" from midasData where exchange=`$"Edge-X";

midasData:update exchange:`$"NASDAQ BX" from midasData where exchange=`Boston;
midasData:update exchange:`$"NASDAQ" from midasData where exchange=`Nasdaq;
midasData:update exchange:`$"NASDAQ PSX" from midasData where exchange=`Phlx;

select count i by exchange from midasData