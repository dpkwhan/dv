dataDir:(getenv `MIDAS_DATA_DIR);
system "cd ",dataDir;
files:key hsym `$dataDir;

csvFiles:files where files like "20*csv";
midasData:raze 0:[("DSSSFFFFFFFFFFFFFFFF"; enlist ",")] each 3#csvFiles;