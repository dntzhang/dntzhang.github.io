<?php
echo print_r(scandir("/home/bae/app/cwb/.."));
echo print_r(scandir("/home/bae/app/cwb/."));
$d = dir("/home/bae/app/cwb");
echo "Handle: " . $d->handle . "\n";
echo "Path: " . $d->path . "\n";
while (false !== ($entry = $d->read())) {
	echo $entry."\n";
}
$filename = '/home/bae/app/cwb/img2.png';

if (file_exists($filename)) {
	echo "The file $filename exists";
} else {
	echo "The file $filename does not exist";
}
//
//echo __FILE__; 
//echo basename(__FILE__); 
// echo basename(__FILE__, '.php'); 
// echo dirname(__FILE__); 
// echo dirname(dirname(__FILE__)); 

function finddir($filename, &$dirnum, &$filenum){
	$open=opendir($filename);
	readdir($open);
	readdir($open);
	while($newfile=readdir($open)){
		//echo readdir($open);
		$new_dir=$filename."/".$newfile;
		if(is_dir($new_dir)){
			finddir($new_dir, $dirnum, $filenum);
			$dirnum++;    
		}else{
			$filenum++;
		}
	}
	closedir($open);
}
$dirnum=0;
$filename=0;
finddir("/home/bae/app/cwb", $dirnum, $filenum);
echo "目录数目".$dirnum;
echo "文件数目".$filenum;
$d->close();
?>