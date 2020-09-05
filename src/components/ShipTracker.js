import React from 'react';
import { Table } from 'reactstrap';
import '../components/ShipTracker.css';

const shipCompanyMap = {
	// MICHIGAN: 'DONJON',
	// 'JP BOISSEAU': 'DONJON',
	// 'DELAWARE BAY': 'DONJON',
	// 'ATLANTIC SALVOR': 'DONJON',
	STUYVESANT: 'DUTRA',  // OK
	// 'PAULA LEE': 'DUTRA',
	COLUMBIA: 'DUTRA',  // OK
	// OHIO: 'GREATLAKESDREDGEANDDOCK',
	// 'DREDGE TEXAS': 'GREATLAKESDREDGEANDDOCK',
	'TERRAPIN ISLAND': 'GREATLAKESDREDGEANDDOCK',  // OK
	// 'DREDGE ILLINOIS': 'GREATLAKESDREDGEANDDOCK',
	// CAROLINA: 'GREATLAKESDREDGEANDDOCK',
	// GL54: 'GREATLAKESDREDGEANDDOCK',
	'DOUGLAS B.MACKIE': 'GREATLAKESDREDGEANDDOCK',  // OK (for ELLIS ISLAND)
	'PADRE ISLAND': 'GREATLAKESDREDGEANDDOCK',  // OK
	// 'DREDGE 55': 'GREATLAKESDREDGEANDDOCK',
	// 'DREDGE NEW YORK': 'GREATLAKESDREDGEANDDOCK',
	'LIBERTY ISLAND': 'GREATLAKESDREDGEANDDOCK',  // OK
	// 'DREDGE 51': 'GREATLAKESDREDGEANDDOCK',
	// ALASKA: 'GREATLAKESDREDGEANDDOCK',
	'DODGE ISLAND': 'GREATLAKESDREDGEANDDOCK', // OK
	// VULCAN: 'MANSON',
	'GLADYS M': 'MANSON',  // OK (for ...)
	NEWPORT: 'MANSON',
	BAYPORT: 'MANSON', // 338570000
	// 'DREDGE NJORD': 'MANSON',
	// HAGAR: 'MANSON',
	// VALHALLA: 'MANSON',
	// 'H R MORRIS': 'MANSON',
	// 'ROBERT M. WHITE': 'MANSON',
	// 'DREDGE EINAR': 'MANSON',
	'GLENN EDWARDS': 'MANSON',  // OK
	// 'PETER DEJONG': 'MARINEX',
	// 'DREDGE HAMPTON ROADS': 'MARINEX',
	// 'DREDGE SAVANNAH': 'MARINEX',
	// 'DREDGE E STROUD': 'MIKEHOOKS',
	// 'DREDGE 32': 'MIKEHOOKS',
	// 'MISSOURI H': 'MIKEHOOKS',
	// 'MIKE HOOKS': 'MIKEHOOKS',
	VIRGINIAN: 'NORFOLK',  // OK
	// '       ATLANTIC': 'NORFOLK',
	CHARLESTEON: 'NORFOLK',  // OK
	PULLEN: 'NORFOLK',  // OK
	// 'DREDGE 428': 'NORFOLK',
	// ESSEX: 'NORFOLK',
	// 'LINDA LAQUAY': 'ORION',
	// 'JOHN C.LAQUAY': 'ORION',
	// 'WAYMON L BOYD': 'ORION',
	// HURLEY: 'USACE',
	// 'DREDGE GOETZ': 'USACE',
	ESSAYONS: 'USACE',  // OK
	YAQUINA: 'USACE',  // OK
	MCFARLAND: 'USACE',  // OK
	'DREDGE WHEELER': 'USACE',  // OK
	MURDEN: 'USACE',  // OK
	// CURRITUCK: 'USACE',
	// 'WEEKS 551': 'WEEKS',
	// BORINQUEN: 'WEEKS',
	// 'G D MORGRAN': 'WEEKS',
	// '506 BUCKET DREDGE': 'WEEKS',
	// 'E W ELLEFSEN': 'WEEKS',
	// 'C R MCCASKILL': 'WEEKS',
	'B.E. LINDHOLM': 'WEEKS',  // OK
	// 'R S WEEKS': 'WEEKS',
	'RN WEEKS': 'WEEKS', // OK
	MAGDALEN: 'WEEKS',  // OK
	// 'CAPT FRANK': 'WEEKS',
	// 'CAPT. AJ FOURNIER': 'CASHMANDREDGING',
	// 'FJ BELESIMO': 'CASHMANDREDGING',
	// 'DALE PYATT': 'CASHMANDREDGING',
	ATCHAFALAYA: 'CASHMANDREDGING'  // OK
};

export {shipCompanyMap}

const Ship = ({ ship, logoMap, logoClick, logoHoverOn, logoHoverOff}) => {
	const shipName = ship.AIS.NAME;
	const company = shipCompanyMap[shipName];
	// console.log({ company });
	const img = logoMap[company && company.split(' ').join('').toUpperCase()]; // FIX ME
	// const img = logoMap[company]; // FIX ME

	// const shipImage = companyImageMap[company];
	// let customMarker = 'clicked';
	return (
		<div onClick={(event) => logoClick(event, ship)} onMouseOver={(e) => logoHoverOn(e, ship)} onMouseLeave={(e) => logoHoverOff(e)}>
			{/* Render shipImage image */}
			<img src={img} alt="Logo" />
		</div>
	);
};
export { Ship };

const ShipTracker = ({ ships, setActiveShip }) => {
	console.log('These are the ships: ', { ships });

	return (
		<div className="ship-tracker">
			<Table className="flags-table" responsive hover>
				<thead>
					<tr>
						<th>#</th>
						<th>MMSI</th>
						<th>TIMESTAMP</th>
						<th>LATITUDE</th>
						<th>LONGITUDE</th>
						<th>COURSE</th>
						<th>SPEED</th>
						<th>HEADING</th>
						<th>NAVSTAT</th>
						<th>IMO</th>
						<th>NAME</th>
						<th>CALLSIGN</th>
					</tr>
				</thead>
				<tbody>
					{/* {ships.map((ship, index) => { */}
					{Array.isArray(ships) && ships.map((ship, index) => {
						// const { IMO, NAME, CALLSIGN, HEADING, SOG, MMSI, LONGITUDE, LATITUDE } = ship;
						// const cells = [ NAME, CALLSIGN, HEADING, SOG, IMO, MMSI, LONGITUDE, LATITUDE ];
						const {
							MMSI,
							TIMESTAMP,
							LATITUDE,
							LONGITUDE,
							COURSE,
							SPEED,
							HEADING,
							NAVSTAT,
							IMO,
							NAME,
							CALLSIGN
						} = ship.AIS;

						const cells = [
							MMSI,
							TIMESTAMP,
							LATITUDE,
							LONGITUDE,
							COURSE,
							SPEED,
							HEADING,
							NAVSTAT,
							IMO,
							NAME,
							CALLSIGN
						];

						return (
							<tr
								onClick={() => setActiveShip(ship.AIS.NAME, ship.AIS.LATITUDE, ship.AIS.LONGITUDE)}
								key={index}
							>
								<th scope="row">{index}</th>
								{cells.map((cell) => <td key={ship.AIS.MMSI}>{cell}</td>)}
							</tr>
						);
					})}
				</tbody>
			</Table>
		</div>
	);
};

export default ShipTracker;
