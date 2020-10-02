// Require library
const xl = require("excel4node");
const wb = new xl.Workbook();
const ws = wb.addWorksheet("Hoja 1");
const { response } = require("express");
const { Schema } = require("mongoose");
const Fc0800 = require("../../models/formcovid/fc0800");

const getFormXls = (req, res = response) => {
 //console.log (req)
  //const datos = req.params.table;
  Fc0800.find({}, (error, dato) => {
    if (error) throw error;

    ws.cell(1, 1).string("Número de Registro");
    ws.cell(1, 2).string("Fecha de Registro");
    ws.cell(1, 3).string("Localidades");
    ws.cell(1, 4).string("Tipo de Registro");
    ws.cell(1, 5).string("Realizo hisopado");
    ws.cell(1, 6).string("Requiere Res. Hisopado");
    ws.cell(1, 7).string("Convivientes");
    for (let i = 0; i < dato.length; i++) {
      ws.cell(i + 2, 1).number(dato[i].nroForm);
      ws.cell(i + 2, 2)
        .date(dato[i].fecha)
        .style({ numberFormat: "dd/MM/yyyy" });
      ws.cell(i + 2, 3).string(dato[i].persona.localidad);
      ws.cell(i + 2, 4).string(dato[i].tipo_registro);
      ws.cell(i + 2, 5).string(dato[i].realizo_hisopado);
      if (dato[i].resultado_hisopado === true) {
        ws.cell(i + 2, 6).string("Si");
      } else {
        ws.cell(i + 2, 6).string("No");
      }

      if (dato[i].vivienda_personas === null) {
        ws.cell(i + 2, 7).number(0);
      } else {
        ws.cell(i + 2, 7).number(dato[i].vivienda_personas);
      }
    }
    wb.write("prueba.xlsx", res);
    console.log("Paso el Fomr")
  });
  
};
module.exports = { getFormXls };
