function(doc) {
	var behandlungen = {};

			var res = {};

			if(typeof doc['Organisationseinheiten_Fachabteilungen']['Organisationseinheit_Fachabteilung']['Gliederungsnummer'] !== 'undefined' || typeof doc['Organisationseinheiten_Fachabteilungen']['Organisationseinheit_Fachabteilung']['Name'] !== 'undefined') //if not and array
			{
				var abteilungObj = new Array();
				abteilungObj.push(doc['Organisationseinheiten_Fachabteilungen']['Organisationseinheit_Fachabteilung']);
			}
			else(typeof doc['Organisationseinheiten_Fachabteilungen']['Organisationseinheit_Fachabteilung']) //if an array
			{
				var abteilungObj = doc['Organisationseinheiten_Fachabteilungen']['Organisationseinheit_Fachabteilung'];
			}

			for(var abteilung in abteilungObj)
			{
				try {
				if(typeof abteilungObj[abteilung]['Prozeduren']['Verpflichtend'] !== 'undefined' && typeof abteilungObj[abteilung]['Prozeduren']['Verpflichtend']['Prozedur'] !== 'undefined')
				{
					var abteilungsProceduren = abteilungObj[abteilung]['Prozeduren']['Verpflichtend']['Prozedur'];

					for(var prozedur in abteilungsProceduren)
					{
						var fallzahl = 1.49; // default for Datenschutz

						if(typeof abteilungsProceduren[prozedur]['Fallzahl'] !== 'undefined')
							fallzahl = abteilungsProceduren[prozedur]['Fallzahl'] * 1;
						else if(typeof abteilungsProceduren[prozedur]['Anzahl'] !== 'undefined')
							fallzahl = abteilungsProceduren[prozedur]['Anzahl'] * 1;

						if(typeof res[abteilungsProceduren[prozedur]['OPS_301']] === 'undefined')
						{
							res[abteilungsProceduren[prozedur]['OPS_301']] = fallzahl;
						}
						else
						{
							res[abteilungsProceduren[prozedur]['OPS_301']] += fallzahl;
						}	
					}
					
				}

				if(typeof abteilungObj[abteilung]['Prozeduren']['Freiwillig'] !== 'undefined' && typeof abteilungObj[abteilung]['Prozeduren']['Freiwillig']['Prozedur'] !== 'undefined')
				{
					var abteilungsProceduren = abteilungObj[abteilung]['Prozeduren']['Freiwillig']['Prozedur'];

					for(var prozedur in abteilungsProceduren)
					{
						var fallzahl = 1.49; // default for Datenschutz

						if(typeof abteilungsProceduren[prozedur]['Fallzahl'] !== 'undefined')
							fallzahl = abteilungsProceduren[prozedur]['Fallzahl'] * 1;
						else if(typeof abteilungsProceduren[prozedur]['Anzahl'] !== 'undefined')
							fallzahl = abteilungsProceduren[prozedur]['Anzahl'] * 1;

						if(typeof res[abteilungsProceduren[prozedur]['OPS_301']] === 'undefined')
						{
							res[abteilungsProceduren[prozedur]['OPS_301']] = fallzahl;
						}
						else
						{
							res[abteilungsProceduren[prozedur]['OPS_301']] += fallzahl;
						}	
					}
					
				}

				if(typeof abteilungObj[abteilung]['Ambulante_Operationen']['Verpflichtend'] !== 'undefined' && typeof abteilungObj[abteilung]['Ambulante_Operationen']['Verpflichtend']['Ambulante_Operation'] !== 'undefined')
				{
					var abteilungsProceduren = abteilungObj[abteilung]['Ambulante_Operationen']['Verpflichtend']['Ambulante_Operation'];

					for(var prozedur in abteilungsProceduren)
					{
						var fallzahl = 1.49; // default for Datenschutz

						if(typeof abteilungsProceduren[prozedur]['Fallzahl'] !== 'undefined')
							fallzahl = abteilungsProceduren[prozedur]['Fallzahl'] * 1;
						else if(typeof abteilungsProceduren[prozedur]['Anzahl'] !== 'undefined')
							fallzahl = abteilungsProceduren[prozedur]['Anzahl'] * 1;
						
						if(typeof res[abteilungsProceduren[prozedur]['OPS_301']] === 'undefined')
						{
							res[abteilungsProceduren[prozedur]['OPS_301']] = fallzahl;
						}
						else
						{
							res[abteilungsProceduren[prozedur]['OPS_301']] += fallzahl;
						}	
					}
				}

				if(typeof abteilungObj[abteilung]['Ambulante_Operationen']['Freiwillig'] !== 'undefined' && typeof abteilungObj[abteilung]['Ambulante_Operationen']['Freiwillig']['Ambulante_Operation'] !== 'undefined')
				{
					var abteilungsProceduren = abteilungObj[abteilung]['Ambulante_Operationen']['Freiwillig']['Ambulante_Operation'];

					for(var prozedur in abteilungsProceduren)
					{
						var fallzahl = 1.49; // default for Datenschutz

						if(typeof abteilungsProceduren[prozedur]['Fallzahl'] !== 'undefined')
							fallzahl = abteilungsProceduren[prozedur]['Fallzahl'] * 1;
						else if(typeof abteilungsProceduren[prozedur]['Anzahl'] !== 'undefined')
							fallzahl = abteilungsProceduren[prozedur]['Anzahl'] * 1;
						
						if(typeof res[abteilungsProceduren[prozedur]['OPS_301']] === 'undefined')
						{
							res[abteilungsProceduren[prozedur]['OPS_301']] = fallzahl;
						}
						else
						{
							res[abteilungsProceduren[prozedur]['OPS_301']] += fallzahl;
						}	
					}
				}

				if(typeof abteilungObj[abteilung]['Hauptdiagnosen'] !== 'undefined' && typeof abteilungObj[abteilung]['Hauptdiagnosen']['Hauptdiagnose'] !== 'undefined')
				{
					var abteilungsDiagnosen = abteilungObj[abteilung]['Hauptdiagnosen']['Hauptdiagnose'];

					for(var diagnose in abteilungsDiagnosen)
					{
						var fallzahl = 1.49; // default for Datenschutz

						if(typeof abteilungsDiagnosen[diagnose]['Fallzahl'] !== 'undefined')
							fallzahl = abteilungsDiagnosen[diagnose]['Fallzahl'] * 1;
						else if(typeof abteilungsDiagnosen[diagnose]['Anzahl'] !== 'undefined')
							fallzahl = abteilungsDiagnosen[diagnose]['Anzahl'] * 1;
						
						if(typeof res[abteilungsDiagnosen[diagnose]['ICD_10']] === 'undefined')
						{
							res[abteilungsDiagnosen[diagnose]['ICD_10']] = fallzahl;
						}
						else
						{
							res[abteilungsDiagnosen[diagnose]['ICD_10']] += fallzahl;
						}	
					}
				}

}catch (exception) {
  log("ID: " + doc._id + ", exception: " + exception);
}


			}
			behandlungenUndDiagnosen = res;

//console.log(behandlungenUndDiagnosen);
	emit(doc._id, behandlungenUndDiagnosen);
}
