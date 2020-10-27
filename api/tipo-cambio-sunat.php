<?php
$ur = "http://www.sunat.gob.pe/cl-at-ittipcam/tcS01Alias" ; 
$file = fopen($ur,"r");
$n=0 ; $dt = array(10); $acum=""; //variable de control de lineas
while (!feof($file)) {     //captura de encabezados
  $fila = fgets($file) ; //captura de linea
  $acum = $acum.$fila ;
  $dt[$n]=$fila ; 
   echo $dt[$n];  // nuestra contenido
  $n++; }
fclose($file) ;

?>