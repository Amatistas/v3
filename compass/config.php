<?php

use Greenter\Ws\Services\SunatEndpoints;
use Greenter\See;

require __DIR__.'/vendor/autoload.php';


$see = new See();
$see->setCertificate(file_get_contents(__DIR__.'/certificado.pem'));
$see->setService(SunatEndpoints::FE_PRODUCCION);


$see->setClaveSOL('20000000001', 'MODDATOS', 'moddatos');

return $see;