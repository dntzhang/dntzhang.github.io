<?php
$data = $_POST["imagedata"];
$uniqid=uniqid();
file_put_contents($uniqid.'.png', base64_decode($data));
echo $uniqid;
//$data = base64_decode($data);
//
//$im = imagecreatefromstring($data);
//if ($im !== false) {
//    header('Content-Type: image/png');
//    imagepng($im);
//    imagedestroy($im);
//}
//else {
//    echo 'An error occurred.';
//}
?>