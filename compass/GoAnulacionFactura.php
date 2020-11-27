<?php

declare(strict_types=1);
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require __DIR__ . '/vendor/autoload.php';

use Greenter\Model\Voided\Voided;
use Greenter\Model\Voided\VoidedDetail;



use Greenter\Model\Client\Client;
use Greenter\Model\Company\Company;
use Greenter\Model\Company\Address;
use Greenter\Ws\Services\SunatEndpoints;
use Greenter\See;




class GoAnulacionFactura
{
    public $VENTA;
    public $VENTADETALLE;
    public $MIEMPRESA;
    public $CLIENTE;
    public $GETUBIGEOS;
    public $conn;

    // constructor with $db as database connection
    public function __construct($VENTA, $VENTADETALLE, $MIEMPRESA, $CLIENTE, $UBIGEOCLIENTE, $UBIGEOEMPRESA, $getdb)
    {
        $this->VENTA = $VENTA;
        $this->VENTADETALLE = $VENTADETALLE;
        $this->MIEMPRESA = $MIEMPRESA;
        $this->CLIENTE = $CLIENTE;
        $this->getdb = $getdb;
        /* $this->$UBIGEOCLIENTE = $UBIGEOCLIENTE; */
        $this->UBIGEOEMPRESA = $UBIGEOEMPRESA;
    }
    public function generateAnulacion()
    {

        $see = new See();
        $see->setCertificate(file_get_contents('../api/upload/' . substr($this->MIEMPRESA['fe_cerrut'], 2)));
        $see->setService(SunatEndpoints::FE_PRODUCCION);
        $see->setClaveSOL($this->MIEMPRESA['emp_ruc'], $this->MIEMPRESA['fe_sntusu'], $this->MIEMPRESA['fe_sntcla']);


        // Cliente

        $client = new Client();
        $client->setTipoDoc($this->CLIENTE['ane_tipdoc'])
            ->setNumDoc($this->CLIENTE['ane_numdoc'])
            ->setRznSocial($this->CLIENTE['ane_razsoc']);
        // Emisor

        $address = new Address();
        $address->setUbigueo($this->UBIGEOEMPRESA['ubi_id'])
            ->setDepartamento($this->UBIGEOEMPRESA['departamento'])
            ->setProvincia($this->UBIGEOEMPRESA['provincia'])
            ->setDistrito($this->UBIGEOEMPRESA['distrito'])
            ->setUrbanizacion('-')
            ->setDireccion($this->MIEMPRESA['emp_dir'])
            ->setCodLocal('0000'); // Codigo de establecimiento asignado por SUNAT, 0000 de lo contrario.

        $company = new Company();
        $company->setRuc($this->MIEMPRESA['emp_ruc'])
            ->setRazonSocial($this->MIEMPRESA['emp_nomcom'])
            ->setNombreComercial($this->MIEMPRESA['emp_nom'])
            ->setAddress($address);


        $detail1 = new VoidedDetail();
        $detail1->setTipoDoc('01') // Factura
            ->setSerie('F001')
            ->setCorrelativo('2')
            ->setDesMotivoBaja('ERROR EN CÁLCULOS'); // Motivo por el cual se da de baja.

        $cDeBaja = new Voided();
        $cDeBaja->setCorrelativo('1') // Correlativo, necesario para diferenciar c. de baja de en un mismo día.
            ->setFecGeneracion(new \DateTime('2020-10-23 12:51:00')) // Fecha de emisión de los comprobantes a dar de baja
            ->setFecComunicacion(new \DateTime('2020-10-23 12:51:00')) // Fecha de envio de la C. de baja
            ->setCompany($company)
            ->setDetails([$detail1]);

        $result = $see->send($cDeBaja);
        // Guardar XML
        file_put_contents(
            '../folders/' . $this->getdb . '/' . $cDeBaja->getName() . '.xml',
            $see->getFactory()->getLastXml()
        );

        if (!$result->isSuccess()) {
            // Si hubo error al conectarse al servicio de SUNAT.
            var_dump($result->getError());
            exit();
        }

        $ticket = $result->getTicket();
        echo 'Ticket : ' . $ticket . PHP_EOL;

        $statusResult = $see->getStatus($ticket);
        if (!$statusResult->isSuccess()) {
            // Si hubo error al conectarse al servicio de SUNAT.
            var_dump($statusResult->getError());
            return;
        }

       $rr =  $statusResult->getCdrResponse()->getDescription();
       var_export($rr);
        // Guardar CDR
        file_put_contents('../folders/' . $this->getdb . 'R-' . $cDeBaja->getName() . '.zip', $statusResult->getCdrZip());
    }
}
