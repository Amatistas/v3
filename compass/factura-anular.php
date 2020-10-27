<?php

declare(strict_types=1);


use Greenter\Model\Response\SummaryResult;
use Greenter\Model\Voided\Voided;
use Greenter\Model\Voided\VoidedDetail;
use Greenter\Ws\Services\SunatEndpoints;

require __DIR__ . '/demo/vendor/autoload.php';
require __DIR__ . '/demo/src/Util.php';


$util = Util::getInstance();

$detail1 = new VoidedDetail();
$detail1->setTipoDoc('01')
    ->setSerie('F001')
    ->setCorrelativo('2')
    ->setDesMotivoBaja('ERROR EN CÁLCULOS');

$voided = new Voided();
$voided->setCorrelativo('00111')
    // Fecha Generacion menor que Fecha comunicacion
    ->setFecGeneracion(new DateTime('-4days'))
    ->setFecComunicacion(new DateTime('-1days'))
    ->setCompany($util->shared->getCompany())
    ->setDetails([$detail1]);

// Envio a SUNAT.
$see = $util->getSee(SunatEndpoints::FE_BETA);

$res = $see->send($voided);
$util->writeXml($voided, $see->getFactory()->getLastXml());

if (!$res->isSuccess()) {
    echo $util->getErrorResponse($res->getError());
    return;
}

/**@var SummaryResult $res */
$ticket = $res->getTicket();
echo 'Ticket :<strong>' . $ticket .'</strong>';

$res = $see->getStatus($ticket);
if (!$res->isSuccess()) {
    echo $util->getErrorResponse($res->getError());
    return;
}

$cdr = $res->getCdrResponse();
$util->writeCdr($voided, $res->getCdrZip());

$util->showResponse($voided, $cdr);