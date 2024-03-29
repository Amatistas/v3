<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

use Greenter\Model\Client\Client;
use Greenter\Model\Company\Company;
use Greenter\Model\Company\Address;
use Greenter\Model\Sale\Invoice;
use Greenter\Model\Sale\SaleDetail;
use Greenter\Model\Sale\Legend;
use Greenter\Ws\Services\SunatEndpoints;
use Greenter\See;

require __DIR__ . '/vendor/autoload.php';

class GoBoleta
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
    public function generateFactura()
    {
        $database = new Database();
        $db = $database->getConnection($this->getdb);

        $fe = new FE($db, null, null);
        $see = new See();
        $see->setCertificate(file_get_contents('../api/upload/' . substr($this->MIEMPRESA['fe_cerrut'], 2)));
        ($fe->host() == "PRODUCCION") ? $see->setService(SunatEndpoints::FE_PRODUCCION) : $see->setService(SunatEndpoints::FE_BETA);
        $see->setClaveSOL($this->MIEMPRESA['emp_ruc'], $this->MIEMPRESA['fe_sntusu'], $this->MIEMPRESA['fe_sntcla']);

        //insertar Certificado
        $respuesta = array();
        // Cliente

        //1 = DNI
        //6 = RUC
        $setTipoDoc = ($this->CLIENTE['ane_tipdoc'] == 23) ? 6 : 1;
        $rzSoc = ($setTipoDoc==1)?$this->CLIENTE['ane_nom'].' '.$this->CLIENTE['ane_apepat']:$this->CLIENTE['ane_razsoc'];

        $client = new Client();
        $client->setTipoDoc($setTipoDoc)
            ->setNumDoc($this->CLIENTE['ane_numdoc'])
            ->setRznSocial($rzSoc);
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

        // Venta
        $invoice = (new Invoice())
            ->setUblVersion('2.1')
            ->setTipoOperacion('0101') // Venta - Catalog. 51
            ->setTipoDoc('03') // Factura - Catalog. 01 
            ->setSerie($this->VENTA['ven_ser'])
            ->setCorrelativo($this->VENTA['ven_num'])
            ->setFechaEmision(new DateTime($this->VENTA['ven_fecemi']))
            ->setTipoMoneda($this->VENTA['mnd_id']) // Sol - Catalog. 02
            ->setCompany($company)
            ->setClient($client)
            ->setMtoOperGravadas(round($this->VENTA['ven_afe'], 2))
            // ->setMtoOperInafectas(round($this->VENTA['ven_ina'], 2))
            ->setMtoIGV(round($this->VENTA['ven_igv'], 2))
            ->setTotalImpuestos(round($this->VENTA['ven_igv'], 2))
            ->setValorVenta(round($this->VENTA['ven_afe'] + $this->VENTA['ven_ina'], 2))
            ->setSubTotal(round($this->VENTA['ven_totdoc'], 2))
            ->setMtoImpVenta(round($this->VENTA['ven_totdoc'], 2));

        $letItemsArray = array();
        foreach ($this->VENTADETALLE as $k => $v) {
            /*    var_dump($k,$v); */

            $infoProducto = $fe->getDetalleProducto($this->VENTADETALLE[$k]['vt_pro_id']);
            $PRODUCTOS = $infoProducto->fetch(PDO::FETCH_ASSOC);

            $infoPresentacion = $fe->getPresentacionPorducto($PRODUCTOS['pst_id']);
            $PRESENTACION = $infoPresentacion->fetch(PDO::FETCH_ASSOC);

            //boleta no posee el reconocedor de tipo 
            //zona de gravados normales
            $item = (new SaleDetail())
                ->setCodProducto($PRODUCTOS['pro_bar'])
                ->setUnidad($PRESENTACION['pst_snt']) // Unidad - Catalog. 03
                ->setDescripcion($PRODUCTOS['pro_nom'])
                ->setCantidad(round($this->VENTADETALLE[$k]['Cantidad'], 2)) // cantidad
                ->setMtoValorUnitario($valorUnitario = round($this->VENTADETALLE[$k]['MtoValorUnitario'], 2)) // valor unitario (sin igv)
                ->setMtoValorVenta(round($this->VENTADETALLE[$k]['MtoValorVenta'], 2))   // valor unitario * cantidad sin igv
                ->setMtoBaseIgv(round($this->VENTADETALLE[$k]['MtoBaseIgv'], 2))         // valor unitario * cantidad sin igv  
                ->setPorcentajeIgv(round($this->VENTADETALLE[$k]['PorcentajeIgv'], 2)) // 18%
                ->setIgv(round($this->VENTADETALLE[$k]['Igv'], 2)) // igv del valor unitario  * cantidad 
                ->setTipAfeIgv('10') // Gravado Op. Onerosa - Catalog. 07
                ->setTotalImpuestos(round($this->VENTADETALLE[$k]['TotalImpuestos']), 2)  // igv del valor unitario * cantidad
                ->setMtoPrecioUnitario(round($this->VENTADETALLE[$k]['MtoPrecioUnitario']), 2); // precio total del producto unitario con igv                    
            array_push($letItemsArray, $item);
        }

        $num = new Num2letras();
        $legend = (new Legend())
            ->setCode('1000') // Monto en letras - Catalog. 52
            ->setValue($num->numero(round($this->VENTA['ven_totdoc'], 2)));

        $invoice->setDetails($letItemsArray)
            ->setLegends([$legend]);
        $result = $see->send($invoice);

        // Guardar XML firmado digitalmente.
        file_put_contents(
            '../folders/' . $this->getdb . '/' . $invoice->getName() . '.xml',
            $see->getFactory()->getLastXml()
        );
        // Verificamos que la conexión con SUNAT fue exitosa.
        if (!$result->isSuccess()) {
            // Mostrar error al conectarse a SUNAT.
            $v1 = $result->getError()->getCode();
            $v2 = $result->getError()->getMessage();
            $v1 = preg_replace('([^A-Za-z0-9])', ' ', $v1);
            $v2 = preg_replace('([^A-Za-z0-9])', ' ', $v2);

            array_push($respuesta, array("status" => "RECHAZADA", "detail" => array(
                "Codigo Error" => "$v1",
                "Mensaje Error" => "$v2"
            )));
            return $respuesta;
        }

        // Guardamos el CDR
        file_put_contents('../folders/' . $this->getdb . '/R-' . $invoice->getName() . '.zip', $result->getCdrZip());

        $cdr = $result->getCdrResponse();

        $code = (int)$cdr->getCode();


        $return = array();
        if ($code === 0) {
            http_response_code(200);
            array_push($respuesta, array("status" => "ACEPTADA"));
            array_push($respuesta, array("documento" => $invoice->getName()));
        } else if ($code >= 4000) {
            http_response_code(502);
            array_push($respuesta, array("status" => "ACEPTADA CON OBSERVACIONES", "detail" => array(PHP_EOL), "attr" => array($cdr->getNotes())));
        } else if ($code >= 2000 && $code <= 3999) {
            http_response_code(502);
            array_push($respuesta, array("status" => "RECHAZADA", "detail" => array(PHP_EOL)));
        } else {
            /* Esto no debería darse, pero si ocurre, es un CDR inválido que debería tratarse como un error-excepción. */
            /*code: 0100 a 1999 */
            http_response_code(502);
            array_push($respuesta, array("status" => "EXCEPCION", "detail" => "esto no deberia ocurrir comuniquese con soporte tecnico inmediatamente"));
        }
        $arryCDR = array("cdr" => array($cdr->getDescription()));
        array_push($return, $respuesta, $arryCDR);
        return $return;
    }
}
