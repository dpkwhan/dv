`BASE_DATA_DIR setenv "D:/data/";
baseDir:getenv `BASE_DATA_DIR;

`NASDAQ_CROSSES_DATA_DIR setenv baseDir,"nasdaq/crosses/csv/"
`DAILY_VOLUME_DATA_DIR setenv baseDir,"cboe/daily_volume/"
