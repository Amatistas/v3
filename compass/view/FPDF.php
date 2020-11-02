<?php
// Añadir capítulo
class PDF extends FPDF
{

    protected $extgstates = array();

    // alpha: real value from 0 (transparent) to 1 (opaque)
    // bm:    blend mode, one of the following:
    //          Normal, Multiply, Screen, Overlay, Darken, Lighten, ColorDodge, ColorBurn,
    //          HardLight, SoftLight, Difference, Exclusion, Hue, Saturation, Color, Luminosity
    function SetAlpha($alpha, $bm = 'Normal')
    {
        // set alpha for stroking (CA) and non-stroking (ca) operations
        $gs = $this->AddExtGState(array('ca' => $alpha, 'CA' => $alpha, 'BM' => '/' . $bm));
        $this->SetExtGState($gs);
    }

    function AddExtGState($parms)
    {
        $n = count($this->extgstates) + 1;
        $this->extgstates[$n]['parms'] = $parms;
        return $n;
    }

    function SetExtGState($gs)
    {
        $this->_out(sprintf('/GS%d gs', $gs));
    }

    function _enddoc()
    {
        if (!empty($this->extgstates) && $this->PDFVersion < '1.4')
            $this->PDFVersion = '1.4';
        parent::_enddoc();
    }

    function _putextgstates()
    {
        for ($i = 1; $i <= count($this->extgstates); $i++) {
            $this->_newobj();
            $this->extgstates[$i]['n'] = $this->n;
            $this->_put('<</Type /ExtGState');
            $parms = $this->extgstates[$i]['parms'];
            $this->_put(sprintf('/ca %.3F', $parms['ca']));
            $this->_put(sprintf('/CA %.3F', $parms['CA']));
            $this->_put('/BM ' . $parms['BM']);
            $this->_put('>>');
            $this->_put('endobj');
        }
    }

    function _putresourcedict()
    {
        parent::_putresourcedict();
        $this->_put('/ExtGState <<');
        foreach ($this->extgstates as $k => $extgstate)
            $this->_put('/GS' . $k . ' ' . $extgstate['n'] . ' 0 R');
        $this->_put('>>');
    }

    function _putresources()
    {
        $this->_putextgstates();
        parent::_putresources();
    }


    function Header()
    {
        
    function tipo($type){
        switch ($type) {
            case 'FA':
                $var = "FACTURA ELECTRÓNICA";
                break;
            case 'BO':
                $var = "BOLETA ELECTRÓNICA";
                break;
            
            case 'CT':
                $var = "COTIZACIÓN";
                break;
            case 'GR':
                $var = "GUIA DE REMISIÓN ELECTRÓNICA";
                break;
            case 'Pagos':
                $var = "COMPROBANTE DE EGRESO";
                break;
                case 'NC':
                    $var = "NOTA DE CRÉDITO";
                    break;
                          
            case 11:
                $var = "RUC";
                break;
          
            case 6:
                $var = "DNI";
                break;
  
            default:
                $var = "NA";
                break;
        }
        return $var;
      }
    function tipo2($type){
        switch ($type) {
    
            case 13:
                $var = array('peso', 'total');
                break;
                          
        
  
            default:
                $var = array('precio', 'importe');
                break;
        }
        return $var;
      }
     
//   var_dump($this->arry);
//   var_dump($this->arry2);
//   var_dump($this->arry3);
//   var_dump($this->arry4);
//   var_dump($this->arry5);
//   var_dump($this->arry6);
                   // Logo
                $this->Image("../../api/upload/".substr($this->arry3[0]['fe_log'],2), 10, 8, 33);
                 
                   $this->SetFont('Arial', 'I', 8);
           
                   $this->SetXY(55, 8);
                   $this->MultiCell(100, 4, $this->arry3[0]['emp_nom'] . "\n " . substr($this->arry3[0]['emp_dir'], 0, 59) . "\n" . substr($this->arry3[0]['departamento'] . " - " . $this->arry3[0]['provincia'] . " - " . $this->arry3[0]['distrito'], 0, 59) . "\n" . substr("Email: " . $this->arry3[0]['emp_ema'], 0, 59) . "\n" . substr("Teléf: " . $this->arry3[0]['emp_tel'] . " Cel: " . $this->arry3[0]['emp_cel'], 0, 59) . " \n", 0, 'L');
              
                   $this->SetFont('Arial', 'B', 9);
                   $this->SetXY(150, 10);
  
  
        if($this->arry[0]['to_id'] == 13){
            $this->MultiCell(50, 5, "RUC" . $this->arry3[0]['emp_ruc'] . "\n " . tipo($this->arry[0]['td_id'])  ."\n". $this->arry[0]['documento'], 1, 'C');
            // Line break
            $this->SetMargins(10, 30, 20, 20);
    
            $this->SetFont('Arial', '', 9);
            $this->SetXY(10, 30);
            $this->MultiCell(110, 5, "Cliente: " . substr($this->arry[0]['ane_razsoc'], 0, 49) . "\n" . tipo($this->arry[0]['ane_tipdoc']).": " . $this->arry[0]['ane_numdoc'] . "\n" . "Dirección: " . substr($this->arry[0]['ane_dir'] . "\n" . "Ubigeo: " . $this->arry[0]['departamento'] . "\n" . "OC: ".$this->arry[0]['ven_obs'], 0, 70), 0, 'L');
           $this->SetXY(120, 30);
            $this->MultiCell(80, 5, "Fecha Emisión: " . $this->arry[0]['ven_fecreg'] . "\n" ."Pto Partida: ".substr($this->arry[0]['ane_dir']." - ". $this->arry[0]['provincia']." - " . $this->arry[0]['departamento'], 0, 70) . "\n"."Pto Llegada: ".$this->arry[0]['ven_direccion_destino']." - ".$this->arry[0]['provincia']." - ".$this->arry[0]['departamento'] ."\n", 0, 'L');
            $this->SetLineWidth(0.4);
            $this->line(10, 55, 200, 55);
            $this->SetY(60);
            // $fpdf->Ln(10);
            $this->SetFont('Arial', 'B', 8);
    
            $this->cell(20, 6, 'Código', 1, '', 'C');
            $this->cell(90, 6, 'Descripción', 1, '', 'C');
            $this->cell(20, 6, 'Cant', 1, '', 'C');
            // $this->cell(15,6,'Psnt',1,'','C');
            $col=tipo2($this->arry[0]['to_id']);
            $this->cell(30, 6, $col[0], 1, '', 'C');
            $this->cell(30, 6, $col[1], 1, '', 'C');
            $this->Ln(8);
        }else if($this->arry[0]['to_id'] == 22){

        }
        else if($this->arry4!=NULL){       
            $this->MultiCell(50, 5, "RUC" . $this->arry3[0]['emp_ruc'] . "\n " . "COMPROBANTE DE EGRESO"  ."\n", 1, 'C');
            // Line break
            $this->SetMargins(10, 30, 20, 20);
    
            $this->SetFont('Arial', '', 9);
            $this->SetXY(10, 30);
            $this->MultiCell(110, 5, "Cta: " . substr($this->arry4[0]['cc_id']." ".$this->arry4[0]['ban_des']." - ".$this->arry4[0]['ctaban_num'], 0, 55) ."\n". "Fecha: ". $this->arry4[0]['fecha_factura'], 0, 'L');
            $this->SetXY(120, 30);
            
            $this->MultiCell(80, 5, "Tipo de Pago: ".$this->arry4[0]['tp_nom']."\n". "N° Operación: ".$this->arry4[0]['pag_numope'] , 0, 'L');
            $this->SetLineWidth(0.4);
            $this->line(10, 40, 200, 40);
            $this->SetY(45);
        } 
        else{

            $this->MultiCell(50, 5, "RUC" . $this->arry3[0]['emp_ruc'] . "\n " . tipo($this->arry[0]['td_id'])  ."\n". $this->arry[0]['documento'], 1, 'C');
            // Line break
            $this->SetMargins(10, 30, 20, 20);
    
            $this->SetFont('Arial', '', 9);
            $this->SetXY(10, 30);
            $this->MultiCell(110, 5, "Cliente: " . substr($this->arry[0]['ane_razsoc'], 0, 49) . "\n" . tipo($this->arry[0]['ane_tipdoc']).": " . $this->arry[0]['ane_numdoc'] . "\n" . "Dirección: " . substr($this->arry[0]['ane_dir'] . "\n" . "Ubigeo: " . $this->arry[0]['departamento'] . "\n" . "OC: ".$this->arry[0]['ven_obs'], 0, 70), 0, 'L');
            $this->SetXY(120, 30);
            $this->MultiCell(80, 5, "Fecha Emisión: " . $this->arry[0]['ven_fecreg'] . "\n" . "Condición: ".$this->arry[0]['fp_nom']."\n" . "G.R Remitente: \n" . "G.R Transportista: ", 0, 'L');
            $this->SetLineWidth(0.4);
            $this->line(10, 55, 200, 55);
            $this->SetY(60);
            // $fpdf->Ln(10);
            $this->SetFont('Arial', 'B', 8);
    
            $this->cell(20, 6, 'Código', 1, '', 'C');
            $this->cell(90, 6, 'Descripción', 1, '', 'C');
            $this->cell(20, 6, 'Cant', 1, '', 'C');
            // $this->cell(15,6,'Psnt',1,'','C');
            $col=tipo2($this->arry[0]['to_id']);
            $this->cell(30, 6, $col[0], 1, '', 'C');
            $this->cell(30, 6, $col[1], 1, '', 'C');
            $this->Ln(8);
        }
        

      
        // $this->Ln(5);
    }


    function Footer()
    {
        // Posición: a 1,5 cm del final
        $this->SetY(-18);
        // Arial italic 8
        $this->SetFont('Arial', 'I', 8);
        // Número de página

        $this->Cell(0, 5, "REPRESENTACIÓN IMPRESA DEL COMPROBANTE DE PAGO ELECTRÓNICO \n", 0, 1, 'C');
        $this->Cell(0, 5, "ESTE DOCUMENTO PUEDE SER CONSULTADO EN", 0, 1, 'C');
        $this->Cell(0, 5, "www.gruposc.cpe.com.pe", 0, 1, 'C');
        $this->SetX(50);
        $this->SetY(-10);
        $this->Cell(0, 5, 'Página ' . $this->PageNo() . '/{nb}', 0, 0, 'R');
        // opacidad
        $this->SetAlpha(0.1);  
        $this->Image("../../api/upload/".substr($this->arry3[0]['fe_log'],2), 46, 130, 120);
    }
}
